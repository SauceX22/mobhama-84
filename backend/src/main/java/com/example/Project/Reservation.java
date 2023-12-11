package com.example.Project;

import javax.xml.crypto.Data;
public class Reservation {
    Machine machine;
    Team team;
    Data startTime;
    Data endTime;
    Reservation(Machine machine, Team team, Data startTime, Data endTime){
        this.machine = machine;
        this.team = team;
        this.startTime = startTime;
        this.endTime = endTime;
    }
    Reservation(){
        this.machine = null;
        this.team = null;
        this.startTime = null;
        this.endTime = null;
    }
    public void setMachine(Machine machine){
        this.machine = machine;
    }
    public Machine getMachine(){
        return machine;
    }
    public void setTeam(Team team){
        this.team = team;
    }
    public Team getTeam(){
        return team;
    }
    public Data getStartTime(){
        return startTime;
    }
    public Data getEndTime(){
        return endTime;
    }
    public void reschedule(Data startTime, Data endTime){
        this.startTime = startTime;
        this.endTime = endTime;
    }
    // ????????????????????????????
    public void cancel(){
        this.machine = null;
        this.team = null;
        this.startTime = null;
        this.endTime = null;
    }
}
