import {Request, Response} from 'express';
import {Database} from '../../../database';

export default async function CategoryDeleteHandler(req: Request, res: Response) {
    try {
        const category = await Database.getInstance().categoryModel.findById(req.params.categoryId);

        await Database.getInstance().categoryModel.deleteOne({_id: req.params.categoryId});

        res.status(200).json({
            data: category.toObject(),
        });
    } catch (e) {
        res.status(404).json({message: 'not_found'});
    }
}
