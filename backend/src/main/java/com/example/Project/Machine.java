package com.example.Project;

import java.util.UUID;

public class Machine {
    String name;
    String id;
    Machine(String name, String id){
        this.name = name;
        this.id = id;
    }

    public void setName(String name){
        this.name = name;
    }
    public String getName(){
        return name;
    }
    public String getId() {
        return id;
    }
    public static Machine create(String name){
        return new Machine(name, UUID.randomUUID().toString());
    }
    public static void delete() {

    }
    
}
