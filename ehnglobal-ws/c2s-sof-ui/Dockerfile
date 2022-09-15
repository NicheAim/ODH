FROM node:14 as build
ENV PACKAGE_VERSION="1.0.0-SNAPSHOT"
WORKDIR /usr/local/c2s-sof-app
COPY package*.json ./
#RUN npm cache clean --force
RUN npm install
#RUN npm start
COPY . .
RUN npm run build

FROM node:14-alpine as release
WORKDIR /usr/local/c2s-sof-app
ENV PACKAGE_VERSION="1.0.0-SNAPSHOT"
ENV API_ENDPOINT='c2s-sof-api:8451'
WORKDIR /usr/local/c2s-sof-app
COPY docker/package.json ./
COPY server ./server/
COPY --from=build  /usr/local/c2s-sof-app/build/ ./build/
RUN npm install
ENTRYPOINT API_ENDPOINT=$API_ENDPOINT npm start
