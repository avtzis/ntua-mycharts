FROM docker.io/node:18
WORKDIR /usr/src/app/ui
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

RUN npm i -g serve

EXPOSE 3000
#CMD ["serve", "-s", "build"]
# CMD serve -s build
CMD npm start