FROM node:10.15.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production
# If you are building your code for production
# RUN npm install --only=production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]