FROM node:carbon

WORKDIR /usr/src/app

COPY . .

RUN yarn

EXPOSE 3000

CMD ["yarn", "start"]
