package com.example.Project;

import java.util.UUID;

public class Project {
    private String name;
    private Team team;
    private String id;

    Project(String name, Team team, String id) {
        this.name = name;
        this.team = team;
        this.id = id;
    }

    Project() {
        this.name = "Project";
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public Team getTeam() {
        return team;
    }

    public String getId() {
        return id;
    }

    public static Project create(String name, Team team) {
        return new Project(name, team, UUID.randomUUID().toString());
    }

    public void assignTeam(Team team) {
        this.team = team;
    }

    public void unassignTeam() {
        this.team = null;
    }
}
