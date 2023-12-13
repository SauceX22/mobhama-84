package com.example.Project;

import java.util.ArrayList;

public class Schedule {
    
    ArrayList<Reservation> reservations;
    Team team;
    Schedule(){
        this.reservations = new ArrayList<Reservation>();
    }
    public void addReservation(Reservation reservation){
        reservations.add(reservation);
    }
    public void removeReservation(Reservation reservation){
        reservations.remove(reservation);
    }
    // ??????????????????????
    public ArrayList<Reservation> getReservations() {
        return reservations;
    }
    public void setTeam(Team team){
        this.team = team;
    }
    public Team getTeam(){
        return team;
    }
    public void setReservations(ArrayList<Reservation> reservations) {
        this.reservations = reservations;
    }
    public void printReport(){
        
        
    }
}
