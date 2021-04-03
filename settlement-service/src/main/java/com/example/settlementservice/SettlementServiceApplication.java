package com.example.settlementservice;

import com.example.settlementservice.dao.impl.SettleTrade;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.ConfigurableApplicationContext;

@EnableDiscoveryClient
@SpringBootApplication
public class SettlementServiceApplication {

	public static void main(String[] args) {
		ConfigurableApplicationContext context = SpringApplication.run(SettlementServiceApplication.class, args);
		SettleTrade settleTrade = context.getBean(SettleTrade.class);
		System.out.println("hi");
		settleTrade.updateSettlement();


	}

}
