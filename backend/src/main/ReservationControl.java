package com.example.Project;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
        Reservation reservation = Reservation.create(user, machine, startTime, endTime);
        reservation.setTeamId(teamId);
        DataBase.addReservation(reservation);
        return ResponseEntity.ok(reservation);
    }
}
