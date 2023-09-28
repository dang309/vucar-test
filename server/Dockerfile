FROM node:latest

########### Setup Path ############
WORKDIR /sface-engine

########### Copy Resources ############
COPY . .

########### Install Required Tools ############
RUN npm install pm2 -g

########### Install Dependencies ############
RUN yarn

########### Execute ############
EXPOSE 8080
CMD ["node", "./src/index.js"]
