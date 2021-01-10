package com.example.customerservice.dao;

import com.example.estockcore.bean.Customer;
import org.hibernate.Session;

public interface DAO {

    public Session createSession();

    public void terminateSession(Session session);

    public Customer validateAndRetrieveCustomer(final Customer customer, boolean requirePassword);

}
