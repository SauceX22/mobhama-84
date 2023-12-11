import {
    type Project,
    type Team,
    type User,
    type TeamMember,
} from "@/types";

export class Team {
    private _name: string;
    private _members: User[];
    private _projects: Project[];

    constructor(name?: string) {
        this._name = name ?? "";
        this._members = [];
        this._projects = [];
    }

    getName(): string {
        return this._name;
    }

    setName(name: string): void {
        this._name = name;
    }

    setMembers(members: User[]): void {
        this._members = members;
    }

    getMembers(): User[] {
        return this._members;
    }

    getProjects(): Project[] {
        return this._projects;
    }

    static create(name?: string): Team {
        return new Team(name);
    }

    delete(): void { }

    addMember(member: TeamMember): void {
        this._members.push(member);
    }

    removeMember(member: TeamMember): void {
        const index = this._members.indexOf(member);
        if (index !== -1) {
            this._members.splice(index, 1);
        }
    }

    addProject(project: Project): void {
        this._projects.push(project);
    }

    removeProject(project: Project): void {
        const index = this._projects.indexOf(project);
        if (index !== -1) {
            this._projects.splice(index, 1);
        }
    }
}
