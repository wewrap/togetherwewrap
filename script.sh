#!/bin/bash
# To set up script, run this command in root folder: 'chmod +x ./script.sh'
# After setting up, simply execute script in terminal with: './script.sh'

cd backend
npm install
npx prisma migrate dev
cd ../frontend
npm install
