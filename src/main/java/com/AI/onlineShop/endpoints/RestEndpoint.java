package com.AI.onlineShop.endpoints;

import com.AI.onlineShop.entities.Product;
import com.AI.onlineShop.services.CategoryService;
import com.AI.onlineShop.services.ProductService;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class RestEndpoint {


    private ProductService productService;
    private CategoryService categoryService;

    @Autowired
    public RestEndpoint(ProductService productService, CategoryService categoryService) {
        this.categoryService = categoryService;
        this.productService = productService;
    }
    @CrossOrigin
    @GetMapping("/products")
    public String products(@RequestParam String categoryId, @RequestParam String filter, @RequestParam String sortOrder,
                           @RequestParam String pageNumber, @RequestParam String pageSize ){
        ObjectMapper objectMapper = new ObjectMapper();
        String result = null;
        try {
             result = objectMapper.writeValueAsString(productService.getProductsByCategoryAndFilter(categoryId,filter));
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return result;
    }
    @CrossOrigin
    @GetMapping("/categories")
    public String categories(){
        ObjectMapper objectMapper = new ObjectMapper();
        String result = null;
        try {
            result = objectMapper.writeValueAsString(categoryService.getAllCategories());
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return result;
    }

}
