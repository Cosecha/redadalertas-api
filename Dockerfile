FROM node:alpine

ENV NODE_ENV docker

RUN mkdir /app

WORKDIR /app

COPY ./src /app

RUN yarn

RUN yarn run build

EXPOSE 8080

CMD ["yarn", "start"]
