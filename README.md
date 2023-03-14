## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

### start the docker container

```bash
./start_app.sh
```

### populate db

connect to docker container

```bash
docker exec -it  {container_id}  /bin/sh
```

populate db

```bash
pnpm run start-populate
```
