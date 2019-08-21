# Get initial docker image for node js (alpine tag for a lightweight version)
FROM node:10-alpine

# set the working directory to /usr/app for any subsequent ADD, COPY or RUN instructions
WORKDIR /usr/app

# copy package.json
COPY package.json .

# install node modules (--quiet to specify)
RUN npm install --quiet

# copy all the app's files from the project's root to our working directory
COPY . .