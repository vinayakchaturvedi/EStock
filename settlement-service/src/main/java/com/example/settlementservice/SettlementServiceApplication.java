package com.example.settlementservice;

import com.example.settlementservice.dao.impl.SettleTradeDAOImpl;
import com.example.settlementservice.service.impl.SettleTradeServiceImpl;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.ConfigurableApplicationContext;

import javax.mail.MessagingException;
import java.io.IOException;

@EnableDiscoveryClient
@SpringBootApplication
public class SettlementServiceApplication {

	public static void main(String[] args) throws IOException, MessagingException {
		ConfigurableApplicationContext context = SpringApplication.run(SettlementServiceApplication.class, args);
		SettleTradeServiceImpl settleTrade = context.getBean(SettleTradeServiceImpl.class);
		settleTrade.updateSettlement();


	}

}
