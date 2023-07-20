import { CustomerCreate, CustomerDelete, CustomerUpdate, InvoiceCreate } from '@intacct/intacct-sdk/dist/Functions/AccountsReceivable';
import { connectWithSage } from '../config/sageConfiguration';
import { CustomerRequest } from '../models/customer.model';
import { getSkipRecordCount } from '../utils/utils';
import { SelectBuilder } from '@intacct/intacct-sdk/dist/Functions/Common/NewQuery/QuerySelect';
import { Query } from '@intacct/intacct-sdk/dist/Functions/Common/NewQuery';
import { customerFields } from '../utils/customer-field-mapping';
import { Filter } from '@intacct/intacct-sdk/dist/Functions/Common/NewQuery/QueryFilter';

class CustomerRepository {

    async saveCustomer(data: CustomerRequest, companyId: string, userId: string) {

        const client = await connectWithSage(companyId, userId);

        let customerSaveQuery = new CustomerCreate();

        if (data.customerId) {
            customerSaveQuery = new CustomerUpdate();
            customerSaveQuery.customerId = data.customerId;
        }

        customerSaveQuery.customerName = data.firstName + ' ' + data.lastName;
        customerSaveQuery.oneTime = data.oneTime;
        customerSaveQuery.active = true;
        customerSaveQuery.firstName = data.firstName;
        customerSaveQuery.lastName = data.lastName;
        customerSaveQuery.middleName = data.middleName;
        customerSaveQuery.prefix = data.prefix;
        customerSaveQuery.companyName = data.companyName;
        customerSaveQuery.printAs = data.printAs;
        customerSaveQuery.primaryPhoneNo = data.primaryPhoneNo;
        customerSaveQuery.secondaryPhoneNo = data.secondaryPhoneNo;
        customerSaveQuery.cellularPhoneNo = data.cellularPhoneNo;
        customerSaveQuery.pagerNo = data.pagerNo;
        customerSaveQuery.faxNo = data.faxNo;
        customerSaveQuery.primaryEmailAddress = data.primaryEmailAddress;
        customerSaveQuery.secondaryEmailAddress = data.secondaryEmailAddress;
        customerSaveQuery.primaryUrl = data.primaryUrl;
        customerSaveQuery.secondaryUrl = data.secondaryUrl;
        customerSaveQuery.addressLine1 = data.addressLine1;
        customerSaveQuery.addressLine2 = data.addressLine2;
        customerSaveQuery.city = data.city;
        customerSaveQuery.country = data.country;
        customerSaveQuery.zipPostalCode = data.zipPostalCode;
        customerSaveQuery.stateProvince = data.stateProvince;
        customerSaveQuery.isoCountryCode = data.isoCountryCode;
        customerSaveQuery.excludedFromContactList = data.excludedFromContactList;
        customerSaveQuery.customerTypeId = data.customerTypeId;
        customerSaveQuery.customerTypeId = data.customerTypeId;
        customerSaveQuery.salesRepEmployeeId = data.salesRepEmployeeId;
        customerSaveQuery.parentCustomerId = data.parentCustomerId;
        customerSaveQuery.glGroupName = data.glGroupName;
        customerSaveQuery.territoryId = data.territoryId;
        customerSaveQuery.attachmentsId = data.attachmentsId;
        customerSaveQuery.paymentTerm = data.paymentTerm;
        customerSaveQuery.offsetArGlAccountNo = data.offsetArGlAccountNo;
        customerSaveQuery.defaultRevenueGlAccountNo = data.defaultRevenueGlAccountNo;
        customerSaveQuery.shippingMethod = data.shippingMethod;
        customerSaveQuery.resaleNumber = data.resaleNumber;
        customerSaveQuery.taxable = data.taxable;
        customerSaveQuery.contactTaxGroupName = data.contactTaxGroupName;
        customerSaveQuery.taxId = data.taxId;
        customerSaveQuery.creditLimit = data.creditLimit;
        customerSaveQuery.onHold = data.onHold;
        customerSaveQuery.deliveryMethod = data.deliveryMethod;
        customerSaveQuery.defaultInvoiceMessage = data.defaultInvoiceMessage;
        customerSaveQuery.comments = data.comments;
        customerSaveQuery.defaultCurrency = data.defaultCurrency;
        customerSaveQuery.printOptionArInvoiceTemplateName = data.printOptionArInvoiceTemplateName
        customerSaveQuery.printOptionOeQuoteTemplateName = data.printOptionOeQuoteTemplateName
        customerSaveQuery.printOptionOeOrderTemplateName = data.printOptionOeOrderTemplateName
        customerSaveQuery.printOptionOeListTemplateName = data.printOptionOeListTemplateName
        customerSaveQuery.printOptionOeInvoiceTemplateName = data.printOptionOeInvoiceTemplateName
        customerSaveQuery.printOptionOeAdjustmentTemplateName = data.printOptionOeAdjustmentTemplateName
        customerSaveQuery.printOptionOeOtherTemplateName = data.printOptionOeOtherTemplateName
        customerSaveQuery.primaryContactName = data.primaryContactName
        customerSaveQuery.billToContactName = data.billToContactName
        customerSaveQuery.shipToContactName = data.shipToContactName
        customerSaveQuery.restrictionType = data.restrictionType
        customerSaveQuery.restrictedLocations = data.restrictedLocations
        customerSaveQuery.restrictedDepartments = data.restrictedDepartments

        const response = await client.execute(customerSaveQuery);
        const result = response.getResult();

        return result;
    }

    async deleteCustomer(customerId: string, companyId: string, userId: string) {
        const client = await connectWithSage(companyId, userId);

        const deleteQuery = new CustomerDelete();
        deleteQuery.customerId = customerId;

        const response = await client.execute(deleteQuery);
        const result = response.getResult();

        return result;
    }

    async getCustomerList(queryParameters: any, companyId: string, userId: string) {

        const { pageNo = 1, pageSize = 10 } = queryParameters;


        const skip = getSkipRecordCount(Number(pageNo), Number(pageSize));

        const client = await connectWithSage(companyId, userId);

        let selectBuilder = new SelectBuilder();
        selectBuilder.addFields([
            customerFields.recordNo,
            customerFields.customerId,
            customerFields.customerName,
            customerFields.lastName,
            customerFields.firstName,
            customerFields.primaryEmail,
            customerFields.secondaryEmail
        ]);
        const selects = selectBuilder.selects;

        let query = new Query();
        query.selectFields = selects;
        query.fromObject = "CUSTOMER";
        query.caseInsensitive = true;
        query.pageSize = Number(pageSize);
        query.offset = Number(skip);

        const response = await client.execute(query);
        const result = response.getResult();

        return result;
    }

    async getCustomerById(customerId: string, companyId: string, userId: string) {

        const client = await connectWithSage(companyId, userId);

        const filter = new Filter(customerFields.customerId);
        filter.equalTo(customerId);

        const selectBuilder = new SelectBuilder();
        selectBuilder.addFields([
            customerFields.recordNo,
            customerFields.customerId,
            customerFields.customerName,
            customerFields.lastName,
            customerFields.firstName,
            customerFields.primaryEmail,
            customerFields.secondaryEmail
        ]);
        const selects = selectBuilder.selects;

        let query = new Query();
        query.selectFields = selects;
        query.fromObject = "CUSTOMER";
        query.filter = filter;
        query.caseInsensitive = true;
        query.pageSize = 1;

        const response = await client.execute(query);
        const result = response.getResult();

        return result;

    }

}

export default new CustomerRepository();