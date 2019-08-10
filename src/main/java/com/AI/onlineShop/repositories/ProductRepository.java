package com.AI.onlineShop.repositories;

import com.AI.onlineShop.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product,Long> {

    List<Product> findByProdCategoryId(Long categoryId);
}
