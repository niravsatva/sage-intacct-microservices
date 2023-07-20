import { getApiSession } from '../config/sageConfiguration';
import { AuthInterface } from '../models/authInterface';
import {authRepository} from '../repositories';
import { signToken } from '../utils/jwt-util';

class AuthServices {

    async validateCredentials(data: AuthInterface) {

        const user = await authRepository.checkExistingUser(data.companyId, data.userId);

        if(!user) {
            await authRepository.createUser(data);
        }

        const session = await getApiSession(data);

        if(session.sessionId) {

            const token = signToken({ companyId: data.companyId, userId: data.userId });

            return { success: true, sessionId: session.sessionId, token }
        }

        return { success: false };
    }

}

export default new AuthServices();
