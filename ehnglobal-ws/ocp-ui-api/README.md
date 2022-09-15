# Omni Care Plan(OCP) User Interface API 
s
The Omni Care Plan(OCP) User Interface API (ocp-ui-api) is a Backend For Frontend (BFF) component of ocp-ui

## Build

### Prerequisites

+ [Oracle Java JDK 8 with Java Cryptography Extension (JCE) Unlimited Strength Jurisdiction Policy](http://www.oracle.com/technetwork/java/javase/downloads/index.html)
+ [Docker Engine](https://docs.docker.com/engine/installation/) (for building a Docker image from the project)

### Commands

This is a Maven project and requires [Apache Maven](https://maven.apache.org/) 3.3.3 or greater to build it. It is recommended to use the *Maven Wrapper* scripts provided with this project. *Maven Wrapper* requires an internet connection to download Maven and project dependencies for the very first build.

To build the project, navigate to the folder that contains the `pom.xml` using the terminal/command line.

+ To build a JAR:
    + For Windows, run `mvnw.cmd clean install`
    + For *nix systems, run `mvnw clean install`
+ To build a Docker Image (this will create an image with `bhits/ocp-ui-api:latest` tag):
    + For Windows, run `mvnw.cmd clean install & cd web & ..\mvnw.cmd clean package docker:build & cd..`
    + For *nix systems, run `mvnw clean install; cd ./web; ../mvnw clean package docker:build; cd ..`

## Run

### Prerequisites

### Commands

This is a [Spring Boot](https://projects.spring.io/spring-boot/) project and serves the project via an embedded Tomcat instance. Therefore, there is no need for a separate application server to run this service.
+ Run as a JAR file: `java -jar ocp-ui-api-x.x.x-SNAPSHOT.jar <additional program arguments>`
+ Run as a Docker Container: `docker run -d bhits/ocp-ui-api:latest <additional program arguments>`

*NOTE: In order for this Service to fully function as a microservice in the OCP-UI-API application, it is required to setup the dependency micro-services and the support level infrastructure. Please refer to the OCP Deployment Guide in the corresponding OCP release (see [OCP Releases Page](https://github.com/bhits/consent2share/releases)) for instructions to setup the Consent2Share infrastructure.*


## Configure

This project can run with the default configuration, which is targeted for a local development environment. Default configuration data is from three places: `bootstrap.yml`, `application.yml`, and the data which `Configuration Server` reads from `Configuration Data Git Repository`. Both `bootstrap.yml` and `application.yml` files are located in the `resources` folder of this source code.


### Other Ways to Override a Configuration

#### Override a Configuration Using Program Arguments While Running as a JAR:

+ `java -jar ocp-ui-api-x.x.x-SNAPSHOT.jar --server.port=80 --spring.datasource.password=strongpassword`

#### Override a Configuration Using Program Arguments While Running as a Docker Container:

+ `docker run -d bhits/ocp-ui-api:latest --server.port=80 --spring.datasource.password=strongpassword`

+ In a `docker-compose.yml`, this can be provided as shown below:
```yml
version: '3.4'
services:
...
  ocp-ui-api:
    image: "bhits/ocp-ui-api:latest"
    command: ["--server.port=80","--spring.datasource.password=strongpassword"]
...
```
*NOTE: Please note that these additional arguments will be appended to the default `ENTRYPOINT` specified in the `Dockerfile` unless the `ENTRYPOINT` is overridden.*

### Enable SSL

For simplicity in development and testing environments, SSL is **NOT** enabled by default configuration. SSL can easily be enabled following the examples below:

#### Enable SSL While Running as a JAR

+ `java -jar ocp-ui-api-x.x.x-SNAPSHOT.jar --spring.profiles.active=ssl --server.ssl.key-store=/path/to/ssl_keystore.keystore --server.ssl.key-store-password=strongkeystorepassword`

#### Enable SSL While Running as a Docker Container

+ `docker run -d -v "/path/on/dockerhost/ssl_keystore.keystore:/path/to/ssl_keystore.keystore" bhits/ocp-ui-api:latest --spring.profiles.active=ssl --server.ssl.key-store=/path/to/ssl_keystore.keystore --server.ssl.key-store-password=strongkeystorepassword`
+ In a `docker-compose.yml`, this can be provided as follows:
```yml
version: '3.4'
services:
...
  ocp-ui-api:
    image: "bhits/ocp-ui-api:latest"
    command: ["--spring.profiles.active=ssl","--server.ssl.key-store=/path/to/ssl_keystore.keystore", "--server.ssl.key-store-password=strongkeystorepassword"]
    volumes:
      - /path/on/dockerhost/ssl_keystore.keystore:/path/to/ssl_keystore.keystore
...
```

*NOTE: As seen in the examples above, `/path/to/ssl_keystore.keystore` is made available to the container via a volume mounted from the Docker host running this container.*

### Override Java CA Certificates Store In Docker Environment

Java has a default CA Certificates Store that allows it to trust well-known certificate authorities. For development and testing purposes, one might want to trust additional self-signed certificates. In order to override the default Java CA Certificates Store in a Docker container, one can mount a custom `cacerts` file over the default one in the Docker image as follows: `docker run -d -v "/path/on/dockerhost/to/custom/cacerts:/etc/ssl/certs/java/cacerts" bhits/ocp-ui-api:latest`

*NOTE: The `cacerts` references given in the volume mapping above are files, not directories.*

## Contact

If you have any questions, comments, or concerns please see [OCP](https://bhits.github.io/ocp/) project site.

## Report Issues

Please use [GitHub Issues](https://github.com/bhits/ocp-ui-api/issues) page to report issues.
