import { christmasDay, christmasMonth } from "./christmasDate";

export function daysLeft() {
  // Get the current date
  var today = new Date();

  // Create a Date object for Christmas of the current year
  let cmas: Date = new Date(today.getFullYear(), christmasMonth, christmasDay);

  // Check if the current date is after December 25th
  if (today.getMonth() === christmasMonth && today.getDate() > christmasDay) {
    // If true, set Christmas for the next year
    cmas.setFullYear(cmas.getFullYear() + 1);
  }

  // Calculate the difference in days between today and Christmas
  var one_day = 1000 * 60 * 60 * 24;

  // Log the number of days left until Christmas to the console
  var days: number = Math.ceil((cmas.getTime() - today.getTime()) / one_day);
  console.log(days)

  return days;
}