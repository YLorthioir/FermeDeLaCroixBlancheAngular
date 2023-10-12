FROM node:19.7.0-alpine AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN rm -rf dist/*
RUN npm run build

FROM nginx:1.23.2-alpine
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/ferme-de-la-croix-blanche-angular /usr/share/nginx/html
