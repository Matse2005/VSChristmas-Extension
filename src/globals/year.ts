function getDaysInYear(year: number): number {
  return isLeapYear(year) ? 366 : 365;
}

function isLeapYear(year: number): boolean {
  if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
    return true; // Leap year condition: divisible by 4 and not by 100 unless also divisible by 400
  } else {
    return false; // Not a leap year
  }
}

function getDaysInCurrentYear(): number {
  const currentYear = new Date().getFullYear();
  return getDaysInYear(currentYear);
}

export { getDaysInCurrentYear, isLeapYear, getDaysInYear };