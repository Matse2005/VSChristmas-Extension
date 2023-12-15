import * as globals from './globals.json';

export function daysLeft() {
  // Get the current date
  var today = new Date();

  // Create a Date object for Christmas of the current year
  let cmas: Date = new Date(today.getFullYear(), globals.christmas.month, globals.christmas.day);

  // Check if the current date is after December 25th
  if (today.getMonth() === globals.christmas.month && today.getDate() > globals.christmas.day) {
    // If true, set Christmas for the next year
    cmas.setFullYear(cmas.getFullYear() + 1);
  }

  // Calculate the difference in days between today and Christmas
  var one_day = 1000 * 60 * 60 * 24;

  // Log the number of days left until Christmas to the console
  var days: number = Math.ceil((cmas.getTime() - today.getTime()) / one_day);

  return days;
}