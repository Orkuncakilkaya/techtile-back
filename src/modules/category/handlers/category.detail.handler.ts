import {Request, Response} from 'express';
import {Database} from '../../../database';

export default async function CategoryDetailHandler(req: Request, res: Response) {
    let category = await Database.getInstance().categoryModel.findById(req.params.categoryId);

    if (category === null) {
        res.status(404).json({message: 'not_found'});
        return;
    }

    res.status(200).json({data: category.toObject()});
}
