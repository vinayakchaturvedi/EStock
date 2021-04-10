package com.example.settlementservice.service;

import com.example.estockcore.bean.Trade;

import java.util.List;

public interface SettleTrade {
    public void updateSettlement();
    public List<Trade>  retrieveTrade();
    public boolean storeTrades(Trade trade);

}
