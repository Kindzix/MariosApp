FROM node:16 AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:latest

COPY nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist/marios-app /usr/share/nginx/html

EXPOSE 80
