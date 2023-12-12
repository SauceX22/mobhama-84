import { type Reservation } from "@/server/api"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { getHours } from "date-fns"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`
}

function getReservationHourRowWithStartTime(reservation: Reservation, tableStartTime: number) {
  return getHours(reservation.startTime) - tableStartTime;
}

export function getReservationHourRow(reservation: Reservation) {
  return getReservationHourRowWithStartTime(reservation, 7)
}
