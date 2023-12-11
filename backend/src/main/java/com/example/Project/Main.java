package com.example.Project;

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

    
}
