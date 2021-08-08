import seed from './test.seed.json';
import prisma from '../lib/prisma';
import request from 'supertest';
import app from '../app';

describe('Auth e2e tests', () => {
    jest.setTimeout(45000);
    const server = request.agent(app);

    beforeAll(async () => {
        await prisma.appUser.createMany({
            data: seed.appUser,
            skipDuplicates: true,
        });
    });

    describe('#POST /api/auth/login', () => {
        it('should give a validation error when no body is provided', async () => {
            const result = await server.post('/api/auth/login');
            expect(result.status).toBe(400);
            expect(result.body.name).toEqual('ValidationError');
            expect(result.body.details.length).toBe(2);
        });

        it('should login on correct input', async () => {
            const result = await server.post('/api/auth/login').send({
                email: 'user1@mail.com',
                password: 'password',
            });
            expect(result.header['set-cookie'][0]).toContain('pos_sid');
            expect(result.status).toBe(200);
        });
    });

    afterAll(async () => {
        await prisma.appUser.deleteMany();
    });
});
