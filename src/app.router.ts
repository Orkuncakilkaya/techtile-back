import express from 'express';
import AuthRouter from './modules/auth/router';
import ProductRouter from './modules/product/router';
import CategoryRouter from './modules/category/router';

const AppRouter = () => {
    const router = express.Router();
    router.use('/auth', AuthRouter());
    router.use('/category', CategoryRouter());
    router.use('/product', ProductRouter());
    router.use('/storage', express.static('./storage'));
    return router;
};

export default AppRouter;
