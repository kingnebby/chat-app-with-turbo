import { UsersController } from './users.controller';

describe('UsersController', () => {
  const usersController = UsersController.createFake();

  it('returns a subset of users fields', async () => {
    const users = await usersController.findAll();
    expect(users).toHaveLength(1);
    // TODO: use zod or something to actually check structure.
    expect(Object.keys(users[0]).sort()).toEqual(
      ['email', 'id', 'username'].sort(),
    );
  });
});
