FROM docker.io/node:18 AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

# dev
CMD ["npm", "start"]

# prod
# RUN npm run build
# 
# FROM docker.io/nginx
# EXPOSE 3000
# COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
# COPY --from=builder /usr/src/app/build /usr/share/nginx/html