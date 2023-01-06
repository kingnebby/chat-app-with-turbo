import { Profile as _Profile } from './profile';
import { User as _User } from './user';

export namespace PrismaModel {
  export class Profile extends _Profile {}
  export class User extends _User {}

  export const extraModels = [Profile, User];
}
