package com.example.customerservice.controller;

import com.example.customerservice.service.Service;
import com.example.estockcore.bean.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("customer")
public class CustomerOperation {

    @Autowired
    private Service service;

    @GetMapping("/validateLogin, " +
            "consumes = \"application/json, " +
            "produces = \"application/json")
    public ResponseEntity<Customer> validateLogin(@RequestBody Customer customer) {
        Customer response = service.validateLogin(customer);
        if (response == null) return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(customer, HttpStatus.OK);
    }
}
