package com.example.settlementservice.service.impl;

import com.example.estockcore.bean.Trade;
import com.example.settlementservice.dao.impl.SettleTradeDAOImpl;
import com.example.settlementservice.service.SettleTrade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
public class SettleTradeServiceImpl implements SettleTrade {

    @Autowired
    SettleTradeDAOImpl dao;

    public SettleTradeServiceImpl() {
    }

    @Override
    public void updateSettlement() {
        List<Trade> trades=retrieveTrade();
        LocalDateTime today=LocalDateTime.now();

        for(Trade t: trades)
        {
            if(today.isAfter(t.getSettlementDate()))
            {
                t.setSettled(true);
                storeTrades(t);
            }
        }
    }

    @Override
    public List<Trade> retrieveTrade() {
        List<Trade> trades=dao.RetrieveTrade();
        return trades;
    }

    @Override
    public boolean storeTrades(Trade trade) {
        return dao.SettleTrade(trade);
    }
}
