package com.example.Project;

import java.util.ArrayList;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
public class Main {
    public static int x = 0;
    @RequestMapping("/login")
    public ResponseEntity<User> login(@RequestParam String username, @RequestParam String password) {
        x += 1;
       String id = DataBase.login(username, password);
       if (id != null) {
           User userInfo = DataBase.getUserInfo(id);
           userInfo.setPhoneNum(Integer.toString(x));
           return ResponseEntity.ok(userInfo);
        }else {
           return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @RequestMapping("/getTeams")
    public ResponseEntity<ArrayList<Team>> getTeams(@RequestParam String userId) {
        ArrayList<Team> teams = DataBase.getUserTeams(userId);
        if (teams != null) {
            return ResponseEntity.ok(teams);
        }else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    
}
