# Road So Far API

API service for Road so Far.

## Setup

### Configuration

Rename `.env.default` to `.env` and replace with real values.
Download a signing certificate from Auth0 and save in root of project as `auth0.cer`.

### Install

Install project dependencies:
```sh
$> yarn install
```

Install DynamoDB local and run in as a separate process:
```sh
$> yarn run db:install
$> yarn run db:start
```

Start project in development mode:
```sh
$> yarn start
```

### Testing
```sh
$> yarn run test:lint # linting tests
$> yarn run test:unit # unit tests
```

## Deploy

Deploy to AWS Lambda for testing:
```sh
$> yarn run deploy
```
