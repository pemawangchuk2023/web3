import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDateString(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',   
      year: 'numeric',   
      month: 'long',    
      day: 'numeric',   
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit', 
      hour12: true      
  };
  return date.toLocaleString('en-US', options);
}
