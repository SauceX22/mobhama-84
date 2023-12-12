package com.example.Project;

import java.util.Date;

public class Reservation {
    String id;
    Machine machine;
    Team team;
    Date startTime;
    Date endTime;
    Reservation(String id, Machine machine, Team team, Date startTime, Date endTime){
        this.id = id;
        this.machine = machine;
        this.team = team;
        this.startTime = startTime;
        this.endTime = endTime;
    }
    public void setMachine(Machine machine){
        this.machine = machine;
    }
    public Machine getMachineId(){
        return machine;
    }
    public void setTeam(Team team){
        this.team = team;
    }
    public Team getTeam(){
        return team;
    }
    public Date getStartTime(){
        return startTime;
    }
    public Date getEndTime(){
        return endTime;
    }
    // ????????????????????????????
    public boolean schedule(Date startTime, Date endTime){
        if (this.endTime.before(startTime)){
            this.startTime = startTime;
            this.endTime = endTime;
            return true;
        }
        return false;
    }
}
