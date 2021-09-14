import {body} from 'express-validator';
import {Database} from '../../../database';

const LoginValidator = () => [
    body('name')
        .exists().bail()
        .custom(async (input) => {
            const user = await Database.getInstance().userModel.findOne({$or: [{email: input}, {name: input}]});
            if (user === null) {
                return Promise.reject();
            }
        }).bail(),
    body('password')
        .exists().bail(),
];

export default LoginValidator;
