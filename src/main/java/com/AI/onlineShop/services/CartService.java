package com.AI.onlineShop.services;

import com.AI.onlineShop.beans.Cart;
import com.AI.onlineShop.entities.Product;
import com.AI.onlineShop.pojo.ProductCount;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;


@Service
public class CartService {

    private Cart cart;

    @Autowired
    public void CartSevice(Cart cart){
        this.cart = cart;
    }

    public void addProductToCart(int count, String productId, String productName, String productPrice){
        List<ProductCount> productInCart = cart.getProductInCart();
        if(productInCart == null){
            productInCart = new ArrayList<ProductCount>();
        }
        long productIdL = new Long(productId).longValue();
        productInCart = productInCart.stream().filter(p -> p.getProduct().getProdId() != productIdL).collect(Collectors.toList());
        productInCart.add(new ProductCount(new Product(productName,new Double(productPrice), new Long(productId)),count));
        cart.setProductInCart((ArrayList<ProductCount>)productInCart);
    }
    public ArrayList<ProductCount>  getProductsFromCart(){
        return this.cart.getProductInCart();
    }
}
