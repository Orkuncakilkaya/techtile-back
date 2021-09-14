import {body} from 'express-validator';
import {Database} from '../../../database';

const RegisterValidator = () => [
    body('email')
        .exists().bail()
        .isEmail().bail()
        .custom(async (input) => {
            const user = await Database.getInstance().userModel.findOne({email: input});
            if (user !== null) {
                return Promise.reject();
            }
        }).bail(),
    body('name')
        .exists().bail()
        .isLength({min: 3, max: 32}).bail()
        .custom(async (input) => {
            const user = await Database.getInstance().userModel.findOne({email: input});
            if (user !== null) {
                return Promise.reject();
            }
        }),
    body('fullName')
        .exists().bail()
        .isLength({min: 3, max: 64}),
    body('password')
        .exists().bail()
        .isLength({min: 3, max: 32}).bail(),
];

export default RegisterValidator;
