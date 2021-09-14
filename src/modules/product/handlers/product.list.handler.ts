import {Request, Response} from 'express';
import {Database} from '../../../database';

export default async function ProductListHandler(req: Request, res: Response) {
    const lastSeen = req.query['lastSeen'];

    const products = await Database.getInstance()
        .productModel.find(lastSeen?.length > 0 ? {_id: {$lt: lastSeen.toString()}} : {})
        .sort({'_id': -1})
        .limit(15);

    const lastItem = products.length > 0 ? products[products.length - 1]._id : null;

    res.status(200).json({
        data: products,
        meta: {lastItem},
    });
}
