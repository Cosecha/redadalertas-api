# redadalertas-api
A public API for the web app, and mobile apps to consume.

## Welcome

If you are reading this, thanks for stopping by. You may be familiar with the [Redadalertas](http://github.com/cosecha/redadalertas) project.

This project is part of that. This repo will house the code to make the public facing API.

## API Documentation

[https://cosecha.github.io/redadalertas-api/](https://cosecha.github.io/redadalertas-api/)

## Dependencies

Make sure you have the following installed on your computer

1. Node.js (latest)
2. Docker (Docker for Mac)
1. Git
1. Mongo
1. Xcode Command Line Tools: `xcode-select --install` (required to properly install the bcrypt package)

## Development Setup

1. Clone the repository
1. Setup the environment variables in the / directory: `cp src/.env.example src/.env`
1. Make sure your MongoDB is up to date (`brew upgrade mongodb`; you may have to clear /data/db for 4.0)
1. Run MongoDB service: `brew services start mongodb`
1. Figure out what your DB_CONNECTION_STRING_DOCKER should be in src/.env (Docker for Mac users can use `DB_CONNECTION_STRING_DOCKER=mongodb://docker.for.mac.localhost:27017/redadalertas`)
1. Create local Mongo database with test data: `npm run bootstrap` in the /src directory
1. Make sure the Docker desktop app is running
1. Set up Docker: `docker build .` in the / directory (should end with "Successfully built [image ID]")
1. Run Docker container from built image and forward traffic from localhost: `docker run -p 127.0.0.1:8080:8080 -it [image id]`
1. Should be able to receive calls from localhost:8080/api

1. To shut down server: `Ctrl + c` in server terminal (since you used -it flag on docker run), or `docker stop [container ID]` (run `docker ps` to get list of active container IDs)
1. To shut down database cleanly: `brew services stop mongodb`

## Scripts

* `cd src; npm install`: installs Node modules in /src
* `npm start`: starts the server
* `npm test`: performs testing
* `npm run lint`: runs the linter
* `npm run bootstrap`: populates your local mongo db with sample data
