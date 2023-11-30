import * as vscode from 'vscode';
import { daysLeft } from './commands';

let statusBarLeft: vscode.StatusBarItem;
let statusBarRight: vscode.StatusBarItem;
let daysLeftCommand: any;

export function activate(context: vscode.ExtensionContext) {

	// Days left Command
  daysLeftCommand = daysLeft();

	context.subscriptions.push(daysLeftCommand['command']);

  // Status bar item right
	statusBarRight = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    100
  );

  statusBarRight.text = `$(hat-santa) Christmas`;
  statusBarRight.tooltip = `Shows the days until Christmas.`;
	statusBarRight.command = daysLeftCommand['id'];

	context.subscriptions.push(statusBarRight);

  // Status bar item left
	statusBarLeft = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left,
    100
  );

  statusBarLeft.text = `$(hat-santa) Christmas`;
  statusBarLeft.tooltip = `Shows the days until Christmas.`;
	statusBarLeft.command = daysLeftCommand['id'];

	context.subscriptions.push(statusBarLeft);

  vscode.workspace.onDidChangeConfiguration((event) => {
    statusBarSetting();
  });

  statusBarSetting();
}

function statusBarSetting(): void {
  if(vscode.workspace.getConfiguration("VSChristmas").activateStatusBarItem) {
    statusBarRight.show();
    statusBarLeft.show();
  }else{
    statusBarRight.hide();
    statusBarLeft.hide();
  }

  if(vscode.workspace.getConfiguration("VSChristmas").toggleLargeStatusBarText) {
    statusBarRight.text = `$(hat-santa) Christmas`;
    statusBarLeft.text = `$(hat-santa) Christmas`;
  }else{
    statusBarRight.text = `$(hat-santa)`;
    statusBarLeft.text = `$(hat-santa)`;
  }
}

// This method is called when your extension is deactivated
export function deactivate() {}
