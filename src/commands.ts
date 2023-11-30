import * as vscode from 'vscode';
import * as christmas from './globals/christmas';

export function daysLeft(): any {
  let id = "VSChristmas.daysLeft";
  let command = vscode.commands.registerCommand(id, function () {
    vscode.window.showInformationMessage(
      christmas.daysLeft() + " days left until Christmas! 🎅"
    );
  });
  return {
    "command": command,
    "id": id
  };
}