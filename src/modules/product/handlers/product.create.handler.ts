import {Request, Response} from 'express';
import {validationResult} from 'express-validator';
import {Database} from '../../../database';
import {User} from '../../../schemas/user.schema';

export default async function ProductCreateHandler(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    if (!('main' in req.files)) {
        return res.status(400).json({
            errors: [
                {field: 'main', error: 'required'},
            ],
        });
    }

    if (!(0 in req.files['main'])) {
        return res.status(400).json({
            errors: [
                {field: 'main', error: 'required'},
            ],
        });
    }

    const mainImagePath = req.files['main'][0].path;

    let extraImagePaths = [];

    if ('extra' in req.files) {
        extraImagePaths = req.files['extra'].map(file => {
            return file.path;
        });
    }

    const product = await Database.getInstance().productModel.create({
        name: req.body.name,
        description: req.body.description,
        slug: req.body.slug.toLocaleLowerCase(),
        categoryIdList: req.body.categoryIdList,
        extraImages: extraImagePaths,
        mainImageUrl: mainImagePath,
        userId: (req.user as User)._id,
        createdAt: new Date(),
    });

    res.status(200).json({
        data: product.toObject(),
    });
}
