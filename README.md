# Backend for Toddle App

This repo contains the backend for the toddle interview.

API hosted on : [toddle-backend.azurewebsites.net/api](https://toddle-backend.azurewebsites.net/api).

## Installation

#### 1. Clone this repo

```
$ git clone https://github.com/Himujjal/toddle-backend your-app-name
$ cd your-app-name
```

#### 2. Install dependencies

```
$ yarn install
```

## Development

### Load the postman.json file

Import the [postman.json](./postman.json) file to Postman to get the API and their documentation

### Start dev server

Starting the dev server also starts MongoDB as a service in a docker container using the compose script at `docker-compose.dev.yml`.

```
# Kill NodeJS process in Windows:
$ taskkill /F /IM node.exe
$ yarn dev
```

Running the above commands results in

- 🌏**API Server** running at `http://localhost:3000/api`
- ⚙️**Swagger UI** at `http://localhost:3000/api/dev/api-docs`

## Packaging and Deployment

#### 1. Run with docker-compose

```
$ docker-compose up
```

#### 2. Run with docker

```
$ docker build -t api-server .
$ docker run -t -i -p 3000:3000 api-server
```

#### 3. Build and run

```
$ npm run build && npm run start
```

---

## Environment

To edit environment variables, create a file with name `.env` and copy the contents from `.env.default` to start with.

| Var Name | Type   | Default       | Description                            |
| -------- | ------ | ------------- | -------------------------------------- |
| NODE_ENV | string | `development` | API runtime environment. eg: `staging` |
| PORT     | number | `3000`        | Port to run the API server on          |

## Logging

The application uses [winston](https://github.com/winstonjs/winston) as the default logger. The configuration file is at `src/logger.ts`.

- All logs are saved in `./logs` directory and at `/logs` in the docker container.
- The `docker-compose` file has a volume attached to container to expose host directory to the container for writing logs.
- Console messages are prettified
- Each line in error log file is a stringified JSON.
