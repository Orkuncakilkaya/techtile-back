import {Request, Response} from 'express';
import {Database} from '../../../database';

export default async function ProductDetailHandler(req: Request, res: Response) {
    const product = await Database.getInstance().productModel.findById(req.params.productId);

    if (product === null) {
        res.status(404).json({message: 'not_found'});
        return;
    }

    const user = await Database.getInstance().userModel.findById(product.userId);
    const categories = await Database.getInstance().categoryModel.find({_id: {$in: product.categoryIdList.map(id => id.toString())}});

    res.status(200).json({
        data: {
            product: product.toObject(),
            user: user.toObject(),
            categories: categories.map(item => item.toObject()),
        },
    });
}
