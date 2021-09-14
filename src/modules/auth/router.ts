import express from 'express';
import LoginHandler from './handlers/login.handler';
import RegisterHandler from './handlers/register.handler';
import RegisterValidator from './validators/register.validator';
import LoginValidator from './validators/login.validator';
import jwtAuthMiddleware from '../../middlewares/jwt.auth.middleware';
import MeHandler from './handlers/me.handler';
import getUserMiddleware from '../../middlewares/get.user.middleware';

export default function () {
    const router = express.Router();

    router.post('/register', RegisterValidator(), RegisterHandler);
    router.post('/login', LoginValidator(), LoginHandler);
    router.get('/me', jwtAuthMiddleware(), getUserMiddleware, MeHandler);

    return router;
}
