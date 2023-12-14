package com.example.Project;

import java.util.ArrayList;

public class Schedule {

    ArrayList<Reservation> reservations;
    Project project;

    Schedule() {
        this.reservations = new ArrayList<Reservation>();
    }

    public void addReservation(Reservation reservation) {
        reservations.add(reservation);
    }

    public void removeReservation(Reservation reservation) {
        reservations.remove(reservation);
    }

    // ??????????????????????
    public ArrayList<Reservation> getReservations() {
        return reservations;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public Project getProject() {
        return project;
    }

    public void setReservations(ArrayList<Reservation> reservations) {
        this.reservations = reservations;
    }

    public void printReport() {

    }
}
