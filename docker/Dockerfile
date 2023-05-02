#Base image
FROM node:16.18.0

USER root
COPY ["SERVICE.tgz", "/SERVICE.tgz"]
COPY ["env", "/SERVICE/.env"]
COPY ["start.sh", "/start.sh"]

RUN ln -fns /usr/share/zoneinfo/Asia/Ho_Chi_Minh /etc/localtime && echo Asis/Ho_Chi_Minh > /etc/timezone

RUN tar -xzf SERVICE.tgz --directory /SERVICE && rm SERVICE.tgz

ENV REACT_APP_DOMAIN=http://travel.dangkimlien.online
ENV REACT_APP_ENDPOINT=http://travel.dangkimlien.online/api
ENV REACT_APP_SECRET_SIGN_KEY=secret_sign_key

RUN chmod -R 775 /SERVICE

RUN chmod -R 775 /start.sh

EXPOSE 8080

WORKDIR /SERVICE

RUN yarn

RUN yarn build

ENTRYPOINT ["/start.sh"]
