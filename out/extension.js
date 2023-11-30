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
const commands_1 = require("./commands");
let statusBarLeft;
let statusBarRight;
let daysLeftCommand;
function activate(context) {
    // Days left Command
    daysLeftCommand = (0, commands_1.daysLeft)();
    context.subscriptions.push(daysLeftCommand['command']);
    // Status bar item right
    statusBarRight = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBarRight.text = `$(hat-santa) Christmas`;
    statusBarRight.tooltip = `Shows the days until Christmas.`;
    statusBarRight.command = daysLeftCommand['id'];
    context.subscriptions.push(statusBarRight);
    // Status bar item left
    statusBarLeft = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
    statusBarLeft.text = `$(hat-santa) Christmas`;
    statusBarLeft.tooltip = `Shows the days until Christmas.`;
    statusBarLeft.command = daysLeftCommand['id'];
    context.subscriptions.push(statusBarLeft);
    vscode.workspace.onDidChangeConfiguration((event) => {
        statusBarSetting();
    });
    statusBarSetting();
}
exports.activate = activate;
function statusBarSetting() {
    if (vscode.workspace.getConfiguration("VSChristmas").activateStatusBarItem) {
        statusBarRight.show();
        statusBarLeft.show();
    }
    else {
        statusBarRight.hide();
        statusBarLeft.hide();
    }
    if (vscode.workspace.getConfiguration("VSChristmas").toggleLargeStatusBarText) {
        statusBarRight.text = `$(hat-santa) Christmas`;
        statusBarLeft.text = `$(hat-santa) Christmas`;
    }
    else {
        statusBarRight.text = `$(hat-santa)`;
        statusBarLeft.text = `$(hat-santa)`;
    }
}
// This method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map