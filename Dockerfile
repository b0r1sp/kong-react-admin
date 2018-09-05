FROM node:7.10 as build-deps
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build

FROM nginx:alpine  
COPY --from=build-deps /usr/src/app/build/ /opt/app
COPY /contrib/default.conf.tpl /etc/nginx/conf.d/

EXPOSE 8080
CMD  /bin/sh -c "envsubst < /etc/nginx/conf.d/default.conf.tpl > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"