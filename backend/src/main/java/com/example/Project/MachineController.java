package com.example.Project;

import java.util.ArrayList;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/machines")
public class MachineController {
    @GetMapping()
    public ResponseEntity<ArrayList<Machine>> getMachines() {
        ArrayList<Machine> machines = DataBase.getMachines();
        if (machines == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(machines);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Machine> getMachine(String id) {
        Machine machine = DataBase.getMachineById(id);
        if (machine == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(machine);
    }
    @GetMapping("/Reservations")
    public ResponseEntity<ArrayList<Reservation>> getMachineReservations(@RequestParam String machineId) {
        ArrayList<Reservation> reservations = DataBase.getMachineReservations(machineId);
        return ResponseEntity.ok(reservations);
    }
    @GetMapping("/mostUsed")
    public ResponseEntity<Machine> getMostUsedMachine() {
        Machine machine = DataBase.getMostUsedMachine();
        if (machine == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(machine);
    }
    
    @PostMapping()
    public ResponseEntity<Machine> createMachine(String name) {
        Machine machine = Machine.create(name);
        DataBase.addMachine(machine);
        return ResponseEntity.ok(machine);
    }
    @PutMapping("/{id}")
    public ResponseEntity<Machine> updateMachine(@PathVariable String id, @RequestParam String name) {
        Machine machineUpdated = DataBase.updateMachineInfo(id, name);
        if (machineUpdated == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(machineUpdated);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteMachine(@PathVariable String id) {
        boolean removed = DataBase.removeMachine(id);
        if (!removed) {
            return new ResponseEntity<>(false, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(true, HttpStatus.OK);
    }

    
}
