import {Request, Response} from 'express';
import {validationResult} from 'express-validator';
import {Database} from '../../../database';
import {User} from '../../../schemas/user.schema';

export default async function ProductUpdateHandler(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

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

    let mainImagePath = product.mainImageUrl;

    if ('main' in req.files && 0 in req.files['main']) {
        mainImagePath = req.files['main'][0].path;
    }

    let extraImagePaths = product.extraImages;

    if ('extra' in req.files) {
        extraImagePaths = [...extraImagePaths, ...req.files['extra'].map(file => {
            return file.path;
        })];
    }

    await Database.getInstance().productModel.updateOne({_id: product._id}, {
        name: req.body.name,
        description: req.body.description,
        slug: req.body.slug.toLocaleLowerCase(),
        categoryIdList: req.body.categoryIdList,
        extraImages: extraImagePaths,
        mainImageUrl: mainImagePath,
    });

    product = await Database.getInstance().productModel.findById(req.params.productId);

    res.status(200).json({
        data: product.toObject(),
    });
}
