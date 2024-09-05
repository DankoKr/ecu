CREATE TABLE "Users" (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  password VARCHAR(255),
  role VARCHAR(255) NOT NULL,
  image BYTEA NULL,
  username VARCHAR(255) NULL,
  country VARCHAR(255) NULL,
  website VARCHAR(255) NULL,
  federation VARCHAR(255) NULL,
  "createdAt" TIMESTAMP NOT NULL,
  "updatedAt" TIMESTAMP NOT NULL
);

CREATE TABLE "authTokens" (
  id SERIAL PRIMARY KEY,
  "user" INTEGER,
  token VARCHAR(255),
  email VARCHAR(255),
  "userRole" VARCHAR(255) NOT NULL,
  "createdAt" TIMESTAMP NOT NULL,
  "updatedAt" TIMESTAMP NOT NULL,
  "expiryDate" TIMESTAMP NOT NULL
);

CREATE TABLE "Files" (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  "mimeType" VARCHAR(255),
  data BYTEA,
  sector VARCHAR(255),
  "createdAt" TIMESTAMP NOT NULL,
  "updatedAt" TIMESTAMP NOT NULL
);
