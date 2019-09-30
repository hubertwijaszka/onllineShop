package com.AI.onlineShop.endpoints;

import com.AI.onlineShop.entities.Product;
import com.AI.onlineShop.pojo.User;
import com.AI.onlineShop.services.*;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
public class RestEndpoint {


    private ProductService productService;
    private CategoryService categoryService;
    private CartService cartService;
    private RegistrationService registrationService;
    private AdminService adminService;

    @Autowired
    public RestEndpoint(ProductService productService,
                        CategoryService categoryService, CartService cartService,
                        RegistrationService registrationService,
                        AdminService adminService) {
        this.categoryService = categoryService;
        this.adminService = adminService;
        this.productService = productService;
        this.cartService = cartService;
        this.registrationService = registrationService;
    }
    @CrossOrigin
    @GetMapping("/free/products")
    public String products(@RequestParam String categoryId, @RequestParam String filter, @RequestParam String sortOrder,
                           @RequestParam String pageNumber, @RequestParam String pageSize ){
        ObjectMapper objectMapper = new ObjectMapper();
        String result = null;
        try {
             result = objectMapper.writeValueAsString(productService.getProductsByCategoryAndFilter(categoryId,filter));
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return result;
    }
    @CrossOrigin
    @GetMapping("/free/categories")
    public String categories(){
        ObjectMapper objectMapper = new ObjectMapper();
        String result = null;
        try {
            result = objectMapper.writeValueAsString(categoryService.getAllCategories());
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return result;
    }
    @CrossOrigin
    @GetMapping("/addToCart")
    public String addToCart(@RequestParam String productId,
                            @RequestParam String count, Authentication authentication){
        cartService.addProductToCart(new Integer(count), productId,authentication.getName(),true);
        return null;
    }
    @CrossOrigin
    @GetMapping("/getProductsInCart")
    public String getProductsFromCart(Authentication authentication, @RequestParam String orderId){
        ObjectMapper objectMapper = new ObjectMapper();
        String result = null;
        try {
            result = objectMapper.writeValueAsString(cartService.getProductsFromCart(authentication.getName(), orderId));
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return result;
    }
    @CrossOrigin
    @GetMapping("/changeProductInCart")
    public void changeProductInCart(@RequestParam String productId, @RequestParam String count, Authentication authentication){
            cartService.addProductToCart(new Integer(count), productId, authentication.getName(),false);
    }
    @CrossOrigin
    @GetMapping(produces = "application/json")
    @RequestMapping({ "/validateLogin" })
    public User validateLogin() {
        return new User("User successfully authenticated");
    }

    @CrossOrigin
    @GetMapping(produces = "application/json")
    @RequestMapping({ "/isAdmin" })
    public User checkAdminRights() {
        try {
            adminService.testMethod();
        } catch (Exception e) {
            return null;
        }
        return new User("true");
    }

    @CrossOrigin
    @GetMapping(produces = "application/json")
    @RequestMapping({ "/free/registration" })
    public User registration(@RequestParam String username, @RequestParam String mail, @RequestParam String password) {
        registrationService.saveNewUser(username,mail,password);
        return new User("User successfully authenticated");
    }
    @CrossOrigin
    @RequestMapping({ "/free/resetPassword" })
    public String registration(@RequestParam String username, @RequestParam String mail) {
        registrationService.resetPassword(username,mail);
        return "ok";
    }
    @CrossOrigin
    @GetMapping
    @RequestMapping({ "/free/confirm" })
    public String registration(@RequestParam String token) {
        if(registrationService.activateAccount(token)){
            return "Your account is active now! Try to login on : http://localhost:4200/login";
        }
        else{
            return "Something went wrong ;(";
        }
    }

    @CrossOrigin
    @GetMapping
    @RequestMapping({ "/buy" })
    public String buy(Authentication authentication) {
        cartService.buy(authentication.getName());
        return "ok";
    }
    @CrossOrigin
    @GetMapping("/getUsers")
    public String getUsers(){
        ObjectMapper objectMapper = new ObjectMapper();
        String result = null;
        try {
            result = objectMapper.writeValueAsString(adminService.getUsers());
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return result;
    }
    @CrossOrigin
    @GetMapping
    @RequestMapping({ "/changeUsers" })
    public String changeUsers(@RequestParam String username, @RequestParam String mail) {
        adminService.saveUser(username,mail);
        return "ok";
    }
    @CrossOrigin
    @GetMapping
    @RequestMapping({ "/deleteUsers" })
    public String deleteUsers(@RequestParam String username) {
        adminService.deleteUser(username);
        return "ok";
    }


    @CrossOrigin
    @GetMapping
    @RequestMapping({ "/deleteProducts" })
    public String deleteProducts(@RequestParam String productId) {
        productService.deleteProduct(productId);
        return "ok";
    }
    @CrossOrigin
    @GetMapping("/getOrders")
    public String getOrders(){
        ObjectMapper objectMapper = new ObjectMapper();
        String result = null;
        try {
            result = objectMapper.writeValueAsString(adminService.getOrders());
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return result;
    }

    @CrossOrigin
    @GetMapping
    @RequestMapping( "/deleteOrders" )
    public String deleteOrders(@RequestParam String orderId) {
        adminService.deleteOrder(orderId);
        return "ok";
    }

    @CrossOrigin
    @PostMapping(consumes = "multipart/form-data")
    @RequestMapping( "/uploadProduct" )
    public String uploadProduct(@RequestBody Product product) {
        adminService.saveProduct(product);
        return "ok";
    }


}
