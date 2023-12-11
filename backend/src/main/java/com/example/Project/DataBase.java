package com.example.Project;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Scanner;
import java.util.UUID;

import org.springframework.http.ResponseEntity;

public class DataBase {
    final private static String PATH = "DataBase";
    final private static String LOGIN_PATH = PATH + "/login.csv";
    final private static String USERSINFO_PATH = PATH + "/usersInfo.csv";
    final private static String TEAMSINFO_PATH = PATH + "/teams.csv";

    public static ArrayList<User> users = new ArrayList<>();
    public static ArrayList<Team> teams = new ArrayList<>();

    public static void loadUsers() {
        //header = {"name", "id", "PhoneNumber", "email", "type", "reseeachInterest"};
        try {
            File userInfoFile = new File(USERSINFO_PATH);
            Scanner reader = new Scanner(userInfoFile);
            String header = reader.nextLine();
            while (reader.hasNextLine()) {
                String data = reader.nextLine();
                String[] dataArr = data.split(",");
                if (dataArr[4].equals("Admin")) {
                    users.add(new Admin(dataArr[0], dataArr[2], dataArr[3], dataArr[2]));
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
        System.out.println("I am reading teams");
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
        }catch(Exception e){
            System.out.println("Error loading teams");
        }
    }

    public static ArrayList<Team> getUserTeams(String id) {
        ArrayList<Team> userTeams = new ArrayList<>();
        for (Team team: teams) {
            for (User user : team.getMembers()) {
                System.out.println(user.name);
                if (user.getId().equals(id)) {
                    userTeams.add(team);
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

}
