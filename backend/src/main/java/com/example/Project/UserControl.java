package com.example.Project;


import java.util.ArrayList;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserControl {

    @GetMapping()
    public ArrayList<User> getUserList() {
        return DataBase.getUsers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable String id) {
        User user = DataBase.getUserInfo(id);
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(user);
    }
    @GetMapping("/{id}/teams")
    public ResponseEntity<ArrayList<Team>> getUserTeams(@PathVariable String id) {
        try {
            ArrayList<Team> teams = DataBase.getUserTeams(id);
            return ResponseEntity.ok(teams);
        } catch (Exception e) {
            // Log the exception
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping()
    public ResponseEntity<User> createUser(@RequestParam String name, @RequestParam String phoneNum, @RequestParam String email, @RequestParam String role, @RequestParam String researchInterest, @RequestParam(defaultValue = "https://avatars.githubusercontent.com/u/13651651?v=4") String avatar) {
        if (avatar.isEmpty() || avatar.isBlank()) {
            avatar = "https://avatars.githubusercontent.com/u/13651651?v=4";
        }

        if (role.equals("ADMIN")) {

            Admin user = Admin.create(name, phoneNum, email, avatar);
            DataBase.addUser(user);
            return ResponseEntity.ok(user);
        } else {
            TeamMember user = TeamMember.create(name, phoneNum, email, avatar);
            user.setResearchInterest(researchInterest);
            DataBase.addUser(user);
            return ResponseEntity.ok(user);
        }
    }
    


    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable String id, @RequestParam String name, @RequestParam String phoneNum, @RequestParam String email, @RequestParam String researchInterest, @RequestParam String avatar) {
        
        User newUser = DataBase.updateUserInfo(id, name, phoneNum, email, researchInterest, avatar);
        if (newUser == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
       
        return ResponseEntity.ok(newUser);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteUser(@PathVariable String id) {
        System.out.println("removing " + id);
        boolean removed = DataBase.removeUser(id);
        if (!removed) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(true, HttpStatus.OK);
    }
    

}
