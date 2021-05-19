package com.example.customerservice.controller;

import com.example.customerservice.service.impl.CustomerOperationServiceImpl;
import com.example.estockcore.bean.Customer;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.hamcrest.Matchers.is;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(MockitoJUnitRunner.class)
public class CustomerOperationControllerTest {

    @Autowired
    private MockMvc mvc;
    @Mock
    private CustomerOperationServiceImpl customerOperationService;
    @InjectMocks
    private CustomerOperationController customerOperationController = new CustomerOperationController();

    @Before
    public void initMocks() {
        mvc = MockMvcBuilders.standaloneSetup(customerOperationController).build();
        MockitoAnnotations.initMocks(this);
    }


    @Test
    public void testRegisterCustomer() throws Exception {
        Customer customer = new Customer();
        customer.setCustomerName("Rick");
        when(customerOperationService.registerCustomer(any(Customer.class))).thenReturn(customer);
        final ResultActions result =
                mvc.perform(
                        post("/customer/registerCustomer")
                                .content("{ \"customerName\": \"Rick\" }")
                                .contentType(MediaType.APPLICATION_JSON));

        result.andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.customerName", is("Rick")));
    }

    @Test
    public void testValidateLogin() throws Exception {
        Customer customer = new Customer();
        customer.setCustomerName("Rick");
        when(customerOperationService.validateAndRetrieveCustomer(any(Customer.class), eq(true))).thenReturn(customer);
        final ResultActions result =
                mvc.perform(
                        post("/customer/validateLogin")
                                .content("{ \"customerName\": \"Rick\" }")
                                .contentType(MediaType.APPLICATION_JSON));

        result.andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.customerName", is("Rick")));
    }
}