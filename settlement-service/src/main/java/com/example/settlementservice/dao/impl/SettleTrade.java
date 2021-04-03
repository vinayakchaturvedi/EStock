package com.example.settlementservice.dao.impl;

import com.example.estockcore.bean.Trade;
import com.example.settlementservice.dao.DAO;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.util.List;

@Component
public class SettleTrade implements DAO {

    @Autowired
    private SessionFactory sessionFactory;

    @Override
    public void setSessionFactory(SessionFactory sf){
        this.sessionFactory = sf;
    }
    private List<Trade> settlementTrade(){
        System.out.println("SHubhi");
        Session session = this.sessionFactory.getCurrentSession();
        System.out.println("mew");
        try{
            System.out.println("Magheshwari");
            CriteriaBuilder criteriaBuilder = session.getCriteriaBuilder();
            CriteriaQuery<Trade> criteriaQuery = criteriaBuilder.createQuery(Trade.class);
            Root<Trade> tradeRoot = criteriaQuery.from(Trade.class);
            CriteriaQuery<Trade> typedQuery =  criteriaQuery.select(tradeRoot);
            TypedQuery<Trade> all = session.createQuery(typedQuery);
            return all.getResultList();
        }
        catch (Exception ex){
            System.out.println(ex.getMessage());
            return null;
        }

    }

    public void updateSettlement(){
        //Session session = this.sessionFactory.getCurrentSession();
        System.out.println("lalalalal");
        try{
            List<Trade> trades = settlementTrade();
            for(Trade t: trades)
            {
                System.out.println(t.getSettlementDate());
            }
        }
        catch (Exception ex){
            System.out.println(ex.getMessage());
        }
    }

}
