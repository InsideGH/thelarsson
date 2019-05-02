FROM node:10.14-alpine

EXPOSE 8000

RUN apk --no-cache update && apk --no-cache add make bash g++ zlib-dev libpng-dev autoconf automake libtool nasm && rm -fr /var/cache/apk/*

RUN npm install -g gatsby-cli
RUN gatsby telemetry --disable

WORKDIR /app
COPY ./site/package*.json /app/
RUN npm install

CMD ["gatsby", "develop", "-H", "0.0.0.0" ]