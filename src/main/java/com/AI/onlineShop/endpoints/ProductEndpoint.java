package com.AI.onlineShop.endpoints;

import com.AI.onlineShop.entities.Product;
import com.AI.onlineShop.services.ProductService;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ProductEndpoint {


    private ProductService productService;

    @Autowired
    public ProductEndpoint(ProductService productService) {
        this.productService = productService;
    }
    @CrossOrigin
    @GetMapping("/products")
    public String products(){
        ObjectMapper objectMapper = new ObjectMapper();
        String result = null;
        try {
             result = objectMapper.writeValueAsString(productService.getAllProducts());
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return result;
    }
}
