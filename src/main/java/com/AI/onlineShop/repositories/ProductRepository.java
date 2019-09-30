package com.AI.onlineShop.repositories;

import com.AI.onlineShop.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product,Long> {
    @Query(
            value = "SELECT * FROM products  WHERE is_deleted is false && prod_category_id = :categoryId ",
            nativeQuery = true)
    List<Product> findByProdCategoryId(Long categoryId);
    @Query(
            value = "SELECT * FROM products  WHERE is_deleted is false ",
            nativeQuery = true)
    public List<Product> findAllProduct();
}
