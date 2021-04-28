package com.example.settlementservice.dao;

import com.example.estockcore.bean.Trade;
import org.hibernate.SessionFactory;

import java.util.List;

public interface DAO {
    public void setSessionFactory(SessionFactory sessionFactory);
    public List<Trade>  RetrieveTrade();
    public boolean SettleTrade(Trade trades);
}
