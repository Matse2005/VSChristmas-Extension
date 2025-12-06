import * as vscode from 'vscode';

export function shortcutMoved(): { command: vscode.Disposable, id: string } {
  const id = "VSChristmas.shortcutMoved";

  const command = vscode.commands.registerCommand(id, () => {
    vscode.window.showInformationMessage("The keyboard shortcuts ctr+shift+c and cmd+shift+c have been replaced by ctr+alt+c and cmd+alt+c.");
  });

  return {
    command,
    id
  };
}