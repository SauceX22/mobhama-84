
export class Project {
    private _id: string;
    private _title: string;
    private _description: string;
    private _avatarFallback: string;
    private _owner: string;

    constructor(project: {
        id: string;
        title: string;
        description: string;
        avatarFallback: string;
        owner: string;
    }) {
        this._id = project.id;
        this._title = project.title;
        this._description = project.description;
        this._avatarFallback = project.avatarFallback;
        this._owner = project.owner;
    }

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }

    get avatarFallback(): string {
        return this._avatarFallback;
    }

    set avatarFallback(value: string) {
        this._avatarFallback = value;
    }

    get owner(): string {
        return this._owner;
    }

    set owner(value: string) {
        this._owner = value;
    }
}
