package com.example.customerservice.service.impl;

import com.example.customerservice.dao.impl.CustomerOperationDAOImpl;
import com.example.customerservice.service.Service;
import com.example.estockcore.bean.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CustomerOperationServiceImpl implements Service {

    @Autowired
    CustomerOperationDAOImpl dao;
    public static Long latestTradingAccount = null;

    public CustomerOperationServiceImpl() {
    }

    public void loadLatestTradingAccount() {
        latestTradingAccount = dao.getLastTradingAccount();
        System.out.println("Inside Post construct: " + latestTradingAccount);
    }

    @Override
    public Customer registerCustomer(Customer customer) {
        if (latestTradingAccount == null || latestTradingAccount == 0) {
            loadLatestTradingAccount();
        }
        customer.setTradingAccount(++latestTradingAccount);
        if (!dao.registerCustomer(customer)) {
            latestTradingAccount--;
            return null;
        }
        return customer;
    }

    @Override
    public Customer validateAndRetrieveCustomer(Customer customer, boolean requiredPassword) {
        if (customer.getEmailId() == null || customer.getEmailId().isEmpty()) return null;
        if (requiredPassword && (customer.getPassword() == null || customer.getPassword().isEmpty()))
            return null;
        return dao.validateAndRetrieveCustomer(customer, requiredPassword);
    }
}
