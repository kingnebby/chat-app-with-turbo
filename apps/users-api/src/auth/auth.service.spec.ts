import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { SaltService } from './salt.service';

describe('AuthService', () => {
  const saltService = new SaltService();
  const originalPassword = 'password';
  const email = 'email';
  // Also a class that should just work out of the box.
  const jwtService = new JwtService({ secret: 'secret' });

  const setup = async () => {
    // Create a valid password (it's util functions after all)
    const generatedPassword = await saltService.hashPassword(originalPassword);
    const userService = UsersService.createFake({
      users: [{ email: email, password: generatedPassword }],
    });

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
    try {
      await authService.validateUser(email, 'bad password');
      throw new Error(`should throw error: ${errorMessage}`);
    } catch (error) {
      expect(error.message).toEqual(errorMessage);
    }
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
