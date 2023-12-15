"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDaysInYear = exports.isLeapYear = exports.getDaysInCurrentYear = void 0;
function getDaysInYear(year) {
    return isLeapYear(year) ? 366 : 365;
}
exports.getDaysInYear = getDaysInYear;
function isLeapYear(year) {
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        return true; // Leap year condition: divisible by 4 and not by 100 unless also divisible by 400
    }
    else {
        return false; // Not a leap year
    }
}
exports.isLeapYear = isLeapYear;
function getDaysInCurrentYear() {
    const currentYear = new Date().getFullYear();
    return getDaysInYear(currentYear);
}
exports.getDaysInCurrentYear = getDaysInCurrentYear;
//# sourceMappingURL=year.js.map