#!/bin/bash

npm run build
mkdir logs 2> /dev/null
echo Starting flask server...
FLASK_ENV=development flask run --port 9012