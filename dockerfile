FROM node:21-alpine3.19

WORKDIR /user/src/app

COPY package*.json ./

RUN yarn

COPY . .

EXPOSE 3000