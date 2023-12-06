import React from "react";
import styles from "./TableItem.module.css"; // Import CSS module for styles
import { type Event } from "@/types/event";

const TableItem = ({ event }: { event: Event }) => {
  return (
    <div
      className={`${styles.tableItem} absolute w-full cursor-alias rounded bg-green-200 text-center text-[12px] dark:bg-green-900`}
    >
      <div className="relative flex h-full w-full items-center justify-center">
        <div className="pointer-events-none absolute left-1 top-0 select-none">
          {event.title}
        </div>
        <div className="pointer-events-none absolute bottom-0 left-1 select-none">
          {event.location}
        </div>
        <div
          className={`${styles.closeButton} flex h-[1.11rem] w-[1.11rem] cursor-pointer select-none items-center justify-center rounded-full bg-white/50 opacity-50 hover:opacity-90 dark:bg-white/[0.15] dark:hover:opacity-100`}
        >
          X
        </div>
        <div className="pointer-events-none absolute right-1 top-0 select-none">
          {event.startTime}
        </div>
        <div className="pointer-events-none absolute bottom-0 right-1 select-none">
          {event.endTime}
        </div>
      </div>
    </div>
  );
};

export default TableItem;
