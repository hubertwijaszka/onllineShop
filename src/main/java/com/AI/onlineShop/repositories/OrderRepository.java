package com.AI.onlineShop.repositories;

import com.AI.onlineShop.entities.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order,Long> {

    @Query(
            value = "SELECT * FROM orders  WHERE is_ordered is true",
            nativeQuery = true)
    List<Order> findAllOrdered();
    @Modifying
    @Query( value = "delete from orders  where order_id=:orderId",
    nativeQuery = true)
    void deleteOrder(@Param("orderId") Long orderId);
}
