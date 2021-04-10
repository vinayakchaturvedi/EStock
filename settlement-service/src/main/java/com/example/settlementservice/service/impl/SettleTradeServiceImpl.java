package com.example.settlementservice.service.impl;

import com.example.estockcore.bean.Trade;
import com.example.settlementservice.dao.impl.SettleTradeDAOImpl;
import com.example.settlementservice.service.SettleTrade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.mail.Session;
import javax.mail.internet.AddressException;
import java.time.LocalDateTime;
import java.util.List;
import javax.mail.MessagingException;
import javax.mail.internet.AddressException;
import java.util.List;
import java.io.IOException;
import java.util.Properties;
import javax.mail.internet.*;
import javax.mail.*;
import java.util.Date;

@Component
public class SettleTradeServiceImpl implements SettleTrade {

    @Autowired
    SettleTradeDAOImpl dao;

    public SettleTradeServiceImpl() {
    }

    @Override
    public void updateSettlement() throws IOException, MessagingException {
        List<Trade> trades=retrieveTrade();
        LocalDateTime today=LocalDateTime.now();

        for(Trade t: trades)
        {
            if(today.isAfter(t.getSettlementDate()) && t.isSettled() == false)
            {
                t.setSettled(true);
                boolean stored = storeTrades(t);
                sendEmail(t);

            }
        }
    }

    @Override
    public List<Trade> retrieveTrade() {
        List<Trade> trades=dao.RetrieveTrade();
        return trades;
    }

    @Override
    public boolean storeTrades(Trade trade) {
        return dao.SettleTrade(trade);
    }

    @Override
    public void sendEmail(Trade trade) throws AddressException, MessagingException, IOException {
        try{
            Properties props = new Properties();
            props.put("mail.smtp.auth", "true");
            props.put("mail.smtp.starttls.enable", "true");
            props.put("mail.smtp.host", "smtp.gmail.com");
            props.put("mail.smtp.port", "587");

            Session session = Session.getInstance(props, new javax.mail.Authenticator() {
                protected PasswordAuthentication getPasswordAuthentication() {
                    return new PasswordAuthentication("estockiiitb@gmail.com", "estock123");
                }
            });
            String emailId  = trade.getCustomer().getEmailId();
            Message msg = new MimeMessage(session);
            msg.setFrom(new InternetAddress("estockiiitb@gmail.com", false));

            msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse(emailId));
            msg.setSubject("Confirmation for Trade Settlement");
            msg.setContent("Greetings ", "text/html");
            msg.setSentDate(new Date());

            MimeBodyPart messageBodyPart = new MimeBodyPart();
            String text = "Hello" + trade.getCustomer().getCustomerName() + " ,\nThank you for trading with EStock. We would like to inform you " +
                    "that your stocks purchased on " + trade.getTradeDate() + " has now been settled. \n Please find the details of the purchase in the Invoice attached below.\nThank You, \nEStock";
            messageBodyPart.setContent(text, "text/html");
            Multipart multipart = new MimeMultipart();
            multipart.addBodyPart(messageBodyPart);
            msg.setContent(multipart);
            Transport.send(msg);
        }
        catch (Exception e){
            System.out.println(e);
        }

    }


}
