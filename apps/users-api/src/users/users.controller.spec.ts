import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  // Fake the real services deps, in this way, we're
  // 1 level deep.
  const userServiceConfig = {
    users: [
      {
        email: 'email',
        id: 1,
        username: 'username',
        password: 'password',
        usersRoles: [],
      },
    ],
  };
  const usersService = UsersService.createFake(userServiceConfig);

  // use the real service under test
  const usersController = new UsersController(usersService);

  it('returns a subset of users fields', async () => {
    const users = await usersController.findAll();
    expect(users).toHaveLength(1);
    // TODO: use zod or something to actually check structure.
    expect(Object.keys(users[0]).sort()).toEqual(
      ['email', 'id', 'username'].sort(),
    );
  });
});
