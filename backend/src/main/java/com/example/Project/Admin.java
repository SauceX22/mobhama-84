package com.example.Project;

import java.util.UUID;

public class Admin extends User{
    Admin(){
     super();   
    }
    Admin(String name, String PhoneNum, String email, String id, String avatar){
        super(name, PhoneNum, email, id, avatar);
    }
//    Admin(String name, String PhoneNum, String email, String avatar){
//        super(name, PhoneNum, email, UUID.randomUUID().toString(), avatar);
//    }
    //*  add to documintaion */ */
    public static Admin create(){
        return new Admin();
    }
    public static Admin create(String name, String PhoneNum, String email, String avatar){
        return new Admin(name, PhoneNum, email, UUID.randomUUID().toString(),avatar);
    }
    public void addUser(String id){}
    public void removeUser(String id){}


}
