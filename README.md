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
- node index.js - Starts the Express server (must be in the API directory)
- npm run dev - Starts the development server for the React web app
- npm run build - Builds he production-ready code for the React app
