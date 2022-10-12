<h1 align="center">
  <img src="img/NicheAimLogo.jpg" width="385px"/>
</h1>

[![Java](https://img.shields.io/badge/java-tomato?style=for-the-badge&logo=openjdk&logoColor=white&labelColor=101010)]()
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white&labelColor=101010)]()
[![React](https://img.shields.io/badge/React-007396?style=for-the-badge&logo=react&logoColor=white&labelColor=101010)]()
[![FHIR](https://img.shields.io/badge/fhir-tomato?style=for-the-badge&logo=fhir&logoColor=white&labelColor=101010)]()
[![Hapi Fhir](https://img.shields.io/badge/hapi-orange?style=for-the-badge&logo=hapi&logoColor=white&labelColor=101010)]()
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white&labelColor=101010)]()
[![Ubuntu](https://img.shields.io/badge/Ubuntu-E95420?style=for-the-badge&logo=ubuntu&logoColor=white&labelColor=101010)]()
[![Arch](https://img.shields.io/badge/ArchLinux-1793D1?style=for-the-badge&logo=archlinux&logoColor=white&labelColor=101010)]()
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white&labelColor=101010)]()

---

## Installation

### Dependencies

> asdf

`asdf` is a cli manager for multiple runtime versions
[Click here for more information](https://asdf-vm.com/)

> Docker

`Docker` is a set of platform as a service products that use OS-level virtualization to deliver software in packages called containers.
[Click here for more information](https://www.docker.com/)

> Hapi Fhir Server

It is an Open Source implementation of `FHIR` in `Java`. FHIR (Fast Healthcare Interoperability Resources) is a specification for exchanging healthcare data in a modern and developer friendly way.
[Click here for more information](https://hapifhir.io/)

#### Setup runtime versions (Linux distributions)

> Install asdf

```sh
# Assuming that you already use git
git clone https://github.com/asdf-vm/asdf.git ~/.asdf --branch v0.9.0

SHELL_FILE=".bashrc" # .bashrc, .zshrc

echo -e '\n' >> $HOME/${SHELL_FILE}
echo  '# asdf' >> $HOME/${SHELL_FILE}
echo '. $HOME/.asdf/asdf.sh' >> $HOME/${SHELL_FILE}
echo '. $HOME/.asdf/completions/asdf.bash' >> $HOME/${SHELL_FILE}
source $HOME/$SHELL_FILE
```

> Install runtimes

```sh
# ---- install nodejs with asdf ----
asdf plugin add nodejs https://github.com/asdf-vm/asdf-nodejs.git
asdf list all nodejs
asdf install nodejs 12.22.12

# install java with asdf
asdf plugin-add java https://github.com/halcyon/asdf-java.git
asdf list all java
asdf install java adoptopenjdk-8.0.322+6
asdf install java adoptopenjdk-11.0.14+101

# install maven with asdf
asdf plugin-add maven
asdf list all maven
asdf install maven 3.8.3
```

#### Installing libpng12

> For Arch users

```sh
sudo pacman -S libpng12
```

> For Ubuntu users

```sh
sudo apt install libpng12-0
```

#### Installing docker

> For Arch users

```sh
sudo pacman -S docker
sudo systemctl start docker.service
docker --version
# If you don't have permissions
sudo chmod 666 /var/run/docker.sock
```

> For Ubuntu users

```sh
sudo apt install docker
sudo systemctl start docker.service
docker --version
# If you don't have permissions
sudo chmod 666 /var/run/docker.sock
```

##### Installing `PostgreSQL` image and running container

> The next command setup credentials, and default name for the data base in `PostgreSQL`

```sh
docker run --name postgres-fhir-server \
-e POSTGRES_USER=postgres \
-e POSTGRES_PASSWORD=postgres \
-e POSTGRES_DB=fhir_server \
-p 5432:5432 -d postgres:latest

# For stop container
docker stop postgres-fhir-server

# For start container again
docker start postgres-fhir-server
```

#### Install `helm-v0.6.0` version from `hapi-fhir-jpaserver-starter`

[Download the project here](https://github.com/hapifhir/hapi-fhir-jpaserver-starter/releases/tag/helm-v0.6.0)

> Edit connection with PostgreSQL in and change default port application.yaml

```yaml
server:
  port: 8082
spring:
  datasource:
    url: 'jdbc:postgresql://localhost:5432/fhir_server'
    #url: jdbc:h2:mem:test_mem
    username: postgres
    password: postgres
    driverClassName: org.postgresql.Driver
    max-active: 15
```

> Setup default runtimes in `hapi-fhir-jpaserver-starter`

```sh
asdf local maven 3.8.3
asdf local java adoptopenjdk-11.0.14+101
```

> Run Hapi Fhir server

```sh
mvn clean install -X -Dmaven.test.skip
mvn clean spring-boot:run -Pboot
```

[Click here for more information](https://github.com/hapifhir/hapi-fhir-jpaserver-starter)

#### Discovery Server

> Go to `microservices/ocp-discovery-server/ocp-discovery-server` and set default runtimes

```sh
asdf local java adoptopenjdk-8.0.322+6
asdf local maven 3.8.3
```

> Run discovery

```sh
mvn clean install
mvn spring-boot:run
```

#### Config Server

> Go to `microservices/ocp-config-server/ocp-config-server` and set default runtimes

```sh
asdf local java adoptopenjdk-8.0.322+6
asdf local maven 3.8.3
```

> Change config directory path on `microservices/ocp-config-server/ocp-config-server/src/main/resources/application.yml`

```yaml
# Example
searchLocations: file:/home/user/Workspace/ODH/microservices/ocp-config-data
```

> Run config server

```sh
mvn clean install
mvn spring-boot:run -Dspring.profiles.active=native
```

#### Fis

> Setup environment variables for fis or change default values in `microservices/ocp-fis/ocp-fis/src/main/resources/application.yml`

```sh
# You should have this on .bashrc or .zshrc
export OCP_FIS_FHIR_SERVER_URL=http://localhost:8082/fhir
export ENABLE_GCP=false
# Encoded base64 ["https://example-keycloak.com/"]
export JWT_ISSUER=WyJodHRwczovL2V4YW1wbGUta2V5Y2xvYWsuY29tLyJd
# Encoded base64 ["https://example-keycloak.com/","http://localhost:8082/fhir"]
export JWT_AUDIENCE=WyJodHRwczovL2V4YW1wbGUta2V5Y2xvYWsuY29tLyIsImh0dHA6Ly9sb2NhbGhvc3Q6ODA4Mi9maGlyIl0=
# Encoded base64 ["https://example-keycloak.com/"]
export JWT_SUBJECT=WyJodHRwczovL2V4YW1wbGUta2V5Y2xvYWsuY29tLyJd
export JWT_SECRET=secret
export MRN_SYSTEM_URL=https://example-url.com/api/fhir/CodeSystem/?code=mrn&name=mrn
export DATA_STORE_TECH_FIS=hapi
```

> Go to `microservices/ocp-fis/ocp-fis` and set default runtimes

```sh
asdf local java adoptopenjdk-8.0.322+6
asdf local maven 3.8.3
```

> Run fis server

```sh
mvn clean install
mvn spring-boot:run
```

#### Ui-Api

> Setup environment variables for ocp-ui-api or change default values in `microservices/ocp-ui-api/ocp-ui-api/src/main/resources/application.yml`

```sh
# You should have this on .bashrc or .zshrc
export OCP_UI_API_FIS_ENPOINT=http://localhost:8444
export OCP_UI_API_AUTHORIZATION_REDIRECT_ENDPOINT=http://localhost:3000
```

> Setup Keycloak config for ocp-ui-api in `microservices/ocp-ui-api/ocp-ui-api/src/main/resources/application-uaa.yml`

```yaml
# Config the next properties
security:
  name: uaa
  oauth2:
    client:
      access-token-uri: https://example-keycloak.com/auth/realms/example/protocol/openid-connect/token
ocp:
  ocp-ui-api:
    oauth2:
      authorization-server-endpoint: https://example-keycloak.com/auth/realms/example
      users-password-server-endpoint: https://example-keycloak.com/auth/realms/example/users
```

> Go to `microservices/ocp-fis/ocp-fis` and set default runtimes

```sh
asdf local java adoptopenjdk-8.0.322+6
asdf local maven 3.8.3
```

> Run Ui Api server

```sh
mvn clean install
mvn spring-boot:run -Dspring.profiles.active=uaa
```

#### Ui / Frontend

> Go to `microservices/ocp-ui` and set default runtimes

```sh
# For Ubuntu users
asdf local nodejs 16.14.2

# For Arch users
asdf local nodejs 12.22.12
```

> Change environments on `microservices/ocp-ui/env.js`

> Run Ui frontend

```sh
npm install
npm run start
```
