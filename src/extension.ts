import * as vscode from 'vscode';
import { StatusBarManager } from './services/statusBar';

export function activate(context: vscode.ExtensionContext): void {
  const statusBarManager = new StatusBarManager(context);

  setInterval(() => {
    statusBarManager.updateStatusBarText();
  }, 1000);
}

export function deactivate(): void { }