import * as christmas from './christmas';
import { christmasDay, christmasMonth } from './christmasDate';
import * as year from './year';

type Duration = [string, number][];

const durations: Duration = [
  ['1 day', 1],
  ['5 days', 5],
  ['1 week', 7],
  ['1 month', 30],
  ['2 months', 60],
  ['6 months', 180],
  ['Always', Infinity],
];

export function visible(from: string) {
  // Example usage
  const currentDate = new Date(); // Current date
  const isBetween = isBetweenDates(currentDate, from);
  if(christmas.daysLeft() >= year.getDaysInCurrentYear() - 5) {
    return true;
  }

  return isBetween;
}

function isBetweenDates(dateToCheck: Date, duration: string): boolean {
  const selectedDuration = durations.find((dur) => dur[0] === duration);

  if (!selectedDuration) {
    return false; // Invalid duration
  }

  const days = selectedDuration[1];
  const today = dateToCheck;
  const christmasDate = new Date(today.getFullYear(), christmasMonth, christmasDay); // Set Christmas date

  const startDate = new Date(christmasDate);

  switch (days) {
    case 1:
      startDate.setDate(startDate.getDate() - 1);
      break;
    case 5:
      startDate.setDate(startDate.getDate() - 5);
      break;
    case 7:
      startDate.setDate(startDate.getDate() - 7);
      break;
    case 30:
      startDate.setMonth(startDate.getMonth() - 1);
      break;
    case 60:
      startDate.setMonth(startDate.getMonth() - 2);
      break;
    case 180:
      startDate.setMonth(startDate.getMonth() - 6);
      break;
    case Infinity:
      return true; // 'Always' duration is always considered true
    default:
      return false; // Invalid duration
  }

  return today >= startDate && today <= christmasDate;
}