# Nullable Infrastructure Tests

> How to write unit tests without mocks or spies or any of that terrible stuff.

This is also about "social" tests or "deep" tests as some have said.

Step 1: Wrap your 3rd party or Infrastructure libs.

With Prisma we had to create a class in order to make it a `Provider` so that NestJs could inject it, thus making our Fake code cleaner.

Step 2: Create a fake (Nullable) class in your primary class (whatever level makes sense)

Step 3: In your test, use the fake instead of the real thing.
