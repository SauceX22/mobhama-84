package com.example.Project;

import java.util.UUID;

public class Machine {
    String name;
    String id;
    String status;
    Machine(String name, String id, String status){
    
        this.name = name;
        this.id = id;
        this.status = status;
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
    public String getStatus() {
        return status;
    }
    public void setStatus(String status){
        this.status = status;
    }
    public static Machine create(String name){
        return new Machine(name, UUID.randomUUID().toString(), "available");
    }
    public static void delete() {

    }
    
}
