package com.example.Project;

import java.util.ArrayList;
import java.util.UUID;

public class Team {
    private String name;
    private String id;
    private ArrayList<User> members;
    private ArrayList<String> projectIds;

    Team(String name, String id) {
        this();
        this.name = name;
        this.id = id;
    }

    Team() {
        this.members = new ArrayList<User>();
        this.projectIds = new ArrayList<String>();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;

    }

    public void setMembers(ArrayList<User> members) {
        this.members = members;
    }

    public void addMember(User member) {
        members.add(member);
    }

    public ArrayList<User> getMembers() {
        return members;
    }

    public ArrayList<String> getProjectIds() {
        return projectIds;
    }

    public static Team create(String name) {
        return new Team(name, UUID.randomUUID().toString());
    }

    public static Team create() {
        return new Team();
    }

    public String getTeamId() {
        return id;
    }

    public void unassignMember(User member) {
        members.remove(member);
    }

    public void addMember(TeamMember member) {
        if (!members.contains(member))
            members.add(member);
    }

    public void removeMember(TeamMember member) {
        members.remove(member);
    }

    public void addProject(Project project) {
        projectIds.add(project.getId());
    }

    public void removeProject(Project project) {
        projectIds.remove(project.getId());
    }

    public String getId() {
        return id;
    }
}
