import jwt from 'express-jwt';

const jwtAuthMiddleware = () => jwt({
    secret: process.env.APP_SECRET,
    algorithms: ['HS256'],
    getToken: req => {
        let bearerToken = req.header('Authorization')?.replace('Bearer ', '');
        return req.query.token || bearerToken || '';
    },
});

export default jwtAuthMiddleware;
