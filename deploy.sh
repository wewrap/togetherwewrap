#!/bin/bash

cd frontend
npm run build
cd ../backend
npm run build
npm run deploy
