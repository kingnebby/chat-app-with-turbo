import { decode, JwtPayload } from 'jsonwebtoken';
import NextAuth, { AuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export type UserLoginResponse = {
  access_token: string;
};

export type UserJWT = {
  email: string;
  username: string;
  sub: number;
  roles: string[];
  // others
} & JwtPayload;

export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      credentials: {
        username: {},
        password: {},
      },
      async authorize(credentials, _req) {
        console.log('authorize is run!');
        console.log(JSON.stringify({ credentials }));

        const USER_API = 'http://localhost:9001/auth/login';

        const res = await fetch(USER_API, {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { 'Content-Type': 'application/json' },
        });

        if (!res?.ok) {
          throw new Error('not authorized');
        }

        try {
          const responseBody: UserLoginResponse =
            await res.json();
          const decodedJwt: UserJWT = decode(
            responseBody.access_token,
          ) as UserJWT;

          const retUser: User = {
            id: decodedJwt.sub,
            email: decodedJwt.email,
            name: decodedJwt.username,
          };

          // @ts-ignore
          return {
            ...retUser,
            token: responseBody.access_token,
          };
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      // @ts-ignore
      if (user?.token) {
        // @ts-ignore
        token.accessToken = user.token;
      }
      return token;
      // return { ...token, userToken: user.token };
    },
    session({ session, token, user }) {
      console.log('session');
      console.log(session, token, user);

      // @ts-ignore
      session.accessToken = token?.accessToken;

      return session;
    },
  },
};
export default NextAuth(authOptions);
