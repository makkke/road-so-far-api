# Road So Far API

API service for Road so Far.

## Setup

### Configuration

Rename `.env.default` to `.env` and replace with real values.

### Install

Install project dependencies:
```
yarn install
```

Install DynamoDB local and run in as a separate process:
```
yarn run db:install
yarn run db:start
```

Start project in development mode:
```
yarn start
```

### Testing
```
yarn run test:lint # linting tests
yarn run test:unit # unit tests
```

## Deploy

Deploy to AWS Lambda:
```
yarn run deploy
```
