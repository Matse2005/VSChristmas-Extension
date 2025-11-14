import { ChristmasDaysCalculator } from './christmasDaysCalculator';
import { ConfigManager } from './configManager';

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;  // Added to indicate if the time is past Christmas
}

export class ChristmasCountdownCalculator {
  private configManager: ConfigManager;
  private christmasDaysCalculator: ChristmasDaysCalculator;

  constructor(configManager?: ConfigManager, christmasDaysCalculator?: ChristmasDaysCalculator) {
    this.configManager = configManager || new ConfigManager();
    this.christmasDaysCalculator = christmasDaysCalculator || new ChristmasDaysCalculator();
  }

  calculateTimeLeft(): TimeRemaining {
    // Get the current date and time
    const now = new Date();

    // Get Christmas day and month from configuration
    const { day: christmasDay, month: christmasMonth } = this.configManager.getChristmasDayAndMonth();

    // Create Date objects for this year's and next year's Christmas
    const thisYearChristmas = new Date(now.getFullYear(), christmasMonth - 1, christmasDay);
    const nextYearChristmas = new Date(now.getFullYear() + 1, christmasMonth - 1, christmasDay);

    // Determine which Christmas date to use and if we're past Christmas
    let targetDate: Date;
    let isPast = false;

    if (now < thisYearChristmas) {
      targetDate = thisYearChristmas;
    } else {
      // We're either on Christmas or after it
      if (now.getDate() === thisYearChristmas.getDate() &&
        now.getMonth() === thisYearChristmas.getMonth()) {
        // It's Christmas day
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isPast: false
        };
      }
      // After Christmas - calculate time since Christmas
      targetDate = thisYearChristmas;
      isPast = true;
    }

    // Calculate total milliseconds difference
    const diff = isPast
      ? now.getTime() - targetDate.getTime()
      : targetDate.getTime() - now.getTime();

    // Convert to days, hours, minutes, seconds
    const oneSecond = 1000;
    const oneMinute = oneSecond * 60;
    const oneHour = oneMinute * 60;
    const oneDay = oneHour * 24;

    const days = Math.floor(diff / oneDay);
    const hours = Math.floor((diff % oneDay) / oneHour);
    const minutes = Math.floor((diff % oneHour) / oneMinute);
    const seconds = Math.floor((diff % oneMinute) / oneSecond);

    return {
      days,
      hours,
      minutes,
      seconds,
      isPast
    };
  }

  getFormattedCountdown(): string {
    const time = this.calculateTimeLeft();
    const christmasDays = this.christmasDaysCalculator.calculateDays();

    // Handle Christmas Day
    if (christmasDays.isChristmas) {
      return "It's Christmas!";
    }

    // Handle post-Christmas period (within 5 days)
    if (christmasDays.daysSinceLast !== null && christmasDays.daysSinceLast <= 5) {
      if (time.days > 0) {
        return `Christmas was ${time.days} ${time.days === 1 ? 'day' : 'days'} ago`;
      } else if (time.hours > 0) {
        return `Christmas was ${time.hours} ${time.hours === 1 ? 'hour' : 'hours'} ago`;
      } else if (time.minutes > 0) {
        return `Christmas was ${time.minutes} ${time.minutes === 1 ? 'minute' : 'minutes'} ago`;
      } else {
        return `Christmas was ${time.seconds} ${time.seconds === 1 ? 'second' : 'seconds'} ago`;
      }
    }

    // Handle countdown to next Christmas
    const parts = [];

    if (time.days > 0)
      parts.push(`${time.days} ${time.days === 1 ? "day" : "days"}`);

    if (time.hours > 0 || time.days > 0)
      parts.push(`${time.hours} ${time.hours === 1 ? "hour" : "hours"}`);

    if (time.minutes > 0 || time.hours > 0 || time.days > 0)
      parts.push(`${time.minutes} ${time.minutes === 1 ? "minute" : "minutes"}`);

    if (
      this.configManager.isSecondsEnabled()
    ) {
      parts.push(`${time.seconds} ${time.seconds === 1 ? "second" : "seconds"}`);
    }

    function joinWithAnd(parts: string[]) {
      if (parts.length === 0) return "";
      if (parts.length === 1) return parts[0];
      if (parts.length === 2) return parts.join(" and ");
      return parts.slice(0, -1).join(", ") + " and " + parts[parts.length - 1];
    }

    return joinWithAnd(parts);

  }
}