import {Request, Response} from 'express';
import {User} from '../../../schemas/user.schema';
import {Database} from '../../../database';

export default async function ProductDeleteHandler(req: Request, res: Response) {
    try {
        const user = req.user as User;

        let product = await Database.getInstance().productModel.findById(req.params.productId);

        if (product === null) {
            res.status(404).json({message: 'not_found'});
            return;
        }

        if (product.userId.toString() !== user._id.toString()) {
            res.status(404).json({message: 'not_found'});
            return;
        }

        await Database.getInstance().productModel.deleteOne({_id: product._id});

        res.status(200).json({
            data: product.toObject(),
        });
    } catch (e) {
        res.status(404).json({message: 'not_found'});
    }
}
