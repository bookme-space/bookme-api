## Description

Bookme Project MVP

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Running the Database

Start postgres localy on port 5432:

```bash
docker run -d \
  --name bookme.db.local \
  -e POSTGRES_DB=bookme.db.local \
  -e POSTGRES_PASSWORD=root \
  -e POSTGRES_USER=user \
  -p 3080:5432 postgres
```
