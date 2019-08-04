package com.AI.onlineShop.entities;




import javax.persistence.*;

@Table(name = "products")
@Entity
public class Product {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private long prodId;
    private String productName;
    private String description;
    private double price;
    private long prodCategoryId;
    private String imageUrl;

    public Product() {
    }

    public Product( String productName, String description, double price, String imageUrl) {
        this.productName = productName;
        this.description = description;
        this.price = price;
        this.imageUrl = imageUrl;
    }

    public Product( String productName, String description, double price, long prodCategoryId, String imageUrl) {
        this.productName = productName;
        this.description = description;
        this.price = price;
        this.prodCategoryId = prodCategoryId;
        this.imageUrl = imageUrl;
    }

    public long getProdId() {
        return prodId;
    }

    public void setProdId(long prodId) {
        this.prodId = prodId;
    }


    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }


    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }


    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }


    public long getProdCategoryId() {
        return prodCategoryId;
    }

    public void setProdCategoryId(long prodCategoryId) {
        this.prodCategoryId = prodCategoryId;
    }


    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

}


