"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { type Event } from "@/types/event";
import TableItem from "@/components/table-item";

const days = ["SUN", "MON", "TUE", "WED", "THU"];

const TimeTable: React.FC = () => {
  const columns = 2;
  const rows = 11;

  // State to store events
  const [events, setEvents] = useState<Event[]>([]);

  // Function to add an event
  const addEvent = (newEvent: Event) => {
    // Update the events state
    setEvents([...events, newEvent]);
  };

  // Function to generate the rows for each day
  const generateRows = () => {
    const rowElements = [];
    // Loop through each day
    for (let dayIndex = 0; dayIndex < days.length; dayIndex++) {
      const day = days[dayIndex]!;

      // Generate the structure for each day
      const dayElement = (
        <div key={dayIndex} className="relative col-span-2">
          {/* Header for the day */}
          <div className="bg-light dark:bg-midnight sticky top-0 z-20 flex h-7 select-none items-center justify-center border-b border-gray-500/10 text-xs dark:border-gray-400/10">
            {day}
          </div>
          {/* Container for the content */}
          <div className="absolute z-10 w-full px-1 py-[0.125rem]">
            {generateEventsForDay(day)}
          </div>
          {/* Rows for the day */}
          <div className="absolute z-0 box-border w-full min-w-fit border-x border-b border-gray-400 opacity-30">
            {generateDayRows()}
          </div>
        </div>
      );

      rowElements.push(dayElement);
    }

    return rowElements;
  };

  // Function to generate the rows for each day
  const generateDayRows = () => {
    const dayRowElements = [];

    // Loop through each row
    for (let i = 0; i < rows; i++) {
      const colElements = [];

      // Loop through each column
      for (let j = 0; j < columns; j++) {
        // Determine the style class based on column index
        const styleClass =
          j % 2 === 0 ? "dark:border-gray-400" : "dark:border-gray-600";

        // Generate the column element
        colElements.push(
          <div
            key={j}
            className={`col-span-1 box-border h-8 min-w-[6rem] border-t border-gray-500 text-center ${styleClass}`}
          >
            {/* Display events in the cell */}
            {generateEventsForCell(i, days[j]!)}
          </div>,
        );
      }

      // Wrap the columns in a row element
      dayRowElements.push(<div key={i}>{colElements}</div>);
    }

    return dayRowElements;
  };

  // Function to generate events for a specific day
  const generateEventsForDay = (day: string) => {
    const dayEvents = events.filter((event) => event.day === day);
    return dayEvents.map((event, index) => (
      <TableItem key={index} event={event} />
    ));
  };

  // Function to generate events for a specific cell
  const generateEventsForCell = (row: number, day: string) => {
    const cellEvents = events.filter(
      (event) => event.day === day && event.row === row,
    );
    return cellEvents.map((event, index) => (
      <TableItem key={index} event={event} />
    ));
  };

  // Function to generate time slots
  const generateTimeSlots = () => {
    const timeSlots = [];

    // Array of time labels
    const timeLabels = [
      "07:00",
      "08:00",
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
    ];

    // Loop through each time label
    for (let i = 0; i < timeLabels.length; i++) {
      // Generate the time slot element
      const timeSlot = (
        <div
          key={i}
          className={cn(
            "flex h-16 items-start justify-center text-sm",
            i === 0 ? "mt-3" : "mt-0",
          )}
        >
          {timeLabels[i]}
        </div>
      );

      timeSlots.push(timeSlot);
    }

    return timeSlots;
  };

  return (
    <div
      className="m-4 flex w-full  flex-col rounded-lg border border-foreground bg-transparent p-6 outline-none"
      role="tabpanel"
      tabIndex={0}
    >
      <div className="flex h-fit w-full min-w-fit overflow-visible">
        <div className="sticky left-0 z-10 flex h-full w-16 min-w-[54px] select-none flex-col rounded-t-lg rounded-bl-lg bg-primary p-2 text-primary-foreground">
          {generateTimeSlots()}
        </div>
        <div className="grid h-full w-full min-w-fit grid-cols-10">
          {generateRows()}
        </div>
      </div>
    </div>
  );
};

export default TimeTable;
