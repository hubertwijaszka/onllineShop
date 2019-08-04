package com.AI.onlineShop.services;

import com.AI.onlineShop.entities.Product;
import com.AI.onlineShop.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private ProductRepository productRepository;

    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getAllProducts(){
        return productRepository.findAll();
    }
    public void insertProduct(){
        Product product = new Product("komputer","komputer do grania w komputer",2200,"C:\\Users\\hp\\Downloads\\timkod\\onlineShop\\images\\komputer");
        productRepository.save(product);
    }
}
