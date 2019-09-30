package com.AI.onlineShop.services;

import com.AI.onlineShop.entities.Order;
import com.AI.onlineShop.entities.Product;
import com.AI.onlineShop.entities.User;
import com.AI.onlineShop.repositories.OrderRepository;
import com.AI.onlineShop.repositories.ProductRepository;
import com.AI.onlineShop.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Component
@Secured("ROLE_ADMIN")
public class AdminService {
    private UserRepository userRepository;
    private OrderRepository orderRepository;
    private ProductRepository productRepository;


    @Autowired
    public AdminService(UserRepository userRepository, OrderRepository orderRepository, ProductRepository productRepository) {
        this.userRepository = userRepository;
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
    }

    public List<User> getUsers(){
        return userRepository.findAll();
    }
    public void deleteUser(String username){
        userRepository.deleteById(username);
    }

    public void saveUser(String username, String mail) {
        User user = userRepository.findById(username).get();
        user.setMail(mail);
        userRepository.save((user));
    }

    public List<Order> getOrders() {
            return orderRepository.findAllOrdered();
    }
    @Transactional
    public void deleteOrder(String orderId) {
        orderRepository.deleteOrder(new Long(orderId));
    }

    public void saveProduct(Product product) {
        /*saveImage(product);*/
        productRepository.save(product);

    }
 /*   private void saveImage(Product product){
        try {
            String path = "C:\\Users\\hp\\Downloads\\timkod\\onlineShop\\images\\" + product.getProductName() + ".jpg";
            product.setImageUrl(path);
            BufferedImage image = ImageIO.read( new ByteArrayInputStream( product.getEncodeImage().getBytes()) );
            ImageIO.write(image, "JPEG", new File("filename.bmp"));
            *//*OutputStream os = new FileOutputStream(path);
            os.write(product.getEncodeImage().getBytes());
            os.close();*//*
        } catch (IOException e) {
            e.printStackTrace();
        }
    }*/
    public String testMethod() {
        return "ok";
    }
}
