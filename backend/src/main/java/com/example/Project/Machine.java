package com.example.Project;

import java.util.UUID;

public class Machine {
    String name;
    String id;
    Machine(String name){
        this();
        this.name = name;
    }
    Machine(){
        this.name = "";
        this.id = UUID.randomUUID().toString();
    }
    public void setName(String name){
        this.name = name;
    }
    public String getName(){
        return name;
    }
    public static Machine create(String name){
        return new Machine(name);
    }
    public static Machine create(){
        return new Machine();
    }
    public static void delete() {

    }
    
}
