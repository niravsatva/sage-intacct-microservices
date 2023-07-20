import * as jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;

export function signToken(data: any) {
    const token = jwt.sign(data, secret as string, { expiresIn: '12h' });
    return token;
}

export function verifyToken(token: string) {
    const decode = jwt.verify(token, secret as string);
    return decode;
}