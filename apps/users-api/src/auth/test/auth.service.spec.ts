// auth.services.spec.ts

jest.mock('@nestjs/jwt');
jest.mock('../../users/users.service');
jest.mock('../salt-password');
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../users/users.service';
import { compare } from '../salt-password';

// class under test
import { AuthService } from '../auth.service';

describe('AuthService::UnitTest::Mocks', () => {
  it('should return valid user', async () => {
    // mock your classes
    const mockedUsersService = jest.mocked(new UsersService());
    const mockedJwtService = jest.mocked(new JwtService());
    const mockedCompare = jest.mocked(compare);

    // internals of the function are exposed and realistic values are isolated.
    mockedUsersService.getPassword.mockResolvedValue('password');
    mockedCompare.mockResolvedValue(true);
    mockedUsersService.findOne.mockResolvedValue({
      email: 'email',
      id: 1,
      username: 'username',
      usersRoles: [],
    });

    const authService = new AuthService(mockedUsersService, mockedJwtService);
    const user = await authService.validateUser('email', 'password');
    expect(user).toHaveProperty('email');
    expect(user).not.toHaveProperty('password');
  });
});
