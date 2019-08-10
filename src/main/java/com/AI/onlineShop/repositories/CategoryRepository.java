package com.AI.onlineShop.repositories;

import com.AI.onlineShop.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category,Long> {
}
