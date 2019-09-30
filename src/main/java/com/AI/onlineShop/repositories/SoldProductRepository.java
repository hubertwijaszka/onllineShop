package com.AI.onlineShop.repositories;

import com.AI.onlineShop.entities.SoldProducts;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SoldProductRepository extends JpaRepository<SoldProducts,Long> {}

