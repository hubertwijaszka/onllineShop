package com.AI.onlineShop.services;

import com.AI.onlineShop.entities.Order;
import com.AI.onlineShop.entities.Product;
import com.AI.onlineShop.entities.SoldProducts;
import com.AI.onlineShop.entities.User;
import com.AI.onlineShop.pojo.ProductCount;
import com.AI.onlineShop.repositories.OrderRepository;
import com.AI.onlineShop.repositories.ProductRepository;
import com.AI.onlineShop.repositories.SoldProductRepository;
import com.AI.onlineShop.repositories.UserRepository;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManagerFactory;
import java.util.ArrayList;
import java.util.Set;



@Service
public class CartService {

    private UserRepository userRepository;
    private ProductRepository productRepository;
    private SoldProductRepository soldProductRepository;
    private OrderRepository orderRepository;
    private SessionFactory hibernateFactory;

    @Autowired
    public void creatingSession(EntityManagerFactory factory) {
        if(factory.unwrap(SessionFactory.class) == null){
            throw new NullPointerException("factory is not a hibernate factory");
        }
        this.hibernateFactory = factory.unwrap(SessionFactory.class);
    }

    @Autowired
    public void CartSevice(UserRepository userRepository, ProductRepository productRepository,
                           SoldProductRepository soldProductRepository, OrderRepository orderRepository){
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.soldProductRepository = soldProductRepository;
        this.orderRepository = orderRepository;
    }

    public void addProductToCart(int count, String productId, String username, boolean add){
        User user = userRepository.getOne(username);
        Order order = getCartOrder(user);
        Set<SoldProducts> productsInCart = order.getSoldProducts();
        SoldProducts soldProductsInCart = getProductInCart(productRepository.findById(new Long(productId)).get(), productsInCart,order);
        if(add){
            soldProductsInCart.setCount(soldProductsInCart.getCount()+1);
            soldProductRepository.save(soldProductsInCart);
        }
        else{
            if(count == 0){
                soldProductRepository.deleteById(soldProductsInCart.getSoldId());
            }
            else{
                soldProductsInCart.setCount(count);
                soldProductRepository.save(soldProductsInCart);
            }
        }

    }

    private SoldProducts getProductInCart(Product product, Set<SoldProducts> productsInCart, Order order) {
        SoldProducts result = null;
        for(SoldProducts product1 : productsInCart){
            if( product1.getProduct().getProdId() == product.getProdId()){
                result = product1;
                break;
            }
        }
        if(result == null){
            result = new SoldProducts();
            result.setOrder(order);
            result.setProduct(product);
            productsInCart.add(result);
            soldProductRepository.save(result);
        }
        return result;
    }

    public ArrayList<ProductCount>  getProductsFromCart(String username, String orderId){
        User user = userRepository.getOne(username);
        Order cartOrder = getCartOrder(user,new Long(orderId));
        ArrayList<ProductCount> result = new ArrayList<>();
        for(SoldProducts soldProducts : cartOrder.getSoldProducts()){
            result.add(new ProductCount(soldProducts.getProduct(),soldProducts.getCount()));
        }
        return result;
    }

    private Order getCartOrder(User user){
        Order productInCart = null;
        for(Order order: user.getOrders()){
            if(order.isOrdered() == false){
                productInCart = order;
                break;
            }
        }
        if(productInCart == null){
            productInCart = new Order(user);
            user.getOrders().add(productInCart);
            orderRepository.save(productInCart);
        }
        return productInCart;
    }
    private Order getCartOrder(User user, Long orderId){
        Order productInCart = null;
        if(orderId == -1){
            return getCartOrder(user);
        }
        else{
            for(Order order: orderRepository.findAll()){
                if(order.getOrderId() == orderId){
                    productInCart = order;
                    break;
                }
            }
            return productInCart;
        }
    }

    public void buy(String username) {
        User user = userRepository.getOne(username);
        Order cartOrder = getCartOrder(user);
        cartOrder.setOrdered(true);
        orderRepository.save(cartOrder);
    }
}
