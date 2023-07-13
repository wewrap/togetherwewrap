#!/bin/bash

cd frontend
npm run build
cd ../backend
npm run build
rm dist/build/*
cp build/* dist/build
npm run deploy

# copy the build/static to dist/  
