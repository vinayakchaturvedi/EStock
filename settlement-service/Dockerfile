FROM openjdk:8
MAINTAINER Vinayak Chaturvedi vinayak.chaturvedi96@gmail.com

WORKDIR .
# copy jar file and resource modules
COPY ./settlement-service/target/settlement-service-0.0.1-SNAPSHOT.jar ./
COPY ./estock-core/target/estock-core-0.0.1-SNAPSHOT.jar ./
COPY ./settlement-service/src/main/resources/ ./src/main/resources/