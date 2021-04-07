package com.example.settlementservice.dao.impl;

import com.example.estockcore.bean.Trade;
import com.example.settlementservice.dao.DAO;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.query.Query;
import org.hibernate.resource.transaction.spi.TransactionStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Transactional
@Component
public class SettleTrade implements DAO {

    @Autowired
    private SessionFactory sessionFactory;

    public SettleTrade(){
    }

    @Override
    public void setSessionFactory(SessionFactory sf){
        this.sessionFactory = sf;
    }

    private List<Trade> settlementTrade(){
        Session session = this.sessionFactory.getCurrentSession();
        try{
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
    public boolean attempt(Trade settlement)
    {
        Session session = this.sessionFactory.getCurrentSession();

        try {
            session.save(settlement);

        } catch (Exception ex) {
            System.out.println("Error while storing stock and trade in db: " + ex.getMessage());
            return false;
        }
        return true;
    }

    public void updateSettlement(){
        try{
            List<Trade> trades = settlementTrade();
            LocalDateTime today=LocalDateTime.now();

            for(Trade t: trades)
            {
                if(today.isAfter(t.getSettlementDate()))
                {
                    t.setSettled(true);
                    attempt(t);
                }
            }
        }
        catch (Exception ex){
            System.out.println(ex.getMessage());
        }
    }

}
