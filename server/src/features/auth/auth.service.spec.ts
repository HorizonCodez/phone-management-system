import authService from './auth.service';
import prisma from '../../lib/prisma';
import bcrypt from 'bcrypt';

// mock prisma client
jest.mock('../../lib/prisma', () => ({
    appUser: {
        findUnique: jest.fn((data) => {
            if (data.where.email === 'validuser@a.cc') {
                return {
                    id: 1,
                    email: 'validemail@a.cc',
                    password: 'encryptedpw',
                    type: 'Customer',
                };
            } else {
                return null;
            }
        }),
    },
}));

//mock bcrypt
jest.mock('bcrypt', () => ({
    compare: jest.fn((a, b) => a === b),
}));

describe('auth service tests', () => {
    describe('login tests', () => {
        it('should request correct user from database', async function () {
            await authService
                .login(
                    { session: {} },
                    { email: 'validuser@a.cc', password: 'a1a2a3a4' }
                )
                .catch((_e) => {});
            expect(prisma.appUser.findUnique).toBeCalledWith({
                where: {
                    email: 'validuser@a.cc',
                },
            });
        });

        it('should throw error if user not found', async function () {
            await expect(
                authService.login(
                    { session: {} },
                    {
                        email: 'invaliduser@a.cc',
                        password: 'a1a2a3a4',
                    }
                )
            ).rejects.toThrow('Invalid email or password');
        });

        it('should throw error if password is invalid', async function () {
            await expect(
                authService.login(
                    { session: {} },
                    {
                        email: 'validuser@a.cc',
                        password: 'a1a2a3a4',
                    }
                )
            ).rejects.toThrow('Invalid email or password');
            expect(bcrypt.compare).toBeCalled();
        });

        it('should be successful if username and password is correct', async function () {
            expect(
                await authService.login(
                    { session: {} },
                    {
                        email: 'validuser@a.cc',
                        password: 'encryptedpw',
                    }
                )
            ).toStrictEqual({
                id: 1,
                type: 'Customer',
            });
        });
    });
    describe('checkExists tests', () => {
        it('should return false on empty email', async function () {
            expect(await authService.checkExists('')).toBeFalsy();
        });
        it('should return false on incorrect email', async function () {
            expect(
                await authService.checkExists('invaliduser@a.cc')
            ).toBeFalsy();
        });
        it('should return true on correct email', async function () {
            expect(
                await authService.checkExists('validuser@a.cc')
            ).toBeTruthy();
        });
    });
});
