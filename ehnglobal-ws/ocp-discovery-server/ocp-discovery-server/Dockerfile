FROM maven:3.8.2-jdk-8-slim as build
WORKDIR /workspace
COPY pom.xml /workspace
COPY src /workspace/src
RUN mvn -B -f pom.xml clean package -DskipTests

FROM bhits/java-jar-runner:8u102-jre as release
VOLUME /java
COPY --from=build /workspace/target/*.jar /app.jar
ENV JAR_FILE app.jar
ENV DEFAULT_PROGRAM_ARGS --spring.profiles.active=application-default,docker