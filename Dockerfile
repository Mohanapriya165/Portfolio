# Step 1: Use OpenJDK 17 as base image
FROM openjdk:17-jdk-slim

# Step 2: Set working directory inside container
WORKDIR /app

# Step 3: Copy the JAR file from target folder to container
COPY target/*.jar app.jar

# Step 4: Expose the port your Spring Boot app runs on
EXPOSE 8080

# Step 5: Run the Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]
