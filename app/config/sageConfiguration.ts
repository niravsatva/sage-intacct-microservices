import * as IA from '@intacct/intacct-sdk';
import { AuthInterface } from '../models/authInterface';
import authRepository from '../repositories/authRepository';
import { ResponseErrors } from '../models/error-messages.model';

export async function getApiSession(credentials: AuthInterface) {
    let clientConfig = new IA.ClientConfig();
    clientConfig.companyId = credentials.companyId;
    clientConfig.senderId = credentials.senderId;
    clientConfig.senderPassword = credentials.senderPassword;
    clientConfig.userId = credentials.userId;
    clientConfig.userPassword = credentials.userPassword;

    let sessionConfig = await IA.SessionProvider.factory(clientConfig);

    return sessionConfig;
}

export async function connectWithSage(companyId: string, userId: string) {
    const credentials = await authRepository.checkExistingUser(companyId, userId);

    
    if (credentials) {
        credentials.senderPassword = atob(credentials.senderPassword);
        credentials.userPassword = atob(credentials.userPassword);
        const sessionConfig = await getApiSession(credentials);
        return new IA.OnlineClient(sessionConfig);
    }

    throw new Error(ResponseErrors.INVALID_CREDENTIALS);
};