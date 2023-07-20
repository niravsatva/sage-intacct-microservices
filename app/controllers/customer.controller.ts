import { Request, Response } from 'express';
import { ResponseStatus } from '../enum/responseEnum';
import { customerService } from '../services';

export class CustomerController {

    async getCustomerList(req: Request, res: Response): Promise<void> {
        try {
            const data = await customerService.getCustomerList(req.query, (req as any).user);
            res.json({ result: data })
        } catch (error: any) {
            res.status(ResponseStatus.ERROR).json({ message: error.message })
        }
    }

    async createCustomer(req: Request, res: Response): Promise<void> {
        try {
            const data = await customerService.saveCustomer(req.body, (req as any).user);
            res.json({ result: data })
        } catch (error: any) {
            res.status(ResponseStatus.ERROR).json({ message: error.message })
        }
    }

    async updateCustomer(req: Request, res: Response): Promise<void> {
        try {
            req.body.customerId = req.params.customerId;
            const data = await customerService.saveCustomer(req.body, (req as any).user);
            res.json({ result: data })
        } catch (error: any) {
            res.status(ResponseStatus.ERROR).json({ message: error.message })
        }
    }

    async deleteCustomer(req: Request, res: Response): Promise<void> {
        try {
            req.body.customerId = req.params.customerId;
            const data = await customerService.deleteCustomer(req.params.customerId, (req as any).user);
            res.json({ result: data })
        } catch (error: any) {
            res.status(ResponseStatus.ERROR).json({ message: error.message })
        }
    }

}

export default new CustomerController();