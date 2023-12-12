package com.example.Project;

import java.time.LocalDateTime;
import java.util.UUID;

public class Reservation {
    String id;
    Machine machine;
    Team team;
    LocalDateTime startTime;
    LocalDateTime endTime;
    User bookedBy;
    LocalDateTime bookedOn;
    
    Reservation(String id, Machine machine, Team team, LocalDateTime startTime, LocalDateTime endTime){
        this.id = id;
        this.machine = machine;
        this.team = team;
        this.startTime = startTime;
        this.endTime = endTime;
    }
    Reservation(String id, Machine machine, Team team, String startTime, String endTime){
        this.id = id;
        this.machine = machine;
        this.team = team;
        this.startTime = formatDate(startTime);
        this.endTime = formatDate(endTime);
    }
    public static Reservation create(Machine machine, Team team, String startTime, String endTime){
        LocalDateTime start = formatDate(startTime);
        LocalDateTime end = formatDate(endTime);
        if (start.isAfter(end) || start.equals(end)) throw new IllegalArgumentException("Start time must be before end time");
        return new Reservation(UUID.randomUUID().toString(), machine, team, startTime, endTime);
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
    private static LocalDateTime formatDate(String dateTime){
        //date Format: yy-mm-ddThh:mm:ss
        String[] split = dateTime.split("T");
        String[] date = split[0].split("-");
        String[] time = split[1].split(":");
        return LocalDateTime.of(Integer.parseInt(date[0]), Integer.parseInt(date[1]),Integer.parseInt(date[1]),Integer.parseInt(time[0]), Integer.parseInt(time[1]));
    }
    public LocalDateTime getStartTime(){
        return startTime;
    }
    public LocalDateTime getEndTime(){
        return endTime;
    }
    // ????????????????????????????
    @Override
    public boolean equals(Object obj) {
        return id.equals(((Reservation)obj).id);
    }
}
