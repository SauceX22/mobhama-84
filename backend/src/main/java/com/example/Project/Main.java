package com.example.Project;

import java.util.ArrayList;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
public class Main {
    public static int x = 0;
    @RequestMapping("/getProjects")
    public ResponseEntity<ArrayList<Project>> getProjects(@RequestParam String userId) {
        ArrayList<Project> projects = DataBase.getUserProjects(userId);
        return ResponseEntity.ok(projects);
    }
    @RequestMapping("/login")
    public ResponseEntity<User> login(@RequestParam String username, @RequestParam String password) {
       String id = DataBase.login(username, password);
       if (id != null) {
           User userInfo = DataBase.getUserInfo(id);
           return ResponseEntity.ok(userInfo);
        }else {
           return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @RequestMapping("/getUserTeams")
    public ResponseEntity<ArrayList<Team>> getUserTeams(@RequestParam String userId) {
        System.out.println("user recieved: " + userId);
        System.out.println("0000-----------------------------------------------------------------");
        try {
            ArrayList<Team> teams = DataBase.getUserTeams(userId);
            System.out.println(teams);
            return ResponseEntity.ok(teams);
        } catch (Exception e) {
            // Log the exception
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


}
