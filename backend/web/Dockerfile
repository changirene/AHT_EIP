FROM node:18.16.0

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json /usr/src/app

RUN npm install

COPY . /usr/src/app

EXPOSE 3000

RUN npm install -g nodemon

RUN chmod a+x /usr/local/bin/nodemon 

RUN chown -R $USER:$GROUP ~/.npm 

CMD ["npm", "run", "dev"]
