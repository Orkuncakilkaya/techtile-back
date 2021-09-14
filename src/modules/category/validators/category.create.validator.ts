import {body} from 'express-validator';
import {Database} from '../../../database';

const CategoryCreateValidator = () => [
    body('name')
        .exists().bail()
        .isLength({min: 3, max: 64}).bail(),
    body('slug')
        .exists().bail()
        .isAlphanumeric('en-US', {ignore: '-'}).bail()
        .isLength({min: 3, max: 64}).bail()
        .custom(async (input) => {
            const category = await Database.getInstance().categoryModel.findOne({
                slug: input,
            });
            if (category !== null) {
                return Promise.reject();
            }
        }).bail(),
];

export default CategoryCreateValidator;
