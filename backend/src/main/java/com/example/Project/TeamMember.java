package com.example.Project;

public class TeamMember extends User{
    String researchInterest;
    TeamMember(String name, String PhoneNum, String email, String id){
        super(name, PhoneNum, email, id);
        this.researchInterest = "";
    }
    TeamMember(){
        super();
        this.researchInterest = "";
    }
    public void setResearchInterest(String researchInterest){
        this.researchInterest = researchInterest;
    }
    public static TeamMember create(String name, String PhoneNum, String email, String id){
        return new TeamMember(name, PhoneNum, email, id);
    }
    public static TeamMember create(){
        return new TeamMember();
    }
    

}
