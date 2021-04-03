package com.example.settlementservice.dao;

import org.hibernate.SessionFactory;

public interface DAO {
    void setSessionFactory(SessionFactory sessionFactory);
}
