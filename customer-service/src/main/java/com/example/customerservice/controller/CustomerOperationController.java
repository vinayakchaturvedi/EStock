package com.example.customerservice.controller;

import com.example.customerservice.service.impl.CustomerOperationServiceImpl;
import com.example.estockcore.bean.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("customer")
public class CustomerOperationController {

    @Autowired
    private CustomerOperationServiceImpl service;

    @PostMapping(path = "/validateLogin",
            produces = {"application/json"},
            consumes = {"application/json"})
    public ResponseEntity<Customer> validateLogin(@RequestBody Customer customer) {
        System.out.println("Sign in " + customer);
        Customer response = service.validateAndRetrieveCustomer(customer, true);
        if (response == null) return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping(path = "/registerCustomer",
            produces = {"application/json"},
            consumes = {"application/json"})
    public ResponseEntity<Customer> registerCustomer(@RequestBody Customer customer) {
        System.out.println("Sign up " + customer);
        Customer response = service.registerCustomer(customer);
        if (response == null) return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(customer, HttpStatus.OK);
    }

    @PostMapping(path = "/getCustomer",
            produces = {"application/json"},
            consumes = {"application/json"})
    public ResponseEntity<Customer> getCustomer(@RequestBody Customer customer) {
        Customer response = service.validateAndRetrieveCustomer(customer, false);
        if (response == null) return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
