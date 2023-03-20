#!/bin/bash

cd backend
npm install
npx prisma migrate dev migration
cd ../frontend
npm install
