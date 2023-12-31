package com.example.Project;

import java.util.ArrayList;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/Machine")
public class MachineController {
    @GetMapping()
    public ResponseEntity<ArrayList<Machine>> getMachines() {
        return ResponseEntity.ok(DataBase.getMachines());
    }
    @GetMapping("/{id}")
    public ResponseEntity<Machine> getMachine(String id) {
        return ResponseEntity.ok(DataBase.getMachineById(id));
    }
    @GetMapping("/Reservations")
    public ResponseEntity<ArrayList<Reservation>> getMachineReservations(@RequestParam String machineId) {
        ArrayList<Reservation> reservations = DataBase.getMachineReservations(machineId);
        return ResponseEntity.ok(reservations);
    }
    
    @PostMapping()
    public ResponseEntity<Machine> createMachine(String name) {
        Machine machine = Machine.create(name);
        DataBase.addMachine(machine);
        return ResponseEntity.ok(machine);
    }
    @PutMapping("/{id}")
    public ResponseEntity<Machine> updateMachine(String id, String name) {
        Machine machineUpdated = DataBase.updateMachineInfo(id, name);
        if (machineUpdated == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(machineUpdated);
    }
    @DeleteMapping
    public ResponseEntity<Boolean> deleteMachine(String id) {
        boolean removed = DataBase.removeMachine(id);
        if (removed) {
            return new ResponseEntity<>(false, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(true, HttpStatus.OK);
    }
    
}
