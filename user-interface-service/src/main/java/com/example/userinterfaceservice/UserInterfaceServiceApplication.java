package com.example.userinterfaceservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@EnableDiscoveryClient
@SpringBootApplication
public class UserInterfaceServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(UserInterfaceServiceApplication.class, args);
        new LoadApiData().loadData();
    }

}
