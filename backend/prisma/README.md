https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/connect-your-database-typescript-postgres

Replace the database connection string in the schema.prisma with your own.

Then uncomment out the rest of the code starting from line 10.

DB Migration: https://www.prisma.io/docs/concepts/components/prisma-migrate/get-started
- *to access the correct .env file use: dotenv -e ../.env
- 1. make sure to install the dotenv dependency: npm install -g dotenv-cli 
- 2. perform DB migration: dotenv -e ../.env npx prisma migrate dev --name init (replace init with relevant title) 



