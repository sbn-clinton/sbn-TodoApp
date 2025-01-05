import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import  bcrypt from "bcryptjs"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatDate(date: Date) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  }
  return new Intl.DateTimeFormat("en-US", options).format(date)
}

export const formatDateTime = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  }
  return new Intl.DateTimeFormat("en-US", options).format(date)
}

export const formatDateTimeShort = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  }
  return new Intl.DateTimeFormat("en-US", options).format(date)
} 

export const saltAndHashPassword =  (password: string) => {
  const saltRound = 10;
  const salt = bcrypt.genSaltSync(saltRound);
  const hash =  bcrypt.hashSync(password, salt);
  return hash;
}