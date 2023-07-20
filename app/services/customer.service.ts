import { CustomerRequest } from '../models/customer.model';
import { ResponseErrors } from '../models/error-messages.model';
import { customerRepository } from '../repositories';

class CustomerService {

    async saveCustomer(data: CustomerRequest, user: any) {
        const create = await customerRepository.saveCustomer(data, user.companyId, user.userId);
        return create;
    }

    async deleteCustomer(customerId: string, user: any) {
        return await customerRepository.deleteCustomer(customerId, user.companyId, user.userId);
    }

    async getCustomerList(query: any, user: any) {
        const result = await customerRepository.getCustomerList(query, user.companyId, user.userId)
        return result;
    }

    async getCustomerById(customerId: string, user: any) {
        const result = await customerRepository.getCustomerById(customerId, user.companyId, user.userId);
        if(result.data.length) {
            return result;
        }

        throw new Error(ResponseErrors.INVALID_CUSTOMER_ID);
    }

}

export default new CustomerService()