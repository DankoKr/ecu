# ECU Platform

## Source code

- API folder containing the Express server code
- ecu-web containing the React web app

## Before running the code make sure you have a ".env" file in the API folder:

- PORT=3001
- PGHOST=''
- PGDATABASE=''
- PGUSER=''
- PGPASSWORD=''
- JWT_SECRET=''
- JWT_EXPIRATION='15m'
- JWT_REFRESH_EXPIRATION='50000'

## Available Scripts

- npm install - Installs all required modules/dependencies
- npx sequelize-cli db:migrate - To run all the available db migrations (must be in the API directory)
- node index.js - Starts the Express server (must be in the API directory)
- npm run dev - Starts the development server for the React web app
- npm run build - Builds he production-ready code for the React app
- npx sequelize-cli model:generate --name MODEL_NAME --attributes VARIABLE_NAME:VARIABLE_TYPE, ... - create a new model (must be in API directory)
- npx sequelize-cli migration:generate --name MIGRATION_NAME - to create a new migration
