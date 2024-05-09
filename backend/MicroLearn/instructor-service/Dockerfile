FROM eclipse-temurin:21-jdk-jammy
EXPOSE 9092
COPY ./target/instructor-service.jar instructor-service.jar
ENTRYPOINT ["java","-jar","/instructor-service.jar"]
