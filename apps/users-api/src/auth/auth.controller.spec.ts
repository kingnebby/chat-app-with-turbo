import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserDTO } from './dto/user.dto';

/**
 * Normally I just wouldn't test this it's so simple.
 * I'd let an end to test to test do this if possible.
 */
describe('AuthController', () => {
  it('should login an authenticated user', async () => {
    const authService = AuthService.createFake();
    const authController = new AuthController(authService);

    const request: { user: UserDTO } = {
      user: {
        email: 'email',
        id: 1,
        roles: [],
        username: '',
      },
    };
    const result = await authController.login(request);
    // TODO: use zod to validate the api structure.
    expect(result).toHaveProperty('access_token');
  });
});
