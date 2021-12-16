FROM node:16
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
ENV DOTENV_CONFIG_PATH=docker-env


COPY . .
EXPOSE 3005
CMD [ "npm", "run", "start"]