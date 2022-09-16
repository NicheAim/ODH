#fhir-notes.txt from OCP dev loptop

FHIR4 Server Details:

Github Location : https://github.com/hapifhir/hapi-fhir-jpaserver-starter

Code Location: C:\ehnglobal-ws\hapi-fhir-jpaserver-starter

cd C:\ehnglobal-ws\hapi-fhir-jpaserver-starter

Build : JAVA_HOME="C:\Program Files\Java\jdk-11.0.13" mvn clean install -X -Dmaven.test.skip

Run: JAVA_HOME="C:\Program Files\Java\jdk-11.0.13" mvn clean spring-boot:run -Pboot

OCP Credentials:
ocpAdmin / P@ssword123

d.gold.cm/P@ssword123

PGADMIN :
postgres / admin

Code path:
C:\ehnglobal-ws

++++++++++++++++++++++++++++++++++++++++++++++

# How to config OCP projects in local environment

## Check list to install

- Java JDK version 8
- Java JDK version 11
- Apache Maven 3.8.3
- Gradle 3.3
- PostgreSQL version 12.1
- PgAdmin 4
- Node JS 17.0.1
- Apache Tomcat 9.0.40

---

## Install using sdkman

We need to have two versions of java running at the same time.
That's why we use sdkman to install them

1. Install sdkman
   - Here to install [sdkman](https://sdkman.io/install)
2. Check the java versions available
   - List the available java version, use this command: `sdk list java`
   - Select the Identifier to install, for example: `11.0.2-open`
3. Install Java 11
   - `sdk install java {%identifier%}`, change `{%identifier%}` for your Identifier
   - Example: `sdk install java 11.0.2-open`
4. Install Java 8
   - `sdk install java {%identifier%}`, change `{%identifier%}` for your Identifier
   - Example: `sdk install java 8.312.07.1-amzn`
5. Install Maven
   - `sdk install maven 3.8.3`
6. Install Gradle
   - `sdk install gradle 3.3`
7. Install Tomcat
   - `sdk install tomcat 9.0.40`

---

## Install PostgreSQL and PdAdmin

### Using installer (Mac/Windows)

- [PostgreSQL Installer with PgAdmin 4](https://content-www.enterprisedb.com/downloads/postgres-postgresql-downloads)
- Follow the instructions
- Password for PostgreSQL: `admin`
- Password for PgAdmin: whatever you want, recommended `admin` or `pgAdmin`

### Using command (Linux/Mac/Windows)

#### Install postgreSQL

- Follow these instructions [Download postgreSQL](https://www.postgresql.org/download/)

#### Check PostgreSQL service status

- `systemctl status postgresql.service`

#### Connect to PostgreSQL

- `sudo -i -u postgres`

#### Reset the PostgreSQL password to 'admin'

- `psql -c "alter user postgres with password 'admin'"`

---

## Restore the Databases

### Create these databases:

- `fhir`
- `hapi`

### Download the backup sql files

- The files have a name like these `fhir_date.sql` and `hapi_date.sql`
- [Download fhir sql file](https://drive.google.com/file/d/1cZz2d4qQaby9PY-bdggiqhUgLJjVmuvI/view?usp=sharing)
- [Download hapi sql file](https://drive.google.com/file/d/1IVWPz5NwYgJpTNA2Fa8IRx-aJSUNcZTd/view?usp=sharing)

### Restore the database

Using pdAdmin follow these instructions for each database

- Select a database, example `fhir`
- Right click and select `restore`
- In `Filename` select the sql file for that database, example`fhir_date.sql`
- Click `Restore button`

---

## Download project code

1. Download the [ehnglobal-ws.zip file](https://drive.google.com/file/d/1_RiHNBQdFCKnfbOktDxiTZlas_dgzH_9/view?usp=sharing)
2. Unzip the `ehnglobal-ws.zip` in your workspace like this `$HOME/workspace/`
3. Download the [ocp-config-data](https://drive.google.com/file/d/1Jgy8hBTvibXniw6P-yr-ONba6p7Kv7Ce/view?usp=sharing)
4. Unzip the `ocp-config-data.zip` in your workspace like this `$HOME/workspace/`

## Build and Run modules

### Ui

1. Open a new terminal

```
cd $HOME/workspace/ehnglobal-ws/ocp-ui
npm install
npm start
```

### Discovery Server

1. Open a new terminal

```
cd $HOME/workspace/ehnglobal-ws/ocp-discovery-server/ocp-discovery-server
mvn clean install
mvn spring-boot:run
```

### Config Server

1. Open a new terminal

```
cd $HOME/workspace/ehnglobal-ws/ocp-config-server/ocp-config-server
mvn clean install
mvn spring-boot:run
```

### Fis

1. Open a new terminal

```
cd $HOME/workspace/ehnglobal-ws/ocp-fis/ocp-fis
mvn clean install
mvn spring-boot:run
```

### Edge Server

1. Open a new terminal

```
cd $HOME/workspace/ehnglobal-ws/ocp-edge-server/ocp-edge-server
mvn clean install
mvn spring-boot:run
```

### Ui api

1. Open a new terminal

```
cd $HOME/workspace/ehnglobal-ws/ocp-ui-api/ocp-ui-api
mvn clean install
mvn spring-boot:run
```

### Mint

1. Open a new terminal

```
cd $HOME/workspace/ehnglobal-ws/ocp-mint-api/ocp-mint-api
mvn clean install
mvn spring-boot:run
```

+++++++++++++++++++

juan.llera@nicheaim.com Install Commands

#MacOS
##Install Homebrew (https://brew.sh/)
##Install Sdkman (https://sdkman.io/)
##Install Apache Maven 3.8.3 (https://maven.apache.org/)
Add the “mvn” to the PATH
##Install PostgreSQL version 12.1

1. Install LatestVersion(brew install postgresql)
1. Get Version (apply plugin: 'com.bmuschko.tomcat' // Added by juan.llera@nicheaim.com)
1. Install Version 12 (brew install postgresql@12)
1. Start PostgreSQL (brew services start postgresql)
1. Stop (brew services stop postgresql)
1. Set the PostgreSQL Server admin user.
1. Use the server run account. One way to do this is with the sudo command. Assuming the run account username is postgres (sudo -i -u postgres)

##Install pgAdmin (https://www.pgadmin.org/download/)
Master Password = p@ssw0rd

##Restore the Databases
Create these databases: fhir and hapi.
Validate that the backup \*.sql files are plain text and that they only contain SQL related to the creation of the tables/objects and insertion of data. Sometimes that files may include SET and other thing that break the Restore, especially if the backup is not from the same exact version as the target server.
fhir (psql -U postgres -d fhir -f fhir-fhir4-env-20211029.sql)
happi (psql -U postgres -d hapi -f ~/Downloads/hapi-fhir4-env-20211029.sql)

##Install download Tomcat
Download a binary distribution of the core module from here: https://tomcat.apache.org/download-90.cgi
Descompres file: sudo tar -xvf apache-tomcat-9.0.54.tar.gz -C /usr/local

##Install Hapi FHIR
Clone “” repository
Set JDK to v11 (sdk u java 11.0.11.hs-adpt)
Validate JDK & Maven version (mvn -v)
Start HAPI FHIR Server (mvn clean spring-boot:run -Pboot)

##Install NPM & NodeJS with NVM [https://github.com/nvm-sh/nvm]

[About `npm`[https://docs.npmjs.com/about-npm]]

nvm -v
nvm install 17
nvm use 17
node -v

cd $HOME/workspace/ehnglobal-ws/ocp-ui
npm install

npm start

Validate services
pgAdmin
http://localhost:8082/fhir/Patient

proxy setup:
/ocp-ui-api -> http://localhost:8446 ✓
/smart -> http://localhost:8449 ✓
Server started ! ✓

## Access URLs:

Localhost: http://localhost:3000
LAN: http://192.168.86.22:3000

---

/Users/juan.llera/dev/src/ocp-laptop/ehnglobal-ws/ocp-config-server/ocp-config-server/src/main/resources

Install OCP Code

[How to View Which Postgres Version is Running[https://chartio.com/resources/tutorials/how-to-view-which-postgres-version-is-running/]]

[Backup and Restore a PostgreSQL Database[https://axiomq.com/blog/backup-and-restore-a-postgresql-database/]]

[PostgreSQL Restore Database[https://www.postgresqltutorial.com/postgresql-restore-database/]]

[How to Set the Default User Password in PostgreSQL[https://chartio.com/resources/tutorials/how-to-set-the-default-user-password-in-postgresql/]]

PostgreSQL Commands
sudo -i -u postgres
psql -c “CREATE USER postgres WITH PASSWORD admin”
psql -c "ALTER USER postgres WITH PASSWORD 'admin'"

Open a PostgreSQL terminal session
psql -h localhost -p 5432 -d postgres

Uninstall Nodeon MacOS

sudo rm -rf ~/.npm ~/.nvm ~/node_modules ~/.node-gyp ~/.npmrc ~/.node_repl_history
sudo rm -rf /usr/local/bin/npm /usr/local/bin/node-debug /usr/local/bin/node /usr/local/bin/node-gyp
sudo rm -rf /usr/local/share/man/man1/node* /usr/local/share/man/man1/npm*
sudo rm -rf /usr/local/include/node /usr/local/include/node_modules
sudo rm -rf /usr/local/lib/node /usr/local/lib/node_modules /usr/local/lib/dtrace/node.d
sudo rm -rf /opt/local/include/node /opt/local/bin/node /opt/local/lib/node
sudo rm -rf /usr/local/share/doc/node
sudo rm -rf /usr/local/share/systemtap/tapset/node.stp

brew uninstall node
brew doctor
brew cleanup --prune-prefix
