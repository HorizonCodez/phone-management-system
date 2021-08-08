import { LoginDto } from './dto/login.dto';
import bcrypt from 'bcrypt';
import prisma from '../../lib/prisma';
import { HttpError } from '../../lib/http-error';

async function login(data: LoginDto): Promise<{ id: number; type: string }> {
    // fetch user
    const user = await prisma.appUser.findUnique({
        where: {
            email: data.email,
        },
    });

    // check user and the password
    if (!user || !(await bcrypt.compare(data.password, user.password))) {
        throw new HttpError(400, 'Invalid email or password');
    }
    return {
        id: user.id,
        type: user.type,
    };
}

export default {
    login,
};
