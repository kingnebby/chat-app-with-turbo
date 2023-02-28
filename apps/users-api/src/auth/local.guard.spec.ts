/**
 * Todo: see how we can use super test to do api level e2e tests.
 */

import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';

// TODO: refactor, this is not an e2e, just testing if the strategy could be
// tested with the same social test idea as before.
describe('LocalStrategy', () => {
  it('should return user when username and password are valid', async () => {
    const localStrat = new LocalStrategy(AuthService.createFake());
    const user = await localStrat.validate('username', 'password');
    expect(user).toHaveProperty('email');
  });

  it('should return error when not valid', async () => {
    const localStrat = new LocalStrategy(
      AuthService.createFake({ failValidate: true }),
    );
    const user = await localStrat.validate('username', 'password');
    expect(user).toHaveProperty('email');
  });
});
