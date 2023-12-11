package com.example.Project;

public class Project {
    String name;
    Team team;
    Project(String name){
        this.name = name;
    }
    Project(){
        this.name = "";
    }
    public void setName(String name){
        this.name = name;
    }
    public String getName(){
        return name;
    }
    public static Project create(String name){
        return new Project(name);
    }
    public static Project create(){
        return new Project();
    }
    public void assignTeam(Team team){
        this.team = team;
    }
    public void unassignTeam(){
        this.team = null;
    }
}

