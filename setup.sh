#!/bin/bash

# install all the updates from package.json
npm -i -g npm-check-updates

ncu -u

npm install

yarn install