FROM docker.io/node:18
WORKDIR /usr/src/app
COPY package*.json .
RUN npm run installer
COPY data data/
COPY middleware middleware/
COPY models models/
COPY utilities utilities/
WORKDIR /usr/src/app/credits-service
ADD credits-service .

CMD ["node", "service"]