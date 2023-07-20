import express, { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import authController from '../controllers/auth.controller';
import { getStringValidationMessage } from '../utils/utils';

const router = express.Router();

router.post('/validate', [
    body('senderId').notEmpty().withMessage('Sender Id is required'),
    body('senderPassword').notEmpty().withMessage('Sender Password is required'),
    body('companyId').notEmpty().withMessage('Company Id is required'),
    body('userId').notEmpty().withMessage('User Id is required'),
    body('userPassword').notEmpty().withMessage('User Password is required')
],
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: getStringValidationMessage(errors.array())
            });
        }

        next();
    },
    authController.validateCredentials);

export default router;