import {Request, Response} from 'express';
import {validationResult} from 'express-validator';
import {Database} from '../../../database';

export default async function CategoryUpdateHandler(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    try {
        await Database.getInstance().categoryModel.updateOne({_id: req.params.categoryId}, {
            name: req.body.name,
            slug: req.body.slug,
        });

        const category = await Database.getInstance().categoryModel.findById(req.params.categoryId);

        res.status(200).json({
            data: category.toObject(),
        });
    } catch (e) {
        res.status(404).json({message: 'not_found'});
    }
}
