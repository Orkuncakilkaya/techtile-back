import {Request, Response} from 'express';
import {validationResult} from 'express-validator';
import {Database} from '../../../database';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default async function LoginHandler(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    const user = await Database.getInstance().userModel.findOne({$or: [{email: req.body.name}, {name: req.body.name}]});
    if (user === null) {
        return res.status(400).json({error: 'Invalid credentials'});
    }
    const isValidPassword = await bcrypt.compare(req.body.password, user.password);

    if (isValidPassword) {
        const now = new Date();

        const session = await Database.getInstance().authModel.create({
            userId: user._id,
            expiresAt: new Date().setFullYear(now.getFullYear() + 1),
        });

        const token = jwt.sign(session.toObject(), process.env.APP_SECRET, {algorithm: 'HS256'});

        const expires = 90 * 24 * 60 * 60;

        return res.status(200).cookie('auth', token, {httpOnly: true, maxAge: expires, secure: false}).json({
            data: {
                token,
                user: {...user.toObject(), password: undefined},
            },
        });
    } else {
        return res.status(400).json({error: 'Invalid credentials'});
    }
}
