package com.example.Project;

public class Admin extends User{
    Admin(){
     super();   
    }
    Admin(String name, String PhoneNum, String email, String id){
        super(name, PhoneNum, email, id);
    }
    //*  add to documintaion */ */
    public static Admin create(){
        return new Admin();
    }
    public static Admin create(String name, String PhoneNum, String email, String id){
        Admin admin = new Admin(name, PhoneNum, email, id);
        admin.createID();
        return admin;
    }
    public void addUser(String id){}
    public void removeUser(String id){}


}
