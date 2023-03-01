import { JwtService } from '@nestjs/jwt';
import { expectToThrowWithMatchingError } from '../test/util';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { SaltService } from './salt.service';

/**
 * I wouldn't normally write this test. I would let simple guards
 * like this one be covered by e2e tests.
 * TODO: what would supertest looks like?
 */
describe('LocalStrategy:DeepTest', () => {
  it('should return user when username and password are valid', async () => {
    const authService = new AuthService(
      UsersService.createFake(),
      new JwtService(),
      SaltService.createFake(),
    );
    const localStrategy = new LocalStrategy(authService);
    const user = await localStrategy.validate('email', 'password');
    expect(user).toHaveProperty('username');
  });

  it('should throw error when not valid', async () => {
    const localStrategy = new LocalStrategy(
      AuthService.createFake({ failValidate: true }),
    );
    await expectToThrowWithMatchingError(
      localStrategy.validate.bind(localStrategy, 'username', 'password'),
      'Unauthorized Exception',
    );
  });
});
