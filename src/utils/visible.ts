import { ConfigManager } from '../services/configManager';
import { ChristmasDaysCalculator } from '../services/christmasDaysCalculator';
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

export function visible(from: string): boolean {
  const configManager = new ConfigManager();
  const calculator = new ChristmasDaysCalculator(configManager);
  const christmasDays = calculator.calculateDays();

  // If it's Christmas Day, always show
  if (christmasDays.isChristmas) {
    return true;
  }

  // If it's within 5 days after Christmas, always show
  if (christmasDays.daysSinceLast !== null && christmasDays.daysSinceLast <= 5) {
    return true;
  }

  // Otherwise, check against the duration settings
  return isBetweenDates(new Date(), from, configManager);
}

function isBetweenDates(dateToCheck: Date, duration: string, configManager: ConfigManager): boolean {
  const selectedDuration = durations.find((dur) => dur[0] === duration);
  if (!selectedDuration) {
    return false; // Invalid duration
  }

  const days = selectedDuration[1];
  if (days === Infinity) {
    return true; // 'Always' duration is always visible
  }

  const { day: christmasDay, month: christmasMonth } = configManager.getChristmasDayAndMonth();
  const today = dateToCheck;
  const thisYear = today.getFullYear();

  // Create Christmas date for current year
  const christmasDate = new Date(thisYear, christmasMonth - 1, christmasDay);

  // If we're past Christmas, use next year's Christmas date
  if (today > christmasDate) {
    christmasDate.setFullYear(thisYear + 1);
  }

  // Calculate start date based on the duration
  const startDate = new Date(christmasDate);
  startDate.setDate(startDate.getDate() - days);

  return today >= startDate && today <= christmasDate;
}