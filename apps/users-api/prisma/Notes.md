# Prisma

Need to run the db.

```sh
# from the root dir
docker-compose up
```

Adminer: <http://localhost:8080>

Seed with prisma.

```sh
npx prisma migrate dev --name init
```

Which looks in your `package.json` for the seed script to run.

## Generated Types

Using the library: <https://github.com/kimjbstar/prisma-class-generator> we can generate types under `src/_gen` which can be used by `@nestjs/swagger` and our local code.

We can turn this off with the option `useSwagger = false` in the prisma `generator` definition, but I'll leave it on for now.

Note: As of this writing, I'm not recommending this approach because this ties your API to your data model, which is not generally what you want to do. You should rather make use of DTO objects once data comes out of your db which is exactly what prisma gives you.

## References

- <https://hub.docker.com/_/postgres/>
- <https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/using-prisma-migrate-typescript-postgres>
