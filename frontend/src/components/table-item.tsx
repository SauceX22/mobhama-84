import React from "react";
import { Icons } from "./icons";
import { type Reservation } from "@/server/api";
import { parse, set } from "date-fns";
import { cn } from "@/lib/utils";

type TableItemProps = {
  reservationId: string;
};

const TableItem = ({ reservationId }: TableItemProps) => {
  // TODO fetch and mark loading
  const reservation = {
    id: "event-id",
    machine: {
      id: "machine-id",
      name: "machine 1",
    },
    team: {
      id: "team-id",
      name: "team 1",
      members: [],
      projects: [],
    },
    startTime: set(parse("2023-12-12", "yyyy-MM-dd", new Date()), {
      hours: 9,
      minutes: 0,
    }),
    duration: 60,
  };

  return (
    <div
      className={cn(
        "absolute h-16 w-full rounded-md bg-green-200 text-center text-[12px] text-white shadow-sm dark:bg-green-500",
        // row span = int(duration/30) + 1
        // Math.floor(reservation.duration / 30) + 1,
      )}
      style={{
        gridRow:
          Math.floor(reservation.duration / 30) +
          (reservation.duration % 30 !== 0 ? 1 : 0),
      }}
    >
      <div className="relative flex h-full w-full items-center justify-center">
        <div className="pointer-events-none absolute left-1 top-0 select-none">
          team name
          {/* {reservation.} */}
        </div>
        <div className="pointer-events-none absolute bottom-0 left-1 select-none">
          machine name
          {/* {reservation.machine.name} */}
        </div>
        <div
          className={`flex h-[1.11rem] w-[1.11rem] cursor-pointer select-none items-center justify-center rounded-full bg-white/50 opacity-50 hover:opacity-90 dark:bg-white/[0.15] dark:hover:opacity-100`}
        >
          <Icons.close />
        </div>
        <div className="pointer-events-none absolute right-1 top-0 select-none">
          {/* {reservation.startTime} */}
        </div>
        <div className="pointer-events-none absolute bottom-0 right-1 select-none">
          end time
          {/* {reservation.endTime} */}
        </div>
      </div>
    </div>
  );
};

export default TableItem;
