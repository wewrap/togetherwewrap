Prefix all commands to access the correct .env file with: dotenv -e ../.env

Connecting DB: https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/connect-your-database-typescript-postgres
- 1. Replace the database connection string in the .env file with your own.

DB Migration: https://www.prisma.io/docs/concepts/components/prisma-migrate/get-started
- 1. make sure to install the dotenv dependency: npm install -g dotenv-cli 
- 2. perform DB migration: dotenv -e ../.env npx prisma migrate dev --name init (replace init with relevant title) 



