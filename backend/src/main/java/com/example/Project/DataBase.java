package com.example.Project;

import java.io.File;
import java.io.FileWriter;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Scanner;


public class DataBase {
    final private static String PATH = "DataBase";
    final private static String LOGIN_PATH = PATH + "/login.csv";
    final private static String USERSINFO_PATH = PATH + "/usersInfo.csv";
    final private static String TEAMSINFO_PATH = PATH + "/teams.csv";
    final private static String PROJECTSINFO_PATH = PATH + "/projects.csv";
    final private static String MACHINESINFO_PATH = PATH + "/machines.csv";
    final private static String RESERVATIONSINFO_PATH = PATH + "/reservations.csv";

    private static ArrayList<User> users = new ArrayList<>();
    private static ArrayList<Team> teams = new ArrayList<>();
    private static ArrayList<Project> projects = new ArrayList<>();
    private static ArrayList<Machine> machines = new ArrayList<>();
    private static ArrayList<Reservation> reservations = new ArrayList<>();

    public static void load() {
        DataBase.loadUsers();
        DataBase.loadTeams();
        DataBase.loadProjects();
        DataBase.loadMachines();
        DataBase.loadReservations();
    }

    public static void loadProjects() {
        // header projectId,name,teamId
        try {
            File projectsInfoFile = new File(PROJECTSINFO_PATH);
            Scanner reader = new Scanner(projectsInfoFile);
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
        //header = {"name", "id", "PhoneNumber", "email", "role", "researchInterest", avatar};
        try {
            File userInfoFile = new File(USERSINFO_PATH);
            Scanner reader = new Scanner(userInfoFile);
            reader.nextLine(); // header
            while (reader.hasNextLine()) {
                String data = reader.nextLine();
                String[] dataArr = data.split(",");
                if (dataArr[4].equals("ADMIN")) {
                    users.add(new Admin(dataArr[0], dataArr[2], dataArr[3], dataArr[1], dataArr[6]));
                } else if (dataArr[4].equals("TEAM_MEMBER")){
                    TeamMember tm = new TeamMember(dataArr[0], dataArr[2], dataArr[3], dataArr[1], dataArr[6]);
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
    public static boolean removeUser(String id) {
        User user = DataBase.getUserInfo(id);
        if (user == null) {
            return false;
        }
        ArrayList<Team> teams = DataBase.getUserTeams(id);
        for (Team team : teams) {
            team.unassignMember(user);
        }
        return true;
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
            
            writer.write("name,id,PhoneNumber,email,role,researchInterest,avatar\n");
            for (User user : users) {
                String data = user.getName() + "," + user.getId() + "," + user.getPhoneNum() + "," + user.getEmail() + "," + user.getRole().toString();
                if (user.getClass().getSimpleName().equals("TeamMember")) {
                    data += "," + ((TeamMember) user).getResearchInterest();
                }else{
                    data += ",";
                }
                data += "," + user.getAvatar();
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
    public static ArrayList<Team> getTeams() {
        return teams;
    }
    public static void addTeam(Team team) {
        teams.add(team);
        saveTeams();
    }
    public static void addUser(User user) {
        users.add(user);
        saveUsers();
    }
    public static User updateUserInfo(String id, String name, String phoneNum, String email, String researchInterest, String avatar) {
        User user = DataBase.getUserInfo(id);
        if(user == null) {
            return null;
        }
        users.remove(users);

        user.setName(name);
        user.setEmail(email);
        //user.setPassword(password);
        user.setPhoneNum(phoneNum);
        if (user instanceof TeamMember) {
            ((TeamMember) user).setResearchInterest(researchInterest);
        }
        user.setAvatar(avatar);
        DataBase.addUser(user);
        return user;
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
                Machine machine = new Machine(dataArr[1], dataArr[0], dataArr[2]);
                machines.add(machine);
            }
            reader.close();
        }catch(Exception e){
            System.out.println("Error loading machines");
            System.out.println(e);
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

    // reservations
    public static void loadReservations() {
        // header = reservationId,machineId,teamId,startTime,endTime
        try {
            File userInfoFile = new File(RESERVATIONSINFO_PATH);
            Scanner reader = new Scanner(userInfoFile);
            reader.nextLine(); // header
            while (reader.hasNextLine()) {
                String data = reader.nextLine();
                String[] dataArr = data.split(",");
                Machine machine = getMachineById(dataArr[1]);
                Team team = getTeamById(dataArr[2]);
                if (machine != null && team != null) {
                    // //date Format: yy-mm-ddThh:mm:ss
                    // String[] start = dataArr[3].split("T");
                    // String[] end = dataArr[4].split("T");
                    // String[] startDate = start[0].split("-");
                    // String[] startTime = start[1].split(":");
                    // String[] endDate = end[0].split("-");
                    // String[] endTime = end[1].split(":");
                    Reservation reservation = new Reservation(dataArr[0],machine, team, dataArr[3], dataArr[4]);
                    reservations.add(reservation);          
                }
            }
            reader.close();
        }catch(Exception e){
            System.out.println("Error loading reservations");
        }
    }
    public static void saveReservations() {
        // write reservations infos back to file
        File userInfoFile = new File(RESERVATIONSINFO_PATH);
        try(FileWriter writer = new FileWriter(userInfoFile);) {   
            writer.write("reservationId,machineId,teamId,startTime,endTime\n");
            for (Reservation reservation : reservations) {
                String data = reservation.id + "," + reservation.machine.getId() + "," + reservation.team.getId() + "," + reservation.startTime.toString() + "," + reservation.endTime.toString();
                writer.write(data + "\n");
            }
        } catch (Exception e) {
            System.out.println("Error saving reservations");
        }
    }
    public static ArrayList<Reservation> getReservations() {
        return reservations;
    }
    public static Reservation getReservationById(String id) {
        for (Reservation reservation : reservations) {
            if (reservation.id.equals(id)) {
                return reservation;
            }
        }
        return null;
    }
    public static void addReservation(Reservation reservation) {
        // check no other reservation for the same machine at the same time
        for (Reservation res : reservations) {
            if (res.getMachine().getId().equals(reservation.getMachine().getId())) {
                if (reservation.getStartTime().isAfter(res.getStartTime()) && reservation.getStartTime().isBefore(res.getEndTime())) {
                    throw new IllegalArgumentException("Machine is already reserved at this time");
                }
                if (reservation.getEndTime().isAfter(res.getStartTime()) && reservation.getEndTime().isBefore(res.getEndTime())) {
                    throw new IllegalArgumentException("Machine is already reserved at this time");
                }
                if (reservation.getStartTime().isBefore(LocalDateTime.now())) {
                    throw new IllegalArgumentException("Start time must be in the future");
                }
            }
        }
        reservations.add(reservation);
        saveReservations();
    }
    public static void removeReservation(Reservation reservation) {
        reservations.remove(reservation);
        saveReservations();
    }
    public static ArrayList<Reservation> getMachineReservations(String machineId) {
        ArrayList<Reservation> machineReservations = new ArrayList<>();
        for (Reservation reservation: reservations) {
            if (reservation.getMachine().getId().equals(machineId)) {
                machineReservations.add(reservation);
            }
        }
        return machineReservations;
    }
    public static ArrayList<Reservation> getTeamReservations(String teamId) {
        ArrayList<Reservation> teamReservations = new ArrayList<>();
        for (Reservation reservation: reservations) {
            if (reservation.getTeam().getId().equals(teamId)) {
                teamReservations.add(reservation);
            }
        }
        return teamReservations;
    }
    public static Machine updateMachineInfo(String id, String name, String status) {
        Machine machine = DataBase.getMachineById(id);
        if(machine == null) {
            return null;
        }
        DataBase.removeMachine(machine);
        machine.setName(name);
        machine.setStatus(status);
        DataBase.addMachine(machine);
        return machine;
    }
    public static boolean removeMachine(String id) {
        Machine machine = DataBase.getMachineById(id);
        if(machine == null) {
            return false;
        }
        DataBase.removeMachine(machine);
        return true;
    }
}
