package com.AI.onlineShop.entities;


import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Table(name = "orders")
@Entity
public class Order {
    @Id
    private long orderId;
    private long orderClientId;
    private long isComplete;
    private String address;


    public long getOrderId() {
        return orderId;
    }

    public void setOrderId(long orderId) {
        this.orderId = orderId;
    }


    public long getOrderClientId() {
        return orderClientId;
    }

    public void setOrderClientId(long orderClientId) {
        this.orderClientId = orderClientId;
    }


    public long getIsComplete() {
        return isComplete;
    }

    public void setIsComplete(long isComplete) {
        this.isComplete = isComplete;
    }


    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

}
