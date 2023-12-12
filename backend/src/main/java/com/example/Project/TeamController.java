package com.example.Project;


import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/Team")
public class TeamController {
    @GetMapping()
    public ResponseEntity<ArrayList<Team>> getTeams() {
        return ResponseEntity.ok(DataBase.getTeams());
    }
    @GetMapping("/{id}")
    public ResponseEntity<Team> getTeamById(@RequestParam String teamId) {
        Team team = DataBase.getTeamById(teamId);
        return ResponseEntity.ok(team);
    }
    @GetMapping("/{id}/projects")
    public ResponseEntity<ArrayList<Project>> getTeamProjects(@RequestParam String teamId) {
        Team team = DataBase.getTeamById(teamId);
        if (team == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        ArrayList<Project> projects = new ArrayList<>();
        for (String id: team.getProjectIds()) {
            Project project = DataBase.getProjectById(id);
            if (project != null) {
                projects.add(project);
            }
        }
        return ResponseEntity.ok(projects);
    }

    @GetMapping("/{id}/reservations")
    public ResponseEntity<ArrayList<Reservation>> getTeamReservations(@RequestParam String teamId) {
        ArrayList<Reservation> reservations = DataBase.getTeamReservations(teamId);
        return ResponseEntity.ok(reservations);
    }
    

    @PostMapping()
    public ResponseEntity<Team> createTeam(@RequestParam String name, @RequestParam List<String> usersIds) {
        Team team = Team.create(name);
        for (String id : usersIds) {
            User user = DataBase.getUserInfo(id);
            if (user != null) {
                team.addMember(DataBase.getUserInfo(id));
            }
        }
        DataBase.addTeam(team);
        return ResponseEntity.ok(team);
    }
    
    @PutMapping("/addUser/{id}")
    public ResponseEntity<Team> addUserToTeam(@RequestParam String userId, @RequestParam String teamId) {
        Team team = DataBase.getTeamById(teamId);
        if (team == null) {
            System.out.println("Team not found");
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        User user = DataBase.getUserInfo(userId);
        if (user == null) {
            System.out.println("user not found");
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        if (team.getMembers().contains(user)) {
            System.out.println("User exist in team");
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        
        DataBase.removeTeam(team);
        team.addMember(user);
        DataBase.addTeam(team);
        DataBase.saveTeams();
        return ResponseEntity.ok(team);
    }
    


}
