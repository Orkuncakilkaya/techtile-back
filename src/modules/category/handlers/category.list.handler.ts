import {Request, Response} from 'express';
import {Database} from '../../../database';

export default async function CategoryListHandler(req: Request, res: Response) {
    const lastSeen = req.query['lastSeen'];

    const categories = await Database.getInstance()
        .categoryModel.find(lastSeen?.length > 0 ? {_id: {$lt: lastSeen.toString()}} : {})
        .sort({'_id': -1})
        .limit(15);

    const lastItem = categories.length > 0 ? categories[categories.length - 1]._id : null;

    res.status(200).json({
        data: categories,
        meta: {lastItem},
    });
}
