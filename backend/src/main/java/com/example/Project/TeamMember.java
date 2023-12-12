package com.example.Project;

import java.util.UUID;

public class TeamMember extends User{
    private String researchInterest;
    TeamMember(String name, String PhoneNum, String email, String id, String avatar){
        super(name, PhoneNum, email, id, avatar);
        role = Role.TEAM_MEMBER;
        this.researchInterest = "";
    }
//    TeamMember(String name, String PhoneNum, String email, String avatar){
//        super(name, PhoneNum, email, UUID.randomUUID().toString(), avatar);
//        this.researchInterest = "";
//    }
    TeamMember(){
        super();
        this.role = Role.TEAM_MEMBER;
        this.researchInterest = "";
    }
    public void setResearchInterest(String researchInterest){
        this.researchInterest = researchInterest;
    }
    public static TeamMember create(String name, String PhoneNum, String email, String avatar){
        return new TeamMember(name, PhoneNum, email, UUID.randomUUID().toString(), avatar);
    }
    public static TeamMember create(){
        return new TeamMember();
    }
    public String getResearchInterest(){
        return researchInterest;
    }
    

}
