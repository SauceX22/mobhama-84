package com.example.Project;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/Project")
public class ProjectController {
    // Projects
    @GetMapping()
    public ResponseEntity<ArrayList<Project>> getAllProjects() {
        ArrayList<Project> projects = DataBase.getProjects();
        return ResponseEntity.ok(projects);
    }

    @PostMapping()
    public ResponseEntity<Project> createProject(@RequestParam String name, @RequestParam String teamId) {
        Team team = DataBase.getTeamById(teamId);

        
        if (team == null) {
            System.out.println("team not found");
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        System.out.println("Team" + team.getName());
        Project project = Project.create(name, team);
        DataBase.addProject(project);
        return ResponseEntity.ok(project);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Project> getProject(@PathVariable String id) {
        Project project = DataBase.getProjectById(id);
        if (project == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(project);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Project> assignTeamToProject(@PathVariable String id, @RequestParam String teamId) {
        Project project = DataBase.getProjectById(id);
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

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteProject(@PathVariable String id) {
        Project project = DataBase.getProjectById(id);
        if (project == null) {
            return new ResponseEntity<>(false, HttpStatus.NOT_FOUND);
        }
        DataBase.removeProject(project);
        return ResponseEntity.ok(true);
    }

    
    // @RequestMapping("/getProjectById")
    // public ResponseEntity<Project> getProjectById(@RequestParam String projectId) {
    //     Project project = DataBase.getProjectById(projectId);
    //     if (project == null) {
    //         return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    //     }
    //     return ResponseEntity.ok(project);
    // }
}
