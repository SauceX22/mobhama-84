package com.example.Project;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.config.ScheduledTask;

import java.time.LocalDateTime;


@SpringBootApplication
public class ProjectApplication {
	public static void main(String[] args) {
		DataBase.load();
//		String userId = "f69a8d8f-c34a-4789-9fb3-400db0925189";
//		String machineId = "ff8bc1a0-f25a-45cb-a109-be3718d3bd5c";
//		String teamId = "83005652-76c2-471c-9b81-85d4563af19b";
//		String startTime = "2023-12-13T23:20:00";
//		String endTime = "2023-12-13T23:50:00";
//		User user = DataBase.getUserInfo(userId);
//		if (user == null) {
//			System.out.println("null user");
//		}
//		Machine machine = DataBase.getMachineById(machineId);
//		if (machine == null) {
//			System.out.println("null machine");
//		}
//		Team team = DataBase.getTeamById(teamId);
//		if (team == null) {
//			System.out.println("null team");
//		}
//		if (!user.getRole().equals(User.Role.ADMIN) && !team.getMembers().contains(user)) {
//			System.out.println("authori");
//		}
//		Reservation reservation = Reservation.create(machine,team, startTime, endTime);
//		if (reservation == null) {
//			// return that time is not available
//			System.out.println("no reserve");
//		}
//		reservation.setBookedBy(user);
//		reservation.setBookedOn(LocalDateTime.now());
//		reservation.setStatus();
//
//		if (DataBase.addReservation(reservation)) {
//			System.out.println("added");
//		}
		SpringApplication.run(ProjectApplication.class, args);
	}
}
