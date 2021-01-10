package com.example.customerservice.service.impl;

import com.example.customerservice.dao.DAO;
import com.example.customerservice.service.Service;
import com.example.estockcore.bean.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CustomerOperationServiceImpl implements Service {

    @Autowired
    private DAO dao;

    @Override
    public Customer registerCustomer(Customer customer) {
        return null;
    }

    @Override
    public Customer validateLogin(Customer customer) {
        if (customer.getUserName().isEmpty() || customer.getPassword().isEmpty()) return null;
        return dao.validateAndRetrieveCustomer(customer, true);
    }
}
