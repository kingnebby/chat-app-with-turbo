import { Injectable } from '@nestjs/common';
import { hash, compare as _compare } from 'bcrypt';

@Injectable()
export class SaltService {
  // static createFake() {
  //   return new FakeSaltService();
  // }
  async hashPassword(password: string) {
    const saltRounds = 10;
    const hashedPassword = await hash(password, saltRounds);
    return hashedPassword;
  }

  async compare(password: string, hashString: string) {
    return await _compare(password, hashString);
  }
}

//
/**
 * Provide simple logic to default to different kinds of behavior
 * when you can. Otherwise use some easy defaults
 */
// class FakeSaltService implements SaltService {
//   async hashPassword(_password: string) {
//     return 'fakeHashedPassword';
//   }

//   async compare(_password, _hashString) {
//     if (_password === _hashString) return true;
//     return false;
//   }
// }
