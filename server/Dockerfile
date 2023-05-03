FROM docker.io/node:18
WORKDIR /usr/src/app/server
COPY package*.json ./
RUN npm run installer
COPY . .
EXPOSE 3001
CMD ["npm", "start"]