FROM node:16 as build-stage

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY .env .env

EXPOSE 8080

CMD ["npm", "run", "dev"]
