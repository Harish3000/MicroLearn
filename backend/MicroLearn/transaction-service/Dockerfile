FROM eclipse-temurin:21-jdk-jammy
EXPOSE 9095
COPY ./target/transaction-service.jar transaction-service.jar
ENTRYPOINT ["java","-jar","/transaction-service.jar"]
