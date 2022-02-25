FROM node:16.10

WORKDIR /backend
COPY package.json .
RUN npm install
COPY . .
CMD npm start
