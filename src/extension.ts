import * as vscode from 'vscode';

let statusBar: vscode.StatusBarItem;

export function activate(context: vscode.ExtensionContext) {

	// Days left Command
  let daysLeftCommandId = "VSChristmas.daysLeft";
  let daysLeftCommand = vscode.commands.registerCommand(daysLeftCommandId, function () {
    vscode.window.showInformationMessage(
      christmas() + " days left until Christmas! 🎅"
    );
  });

	context.subscriptions.push(daysLeftCommand);

  // Status bar item
	statusBar = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    100
  );

  statusBar.text = `$(hat-santa) Christmas`;
  statusBar.tooltip = `Shows the days until Christmas.`;
	statusBar.command = daysLeftCommandId;

	context.subscriptions.push(statusBar);

  vscode.workspace.onDidChangeConfiguration((event) => {
    statusBarSetting();
  });

  statusBarSetting();
}

function statusBarSetting(): void {
  if(vscode.workspace.getConfiguration("VSChristmas").activateStatusBarItem) {
    statusBar.show();
  }else{
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
export function deactivate() {}
