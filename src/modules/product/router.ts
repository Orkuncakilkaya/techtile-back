import express from 'express';
import jwtAuthMiddleware from '../../middlewares/jwt.auth.middleware';
import ProductListHandler from './handlers/product.list.handler';
import ProductCreateHandler from './handlers/product.create.handler';
import ProductUpdateHandler from './handlers/product.update.handler';
import ProductDeleteHandler from './handlers/product.delete.handler';
import ProductCreateValidator from './validators/product.create.validator';
import ProductUpdateValidator from './validators/product.update.validator';
import multer from 'multer';
import getUserMiddleware from '../../middlewares/get.user.middleware';
import ProductDetailHandler from './handlers/product.detail.handler';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './storage/');
    },
    filename: (req, file, cb) => {
        const fileName = (new Date()).getTime().toString(16).slice(2) + '-' + file.originalname.toLowerCase().split(' ').join('-');
        cb(null, fileName);
    },
});

const upload = multer({
    storage,
    fileFilter(req, file, cb) {
        if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    },
});

export default function () {
    const router = express.Router();

    router.get('/', ProductListHandler);
    router.get('/:productId', ProductDetailHandler);
    router.post(
        '/',
        jwtAuthMiddleware(),
        getUserMiddleware,
        upload.fields([{
            name: 'main',
            maxCount: 1,
        }, {
            name: 'extra',
            maxCount: 5,
        }]),
        ProductCreateValidator(),
        ProductCreateHandler,
    );
    router.put(
        '/:productId',
        jwtAuthMiddleware(),
        getUserMiddleware,
        upload.fields([{
            name: 'main',
            maxCount: 1,
        }, {
            name: 'extras',
            maxCount: 5,
        }]),
        ProductUpdateValidator(),
        ProductUpdateHandler,
    );
    router.delete(
        '/:productId',
        jwtAuthMiddleware(),
        getUserMiddleware,
        ProductDeleteHandler,
    );

    return router;
}
