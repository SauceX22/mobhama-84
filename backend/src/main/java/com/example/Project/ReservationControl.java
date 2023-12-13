package com.example.Project;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.Project.User.Role;

import java.time.LocalDateTime;
import java.util.ArrayList;

@RestController
@RequestMapping("/Reservation")
public class ReservationControl {
    @GetMapping
    public ResponseEntity<ArrayList<Reservation>> getReservations() {
        ArrayList<Reservation> reservations = DataBase.getReservations();
        if (reservations == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(reservations);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Reservation> getReservation(@PathVariable String id) {
        Reservation reservation = DataBase.getReservationById(id);
        if (reservation == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(reservation);
    }
    // the user that did the most reservations
    @GetMapping("/mostactiveUser")
    public ResponseEntity<User> getMostActiveUser() {
        User user = DataBase.getMostActiveUser();
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(user);
    }
    @PostMapping()
    public ResponseEntity<Reservation> createReservation(@RequestParam String userId, @RequestParam String machineId,@RequestParam String teamId, @RequestParam String startTime, @RequestParam String endTime) {
        User user = DataBase.getUserInfo(userId);
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Machine machine = DataBase.getMachineById(machineId);
        if (machine == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Team team = DataBase.getTeamById(teamId);
        if (team == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        if (!user.getRole().equals(Role.ADMIN) && !team.getMembers().contains(user)) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        Reservation reservation = Reservation.create(machine,team, startTime, endTime);
        if (reservation == null) {
            // return that time is not available
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        reservation.setBookedBy(user);
        reservation.setBookedOn(LocalDateTime.now());
        reservation.setStatus();

        if (DataBase.addReservation(reservation)) {
            return ResponseEntity.ok(reservation);
        }
        // return conflict
        return new ResponseEntity<>(HttpStatus.CONFLICT);
        
    }
    @PutMapping("/{id}")
    public ResponseEntity<Reservation> updateReservation(@PathVariable String id, @RequestParam String userId, @RequestParam String startTime, @RequestParam String endTime) {
        User user = DataBase.getUserInfo(userId);
        Reservation reservation = DataBase.getReservationById(id);
        if (user == null || reservation == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    
        Team team = reservation.getTeam();

        if (!user.getRole().equals(Role.ADMIN) && !team.getMembers().contains(user)) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        Reservation newReservation = Reservation.create(reservation.getMachine(),team, startTime, endTime);
        if (newReservation == null) {
            // return that time is not available
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        newReservation.setBookedBy(user);
        newReservation.setBookedOn(LocalDateTime.now());
        newReservation.setStatus();

        DataBase.removeReservation(reservation);
        if (DataBase.addReservation(newReservation)) {
            return ResponseEntity.ok(newReservation);
        }
        DataBase.addReservation(reservation);
        // return conflict
        return new ResponseEntity<>(HttpStatus.CONFLICT);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteReservation(@PathVariable String id, @RequestParam String userId) {
        User user = DataBase.getUserInfo(userId);
        Reservation reservation = DataBase.getReservationById(id);
        if (user == null || reservation == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Team team = reservation.getTeam();

        if (!user.getRole().equals(Role.ADMIN) && !team.getMembers().contains(user)) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        DataBase.removeReservation(reservation);
        return ResponseEntity.ok(true);
    }
}


