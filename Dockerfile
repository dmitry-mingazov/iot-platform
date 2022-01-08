FROM node:14-alpine

WORKDIR /app

COPY package*.json /app/
RUN npm install

ENV PATH /app/node_modules/.bin:$PATH

COPY ./ /app/

CMD ["npm", "start"]
