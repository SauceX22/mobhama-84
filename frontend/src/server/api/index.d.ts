
export interface User {
    id: string; // extra
    name: string;
    phoneNum: string;
    email: string;
    avatar: string;
    avatarFallback: string;
}

export interface Machine {
    id: string;
    name: string;
}

export interface Project {
    id: string;
    title: string;
    description: string; // extra
    avatarFallback: string;
    owner: string;
}

export enum ReservationStatus {
    UPCOMING = 'upcoming',
    PAST = 'past',
}

export interface Reservation {
    id: string;
    machine: Machine;
    project: Project;
    bookedBy: User;
    bookedOn: Date;
    status: ReservationStatus;
    startTime: Date;
    duration: number;
}

export interface Team {
    id: string;
    name: string;
    members: User[];
    projects: Project[];
}

// Request types

export interface MachineRequest {
    name: string;
}

export interface ProjectRequest {
    title: string;
    description: string;
    avatarFallback: string;
    owner: string;
}

export interface UserRequest {
    name: string;
    phoneNum: string;
    email: string;
    avatar: string;
    avatarFallback: string;
}

export interface TeamRequest {
    name: string;
}

