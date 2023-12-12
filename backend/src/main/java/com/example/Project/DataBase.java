package com.example.Project;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.sql.SQLOutput;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Dictionary;
import java.util.Scanner;
import java.util.UUID;

import org.springframework.http.ResponseEntity;

public class DataBase {
    final private static String PATH = "DataBase";
    final private static String LOGIN_PATH = PATH + "/login.csv";
    final private static String USERSINFO_PATH = PATH + "/usersInfo.csv";
    final private static String TEAMSINFO_PATH = PATH + "/teams.csv";
    final private static String PROJECTSINFO_PATH = PATH + "/projects.csv";
    final private static String MACHINESINFO_PATH = PATH + "/machines.csv";

    private static ArrayList<User> users = new ArrayList<>();
    private static ArrayList<Team> teams = new ArrayList<>();
    private static ArrayList<Project> projects = new ArrayList<>();
    private static ArrayList<Machine> machines = new ArrayList<>();

    public static void loadProjects() {
        // header projectId,name,teamId
        try {
            File userInfoFile = new File(PROJECTSINFO_PATH);
            Scanner reader = new Scanner(userInfoFile);
            reader.nextLine(); // header
            while (reader.hasNextLine()) {
                String data = reader.nextLine();
                String[] dataArr = data.split(",");
                Team team = getTeam(dataArr[0]);
                if (team != null) {
                    Project project = new Project(dataArr[1], DataBase.getTeam(dataArr[0]), dataArr[2]);
                    team.getProjectIds().add(project.getProjectId());
                    projects.add(project);
                }else {
                    System.out.println("Team with id" + dataArr[2] +  "not found");
                }   
            }
            reader.close();
        }catch(Exception e){
            System.out.println("Error loading projects");
        }
    }
    
    public static Team getTeam(String id) {
        for (Team team : teams) {
            if (team.getId().equals(id)) {
                return team;
            }
        }
        return null;
    }

    public static void loadUsers() {
        //header = {"name", "id", "PhoneNumber", "email", "type", "reseeachInterest"};
        try {
            File userInfoFile = new File(USERSINFO_PATH);
            Scanner reader = new Scanner(userInfoFile);
            reader.nextLine(); // header
            while (reader.hasNextLine()) {
                String data = reader.nextLine();
                String[] dataArr = data.split(",");
                if (dataArr[4].equals("Admin")) {
                    users.add(new Admin(dataArr[0], dataArr[2], dataArr[3], dataArr[1]));
                } else {
                    TeamMember tm = new TeamMember(dataArr[0], dataArr[2], dataArr[3], dataArr[1]);
                    tm.setResearchInterest(dataArr[5]);
                    users.add(tm);
                }
            }
            System.out.println(users);
            reader.close();
        }catch(Exception e){
            System.out.println("Error loading users");
            System.out.println(e);
        }
    }

    public static void loadTeams() {
        // header = teamId,teamName,membersId
        System.out.println("Loading teams...");
        try {
            File userInfoFile = new File(TEAMSINFO_PATH);
            Scanner reader = new Scanner(userInfoFile);
            reader.nextLine(); // header
            while (reader.hasNextLine()) {
                String data = reader.nextLine();
                String[] dataArr = data.split(",");
                System.out.println(Arrays.toString(dataArr));
                String[] teamMembers = dataArr[2].split(";");
                ArrayList<User> members = new ArrayList<>();
                for (String memberId : teamMembers) {
                    User member = getUserInfo(memberId);
                    if (member != null) {
                        members.add(member);
                    }
                }
                Team team = new Team(dataArr[1], dataArr[0]);
                team.setMembers(members);
                teams.add(team);
            }
            reader.close();
            System.out.println("Teams Loaded successfully");
        }catch(Exception e){
            System.out.println("Error loading teams");
        }
    }

    public static ArrayList<Team> getUserTeams(String id) {
        ArrayList<Team> userTeams = new ArrayList<>();
        for (Team team: teams) {

            for (User user : team.getMembers()) {
                if (user.getId().equals(id)) {
                    userTeams.add(team);
                    break;
                }
            }
        }
        return userTeams;
    }

    
    public static String login(String username, String password) {
        // header : userName,passwordHash,id
        try {
            File loginFile = new File(LOGIN_PATH);
            Scanner reader = new Scanner(loginFile);
            reader.nextLine(); // header
            while (reader.hasNextLine()) {
                String data = reader.nextLine();
                String[] dataArr = data.split(",");
                if (dataArr[0].equals(username) && dataArr[1].equals(password)) {
                    return dataArr[2];
                }else {
                    return null;
                }
            }
            reader.close();
            return null;
        }catch (Exception e) {
            return "Error fetching data";
        }

    }

    public static User getUserInfo(String id) {
        for (User user : users) {
            if (user.getId().equals(id)) {
                return user;
            }
        }
        return null;
    }
    public static Project getProjectById(String id) {
        for (Project project : projects) {
            if (project.getProjectId().equals(id)) {
                return project;
            }
        }
        return null;
    }
    public static ArrayList<Project> getUserProjects(String useerId) {
        ArrayList<Project> userProjects = new ArrayList<>();
        ArrayList<Team> userTeams = getUserTeams(useerId);
        for (Team team: userTeams) {
            for (String projectId : team.getProjectIds()) {
                Project project = getProjectById(projectId);
                if (project != null) {
                    userProjects.add(project);
                }
            }
        }
        return userProjects;
    }

    public static void saveUsers() {
        // write users infos back to file
        File userInfoFile = new File(USERSINFO_PATH);
        try(FileWriter writer = new FileWriter(userInfoFile)) {
            
            writer.write("name,id,PhoneNumber,email,type,reseeachInterest\n");
            for (User user : users) {
                String data = user.getName() + "," + user.getId() + "," + user.getPhoneNum() + "," + user.getEmail() + "," + user.getClass().getSimpleName();
                if (user.getClass().getSimpleName().equals("TeamMember")) {
                    data += "," + ((TeamMember) user).getResearchInterest();
                }else{
                    data += ",";
                }
                writer.write(data + "\n");
            }
            
        } catch (Exception e) {
            System.out.println("Error saving users");
        }
    }

    public static void saveTeams() {
        // write teams infos back to file
        File teamsInfoFile = new File(TEAMSINFO_PATH);
        try(FileWriter writer = new FileWriter(teamsInfoFile)){
            writer.write("teamId,teamName,membersId\n");
            for (Team team : teams) {
                String data = team.getId() + "," + team.getName() + ",";
                for (User user : team.getMembers()) {
                    data += user.getId() + ";";
                }
                writer.write(data + "\n");
            }
        } catch (Exception e) {
            System.out.println("Error saving teams");
        }
    }
    public static void saveProjects() {
        // write projects infos back to file
        File userInfoFile = new File(PROJECTSINFO_PATH);
        try(FileWriter writer = new FileWriter(userInfoFile);) {   
            writer.write("projectId,name,teamId\n");
            for (Project project : projects) {
                String data = project.getProjectId() + "," + project.getName() + "," + project.getTeam().getId();
                writer.write(data + "\n");
            }
        } catch (Exception e) {
            System.out.println("Error saving projects");
        }
    }
    public static Team getTeamById(String teamId) {
        for (Team team : teams) {
            if (team.getId().equals(teamId)) {
                return team;
            }
        }
        return null;
    }
    public static void addTeam(Team team) {
        teams.add(team);
        saveTeams();
    }
    public static void addUser(User user) {
        users.add(user);
        saveUsers();
    }
    public static ArrayList<User> getUsers() {
        return users;
    }
    public static void removeTeam(Team team) {
        teams.remove(team);
        saveTeams();
    }
    
    public static void addProject(Project project) {
        projects.add(project);
        saveProjects();
    }
    public static ArrayList<Project> getProjects() {
        return projects;
    }
    public static void removeProject(Project project) {
        projects.remove(project);
        saveProjects();
    }

    // machines
    public static void loadMachines() {
        // header = Id,name,status
        try {
            File userInfoFile = new File(MACHINESINFO_PATH);
            Scanner reader = new Scanner(userInfoFile);
            reader.nextLine(); // header
            while (reader.hasNextLine()) {
                String data = reader.nextLine();
                String[] dataArr = data.split(",");
                machines.add(new Machine(dataArr[1], dataArr[0], dataArr[2]));
            }
            reader.close();
        }catch(Exception e){
            System.out.println("Error loading machines");
        }
    }
    public static void saveMachines() {
        // write machines infos back to file
        File userInfoFile = new File(MACHINESINFO_PATH);
        try(FileWriter writer = new FileWriter(userInfoFile);) {   
            writer.write("Id,name,status\n");
            for (Machine machine : machines) {
                String data = machine.getId() + "," + machine.getName() + "," + machine.getStatus();
                writer.write(data + "\n");
            }
        } catch (Exception e) {
            System.out.println("Error saving machines");
        }
    }
    public static ArrayList<Machine> getMachines() {
        return machines;
    }
    public static Machine getMachineById(String id) {
        for (Machine machine : machines) {
            if (machine.getId().equals(id)) {
                return machine;
            }
        }
        return null;
    }
    public static void addMachine(Machine machine) {
        machines.add(machine);
        saveMachines();
    }
    public static void removeMachine(Machine machine) {
        machines.remove(machine);
        saveMachines();
    }
}
