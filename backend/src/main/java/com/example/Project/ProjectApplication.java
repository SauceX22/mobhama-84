package com.example.Project;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import javax.xml.crypto.Data;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Date;
import java.util.Dictionary;

@SpringBootApplication
public class ProjectApplication {
	public static void main(String[] args) {
		DataBase.loadUsers();
		DataBase.loadTeams();
		DataBase.loadProjects();
		Date date = new Date();
		System.out.println(date.tim);
		SpringApplication.run(ProjectApplication.class, args);


	}
}
