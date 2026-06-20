# --- Stage 1: Let Docker build the Java application ---
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app

# Copy the pom.xml and source code into the box
COPY pom.xml .
COPY src ./src

# Tell Maven to compile your code into a neat .jar file
RUN mvn clean package -DskipTests

# --- Stage 2: Create the lightweight runner box ---
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Grab the built .jar file from Stage 1
COPY --from=build /app/target/*.jar app.jar

# Spring Boot's usual communication window
EXPOSE 8080

# Command to run your backend fortress!
ENTRYPOINT ["java", "-jar", "app.jar"]