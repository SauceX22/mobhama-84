package com.example.Project;

import java.util.UUID;

public class Admin extends User{
    Admin(){
     super();   
    }
    Admin(String name, String PhoneNum, String email, String id){
        super(name, PhoneNum, email, id);
    }
    Admin(String name, String PhoneNum, String email){
        super(name, PhoneNum, email, UUID.randomUUID().toString());
    }
    //*  add to documintaion */ */
    public static Admin create(){
        return new Admin();
    }
    public static Admin create(String name, String PhoneNum, String email){
        Admin admin = new Admin(name, PhoneNum, email);
        admin.createID();
        return admin;
    }
    public void addUser(String id){}
    public void removeUser(String id){}


}
