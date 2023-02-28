import { Injectable } from '@nestjs/common';
import { hash, compare as _compare } from 'bcrypt';

@Injectable()
export class SaltService {
  static createFake() {
    return new FakeSaltService();
  }

  async hashPassword(password: string) {
    const saltRounds = 10;
    const hashedPassword = await hash(password, saltRounds);
    return hashedPassword;
  }

  async compare(password: string, hashString: string) {
    return await _compare(password, hashString);
  }
}

/**
 * Provide simple logic to default to different kinds of behavior
 * when you can. Otherwise use some easy defaults
 *
 * I would still content that this service is simple enough that you
 * probably don't need to create a fake for it.
 */
class FakeSaltService implements SaltService {
  /**
   * Returns the same string that is passed in.
   */
  async hashPassword(password: string) {
    return password;
  }

  /**
   * Tests equality of password and hashString
   */
  async compare(password: string, hashString: string) {
    if (password === hashString) return true;
    return false;
  }
}
