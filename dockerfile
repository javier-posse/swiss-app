FROM node:20 AS build

WORKDIR /app

COPY package*.json .
RUN npm install

COPY . .
RUN npm run build

FROM nginx

RUN rm /etc/nginx/conf.d/default.conf
COPY /todocker/nginx.conf /etc/nginx/conf.d
COPY --from=build /app/dist/suizos /usr/share/nginx/html
