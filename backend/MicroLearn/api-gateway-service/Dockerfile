FROM eclipse-temurin:21-jdk-jammy
EXPOSE 9094
COPY ./target/apigateway-service.jar apigateway-service.jar
ENTRYPOINT ["java","-jar","/apigateway-service.jar"]
