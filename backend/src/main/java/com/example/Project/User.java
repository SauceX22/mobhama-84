package com.example.Project;

import java.util.UUID;

abstract public class User {
    protected String name;
    protected String id;
    protected String PhoneNum;
    protected String email;
    protected String avatar;
    protected Role role;
    enum Role{
        ADMIN,
        TEAM_MEMBER,
    }

    public User() {
        this.id = UUID.randomUUID().toString();
    }
    public User(String name, String PhoneNum, String email, String id, String avatar){
        this.avatar = avatar;
        this.name = name;
        this.PhoneNum = PhoneNum;
        this.email = email;
        this.id = id;
    }
    public void createID(){
        this.id = UUID.randomUUID().toString();
    }
    public void signIn(){
        
    }
    public String getId(){
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhoneNum() {
        return PhoneNum;
    }

    public void setPhoneNum(String phoneNum) {
        PhoneNum = phoneNum;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }
    public String getAvatar() {
        return avatar;
    }
    public Role getRole(){
        return role;
    }
}
