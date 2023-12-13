import { type Icons } from "@/components/icons";

export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};

export type MainNavItem = NavItem;

export type SidebarNavItem = {
  title: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
} & (
  | {
      href: string;
      items?: never;
    }
  | {
      href?: string;
      items: NavLink[];
    }
);

export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
};

export type DocsConfig = {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
};

export type MarketingConfig = {
  mainNav: MainNavItem[];
};

export type DashboardConfig = {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
};

// data types

export interface User {
  id: string;
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
  name: string;
  description: string;
  avatarFallback: string;
  team: Team;
}

export enum ReservationStatus {
  UPCOMING = "upcoming",
  PAST = "past",
}

export interface Reservation {
  id: string;
  machine: Machine;
  project: Project;
  bookedBy: User;
  bookedOn: Date;
  status: ReservationStatus;
  startTime: Date;
  endTime: Date;
}

export interface Team {
  id: string;
  name: string;
  members: User[];
  projects: Project[];
}

export interface Schedule {
  id: string;
  reservations: Reservation[];
  project: Project;
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
