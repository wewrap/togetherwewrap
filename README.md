WeWrap

Dev Notes

- Whenever you update the .env, make sure you add new keys to the .sample-env
- When pulling to main run npm i, check if there are any .env vars that need to be added, and run migrations.

Prisma Note:
- Making a 'Date' model will create unexpected issues for the prisma client
