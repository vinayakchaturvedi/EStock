package com.example.customerservice.service.impl;

import com.example.customerservice.dao.impl.CustomerOperationDAOImpl;
import com.example.estockcore.bean.Customer;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;

public class CustomerOperationServiceImplTest {

    @Mock
    CustomerOperationDAOImpl customerOperationDAO;
    @InjectMocks
    CustomerOperationServiceImpl customerOperationService = new CustomerOperationServiceImpl();

    @Before
    public void initMocks() {
        CustomerOperationServiceImpl.latestTradingAccount = 1L;
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void registerCustomer() {
        Customer customer = new Customer();
        Mockito.when(customerOperationDAO.registerCustomer(any(Customer.class))).thenReturn(true);
        customerOperationService.registerCustomer(customer);
        Assert.assertEquals(new Long(2L), customer.getTradingAccount());
    }

    @Test
    public void validateAndRetrieveCustomerValid() {
        Customer customer = new Customer();
        customer.setEmailId("abc@gmail.com");
        customer.setPassword("root");
        Mockito.when(customerOperationDAO.validateAndRetrieveCustomer(any(Customer.class), eq(true))).thenReturn(customer);
        Customer response = customerOperationService.validateAndRetrieveCustomer(customer, true);
        Assert.assertNotNull(response);
    }

    @Test
    public void validateAndRetrieveCustomerInValid() {
        Customer customer = new Customer();
        customer.setEmailId("abc@gmail.com");
        customer.setPassword("");
        Mockito.when(customerOperationDAO.validateAndRetrieveCustomer(any(Customer.class), eq(true))).thenReturn(customer);
        Customer response = customerOperationService.validateAndRetrieveCustomer(customer, true);
        Assert.assertNull(response);
    }
}