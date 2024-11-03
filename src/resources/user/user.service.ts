import token from '@/utils/token';
import { Prisma, PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

class UserService {
    private prisma = new PrismaClient();

    public async register(
        name: string,
        email: string,
        password: string
    ): Promise<string | Error> {
        try {
            const userData: Prisma.UserCreateInput = {
                // Use Prisma.UserCreateInput here
                name, // Ensure you are including the name if it's in the model
                email,
                password,
                role: 'USER', // Use the enum value correctly
            };

            const user = await this.prisma.user.create({
                data: userData,
            });

            const accessToken = token.createToken(user);
            return accessToken;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    public async login(
        email: string,
        password: string
    ): Promise<string | Error> {
        try {
            const user = await this.prisma.user.findUnique({
                where: { email },
            });
            if (!user) {
                throw new Error('User not found');
            }

            const isPasswordValid = await this.isValidPassword(
                user.password,
                password
            );
            if (!isPasswordValid) {
                throw new Error('Invalid password');
            }

            const accessToken = token.createToken(user);
            return accessToken;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    private async isValidPassword(
        hashedPassword: string,
        password: string
    ): Promise<boolean> {
        return await bcrypt.compare(password, hashedPassword);
    }
}

export default UserService;
