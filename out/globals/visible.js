"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.visible = void 0;
const christmas = __importStar(require("./christmas"));
const globals = __importStar(require("./globals.json"));
const year = __importStar(require("./year"));
const durations = [
    ['1 day', 1],
    ['5 days', 5],
    ['1 week', 7],
    ['1 month', 30],
    ['2 months', 60],
    ['6 months', 180],
    ['Always', Infinity],
];
function visible(from) {
    // Example usage
    const currentDate = new Date(); // Current date
    const isBetween = isBetweenDates(currentDate, from);
    if (christmas.daysLeft() >= year.getDaysInCurrentYear() - 5) {
        return true;
    }
    return isBetween;
}
exports.visible = visible;
function isBetweenDates(dateToCheck, duration) {
    const selectedDuration = durations.find((dur) => dur[0] === duration);
    if (!selectedDuration) {
        return false; // Invalid duration
    }
    const days = selectedDuration[1];
    const today = dateToCheck;
    const christmasDate = new Date(today.getFullYear(), globals.christmas.month, globals.christmas.day); // Set Christmas date
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
//# sourceMappingURL=visible.js.map