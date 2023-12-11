import {
    type User,
    type Admin,
    type TeamMember,
} from "@/types";

export class TeamMember extends User {
    private _researchInterest: string;

    constructor(name: string, phoneNum: string, email: string, id: string) {
        super(name, phoneNum, email, id);
        this._researchInterest = "";
    }

    setResearchInterest(researchInterest: string): void {
        this._researchInterest = researchInterest;
    }

    static create(name?: string, phoneNum?: string, email?: string, id?: string): TeamMember {
        return new TeamMember(name, phoneNum, email, id);
    }
}


export class Admin extends User {
    addUser(id: string): void { }
    removeUser(id: string): void { }
}


export abstract class User {
    protected _name: string;
    protected _id: string;
    protected _phoneNum: string;
    protected _email: string;

    constructor(name?: string, phoneNum?: string, email?: string, id?: string) {
        this._name = name ?? "";
        this._phoneNum = phoneNum ?? "";
        this._email = email ?? "";
        this._id = id ?? UUID.randomUUID().toString();
    }

    createID(): void {
        this._id = UUID.randomUUID().toString();
    }

    signIn(): void { }

    getId(): string {
        return this._id;
    }

    getName(): string {
        return this._name;
    }

    setName(name: string): void {
        this._name = name;
    }

    getPhoneNum(): string {
        return this._phoneNum;
    }

    setPhoneNum(phoneNum: string): void {
        this._phoneNum = phoneNum;
    }

    getEmail(): string {
        return this._email;
    }

    setEmail(email: string): void {
        this._email = email;
    }
}
