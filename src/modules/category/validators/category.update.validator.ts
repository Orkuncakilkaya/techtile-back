import {body} from 'express-validator';
import {Database} from '../../../database';

const CategoryUpdateValidator = () => [
    body('name')
        .exists().bail()
        .isLength({min: 3, max: 64}).bail(),
    body('slug')
        .exists().bail()
        .isAlphanumeric('en-US', {ignore: '-'}).bail()
        .isLength({min: 3, max: 64}).bail()
        .custom(async (input, meta) => {
            const category = await Database.getInstance().categoryModel.findOne({
                slug: input,
                _id: {$ne: meta.req.params['categoryId']},
            });
            if (category !== null) {
                return Promise.reject();
            }
        }).bail(),
];

export default CategoryUpdateValidator;
