package com.example.Project;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
public class Main {


    @RequestMapping("/login")
    public ResponseEntity<User> login(@RequestParam String username) {
       User user = DataBase.getUserByName(username);
         if (user == null) {
              return new ResponseEntity<>(HttpStatus.NOT_FOUND);
         }
         if (user.getRole().equals(User.Role.ADMIN)) {
             Admin admin = (Admin) user;
             return ResponseEntity.ok(admin);
         } else {
             TeamMember teamMember = (TeamMember) user;
             return ResponseEntity.ok(teamMember);
         }
    }
    //@RequestMapping("/Project")
    //@GetMapping
    //public ResponseEntity<ArrayList<Project>> getProjects(@RequestParam String userId) {
    //    ArrayList<Project> projects = DataBase.getUserProjects(userId);
      //  return ResponseEntity.ok(projects);
    //}

    // Teams

    // @RequestMapping("/Team")
    // public ResponseEntity<ArrayList<Team>> getUserTeams(@RequestParam String userId) {
    //     try {
    //         ArrayList<Team> teams = DataBase.getUserTeams(userId);
    //         System.out.println(teams);
    //         return ResponseEntity.ok(teams);
    //     } catch (Exception e) {
    //         // Log the exception
    //         e.printStackTrace();
    //         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    //     }
    // }
    // @RequestMapping("/getTeamById")
    // public ResponseEntity<Team> getTeamById(@RequestParam String teamId) {
    //     Team team = DataBase.getTeamById(teamId);
    //     return ResponseEntity.ok(team);
    // }
    // @RequestMapping("/createTeam")
    // public ResponseEntity<Team> createTeam(@RequestParam String name, @RequestParam List<String> usersIds) {
    //     Team team = Team.create(name);
    //     for (String id : usersIds) {
    //         User user = DataBase.getUserInfo(id);
    //         if (user != null) {
    //             team.addMember(DataBase.getUserInfo(id));
    //         }
    //     }
    //     DataBase.addTeam(team);
    //     return ResponseEntity.ok(team);
    // }
    // @RequestMapping("/addUserToTeam")
    // public ResponseEntity<Team> addUserToTeam(@RequestParam String userId, @RequestParam String teamId) {
    //     Team team = DataBase.getTeamById(teamId);
    //     if (team == null) {
    //         System.out.println("Team not found");
    //         return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    //     }
    //     User user = DataBase.getUserInfo(userId);
    //     if (user == null) {
    //         System.out.println("user not found");
    //         return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    //     }
    //     if (team.getMembers().contains(user)) {
    //         System.out.println("User exist in team");
    //         return new ResponseEntity<>(HttpStatus.CONFLICT);
    //     }
        
    //     DataBase.removeTeam(team);
    //     team.addMember(user);
    //     DataBase.addTeam(team);
    //     DataBase.saveTeams();
    //     return ResponseEntity.ok(team);
    // }

    // @RequestMapping("/getUser")
    // public static ResponseEntity<User> getUser(@RequestParam String id) {
    //     User user = DataBase.getUserInfo(id);
    //     if (user == null) {
    //         return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    //     }
    //     return ResponseEntity.ok(user);
    // }

    // @RequestMapping("/getUsers") 
    // public ResponseEntity<ArrayList<User>> getUsers() {
    //     ArrayList<User> users = DataBase.getUsers();
    //     return ResponseEntity.ok(users);
    // }

    // @RequestMapping("/createUser")
    // public ResponseEntity<User> createUser(@RequestParam String name, @RequestParam String phoneNum, @RequestParam String email, @RequestParam String password, @RequestParam String type, @RequestParam String researchInterest, @RequestParam String avatar) {
    //     if (type.equals("Admin")) {
    //         Admin user = Admin.create(name, phoneNum, email, avatar);
    //         DataBase.addUser(user);
    //         return ResponseEntity.ok(user);
    //     } else {
    //         TeamMember user = TeamMember.create(name, phoneNum, email, avatar);
    //         user.setResearchInterest(researchInterest);
    //         DataBase.addUser(user);
    //         return ResponseEntity.ok(user);
    //     }
    // }

    // @RequestMapping("/getTeamProjects")
    // public ResponseEntity<ArrayList<Project>> getTeamProjects(@RequestParam String teamId) {
    //     Team team = DataBase.getTeamById(teamId);
    //     if (team == null) {
    //         return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    //     }
    //     ArrayList<Project> projects = new ArrayList<>();
    //     for (String id: team.getProjectIds()) {
    //         Project project = DataBase.getProjectById(id);
    //         if (project != null) {
    //             projects.add(project);
    //         }
    //     }
    //     return ResponseEntity.ok(projects);
    // }

    // @RequestMapping("/getAllMachines")
    // public ResponseEntity<ArrayList<Machine>> getAllMachines() {
    //     ArrayList<Machine> machines = DataBase.getMachines();
    //     return ResponseEntity.ok(machines);
    // }
    // @RequestMapping("/getMachineById")
    // public ResponseEntity<Machine> getMachineById(@RequestParam String machineId) {
    //     Machine machine = DataBase.getMachineById(machineId);
    //     if (machine == null) {
    //         return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    //     }
    //     return ResponseEntity.ok(machine);
    // }

    // @RequestMapping("/createMachine")
    // public ResponseEntity<Machine> createMachine(@RequestParam String name, @RequestParam String status) {
    //     Machine machine = Machine.create(name);
    //     DataBase.addMachine(machine);
    //     return ResponseEntity.ok(machine);
    // }
    // @RequestMapping("/deleteMachine")
    // public ResponseEntity<Machine> deleteMachine(@RequestParam String machineId) {
    //     Machine machine = DataBase.getMachineById(machineId);
    //     if (machine == null) {
    //         return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    //     }
    //     DataBase.removeMachine(machine);
    //     return ResponseEntity.ok(machine);
    // }

    // @RequestMapping("/changeMachineStatus")
    // public ResponseEntity<Machine> changeMachineStatus(@RequestParam String machineId, @RequestParam String status) {
    //     Machine machine = DataBase.getMachineById(machineId);
    //     if (machine == null) {
    //         return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    //     }
    //     DataBase.removeMachine(machine);
    //     machine.setStatus(status);
    //     DataBase.addMachine(machine);
    //     return ResponseEntity.ok(machine);
    // }    

    // @RequestMapping("/getMachineReservations")
    // public ResponseEntity<ArrayList<Reservation>> getMachineReservations(@RequestParam String machineId) {
    //     ArrayList<Reservation> reservations = DataBase.getMachineReservations(machineId);
    //     return ResponseEntity.ok(reservations);
    // }

    // @RequestMapping("/getTeamReservations")
    // public ResponseEntity<ArrayList<Reservation>> getTeamReservations(@RequestParam String teamId) {
    //     ArrayList<Reservation> reservations = DataBase.getTeamReservations(teamId);
    //     return ResponseEntity.ok(reservations);
    // }
    // @RequestMapping("/reserveMachine")
    // public ResponseEntity<Reservation> reserveMachine(@RequestParam String machineId, @RequestParam String teamId, @RequestParam String startTime, @RequestParam String endTime) {
    //     Machine machine = DataBase.getMachineById(machineId);
    //     if (machine == null) {
    //         return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    //     }
    //     Team team = DataBase.getTeamById(teamId);
    //     if (team == null) {
    //         return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    //     }
    //     try {
    //         Reservation reservation = Reservation.create(machine, team, startTime, endTime);    
    //         DataBase.addReservation(reservation);
    //         return ResponseEntity.ok(reservation);
    //     } catch (Exception e) {
    //         return new ResponseEntity<>(HttpStatus.CONFLICT);
    //     }
    // }
    // @RequestMapping("/cancelReservation")
    // public ResponseEntity<Reservation> cancelReservation(@RequestParam String reservationId) {
    //     Reservation reservation = DataBase.getReservationById(reservationId);
    //     if (reservation == null) {
    //         // return NotFound  and a special message
    //         return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    //     }
    //     DataBase.removeReservation(reservation);
    //     return ResponseEntity.ok(reservation);
    // }
    // @RequestMapping("/getReservation")
    // public ResponseEntity<Reservation> getReservation(@RequestParam String reservationId) {
    //     Reservation reservation = DataBase.getReservationById(reservationId);
    //     if (reservation == null) {
    //         // return NotFound  and a special message
    //         return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    //     }
    //     return ResponseEntity.ok(reservation);
    // }

}
