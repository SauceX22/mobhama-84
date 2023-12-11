package com.example.Project;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.Scanner;
import java.util.UUID;

public class DataBase {
    final private static String PATH = "DataBase";
    final private static String LOGIN_PATH = PATH + "/login.csv";
    final private static String USERSINFO_PATH = PATH + "/usersInfo.csv";
    final private static String TEAMSINFO_PATH = PATH + "/teams.csv";
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
        //String[] header = {"name", "id", "PhoneNumber", "email", "type", "reseeachInterest"};
        try {
            File userInfoFile = new File(USERSINFO_PATH);
            Scanner reader = new Scanner(userInfoFile);
            String header = reader.nextLine();
            while (reader.hasNextLine()) {
                String data = reader.nextLine();
                String[] dataArr = data.split(",");
                if (dataArr[1].equals(id)) {
                    if (dataArr[4].equals("Admin")) {
                        return new Admin(dataArr[0], dataArr[2], dataArr[3], dataArr[2]);
                    } else {
                        TeamMember tm = new TeamMember(dataArr[0], dataArr[2], dataArr[3], dataArr[1]);
                        tm.setResearchInterest(dataArr[5]);
                        return tm;
                    }
                }
            }
                reader.close();
                return null;
            }catch(Exception e){
                return null;
            }
        }
    
    public static ArrayList<Team> getAllTeams() {
        // header = teamId,teamName,membersId
        ArrayList<Team> teams = new ArrayList<>();
        try {
            File userInfoFile = new File(USERSINFO_PATH);
            Scanner reader = new Scanner(userInfoFile);
            String header = reader.nextLine();
            while (reader.hasNextLine()) {
                String data = reader.nextLine();
                String[] dataArr = data.split(",");
                String[] teamMembers = dataArr[2].split(";");
                ArrayList<User> members = new ArrayList<>();
                for (String memberId : teamMembers) {
                    User member = getUserInfo(memberId);
                    members.add(member);
                }
                Team team = new Team(dataArr[1]);
                team.setMembers(members);
            }
            reader.close();
            return teams;
        }catch(Exception e){
            return null;
        }
    }
}
