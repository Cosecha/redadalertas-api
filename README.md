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
2. Docker (or the Docker for Mac app)
1. Git
1. Mongo
1. Yarn
1. Xcode Command Line Tools: `xcode-select --install` (required to properly install the bcrypt package)

## Deployment Setup

1. Clone the repository
2. In /, copy over the environment variables: `cp src/.env.example src/.env`
3. Figure out what your DB_CONNECTION_STRING_DOCKER should be in src/.env and modify it if necessary (NOTE: Docker for Mac users can use `DB_CONNECTION_STRING_DOCKER=mongodb://docker.for.mac.localhost:27017/redadalertas`)
4. If you're using Docker for Mac, make sure the app is running
5. Make sure your MongoDB is up to date (`brew upgrade mongodb-community`; you may have to clear /data/db)
6. Run MongoDB service: `brew services start mongodb-community`
7. Open a terminal for MongoDB: `mongod`
8. Install Node modules specified by package.json in the /src directory: `cd src`, then `yarn install`
9. Create local Mongo database with test data: `yarn run bootstrap` in the /src directory
10. Set up Docker: `docker build .` in the / directory (should end with "Successfully built [image ID]")
11. Run Docker container from built image and forward traffic from localhost: `docker run -p 127.0.0.1:8080:8080 -it [image id]`
12. You should now be able to receive requests from localhost:8080/api
13. To shut down server: `Ctrl + c` in server terminal (available since you used -it flag on docker run), or `docker stop [container ID]` (run `docker ps` to get list of active container IDs)
14. To shut down database cleanly: `brew services stop mongodb-community`
15. To shut down mongod cleanly: `Ctrl + c` in mongod terminal, or open the command interface: `mongo` --> `use admin` --> `db.shutdownServer()` --> `exit`

## Development Setup

You can run direct Yarn commands whenever you make changes.

Instead of using Docker in steps 10 and 11 above:

10. `yarn run build`: compiles the app into /build
11. `yarn start`: starts the server (`Ctrl + c` still stops it)

## Scripts

We  use [Yarn](https://yarnpkg.com/en/) instead of NPM commands in the /src directory.

* `yarn install`: installs Node modules
* `yarn run build`: compiles the app into /build
* `yarn start`: starts the server
* `yarn test`: performs testing
* `yarn run lint`: runs the linter
* `yarn run bootstrap`: populates your local mongo db with sample data (warning: this will reset your database)
