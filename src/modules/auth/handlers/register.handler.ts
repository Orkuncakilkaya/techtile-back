import {Request, Response} from 'express';
import {validationResult} from 'express-validator';
import {Database} from '../../../database';
import bcrypt from 'bcrypt';

export default async function RegisterHandler(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    const {email, name, fullName} = req.body;

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    const user = await Database.getInstance().userModel.create({email, fullName, name, password});

    return res.status(200).json({data: {...user.toObject(), password: undefined}});
}
