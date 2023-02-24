# Nullable Infrastructure Tests

> How to write unit tests without mocks or spies or any of that terrible stuff.

This is also about "social" tests or "deep" tests as some have said.

Step 1: Wrap your 3rd party or Infrastructure libs.

With Prisma we had to create a class in order to make it a `Provider` so that NestJs could inject it, thus making our Fake code cleaner.

Step 2: Create a fake (Nullable) class in your primary class (whatever level makes sense)

Step 3: In your test, use the fake instead of the real thing.

## Testing Controllers

User controller has 1 key requirement, to filter down to only id, email, username.

```ts
return (await this.usersService.getUsers()).map((el) => {
  return {
    id: el.id,
    email: el.email,
    username: el.username,
  };
});
```

Now, we could mock the whole way down the stack:

```ts
  const args = [];
  const fakeUserService = UsersService.createFake({ users: args });
  const usersController = new UsersController(fakeUserService);
```

But this feels like an integration test :thinking:
