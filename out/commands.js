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
exports.daysLeft = void 0;
const vscode = __importStar(require("vscode"));
const christmas = __importStar(require("./globals/christmas"));
const year = __importStar(require("./globals/year"));
function daysLeft() {
    let id = "VSChristmas.daysLeft";
    let command = vscode.commands.registerCommand(id, function () {
        let message = "";
        if (christmas.daysLeft() === 0) {
            message = "Ho Ho Ho, Merry Christmas! 🎅";
        }
        else if (christmas.daysLeft() >= year.getDaysInCurrentYear() - 5) {
            let days = year.getDaysInCurrentYear() + 1 - christmas.daysLeft();
            message = "Christmas was " + days + " day" + (days === 1 ? '' : 's') + " ago! 🎅";
        }
        else {
            let days = christmas.daysLeft();
            message = days + " day" + (days === 1 ? '' : 's') + " left until Christmas! 🎅";
        }
        vscode.window.showInformationMessage(message);
    });
    return {
        "command": command,
        "id": id
    };
}
exports.daysLeft = daysLeft;
//# sourceMappingURL=commands.js.map