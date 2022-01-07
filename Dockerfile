FROM node:lts-buster-slim

WORKDIR /app

COPY package*.json /app/
RUN npm install

ENV PATH /app/node_modules/.bin:$PATH

COPY ./ /app/

CMD ["npm", "start"]
