FROM node:12

WORKDIR /home/app/website

COPY package.json package.json
COPY src src
COPY static static
COPY webpack.config.js webpack.config.js

RUN npm install
RUN npm run build

ENTRYPOINT [ "node" "__sapper__/build" ]

EXPOSE 3000
