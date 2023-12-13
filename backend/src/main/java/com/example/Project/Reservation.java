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
    Status status;
    enum Status {
        Upcoming,
        Passed
    }
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
        this.startTime = LocalDateTime.parse(startTime);
        this.endTime = LocalDateTime.parse(endTime);
    }
    public static Reservation create(Machine machine, Team team, String startTime, String endTime){
        // LocalDateTime start = formatDate(startTime);
        // LocalDateTime end = formatDate(endTime);
        try {
            LocalDateTime start = LocalDateTime.parse(startTime);
            LocalDateTime end = LocalDateTime.parse(endTime);
            if (start.isAfter(end) || start.equals(end)) return null;
            if (start.isBefore(LocalDateTime.now())) return null;
            return new Reservation(UUID.randomUUID().toString(), machine, team, start, end);
        }catch (Exception e) {
            return null;
        }

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
    public void setBookedBy(User bookedBy) {
        this.bookedBy = bookedBy;
    }
    public void setBookedOn(LocalDateTime bookedOn) {
        this.bookedOn = bookedOn;
        setStatus();
    }
    public void setStatus() {
        if (LocalDateTime.now().isAfter(endTime)) {
            status = Status.Passed;
        } else {
            status = Status.Upcoming;
        }
    }
    public void setEndTime(LocalDateTime endTime) {
        this.endTime = endTime;
    }
    public void setId(String id) {
        this.id = id;
    }
    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }
    
    public User getBookedBy() {
        return bookedBy;
    }
    public LocalDateTime getBookedOn() {
        return bookedOn;
    }
    public String getId() {
        return id;
    }
    
}
