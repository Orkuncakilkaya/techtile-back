import {Database} from '../database';

const getUserMiddleware = async (req, res, next) => {
    const user = await Database.getInstance().userModel.findById(req.user.userId);
    req.user = user.toObject();
    next();
};

export default getUserMiddleware;
