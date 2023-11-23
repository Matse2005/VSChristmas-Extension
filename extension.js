// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const { l10n } = require("vscode");

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // create a new status bar item that we can now manage
  const item = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    100
  );

  item.command = "VSChristmas.statusBarClick";
  context.subscriptions.push(
    vscode.commands.registerCommand("VSChristmas.statusBarClick", async () => {
      vscode.window.showInformationMessage(
        l10n.t("{0} days left until Christmas! 🎅", christmas())
      );
    })
  );

  item.text = `$(hat-santa) Christmas`;
  item.tooltip = `Shows the days until Christmas.`;
  if (vscode.workspace.getConfiguration("VSChristmas").activateStatusBarItem)
    item.show();

  vscode.workspace.onDidChangeConfiguration((event) => {
    let affected = event.affectsConfiguration(
      "VSChristmas.activateStatusBarItem"
    );
    if (affected) {
      if (
        vscode.workspace.getConfiguration("VSChristmas").activateStatusBarItem
      )
        item.show();
      else item.hide();
    }
  });

  context.subscriptions.push(
    vscode.commands.registerCommand("VSChristmas.daysLeft", function () {
      vscode.window.showInformationMessage(
        l10n.t("{0} days left until Christmas! 🎅", christmas())
      );
    })
  );
}

// This method is called when your extension is deactivated
function deactivate() {}

function christmas() {
  // Get the current date
  var today = new Date();

  // Create a Date object for Christmas of the current year
  var cmas = new Date(today.getFullYear(), 11, 25);

  // Check if the current date is after December 25th
  if (today.getMonth() == 11 && today.getDate() > 25) {
    // If true, set Christmas for the next year
    cmas.setFullYear(cmas.getFullYear() + 1);
  }

  // Calculate the difference in days between today and Christmas
  var one_day = 1000 * 60 * 60 * 24;

  // Log the number of days left until Christmas to the console
  return Math.ceil((cmas.getTime() - today.getTime()) / one_day);
}

module.exports = {
  activate,
  deactivate,
};
