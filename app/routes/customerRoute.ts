import express, { NextFunction, Request, Response } from 'express';
import { body, param, validationResult } from 'express-validator';
import { getStringValidationMessage } from '../utils/utils';
import jwtMiddleware from '../middleware/jwt.middleware';
import { customerController } from '../controllers';

const router = express.Router();

router.get('/list', jwtMiddleware, customerController.getCustomerList);

router.get('/:customerId', jwtMiddleware, customerController.getCustomerById);

router.post('/save', jwtMiddleware, [
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('printAs').notEmpty().withMessage('PrintAs is required'),
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
    customerController.createCustomer);

router.put('/update/:customerId', jwtMiddleware, [
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('printAs').notEmpty().withMessage('PrintAs is required'),
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
    customerController.updateCustomer);

router.delete('/delete/:customerId', jwtMiddleware, customerController.deleteCustomer);

export default router;