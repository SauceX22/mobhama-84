import {
    type Machine,
    type Team,
    type Reservation,
} from "@/types";


export class Reservation {
    private _machine?: Machine;
    private _team?: Team;
    private _startTime?: Date;
    private _endTime?: Date;

    constructor(machine: Machine, team: Team, startTime: Date, endTime: Date) {
        this._machine = machine;
        this._team = team;
        this._startTime = startTime;
        this._endTime = endTime;
    }

    setMachine(machine: Machine): void {
        this._machine = machine;
    }

    getMachine(): Machine | undefined {
        return this._machine;
    }

    setTeam(team: Team): void {
        this._team = team;
    }

    getTeam(): Team | undefined {
        return this._team;
    }

    getStartTime(): Date | undefined {
        return this._startTime;
    }

    getEndTime(): Date | undefined {
        return this._endTime;
    }

    reschedule(startTime: Date, endTime: Date): void {
        this._startTime = startTime;
        this._endTime = endTime;
    }

    cancel(): void {
        this._machine = undefined;
        this._team = undefined;
        this._startTime = undefined;
        this._endTime = undefined;
    }
}


// my classes
// export class Reservation {
//     private _title: string;
//     private _startTime: string;
//     private _duration: number;
//     private _day: string;
//     private _location: string;

//     constructor(event: {
//         title: string;
//         startTime: string;
//         duration: number;
//         day: string;
//         location: string;
//     }) {
//         if (event.duration <= 0) {
//             throw new Error("Duration cannot be zero or negative");
//         }
//         this._title = event.title;
//         this._startTime = event.startTime;
//         this._duration = event.duration;
//         this._day = event.day;
//         this._location = event.location;
//     }

//     get title(): string {
//         return this._title;
//     }

//     set title(value: string) {
//         this._title = value;
//     }

//     get startTime(): string {
//         return this._startTime;
//     }

//     set startTime(value: string) {
//         this._startTime = value;
//     }

//     get duration(): number {
//         return this._duration;
//     }

//     set duration(value: number) {
//         this._duration = value;
//     }

//     get day(): string {
//         return this._day;
//     }

//     set day(value: string) {
//         this._day = value;
//     }

//     get location(): string {
//         return this._location;
//     }

//     set location(value: string) {
//         this._location = value;
//     }

//     get endTime(): string {
//         return format(addMinutes(new Date(this.startTime), this.duration), "HH:mm");
//     }

//     get row(timeTableStartTime: string?): number {
//         // Assuming each time slot is 60 minutes
//         const timeSlotDuration = 60;

//         // Assuming the start time of the timetable is 07:00 or use the provided time
//         const timetableStartTime = parse(timeTableStartTime ?? "07:00", "HH:mm", new Date());

//         // Calculate the start time of the event
//         const eventStartTime = parse(this.startTime, "HH:mm", new Date());

//         // Calculate the time difference in minutes
//         const timeDifference = differenceInMinutes(eventStartTime, timetableStartTime);

//         // Calculate the row based on the time difference and time slot duration
//         const row = Math.floor(timeDifference / timeSlotDuration);

//         return row;
//     }

// }