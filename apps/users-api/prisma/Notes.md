# Prisma

Need to run the db.

```sh
docker-compose -f prisma/docker-compose.yml up
```

Adminer: <http://localhost:8080>

Seed with prisma.

```sh
npx prisma migrate dev --name init
npx prisma db seed
```

Which looks in your `package.json` for a script to run.

## Generated Types

Using the library: <https://github.com/kimjbstar/prisma-class-generator> we can generate types under `src/_gen` which can be used by `@nestjs/swagger` and our local code.

We can turn this off with the option `useSwagger = false` in the prisma `generator` definition, but I'll leave it on for now.

## References

- <https://hub.docker.com/_/postgres/>
- <https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/using-prisma-migrate-typescript-postgres>
