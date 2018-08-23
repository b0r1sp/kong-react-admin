FROM nginx:alpine  
COPY /build/ /opt/app
COPY /contrib/default.conf.tpl /etc/nginx/conf.d/

CMD  /bin/sh -c "envsubst < /etc/nginx/conf.d/default.conf.tpl > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"