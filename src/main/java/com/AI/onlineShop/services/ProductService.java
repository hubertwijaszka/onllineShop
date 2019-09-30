package com.AI.onlineShop.services;

import com.AI.onlineShop.entities.Product;
import com.AI.onlineShop.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {

    private ProductRepository productRepository;

    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    private List<Product> getAllProducts() {
        List<Product> products = productRepository.findAllProduct();
        return prepareEncodeImages(products);
    }

    private List<Product> prepareEncodeImages(List<Product> products) {
        for (Product product : products) {
            if(product.getImageUrl()!= null) {
                product.setEncodeImage(getEncodeImage(product.getImageUrl()));
            }
        }
        return products;
    }

    public void insertProduct() {
        Product product = new Product("komputer", "komputer do grania w komputer", 2200, "C:\\Users\\hp\\Downloads\\timkod\\onlineShop\\images\\komputer");
        productRepository.save(product);
    }

    private String getEncodeImage(String url) {
        Path path = Paths.get(url + ".jpg");
        String result = null;
        try {
            byte[] bArray = Files.readAllBytes(path);
            result = "data:image/png;base64, " + Base64.getEncoder().encodeToString(bArray);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return result;
    }

    public List<Product> getProductsByCategoryAndFilter(String categoryId, String filter) {
        Long categoryIdLong = new Long(categoryId);
        List<Product> products;
        if (categoryIdLong == -1) {
            products = getAllProducts();
        }
        else{
            products = productRepository.findByProdCategoryId(categoryIdLong);
        }
        if (filter != null && !filter.isEmpty()) {
            products = products.stream().filter(c -> (c.getProductName().contains(filter) || c.getDescription().contains(filter)) && !c.isDeleted())
                    .collect(Collectors.toList());
        }
        return prepareEncodeImages(products);
    }

    public void deleteProduct(String productId) {
        Product product = productRepository.findById(new Long(productId)).get();
        product.setDeleted(true);
        productRepository.save(product);
    }
}
