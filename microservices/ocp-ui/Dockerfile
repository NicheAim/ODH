FROM node:14 as build
ENV PACKAGE_VERSION="1.0.0-SNAPSHOT"
WORKDIR /usr/local/ocp
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:14-alpine as release
WORKDIR /usr/local/ocp
ENV PACKAGE_VERSION="1.0.0-SNAPSHOT"
WORKDIR /usr/local/ocp
COPY docker/package.json ./
COPY server ./server/
COPY --from=build  /usr/local/ocp/build/ ./build/
COPY start.sh ./
COPY replace_env_vars.sh ./
RUN chmod u+x ./replace_env_vars.sh && chmod u+x ./start.sh && npm install
ENTRYPOINT /usr/local/ocp/start.sh
