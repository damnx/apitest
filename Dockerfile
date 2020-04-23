# FROM node:10-alpine

# RUN mkdir -p /src

# COPY package.json src/package.json

# WORKDIR /src

# RUN npm install --only=production

# RUN npm i -g @adonisjs/cli

# COPY . /src

# CMD npm start

FROM node:10-alpine
RUN mkdir /app
WORKDIR /app
COPY . /app

RUN npm install

RUN npm i -g @adonisjs/cli

COPY . .

CMD [ "npm", "start" ]
# CMD nodemon index