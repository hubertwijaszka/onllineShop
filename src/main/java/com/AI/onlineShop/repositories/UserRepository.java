package com.AI.onlineShop.repositories;

import com.AI.onlineShop.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,String> {
}
