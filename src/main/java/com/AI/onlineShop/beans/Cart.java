package com.AI.onlineShop.beans;

import com.AI.onlineShop.pojo.ProductCount;
import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.SessionScope;

import java.util.ArrayList;
import java.util.LinkedList;

@Component
public class Cart {
    private ArrayList<ProductCount> productInCart;

    public ArrayList<ProductCount> getProductInCart() {
        return productInCart;
    }

    public void setProductInCart(ArrayList<ProductCount> productInCart) {
        this.productInCart = productInCart;
    }
}
