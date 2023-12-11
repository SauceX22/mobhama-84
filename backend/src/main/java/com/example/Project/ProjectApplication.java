package com.example.Project;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import javax.xml.crypto.Data;
import java.util.ArrayList;
import java.util.Dictionary;

@SpringBootApplication
public class ProjectApplication {
	public static void main(String[] args) {
		SpringApplication.run(ProjectApplication.class, args);
		DataBase.loadUsers();
		DataBase.loadTeams();
		ArrayList<Team> teams = DataBase.getUserTeams("KFUPM");
		if (teams != null) {
			System.out.println("Teams");
			System.out.println(teams);
		}else {
			System.out.println("No teams");
		}
	}
}
