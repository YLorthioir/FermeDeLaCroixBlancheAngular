#FROM --platform=$BUILDPLATFORM node:20-slim AS build
#WORKDIR /usr/src/app
#COPY package.json package-lock.json ./
#RUN npm ci
#COPY . .
#RUN rm -rf dist/*
#RUN npm run build

FROM nginx:1.23.0-alpine
COPY ./nginx.conf /etc/nginx/nginx.conf
#COPY --from=build /usr/src/app/dist/ferme-de-la-croix-blanche-angular /usr/share/nginx/html
COPY dist/ferme-de-la-croix-blanche-angular /usr/share/nginx/html/
EXPOSE 4242
