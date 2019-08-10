package com.AI.onlineShop.services;

import com.AI.onlineShop.entities.Category;
import com.AI.onlineShop.repositories.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CategoryService {

    private CategoryRepository categoryRepository;

    @Autowired
    public void CategoryRepository(CategoryRepository categoryRepository){
        this.categoryRepository = categoryRepository;
    }

    public List<Category> getAllCategories(){
        return categoryRepository.findAll();
    }
}
