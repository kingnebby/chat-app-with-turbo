import { hash, compare as _compare } from 'bcrypt';
export async function hashPassword(password: string) {
  const saltRounds = 10;
  const hashedPassword = await hash(password, saltRounds);
  return hashedPassword;
}

export async function compare(password: string, hashString: string) {
  return await _compare(password, hashString);
}
