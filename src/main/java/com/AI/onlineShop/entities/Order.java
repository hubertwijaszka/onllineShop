package com.AI.onlineShop.entities;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Table(name = "orders")
@Entity
public class Order {
    @Id
    private long orderId;
    @JsonProperty("completed")
    private boolean isComplete;
    @JsonIgnore
    private boolean isOrdered;
    private String address;

    public Order() {
    }

    public Order(boolean isOrdered) {
        this.isOrdered = isOrdered;
    }

    public long getOrderId() {
        return orderId;
    }



    public boolean isComplete() {
        return isComplete;
    }

    public void setComplete(boolean complete) {
        isComplete = complete;
    }

    public boolean isOrdered() {
        return isOrdered;
    }

    public void setOrdered(boolean ordered) {
        isOrdered = ordered;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
    @JsonIgnore
    @OneToMany(mappedBy="order", fetch = FetchType.EAGER)
    Set<SoldProducts> soldProducts = new HashSet();

    @ManyToOne
    @JoinColumn(name ="username")
    private User user;

    public Set<SoldProducts> getSoldProducts() {
        return soldProducts;
    }

    public void setSoldProducts(Set<SoldProducts> soldProducts) {
        this.soldProducts = soldProducts;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Order(User user) {
        this.user = user;
    }
}
