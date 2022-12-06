package com.fitzgerald.floorplanmanager;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan("com.fitzgerald.floorplanmanager.entity")
@ComponentScan("com.fitzgerald.floorplanmanager.entity")
@EnableJpaRepositories("com.fitzgerald.floorplanmanager.entity")
public class FloorplanmanagerApplication {

	public static void main(String[] args) {
		SpringApplication.run(FloorplanmanagerApplication.class, args);
	}

}
