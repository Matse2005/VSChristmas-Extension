import * as vscode from 'vscode';
import * as christmas from '../globals/christmas';
import * as year from '../globals/year';

export function daysLeft(): any {
  let id = "VSChristmas.daysLeft";
  let command = vscode.commands.registerCommand(id, function () {
    let message: string = "";
    if (christmas.daysLeft() === 0) {
      message = "Ho Ho Ho, Merry Christmas! 🎅";
    } else if (christmas.daysLeft() >= year.getDaysInCurrentYear() - 5) {
      let days: number = year.getDaysInCurrentYear() + 1 - christmas.daysLeft();
      message = "Christmas was " + days + " day" + (days === 1 ? '' : 's') + " ago! 🎅";
    } else {
      let days: number = christmas.daysLeft();
      message = days + " day" + (days === 1 ? '' : 's') + " left until Christmas! 🎅";
    }
    vscode.window.showInformationMessage(
      message
    );
  });
  return {
    "command": command,
    "id": id
  };
}