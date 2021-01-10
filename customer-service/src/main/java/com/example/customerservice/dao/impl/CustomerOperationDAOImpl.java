package com.example.customerservice.dao.impl;

import com.example.customerservice.dao.DAO;
import com.example.customerservice.utils.SessionUtil;
import com.example.estockcore.bean.Customer;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.stereotype.Component;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.List;

@Component
public class CustomerOperationDAOImpl implements DAO {

    @Override
    public Session createSession() {
        return SessionUtil.getSessionFactory().openSession();
    }

    @Override
    public void terminateSession(Session session) {
        session.close();
    }

    @Override
    public Customer validateAndRetrieveCustomer(final Customer customer, boolean requirePassword) {
        Session session = SessionUtil.getSessionFactory().openSession();
        try {
            CriteriaBuilder criteriaBuilder = session.getCriteriaBuilder();
            CriteriaQuery<Customer> criteriaQuery = criteriaBuilder.createQuery(Customer.class);
            Root<Customer> customerRoot = criteriaQuery.from(Customer.class);
            criteriaQuery.select(customerRoot);
            Predicate userName = criteriaBuilder.like(customerRoot.get("userName"), customer.getUserName());
            Predicate password = criteriaBuilder.like(customerRoot.get("password"), customer.getPassword());

            if (requirePassword)
                criteriaQuery.where(criteriaBuilder.and(userName, password));
            else
                criteriaQuery.where(userName);

            Query<Customer> query = session.createQuery(criteriaQuery);
            List<Customer> customers = query.getResultList();

            Customer response = customers.isEmpty() ? null : customers.get(0).shallowCopy();
            terminateSession(session);
            return response;

        } catch (Exception ex) {
            terminateSession(session);
            System.out.println(ex.getMessage());
            return null;
        }
    }
}
