FROM node:10.14-alpine

EXPOSE 8000

RUN apk --no-cache update && apk --no-cache add make bash g++ zlib-dev libpng-dev autoconf automake libtool nasm && rm -fr /var/cache/apk/*

RUN npm install -g gatsby-cli
RUN gatsby telemetry --disable

COPY ./site/package*.json /app/site/
COPY ./package*.json /app/
COPY ./boot.js /app/

WORKDIR /app/site
RUN npm install

WORKDIR /app
RUN npm install
CMD ["node", "boot" ]


# WORKDIR /app/site
# CMD [ "gatsby", "develop", "-H", "0.0.0.0", "-p", "80" ]