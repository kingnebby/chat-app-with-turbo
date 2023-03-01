# Tests without Mocks

> How to write unit tests without mocks or spies or any of that terrible stuff.

Early in my career I was fiend for unit tests. I thought unit tests triple-equaled quality.
Then, after witnessing first hand the spagetti-code of UnitTest mocking most projects do in order to have good coverage I swung back the other way and said, "no unit tests! only integration tests".

Well, here, I'd like to offer a balanced approach: Deep Unit Testing with no Mocks.

## Required

In order to accomplish this, we're going to be covering a few concepts along the way. I'll try to stop and explain them as we get there.

- Dependency Injection
- Nullable Infrastructure
- Social (deep) Unit Tests

## What this is Not

This is not a treatise on when to use E2E tests or what level of coverage you should have for perfect quality.

This is not a gold standard for NestJs or any of the other technologies under test. I am focused on the practice of writing tests.

This is simply a plea to stop mocking and if you are going to write unit tests, make them as valuable and clean as possible.

## Acknowledgements

- Yegor - Elegant Objects
- James Shore - Youtube vids
- Pragmatic Programmer??

## Tradeoffs

Cons

- More code
- Low-Fi Fakes

Pros

- No mocking internals
- No duplicate mocks, maximize reusability

## Fakes instead of Mocks

###

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
