FROM eclipse-temurin:21-jdk-jammy
EXPOSE 8761
COPY ./target/eureka-server.jar eureka-server.jar
ENTRYPOINT ["java","-jar","/eureka-server.jar"]
