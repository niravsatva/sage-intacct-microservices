import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../utils/jwt-util';
import { ResponseStatus } from '../enum/responseEnum';
import { ResponseErrors } from '../models/error-messages.model';

export default function jwtMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(ResponseStatus.UNAUTHORIZED).json(ResponseErrors.UNAUTHORIZED);
    }

    const token = authHeader.substring(7);

    try {
        const decoded = verifyToken(token);
        (req as any).user = decoded;

        next();
    } catch (err) {
        return res.status(ResponseStatus.UNAUTHORIZED).json(ResponseErrors.UNAUTHORIZED);
    }
}