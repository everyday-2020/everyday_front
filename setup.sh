#!/bin/bash

# install all the updates from package.json
npm -i -g npm-check-updates

ncu -u

npm install

yarn install

# prettier missing issue after yarn install
# https://github.com/rails/webpacker/issues/1212
# install prettier manually

npm install -g prettier

# husky: runs prettier on pre-commit
yarn add pretty-quick husky --dev