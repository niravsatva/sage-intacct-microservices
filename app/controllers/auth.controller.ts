import { Request, Response } from 'express';
import {authServices} from '../services';
import { ResponseStatus } from '../enum/responseEnum';

export class AuthController {

    async validateCredentials(req: Request, res: Response): Promise<void> {
        try {
            const data = await authServices.validateCredentials(req.body);
            res.json({ result: data })
        } catch (error: any) {
            res.status(ResponseStatus.ERROR).json({ message: error.message })
        }
    }

}

export default new AuthController();