# --- HOW TO USE ---------------
# 1) $ docker build -t raindb-react .
# 2) $ docker run ..... raindb-react

#FROM debian:latest
FROM alpine:3.14

#RUN apt-get update; apt-get -y upgrade; apt-get -y install nodejs npm
RUN apk -U upgrade; apk add nodejs npm python2

RUN npm install -g npm

RUN npm update -g

WORKDIR /app

COPY . .

RUN npm install

#RUN useradd -m -d /app -s /bin/bash -u 63936 nodejs-user
RUN adduser -h /app -s /bin/sh -D -u 63936 nodejs-user

RUN chown -R 63936:1000 /app

USER 63936

CMD ["npm", "start"]
