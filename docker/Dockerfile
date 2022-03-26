# nodejs 16 for docker image

FROM nginx:latest
WORKDIR /usr/share/nginx/html
COPY dist /usr/share/nginx/html
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./nginx/sites-enabled /etc/nginx/sites-enabled
COPY ./nginx/general.conf /etc/nginx/general.conf
EXPOSE 80
CMD ["nginx", "-g","daemon off;"]