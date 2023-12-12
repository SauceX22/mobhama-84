/* eslint-disable @typescript-eslint/no-empty-interface */

import { useQuery } from "@tanstack/react-query";

// User.ts
export interface User {
    id: string; // extra
    name: string;
    phoneNum: string;
    email: string;
}

export interface TeamMember extends User {
    researchInterest: string;
}

export interface Admin extends User { }

// Machine.ts
export interface Machine {
    id: string;
    name: string;
}

export const useMachineQuery = () => {
    // TODO @SauceX: validate the machine URL
    return useQuery<Machine>('machine', async () => {
        const response = await fetch('/api/machine'); // TODO @SauceX: validate the machine URL
        return response.json();
    });
};

// Project.ts
export interface Project {
    id: string;
    title: string;
    description: string; // extra
    avatarFallback: string;
    owner: string;
}

export const useProjectQuery = () => {
    // TODO @SauceX: validate the project URL
    return useQuery<Project>('project', async () => {
        const response = await fetch('/api/project'); // TODO @SauceX: validate the project URL
        return response.json();
    });
};


// Reservation.ts
export interface Reservation {
    id: string;
    machine: Machine;
    team: Team;
    bookedBy: User;
    startTime: Date;
    duration: number;
}

export const useReservationQuery = () => {
    // TODO @SauceX: validate the reservation URL
    return useQuery<Reservation>('reservation', async () => {
        const response = await fetch('/api/reservation'); // TODO @SauceX: validate the reservation URL
        return response.json();
    });
};

// Team.ts
export interface Team {
    id: string;
    name: string;
    members: User[];
    projects: Project[];
}

export const useTeamQuery = () => {
    // TODO @SauceX: validate the team URL
    return useQuery<Team>('team', async () => {
        const response = await fetch('/api/team'); // TODO @SauceX: validate the team URL
        return response.json();
    });
};

// TeamMember.ts
export interface TeamMember extends User {
    researchInterest: string;
}

export const useTeamMemberQuery = () => {
    // TODO @SauceX: validate the team member URL
    return useQuery<TeamMember>('team-member', async () => {
        const response = await fetch('/api/team-member'); // TODO @SauceX: validate the team member URL
        return response.json();
    });
};
