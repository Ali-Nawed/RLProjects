#!/bin/bash

cd ./backend
mkdir logs 2> /dev/null
flask run --port 9012 >> logs/backend_dev.log 2>&1 &