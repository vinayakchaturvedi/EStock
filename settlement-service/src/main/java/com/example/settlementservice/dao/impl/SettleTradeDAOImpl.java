package com.example.settlementservice.dao.impl;

import com.example.estockcore.bean.Trade;
import com.example.settlementservice.dao.DAO;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import java.util.List;

@Transactional
@Component
public class SettleTradeDAOImpl implements DAO {

    @Autowired
    private SessionFactory sessionFactory;

    public SettleTradeDAOImpl(){
    }

    @Override
    public void setSessionFactory(SessionFactory sf){
        this.sessionFactory = sf;
    }

    @Override
    public List<Trade> RetrieveTrade() {
        Session session=this.sessionFactory.getCurrentSession();
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

    @Override
    public boolean SettleTrade(Trade trade) {
        Session session = this.sessionFactory.getCurrentSession();

        try {
            session.update(trade);

        } catch (Exception ex) {
            System.out.println("Error while storing stock and trade in db: " + ex.getMessage());
            return false;
        }
        return true;
    }



}
