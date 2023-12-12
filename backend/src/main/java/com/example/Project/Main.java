package com.example.Project;

import java.util.ArrayList;
import java.util.Dictionary;
import java.util.List;

import javax.xml.crypto.Data;

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
    @RequestMapping("/getTeamById")
    public ResponseEntity<Team> getTeamById(@RequestParam String teamId) {
        Team team = DataBase.getTeamById(teamId);
        return ResponseEntity.ok(team);
    }
    @RequestMapping("/createTeam")
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
    @RequestMapping("/addUserToTeam")
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

    @RequestMapping("/getUser")
    public static ResponseEntity<User> getUser(@RequestParam String id) {
        User user = DataBase.getUserInfo(id);
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(user);
    }

    @RequestMapping("/getUsers") 
    public ResponseEntity<ArrayList<User>> getUsers() {
        ArrayList<User> users = DataBase.getUsers();
        return ResponseEntity.ok(users);
    }

    @RequestMapping("/createUser")
    public ResponseEntity<User> createUser(@RequestParam String name, @RequestParam String phoneNum, @RequestParam String email, @RequestParam String password, @RequestParam String type, @RequestParam String researchInterest) {
        if (type.equals("Admin")) {
            Admin user = Admin.create(name, phoneNum, email);
            DataBase.addUser(user);
            return ResponseEntity.ok(user);
        } else {
            TeamMember user = TeamMember.create(name, phoneNum, email);
            user.setResearchInterest(researchInterest);
            DataBase.addUser(user);
            return ResponseEntity.ok(user);
        }
    }
        
    @RequestMapping("/createProject")
    public ResponseEntity<Project> createProject(@RequestParam String name, @RequestParam String teamId) {
        Team team = DataBase.getTeamById(teamId);
        if (team == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Project project = Project.create(name, team);
        DataBase.addProject(project);
        return ResponseEntity.ok(project);
    }

    @RequestMapping("/getAllProjects")
    public ResponseEntity<ArrayList<Project>> getAllProjects() {
        ArrayList<Project> projects = DataBase.getProjects();
        return ResponseEntity.ok(projects);
    }
    @RequestMapping("/assignTeamToProject")
    public ResponseEntity<Project> assignTeamToProject(@RequestParam String projectId, @RequestParam String teamId) {
        Project project = DataBase.getProjectById(projectId);
        if (project == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Team team = DataBase.getTeamById(teamId);
        if (team == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        DataBase.removeProject(project);
        project.assignTeam(team);
        DataBase.addProject(project);
        return ResponseEntity.ok(project);
    }
    @RequestMapping("/getProjectById")
    public ResponseEntity<Project> getProjectById(@RequestParam String projectId) {
        Project project = DataBase.getProjectById(projectId);
        if (project == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(project);
    }
    @RequestMapping("/getTeamProjects")
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

    @RequestMapping("/getAllMachines")
    public ResponseEntity<ArrayList<Machine>> getAllMachines() {
        ArrayList<Machine> machines = DataBase.getMachines();
        return ResponseEntity.ok(machines);
    }
    @RequestMapping("/getMachineById")
    public ResponseEntity<Machine> getMachineById(@RequestParam String machineId) {
        Machine machine = DataBase.getMachineById(machineId);
        if (machine == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(machine);
    }

    @RequestMapping("/createMachine")
    public ResponseEntity<Machine> createMachine(@RequestParam String name, @RequestParam String status) {
        Machine machine = Machine.create(name);
        DataBase.addMachine(machine);
        return ResponseEntity.ok(machine);
    }
    @RequestMapping("/changeMachineStatus")
    public ResponseEntity<Machine> changeMachineStatus(@RequestParam String machineId, @RequestParam String status) {
        Machine machine = DataBase.getMachineById(machineId);
        if (machine == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        DataBase.removeMachine(machine);
        machine.setStatus(status);
        DataBase.addMachine(machine);
        return ResponseEntity.ok(machine);
    }    
    

}
