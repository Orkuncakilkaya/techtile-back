import {Request, Response} from 'express';
import {validationResult} from 'express-validator';
import {Database} from '../../../database';

export default async function CategoryCreateHandler(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const category = await Database.getInstance().categoryModel.create({
        name: req.body.name,
        slug: req.body.slug.toLocaleLowerCase(),
    });

    res.status(200).json({
        data: category.toObject(),
    });
}
