import * as vscode from 'vscode';
import * as christmas from '../globals/christmas';

export function daysLeft(context: vscode.ExtensionContext): string {
  let daysLeftCommandId = "VSChristmas.daysLeft";
  let daysLeftCommand = vscode.commands.registerCommand(daysLeftCommandId, function () {
    vscode.window.showInformationMessage(
      christmas.daysLeft() + " days left until Christmas! 🎅"
    );
  });

	context.subscriptions.push(daysLeftCommand);
  return daysLeftCommandId;
}