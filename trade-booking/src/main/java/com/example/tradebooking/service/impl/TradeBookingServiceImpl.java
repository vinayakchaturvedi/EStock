package com.example.tradebooking.service.impl;

import com.example.estockcore.bean.Customer;
import com.example.estockcore.bean.Side;
import com.example.estockcore.bean.Stock;
import com.example.estockcore.bean.Trade;
import com.example.tradebooking.dao.impl.RetrieveCustomerDAOImpl;
import com.example.tradebooking.dao.impl.TradeBookingDAOImpl;
import com.example.tradebooking.service.Service;
import com.example.tradebooking.utils.ConstantsAndMessages;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class TradeBookingServiceImpl implements Service {

    @Autowired
    private RetrieveCustomerDAOImpl retrieveCustomerDAO;
    @Autowired
    private TradeBookingDAOImpl tradeBookingDAO;

    @Value("${trade.commission}")
    private int commission;

    @Override
    public Trade tradeCapture(JsonNode request) throws CloneNotSupportedException {
        Integer customerId = request.get("customerId").asInt();
        String stockName = request.get("stockName").textValue();
        double price = request.get("price").asDouble();
        Side side = request.get("side").textValue().equals("BUY") ? Side.BUY : Side.SELL;
        Long quantity = request.get("quantity").asLong();
        double netAmount = quantity * price + commission;

        Customer customer = retrieveCustomerDAO.validateAndRetrieveCustomer(customerId);
        if (customer == null) {
            System.out.println("No customer found for the given customer id: " + customerId);
            return null;
        }

        Trade trade = new Trade(LocalDateTime.now(),
                LocalDateTime.now().plusDays(2),
                side,
                quantity,
                price,
                commission,
                netAmount,
                customer);

        Stock currTradedStock = null;
        boolean isFirstStock = true;

        for (Stock stock : customer.getStockList()) {
            if (stock.getStockName().equals(stockName)) {
                currTradedStock = stock;
                isFirstStock = false;
                break;
            }
        }
        //Stock not sold condition
        if (Side.SELL.equals(side) &&
                (currTradedStock == null || currTradedStock.getTotalAvailableQuantity() < quantity)) {
            System.out.println(customerId + ConstantsAndMessages.NOT_ENOUGH_STOCKS);
            return null;
        }

        //Create a new Stock
        if (currTradedStock == null) {
            currTradedStock = new Stock(stockName, customer);
        }

        //Buying Stock Logic
        if (Side.BUY.equals(side)) {
            currTradedStock.setTotalAvailableQuantity(
                    currTradedStock.getTotalAvailableQuantity() + quantity);
            currTradedStock.setBoughtQuantity(
                    currTradedStock.getBoughtQuantity() + quantity);
            currTradedStock.setAmountSpent(currTradedStock.getAmountSpent() + netAmount);
        } else {
            currTradedStock.setTotalAvailableQuantity(
                    currTradedStock.getTotalAvailableQuantity() - quantity);
            currTradedStock.setSoldQuantity(
                    currTradedStock.getSoldQuantity() + quantity);
            currTradedStock.setAmountEarned(currTradedStock.getAmountEarned() + netAmount);

            //Update profit loss if total Available quantity become zero
            if (currTradedStock.getTotalAvailableQuantity().equals(0L)) {
                double diff = currTradedStock.getAmountEarned() - currTradedStock.getAmountSpent();
                if (diff < 0) {
                    currTradedStock.setLoss(diff);
                    currTradedStock.setProfit(0);
                } else {
                    currTradedStock.setLoss(0);
                    currTradedStock.setProfit(diff);
                }
            }
        }
        return (tradeBookingDAO.tradeCapture(currTradedStock, isFirstStock, trade)) ? trade.shallowCopy() : null;
    }
}
