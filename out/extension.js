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
exports.deactivate = exports.activate = void 0;
const vscode = __importStar(require("vscode"));
let statusBar;
function activate(context) {
    // Days left Command
    let daysLeftCommandId = "VSChristmas.daysLeft";
    let daysLeftCommand = vscode.commands.registerCommand(daysLeftCommandId, function () {
        vscode.window.showInformationMessage(christmas() + " days left until Christmas! 🎅");
    });
    context.subscriptions.push(daysLeftCommand);
    // Status bar item
    statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBar.text = `$(hat-santa) Christmas`;
    statusBar.tooltip = `Shows the days until Christmas.`;
    statusBar.command = daysLeftCommandId;
    context.subscriptions.push(statusBar);
    vscode.workspace.onDidChangeConfiguration((event) => {
        statusBarSetting();
    });
    statusBarSetting();
}
exports.activate = activate;
function statusBarSetting() {
    if (vscode.workspace.getConfiguration("VSChristmas").activateStatusBarItem) {
        statusBar.show();
    }
    else {
        statusBar.hide();
    }
}
function christmas() {
    // Get the current date
    var today = new Date();
    // Create a Date object for Christmas of the current year
    var cmas = new Date(today.getFullYear(), 11, 25);
    // Check if the current date is after December 25th
    if (today.getMonth() === 11 && today.getDate() > 25) {
        // If true, set Christmas for the next year
        cmas.setFullYear(cmas.getFullYear() + 1);
    }
    // Calculate the difference in days between today and Christmas
    var one_day = 1000 * 60 * 60 * 24;
    // Log the number of days left until Christmas to the console
    return Math.ceil((cmas.getTime() - today.getTime()) / one_day);
}
// This method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map