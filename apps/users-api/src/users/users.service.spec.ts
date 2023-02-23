import { PrismaClientFakeConfig, UsersService } from './users.service';

describe('UsersServces', () => {
  const seedUsers: PrismaClientFakeConfig = {
    users: [
      {
        id: 1,
        email: 'email',
        password: 'password',
      },
    ],
  };
  const service = UsersService.createFake(seedUsers);
  it('returns all users', async () => {
    const users = await service.getUsers();
    expect(users).toHaveLength(1);
  });

  it('returns user without password', async () => {
    const user = await service.findOne('email');
    expect((user as any).password).toBeUndefined();
  });
});
