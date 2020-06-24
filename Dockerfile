FROM node:12

WORKDIR /opt/app

COPY . /opt/app

VOLUME "/opt/app/build"

RUN yarn

CMD yarn build
