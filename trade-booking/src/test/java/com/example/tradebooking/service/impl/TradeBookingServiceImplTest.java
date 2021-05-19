package com.example.tradebooking.service.impl;

import com.example.estockcore.bean.Customer;
import com.example.estockcore.bean.Stock;
import com.example.estockcore.bean.Trade;
import com.example.tradebooking.dao.impl.RetrieveCustomerDAOImpl;
import com.example.tradebooking.dao.impl.TradeBookingDAOImpl;
import com.fasterxml.jackson.databind.JsonNode;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;

public class TradeBookingServiceImplTest {

    @Mock
    private RetrieveCustomerDAOImpl retrieveCustomerDAO;
    @Mock
    private TradeBookingDAOImpl tradeBookingDAO;
    @Mock
    JsonNode jsonNode;
    @InjectMocks
    TradeBookingServiceImpl tradeBookingService = new TradeBookingServiceImpl();

    @Before
    public void setUp() throws Exception {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testTradeCaptureValid() throws CloneNotSupportedException {

        Trade trade = new Trade();
        Customer customer = new Customer();
        Stock stock = new Stock();
        stock.setStockName("MSFT");
        stock.setTotalAvailableQuantity(200L);
        stock.setSoldQuantity(10L);
        customer.getStockList().add(stock);

        when(jsonNode.get(eq("customerId"))).thenReturn(jsonNode);
        when(jsonNode.asInt()).thenReturn(1);
        when(jsonNode.get(eq("stockName"))).thenReturn(jsonNode);
        when(jsonNode.textValue()).thenReturn("MSFT");
        when(jsonNode.get(eq("side"))).thenReturn(jsonNode);
        when(jsonNode.get(eq("quantity"))).thenReturn(jsonNode);
        when(jsonNode.get(eq("price"))).thenReturn(jsonNode);
        when(jsonNode.asLong()).thenReturn(100L);
        when(jsonNode.asDouble()).thenReturn(10D);
        when(retrieveCustomerDAO.validateAndRetrieveCustomer(eq(1))).thenReturn(customer);
        when(tradeBookingDAO.tradeCapture(any(Stock.class), eq(false), any(Trade.class))).thenReturn(true);

        Assert.assertNotNull(tradeBookingService.tradeCapture(jsonNode));
    }

    @Test
    public void testTradeCaptureInValid() throws CloneNotSupportedException {

        Trade trade = new Trade();
        Customer customer = new Customer();
        Stock stock = new Stock();
        stock.setStockName("MSFT");
        stock.setTotalAvailableQuantity(99L);
        stock.setSoldQuantity(10L);
        customer.getStockList().add(stock);

        when(jsonNode.get(eq("customerId"))).thenReturn(jsonNode);
        when(jsonNode.asInt()).thenReturn(1);
        when(jsonNode.get(eq("stockName"))).thenReturn(jsonNode);
        when(jsonNode.textValue()).thenReturn("MSFT");
        when(jsonNode.get(eq("side"))).thenReturn(jsonNode);
        when(jsonNode.get(eq("quantity"))).thenReturn(jsonNode);
        when(jsonNode.get(eq("price"))).thenReturn(jsonNode);
        when(jsonNode.asLong()).thenReturn(100L);
        when(jsonNode.asDouble()).thenReturn(10D);
        when(retrieveCustomerDAO.validateAndRetrieveCustomer(eq(1))).thenReturn(customer);
        when(tradeBookingDAO.tradeCapture(any(Stock.class), eq(false), any(Trade.class))).thenReturn(true);

        Assert.assertNull(tradeBookingService.tradeCapture(jsonNode));
    }
}