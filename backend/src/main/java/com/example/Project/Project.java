package com.example.Project;

import java.util.UUID;

public class Project {
    private String name;
    private Team team;
    private String projectID;

    Project(String name, Team team, String projectID) {
        this.name = name;
        this.team = team;
        this.projectID = projectID;
    }
    Project(){
        this.name = "Project";
    }
    public void setName(String name){
        this.name = name;
    }
    public String getName(){
        return name;
    }
    public Team getTeam(){
        return team;
    }
    public String getProjectId(){
        return projectID;
    }
    public static Project create(String name, Team team){
        return new Project(name, team, UUID.randomUUID().toString());
    }
    
    public void assignTeam(Team team){
        this.team = team;
    }
    public void unassignTeam(){
        this.team = null;
    }
}

