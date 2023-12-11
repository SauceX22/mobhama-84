import { v4 as uuidv4 } from 'uuid';

export class Machine {
    private _id: string;
    private _name: string;

    constructor(name: string) {
        this._id = uuidv4();
        this._name = name;
    }

    setName(name: string): void {
        this._name = name;
    }

    getName(): string {
        return this._name;
    }

    static create(name?: string): Machine {
        return new Machine(name);
    }

    static delete(): void { }
}
