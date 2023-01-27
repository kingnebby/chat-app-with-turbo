export class Env {
  jwtSecret: string = process.env.JWT_SECRET_KEY;
}

export default new Env();
