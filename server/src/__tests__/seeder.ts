import { UserType } from '@prisma/client';

it('should exists', function () {
    expect(true).toBeTruthy();
});

const seed: { appUser: { email: string; password: string; type: UserType }[] } =
    {
        appUser: [
            {
                email: 'user1@mail.com',
                password:
                    '$2b$10$cu7Usg5eu/MRowMUBqVTkec4hkH4.2sqb6qDK7rjHO5X99GupzXEi',
                type: 'Customer',
            },
            {
                email: 'user2@mail.com',
                password:
                    '$2b$10$cu7Usg5eu/MRowMUBqVTkec4hkH4.2sqb6qDK7rjHO5X99GupzXEi',
                type: 'Customer',
            },
            {
                email: 'shop@mail.com',
                password:
                    '$2b$10$cu7Usg5eu/MRowMUBqVTkec4hkH4.2sqb6qDK7rjHO5X99GupzXEi',
                type: 'Shop',
            },
            {
                email: 'shop2@mail.com',
                password:
                    '$2b$10$cu7Usg5eu/MRowMUBqVTkec4hkH4.2sqb6qDK7rjHO5X99GupzXEi',
                type: 'Shop',
            },
            {
                email: 'mod1@mail.com',
                password:
                    '$2b$10$cu7Usg5eu/MRowMUBqVTkec4hkH4.2sqb6qDK7rjHO5X99GupzXEi',
                type: 'Moderator',
            },
            {
                email: 'mod2@mail.com',
                password:
                    '$2b$10$cu7Usg5eu/MRowMUBqVTkec4hkH4.2sqb6qDK7rjHO5X99GupzXEi',
                type: 'Moderator',
            },
        ],
    };

export default seed;
