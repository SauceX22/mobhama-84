package com.example.Project;

import java.util.ArrayList;
import java.util.UUID;

public class Team {
    private String name;
    private String id;
    private ArrayList<User> members;
    private ArrayList<Project> projects;
    Team(String name, String id){
        this();
        this.name = name;
        this.id = id;
    }
    Team() {
        this.members = new ArrayList<User>();
        this.projects = new ArrayList<Project>();
    }
    public String getName(){
        return name;
    }
    public void setName(String name){
        this.name = name;
    }
    public void setMembers(ArrayList<User> members) {
        this.members = members;
    }
    public ArrayList<User> getMembers() {
        return members;
    }

    public ArrayList<Project> getProjects() {
        return projects;
    }
    
    public static Team create(String name){
        return new Team(name, UUID.randomUUID().toString());
    }
    public static Team create(){
        return new Team();
    }
    public void delete() {

    }
    public void addMember(TeamMember member){
        members.add(member);
    }
    public void removeMember(TeamMember member){
        members.remove(member);
    }
    public void addProject(Project project){
        projects.add(project);
    }
    public void removeProject(Project project){
        projects.remove(project);
    }
}
