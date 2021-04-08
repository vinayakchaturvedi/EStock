package com.example.eurekaserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@EnableEurekaServer
@SpringBootApplication
public class EurekaServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(EurekaServerApplication.class, args);
        startCustomerService();
        startTradeBookingService();
        startSettlementService();
        startUserInterfaceService();
        startNpm();
    }

    private static void startUserInterfaceService() {
        ProcessBuilder processBuilder = new ProcessBuilder();
        processBuilder.command("java", "-jar", System.getProperty("user.dir") + "/user-interface-service/target/user-interface-service-0.0.1-SNAPSHOT.jar", "UserInterfaceServiceApplication");
        startProcess(processBuilder);
    }

    private static void startSettlementService() {
        ProcessBuilder processBuilder = new ProcessBuilder();
        processBuilder.command("java", "-jar", System.getProperty("user.dir") + "/settlement-service/target/settlement-service-0.0.1-SNAPSHOT.jar", "SettlementServiceApplication");
        startProcess(processBuilder);
    }

    private static void startTradeBookingService() {
        ProcessBuilder processBuilder = new ProcessBuilder();
        processBuilder.command("java", "-jar", System.getProperty("user.dir") + "/trade-booking/target/trade-booking-0.0.1-SNAPSHOT.jar", "TradeBookingApplication");
        startProcess(processBuilder);
    }

    private static void startCustomerService() {
        ProcessBuilder processBuilder = new ProcessBuilder();
        processBuilder.command("java", "-jar", System.getProperty("user.dir") + "/customer-service/target/customer-service-0.0.1-SNAPSHOT.jar", "CustomerServiceApplication");
        startProcess(processBuilder);
    }

    private static void startNpm() {
        ProcessBuilder processBuilder = new ProcessBuilder();
        processBuilder.command("npm", "start", "--prefix", System.getProperty("user.dir") + "/user-interface-service/src/main/webapp/estock-ui/");
        startProcess(processBuilder);
    }

    private static void startProcess(ProcessBuilder processBuilder) {
        try {
            Process process = processBuilder.start();

            StringBuilder output = new StringBuilder();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
