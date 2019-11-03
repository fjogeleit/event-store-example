# FJ-EventStore Example

## Description

A Basic example for the [FJ-EventStore](https://github.com/fjogeleit/event-store) integrated in the Framework [Nest](https://github.com/nestjs/nest)

## Requirements
- NodeJS >= 12
- Docker

## Installation

```bash
$ docker-compose up -d
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

## Implemented APIs

Show list of existing Todo's
```
[GET] http://localhost:3000/todo/list
```
Create a new Todo
```
[POST] http://localhost:3000/todo/add

json-body: {
    "todoId": "uuid",
    "task": "string",
    "description": "string",
    "date": "Y-m-d H:i:s",
}
```
Complete a existing Todo
```
[POST] http://localhost:3000/todo/complete

json-body: {
    "todoId": "uuid"
}
```
Revert a Task Completion
```
[POST] http://localhost:3000/todo/revert-complition

json-body: {
    "todoId": "uuid"
}
```
