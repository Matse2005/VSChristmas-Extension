import * as vscode from 'vscode';
import { daysLeft } from './commands/daysLeft';
import * as statusbar from './globals/visible';

let statusBarText: any = {
  'large': "$(hat-santa) Christmas",
  'short': "$(hat-santa)"
};

let statusBarLeft: vscode.StatusBarItem;
let statusBarRight: vscode.StatusBarItem;
let daysLeftCommand: any;

export function activate(context: vscode.ExtensionContext) {

  // Days left Command
  daysLeftCommand = daysLeft();

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

function statusBarSetting(): void {
  let location: string = vscode.workspace.getConfiguration("VSChristmas").StatusBarItemLocation;
  let text: boolean = vscode.workspace.getConfiguration("VSChristmas").toggleLargeStatusBarText;
  let before: string = vscode.workspace.getConfiguration("VSChristmas").StatusBarButtonVisibleTimeBeforeChistmas;

  if (text) {
    statusBarRight.text = statusBarText['large'];
    statusBarLeft.text = statusBarText['large'];
  } else {
    statusBarRight.text = statusBarText['short'];
    statusBarLeft.text = statusBarText['short'];
  }

  if (statusbar.visible(before)) {
    if (location !== "None") {
      if (location !== "Both") {
        if (location !== 'Right') {
          statusBarRight.hide();
          statusBarLeft.show();
        } else {
          statusBarRight.show();
          statusBarLeft.hide();
        }
      } else {
        statusBarRight.show();
        statusBarLeft.show();
      }
    } else {
      statusBarRight.hide();
      statusBarLeft.hide();
    }
  } else {
    statusBarRight.hide();
    statusBarLeft.hide();
  }
}

function statusBarItem(id: string, alignment: vscode.StatusBarAlignment = vscode.StatusBarAlignment.Right, tooltip: string = "Shows the days until Christmas.", text: string = statusBarText['large'], priority: number = 100): vscode.StatusBarItem {
  let statusBar: vscode.StatusBarItem;

  statusBar = vscode.window.createStatusBarItem(
    alignment,
    priority
  );

  statusBar.text = text;
  statusBar.tooltip = tooltip;
  statusBar.command = id;

  return statusBar;
}

// This method is called when your extension is deactivated
export function deactivate() { }
