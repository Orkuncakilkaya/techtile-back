import {body} from 'express-validator';
import {Database} from '../../../database';

const ProductUpdateValidator = () => [
    body('name')
        .exists().bail()
        .isLength({min: 3, max: 64}).bail(),
    body('description')
        .exists().bail()
        .isLength({min: 1, max: 2000}).bail(),
    body('slug')
        .exists().bail()
        .isAlphanumeric('en-US', {ignore: '-'}).bail()
        .custom(async (input, meta) => {
            const product = await Database.getInstance().productModel.findOne({
                slug: input,
                _id: {$ne: meta.req.params['productId']},
            });
            if (product !== null) {
                return Promise.reject();
            }
        }).bail(),
    body('categoryIdList')
        .exists().bail()
        .isArray().bail(),
];

export default ProductUpdateValidator;
