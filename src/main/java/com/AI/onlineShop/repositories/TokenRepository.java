package com.AI.onlineShop.repositories;

import com.AI.onlineShop.entities.Token;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TokenRepository extends JpaRepository<Token,Long> {
    List<Token> findByToken(String tokeUUID);
}
