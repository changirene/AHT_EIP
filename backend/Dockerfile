FROM node:18.16.0 

WORKDIR /usr/src/app

COPY package.json /usr/src/app

RUN npm install

COPY . /usr/src/app

COPY --from=frontend /usr/src/app/ /usr/src/app/frontend

EXPOSE 3000

RUN npm install -g nodemon

# RUN apt-get update -y && apt-get install -y iputils-ping && apt-get install telnet -y

RUN chmod a+x /usr/local/bin/nodemon 

RUN chown -R $USER:$GROUP ~/.npm 

CMD ["npm", "run", "dev"]




