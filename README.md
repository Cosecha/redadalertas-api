# redadalertas-api
A public API for the web app, and mobile apps to consume.

## Welcome

If you are reading this, thanks for stopping by. You may be familiar with the [Redadalertas](http://github.com/cosecha/redadalertas) project.

This project is part of that. This repo will house the code to make the public facing API.

## API Documentation

[https://cosecha.github.io/redadalertas-api/](https://cosecha.github.io/redadalertas-api/)

## Dependencies

Make sure you have the following installed on your computer

1. Node.js
1. Yarn
1. Git
1. Mongo

## Development Setup

1. Clone the repository.
1. Install node modules, we recommend using Yarn. > yarn in the 'src' directory
1. Setup the environment variables. > cp src/.env.example src/.env
1. Run mongodb service. '> brew services start mongodb'
1. Update the mongodb database. '> npm run bootstrap' in the 'src' directory

## Scripts

* `yarn start`: starts the server (also `npm start`)
* `yarn test`: performs testing (also `npm test`)
* `yarn run lint`: runs the linter (also `npm run lint`)
* `yarn run bootstrap`: populates your local mongo db with sample data (also `npm run bootstrap`)
