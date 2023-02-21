# Auth

## Install next-auth

```bash
pnpm i next-auth
```

```ts
// pages/api/auth/[...nextauth].ts
import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: AuthOptions = {}

export default NextAuth(authOptions)
```

Create the `[...nextauth].ts` file under `api/auth`

Validate it's working by going to:
<http://localhost:3000/api/auth/signin>

## Implement the JWT Lookup

```ts
export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      // ...
      async authorize(credentials, _req) {
        console.log('authorize is run!');
        console.log(JSON.stringify({ credentials }));

        const USER_API = 'http://localhost:9001/auth/login';

        const res = await fetch(USER_API, {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { 'Content-Type': 'application/json' },
        });
        try {
          const user = await res.json();
          console.log(user);

          //  // If no error and we have user data, return it
          if (res.ok && user) {
            return user;
          }
          return null;
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
    }),
```

## Secure a page

```tsx
// in _app.tsx
<SessionProvider session={session}>
</SessionProvider>
```

## Add custom provider
