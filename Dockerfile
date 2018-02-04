FROM node:carbon

WORKDIR /usr/src/app

COPY . .

RUN npm install -g yarn
RUN yarn

EXPOSE 3000

CMD ["yarn", "start"]
