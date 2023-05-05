FROM docker.io/node:18
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm run installer
COPY . .

# dev
CMD ["npm", "run", "dev"]

# prod
# CMD ["npm", "start"]