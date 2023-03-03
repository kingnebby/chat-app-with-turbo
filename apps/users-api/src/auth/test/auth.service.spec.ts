import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../users/users.service';
import { compare } from '../salt-password';
jest.mock('@nestjs/jwt');
jest.mock('../../users/users.service');
jest.mock('../salt-password');

// class under test
import { AuthService } from '../auth.service';
import { PrismaClientProvider } from '../utils/prisma.service';

describe('AuthService::UnitTest::Mocks', () => {
  it('should return valid user', async () => {
    // mock your classes
    const mockedUsersService = jest.mocked(new UsersService(null));
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

  it('should fail when user is not found', async () => {
    // mock your classes
    const mockedUsersService = jest.mocked(new UsersService(null));
    const mockedJwtService = jest.mocked(new JwtService());
    const mockedCompare = jest.mocked(compare);

    //
    // Simulate a failure
    //
    mockedUsersService.getPassword.mockRejectedValue(
      new Error('could not find user'),
    );
    mockedCompare.mockResolvedValue(true);
    mockedUsersService.findOne.mockResolvedValue({
      email: 'email',
      id: 1,
      username: 'username',
      usersRoles: [],
    });

    const authService = new AuthService(mockedUsersService, mockedJwtService);
    const expectedMessage = 'could not find user';
    try {
      await authService.validateUser('email', 'password');
      throw new Error(`should throw error: ${expectedMessage}`);
    } catch (error) {
      expect(error.message).toEqual(expectedMessage);
    }
  });

  it('should return a login token', async () => {
    const mockedUsersService = jest.mocked(new UsersService(null));
    const mockedJwtService = jest.mocked(new JwtService());

    // setup test
    mockedJwtService.sign.mockReturnValue('somestring');

    const authService = new AuthService(mockedUsersService, mockedJwtService);
    const { access_token } = await authService.login({
      email: 'email',
      id: 1,
      roles: [],
      username: 'username',
    });
    expect(access_token).toBeDefined();
    expect(access_token).toBe('somestring');
  });
});

describe('AuthService::UnitTest::Fakes', () => {
  it('should return valid user', async () => {
    const { UsersService } = jest.requireActual('../../users/users.service');
    const mockedJwtService = jest.mocked(new JwtService());
    const mockedCompare = jest.mocked(compare);

    mockedCompare.mockResolvedValue(true);

    const authService = new AuthService(
      UsersService.createFake(), // new
      mockedJwtService,
    );
    const user = await authService.validateUser('email', 'password');
    expect(user).toHaveProperty('email');
    expect(user).not.toHaveProperty('password');
  });

  it('should fail when user is not found', async () => {
    const { UsersService } = jest.requireActual('../../users/users.service');
    const mockedJwtService = jest.mocked(new JwtService());
    const mockedCompare = jest.mocked(compare);

    mockedCompare.mockResolvedValue(true);

    const authService = new AuthService(
      UsersService.createFake(),
      mockedJwtService,
    );
    const expectedMessage = 'could not find user';
    try {
      await authService.validateUser('wrongemail', 'password');
      throw new Error(`should throw error: ${expectedMessage}`);
    } catch (error) {
      expect(error.message).toEqual(expectedMessage);
    }
  });

  it('should return a login token', async () => {
    const { UsersService } = jest.requireActual('../../users/users.service');
    const { JwtService } = jest.requireActual('../utils/jwt.service');

    const authService = new AuthService(
      UsersService.createFake(),
      JwtService.createFake(),
    );
    const { access_token } = await authService.login({
      email: 'email',
      id: 1,
      roles: [],
      username: 'username',
    });
    expect(access_token).toBeDefined();
    expect(access_token).toBe('jwt-token');
  });
});

describe('AuthService::UnitTest::DeepFakes', () => {
  it('should return a valid user', async () => {
    const { JwtService } = jest.requireActual('../utils/jwt.service');
    const { UsersService } = jest.requireActual('../../users/users.service');

    // Service Under Test
    const prisma = PrismaClientProvider.createFake();
    const authService = new AuthService(
      new UsersService(prisma),
      JwtService.createFake(),
    );
    // Test
    const user = await authService.validateUser('email', 'password');
    expect(user).toHaveProperty('email');
    expect(user).not.toHaveProperty('password');
  });

  it('should fail when user is not found', async () => {
    const { JwtService } = jest.requireActual('../utils/jwt.service');
    const { UsersService } = jest.requireActual('../../users/users.service');

    // Service Under Test
    const prisma = PrismaClientProvider.createFake();
    const authService = new AuthService(
      new UsersService(prisma),
      JwtService.createFake(),
    );
    // Test
    const expectedMessage = 'could not find user';
    try {
      await authService.validateUser('wrongemail', 'password');
      throw new Error(`should throw error: ${expectedMessage}`);
    } catch (error) {
      expect(error.message).toEqual(expectedMessage);
    }
  });
});
