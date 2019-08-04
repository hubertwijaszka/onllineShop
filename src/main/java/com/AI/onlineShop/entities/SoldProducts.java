package com.AI.onlineShop.entities;


import javax.persistence.Entity;


public class SoldProducts {

  private long soldOrderId;
  private long soldProductId;
  private long count;


  public long getSoldOrderId() {
    return soldOrderId;
  }

  public void setSoldOrderId(long soldOrderId) {
    this.soldOrderId = soldOrderId;
  }


  public long getSoldProductId() {
    return soldProductId;
  }

  public void setSoldProductId(long soldProductId) {
    this.soldProductId = soldProductId;
  }


  public long getCount() {
    return count;
  }

  public void setCount(long count) {
    this.count = count;
  }

}
