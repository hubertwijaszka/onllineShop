package com.AI.onlineShop.repositories;

import com.AI.onlineShop.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product,Long> {
}
