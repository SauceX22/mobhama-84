package com.example.Project;

import java.util.ArrayList;

public class Schedule {
    
    ArrayList<Reservation> reservations;
    Machine machine;
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
    public void printReport(){
        
        
    }
}
