import {Request, Response} from 'express';

export default async function MeHandler(req: Request, res: Response) {
    return res.status(200).json({
        data: {
            user: {...req.user, password: undefined},
        },
    });
}
