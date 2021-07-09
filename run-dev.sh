#!/bin//bash

bash ./src/backend/run.sh &
cd ./src/frontend 
npx next dev
