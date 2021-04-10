package com.example.settlementservice.service.impl;

import com.example.estockcore.bean.Trade;
import com.example.settlementservice.dao.impl.SettleTradeDAOImpl;
import com.example.settlementservice.service.SettleTrade;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.mail.Session;
import javax.mail.internet.AddressException;
import java.io.FileOutputStream;
import java.time.LocalDateTime;
import java.util.List;
import javax.mail.MessagingException;

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
                generateDocument(t);
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
    public void generateDocument(Trade trade)
    {
        try {
            Document document = new Document();
            PdfWriter.getInstance(document, new FileOutputStream("Invoice"+trade.getTradeId()+".pdf"));
            document.open();

            Font font = FontFactory.getFont(FontFactory.COURIER, 20, Font.BOLD);
            Chunk headingChunk = new Chunk("EStock", font);
            Paragraph headingPara= new Paragraph(headingChunk);
            headingPara.setAlignment(Paragraph.ALIGN_CENTER);

            Font font2=FontFactory.getFont(FontFactory.HELVETICA,14);
            String content="\n\n\nRespected "+trade.getCustomer().getCustomerName()+",\nFollowing are your contact details:\n";
            content+="Name: "+trade.getCustomer().getCustomerName()+"\n";
            content+="Email: "+trade.getCustomer().getEmailId()+"\n";
            content+="Contact number: "+trade.getCustomer().getContactNumber()+"\n\n";
            content+="Thank you for trading with EStock. We would like to inform you that the stock purchased on " + trade.getTradeDate() + "" +
                    "has now been settled. Please find below the details of the trade as follows:\n";
            content+="Stock Quantity: "+trade.getQuantity()+"\n";
            content+="Stock Price: "+trade.getPrice()+"\n";
            content+="Net Amount: "+trade.getNetAmount()+"\n";
            content+="Settlement Date: "+trade.getSettlementDate()+"\n";
            Chunk contentChunk=new Chunk(content,font2);
            Paragraph contentPara=new Paragraph(contentChunk);

            document.add(headingPara);
            document.add(contentPara);
            document.close();
        }
        catch (Exception e)
        {
            System.out.println(e);
        }

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
            String text = "Hello " + trade.getCustomer().getCustomerName() + " ," + "\n" + "Thank you for trading with EStock. We would like to inform you " +
                    "that your stocks purchased on " + trade.getTradeDate() + " has now been settled.\n Please find the details of the purchase in the Invoice attached below.\n\nThank You, \nEStock";
            messageBodyPart.setContent(text, "text/plain");
            Multipart multipart = new MimeMultipart();
            multipart.addBodyPart(messageBodyPart);
            MimeBodyPart attachPart = new MimeBodyPart();

            attachPart.attachFile("/home/lumos/Desktop/EStock/Invoice"+trade.getTradeId()+".pdf");
            multipart.addBodyPart(attachPart);
            msg.setContent(multipart);
            Transport.send(msg);
        }
        catch (Exception e){
            System.out.println(e);
        }

    }


}
