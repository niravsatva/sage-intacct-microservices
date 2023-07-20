import { prisma } from '../config/db';
import { AuthInterface } from '../models/authInterface';

class AuthRepository {
    async checkExistingUser(companyId: string, userId: string) {
        const user = await prisma.sageUSer.findFirst({
            where: {
                userId,
                companyId
            }
        })

        return user;
    }

    async createUser(data: AuthInterface) {
        data.senderPassword = btoa(data.senderPassword);
        data.userPassword = btoa(data.userPassword);
        const user = await prisma.sageUSer.create({
            data
        });

        return user;
    }
}

export default new AuthRepository();
