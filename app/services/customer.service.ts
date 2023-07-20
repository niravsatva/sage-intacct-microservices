import { CustomerRequest } from '../models/customer.model';
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
        const data = await customerRepository.getCustomerList(query, user.companyId, user.userId)
        return data;
    }

}

export default new CustomerService()