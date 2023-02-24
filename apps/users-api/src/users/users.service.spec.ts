import { UserModel } from './user.model';
import { UserModelFakeConfig, UsersService } from './users.service';

describe('UsersServces', () => {
  const users: UserModelFakeConfig = [
    {
      id: 1,
      email: 'email',
      password: 'password',
    },
  ];
  const userModel = UserModel.createFake(users);
  const service = new UsersService(userModel);

  it('returns all users', async () => {
    const users = await service.getUsers();
    expect(users).toHaveLength(1);
  });

  it('returns user without password', async () => {
    const user = await service.findOne('email');
    expect(user).not.toHaveProperty('password');
  });
});
