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
const statusbar = __importStar(require("./globals/visible"));
let statusBarText = {
    'large': "$(hat-santa) Christmas",
    'short': "$(hat-santa)"
};
let statusBarLeft;
let statusBarRight;
let daysLeftCommand;
function activate(context) {
    // Days left Command
    daysLeftCommand = (0, commands_1.daysLeft)();
    context.subscriptions.push(daysLeftCommand['command']);
    statusBarRight = statusBarItem(daysLeftCommand['id']);
    statusBarLeft = statusBarItem(daysLeftCommand['id'], vscode.StatusBarAlignment.Left);
    context.subscriptions.push(statusBarRight);
    context.subscriptions.push(statusBarLeft);
    vscode.workspace.onDidChangeConfiguration((event) => {
        statusBarSetting();
    });
    statusBarSetting();
}
exports.activate = activate;
function statusBarSetting() {
    let location = vscode.workspace.getConfiguration("VSChristmas").StatusBarItemLocation;
    let text = vscode.workspace.getConfiguration("VSChristmas").toggleLargeStatusBarText;
    let before = vscode.workspace.getConfiguration("VSChristmas").StatusBarButtonVisibleTimeBeforeChistmas;
    if (text) {
        statusBarRight.text = statusBarText['large'];
        statusBarLeft.text = statusBarText['large'];
    }
    else {
        statusBarRight.text = statusBarText['short'];
        statusBarLeft.text = statusBarText['short'];
    }
    if (statusbar.visible(before)) {
        if (location !== "None") {
            if (location !== "Both") {
                if (location !== 'Right') {
                    statusBarRight.hide();
                    statusBarLeft.show();
                }
                else {
                    statusBarRight.show();
                    statusBarLeft.hide();
                }
            }
            else {
                statusBarRight.show();
                statusBarLeft.show();
            }
        }
        else {
            statusBarRight.hide();
            statusBarLeft.hide();
        }
    }
    else {
        statusBarRight.hide();
        statusBarLeft.hide();
    }
}
function statusBarItem(id, alignment = vscode.StatusBarAlignment.Right, tooltip = "Shows the days until Christmas.", text = statusBarText['large'], priority = 100) {
    let statusBar;
    statusBar = vscode.window.createStatusBarItem(alignment, priority);
    statusBar.text = text;
    statusBar.tooltip = tooltip;
    statusBar.command = id;
    return statusBar;
}
// This method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map