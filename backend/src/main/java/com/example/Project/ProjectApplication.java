package com.example.Project;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;




@SpringBootApplication
public class ProjectApplication {
	public static void main(String[] args) {
		DataBase.load();
		SpringApplication.run(ProjectApplication.class, args);


	}
}
