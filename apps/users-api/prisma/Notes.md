# Prisma

Need to run the db.

```sh
docker-compose -f prisma/docker-compose.yml up
```

Adminer: <http://localhost:8080>

Seed with prisma.

```sh
npx prisma db seed
```

Which looks in your `package.json` for a script to run.

## References

- <https://hub.docker.com/_/postgres/>
- <https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/using-prisma-migrate-typescript-postgres>
