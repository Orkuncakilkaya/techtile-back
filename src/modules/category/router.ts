import express from 'express';
import jwtAuthMiddleware from '../../middlewares/jwt.auth.middleware';
import CategoryListHandler from './handlers/category.list.handler';
import CategoryCreateHandler from './handlers/category.create.handler';
import CategoryUpdateHandler from './handlers/category.update.handler';
import CategoryDeleteHandler from './handlers/category.delete.handler';
import CategoryCreateValidator from './validators/category.create.validator';
import CategoryUpdateValidator from './validators/category.update.validator';
import getUserMiddleware from '../../middlewares/get.user.middleware';
import CategoryDetailHandler from './handlers/category.detail.handler';

export default function () {
    const router = express.Router();

    router.get('/', CategoryListHandler);
    router.get('/:categoryId', CategoryDetailHandler);
    router.post(
        '/',
        jwtAuthMiddleware(),
        CategoryCreateValidator(),
        CategoryCreateHandler,
    );
    router.put(
        '/:categoryId',
        jwtAuthMiddleware(),
        CategoryUpdateValidator(),
        CategoryUpdateHandler,
    );
    router.delete(
        '/:categoryId',
        jwtAuthMiddleware(),
        getUserMiddleware,
        CategoryDeleteHandler,
    );

    return router;
}
