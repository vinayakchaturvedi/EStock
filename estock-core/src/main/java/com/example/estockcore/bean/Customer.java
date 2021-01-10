package com.example.estockcore.bean;

import javax.persistence.*;

@Entity
public class Customer implements Cloneable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer customerId;              //Primary Key
    @Column(nullable = false)
    private String customerName;
    @Column(nullable = false)
    private String userName;
    @Column(nullable = false)
    private String password;
    @Column(nullable = false, unique = true)
    private String emailId;
    @Column(nullable = false, unique = true)
    private Integer contactNumber = Integer.MAX_VALUE;

    public Customer() {
    }

    public Customer(Integer customerId,
                    String customerName,
                    String userName,
                    String password,
                    String emailId,
                    Integer contactNumber) {
        this.customerId = customerId;
        this.customerName = customerName;
        this.userName = userName;
        this.password = password;
        this.emailId = emailId;
        this.contactNumber = contactNumber;
    }

    public Integer getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Integer customerId) {
        this.customerId = customerId;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmailId() {
        return emailId;
    }

    public void setEmailId(String emailId) {
        this.emailId = emailId;
    }

    public Integer getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(Integer contactNumber) {
        this.contactNumber = contactNumber;
    }

    @Override
    public String toString() {
        return "Customer{" +
                "customerId=" + customerId +
                ", customerName='" + customerName + '\'' +
                ", userName='" + userName + '\'' +
                ", password='" + password + '\'' +
                ", emailId='" + emailId + '\'' +
                ", contactNumber=" + contactNumber +
                '}';
    }

    protected Object clone() throws CloneNotSupportedException {
        return super.clone();
    }

    public Customer shallowCopy() throws CloneNotSupportedException {
        Customer clonedCustomer = (Customer) this.clone();

        return clonedCustomer;
    }
}
