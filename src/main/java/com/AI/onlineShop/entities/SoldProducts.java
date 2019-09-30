package com.AI.onlineShop.entities;


import javax.persistence.*;

@Entity
public class SoldProducts {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long soldId;

  public long getSoldId() {
    return soldId;
  }

  public void setSoldId(long soldId) {
    this.soldId = soldId;
  }

  @JoinColumn(name = "sold_product_id", unique = true)
  @OneToOne( fetch = FetchType.EAGER)
  private Product product;

  @ManyToOne
  @JoinColumn(name ="sold_order_id")
  private Order order;

  public Product getProduct() {
    return product;
  }

  public void setProduct(Product product) {
    this.product = product;
  }

  public Order getOrder() {
    return order;
  }

  public void setOrder(Order order) {
    this.order = order;
  }

  public SoldProducts() {

  }

  private long count;


  public long getCount() {
    return count;
  }

  public void setCount(long count) {
    this.count = count;
  }


}
