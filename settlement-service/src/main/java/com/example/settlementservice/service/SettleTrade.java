package com.example.settlementservice.service;

import com.example.estockcore.bean.Trade;

import javax.mail.MessagingException;
import javax.mail.internet.AddressException;
import java.util.List;
import java.io.IOException;

public interface SettleTrade {
    public void updateSettlement() throws IOException, MessagingException;
    public List<Trade>  retrieveTrade();
    public boolean storeTrades(Trade trade);
    public void sendEmail(Trade trade) throws AddressException, MessagingException, IOException;

}
