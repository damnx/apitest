FROM node:8.16.0-alpine as builder
RUN mkdir /app
WORKDIR /app

# RUN npm install -g nodemon
# CMD nodemon index
