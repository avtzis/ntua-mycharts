FROM docker.io/node:18
WORKDIR /usr/src/app
COPY package*.json .
COPY phantom node_modules/
# RUN npm i phantomjs-prebuilt --loglevel verbose
# RUN npm i --loglevel verbose
RUN npm run installer
COPY data data/
COPY middleware middleware/
COPY models models/
COPY utilities utilities/
WORKDIR /usr/src/app/export-service
ADD export-service .

CMD ["node", "service"]