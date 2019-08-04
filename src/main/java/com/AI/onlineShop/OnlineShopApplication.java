package com.AI.onlineShop;

import com.AI.onlineShop.repositories.ProductRepository;
import com.AI.onlineShop.services.ProductService;
import com.mysql.cj.jdbc.MysqlDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import javax.sql.DataSource;

@SpringBootApplication
public class OnlineShopApplication {

	public static void main(String[] args) {
		SpringApplication.run(OnlineShopApplication.class, args);
	}

	@Bean
	public DataSource dataSource() {

		MysqlDataSource ds = new MysqlDataSource();
		ds.setUrl("jdbc:mysql://127.0.0.1:6033/online_shop" +
				"?useTimezone=true&serverTimezone=UTC");

		ds.setUser("root");
		ds.setPassword("");
		return ds;
	}
}
