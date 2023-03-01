import { User } from '.prisma/client';
import { UsersService } from '../users/users.service';
import { SaltService } from './salt.service';
import { expectToThrowWithMatchingError } from '../test/util';
import { AuthService } from './auth.service';
import { JwtService } from '../lib/jwt/jwt.service';
import { UserModel } from '../users/user.model';

/*
 * Example of traditional unit tests, but with no mocks, only fakes.
 * This already looks nearly just as clean as regular mocked tests.
 * Yes, we did have to write Fakes for every class.
 * However, those fakes are reusable, where as mocks are not.
 */
describe('AuthService::UnitTest', () => {
  // This is a simple mock-like example where we only test the method
  // under test.
  const setup = (users?: Partial<User>[]) => {
    const authService = new AuthService(
      UsersService.createFake({ users }),
      new JwtService({ secret: 'secret' }),
      SaltService.createFake(),
    );
    return { authService };
  };

  it('should return valid user', async () => {
    const { authService } = setup();
    const user = await authService.validateUser('email', 'password');
    // TODO: validate structure with zod
    expect(user).toHaveProperty('email');
    expect(user).not.toHaveProperty('password');
  });

  /**
   * Here, fail paths are looking pretty easy... just pass in some
   * seed data and the fakes handle the semi-realistic setup.
   */
  it('should throw error when user not found', async () => {
    const { authService } = setup([
      {
        email: 'email',
      },
    ]);

    await expectToThrowWithMatchingError(
      authService.validateUser.bind(authService, 'wrongemail', 'password'),
      'could not find user',
    );
  });

  it('should throw error when passwords do not match', async () => {
    const { authService } = setup([
      {
        email: 'email',
        password: 'password',
      },
    ]);
    await expectToThrowWithMatchingError(
      authService.validateUser.bind(authService, 'email', 'wrongpassword'),
      'unable to validate user',
    );
  });

  it('should return an access token', async () => {
    const { authService } = setup();
    const { access_token } = await authService.login({
      email: 'email',
      id: 1,
      roles: [],
      username: 'username',
    });
    const jwtService = new JwtService();
    expect(jwtService.decode(access_token)).toBeDefined();
    expect(jwtService.decode(access_token)).toHaveProperty('sub');
    // TODO: test structure with zod.
  });
});

/**
 * These are super great for many reasons:
 * - They are "social" that is they lightly test the interactions between multiple tests. More coverage.
 * - They leverage the fakes where they want to be optionally deep.
 * - They do not require infrastructure or mocks, so they run FAST.
 * - It's really not too complex, the number of code lines compared to power is a decent tradeoff.
 */
describe('AuthService::DeepTest', () => {
  const saltService = new SaltService();
  const originalPassword = 'password';
  const email = 'email';
  // Also a class that should just work out of the box.
  const jwtService = new JwtService({ secret: 'secret' });

  const setup = async () => {
    // Create a valid password (it's util functions after all)
    const generatedPassword = await saltService.hashPassword(originalPassword);
    const config = [{ email: email, password: generatedPassword }];
    const userModel = UserModel.createFake(config);
    const userService = new UsersService(userModel);

    // Service Under Test
    const authService = new AuthService(userService, jwtService, saltService);
    return { authService };
  };

  it('returns user when password is valid', async () => {
    // Test
    const { authService } = await setup();
    const user = await authService.validateUser(email, originalPassword);
    expect(user.email).toEqual(email);
  });

  it('throws an error when password is wrong', async () => {
    const { authService } = await setup();
    const errorMessage = 'unable to validate user';
    await expectToThrowWithMatchingError(
      authService.validateUser.bind(authService, email, 'bad password'),
      errorMessage,
    );
  });

  it('should issue a JWT token for a user', async () => {
    const { authService } = await setup();
    const { access_token } = await authService.login({
      email: 'email',
      id: 1,
      roles: ['ADMIN', 'USER'],
      username: 'username',
    });
    const token = jwtService.decode(access_token);
    expect(token).toHaveProperty('email');
  });
});
