FROM node:alpine As developemnt

WORKDIR /app

COPY package*.json /app/
COPY yarn.lock /app/

RUN yarn install

COPY . /app/

RUN yarn build


FROM node:alpine As production

ARG NODE_ENV=production

ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package*.json /app/
COPY yarn.lock /app/

RUN yarn install --prod

COPY --from=development /app/dist ./dist

CMD [ "node", "dist/apps/payments/main" ]