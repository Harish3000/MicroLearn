FROM eclipse-temurin:21-jdk-jammy
EXPOSE 9093
COPY ./target/learner-service.jar learner-service.jar
ENTRYPOINT ["java","-jar","/learner-service.jar"]
