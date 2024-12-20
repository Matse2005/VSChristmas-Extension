import * as vscode from 'vscode';
import { StatusBarManager } from './services/statusBar';
import { ChristmasWebviewProvider } from './webview/ChristmasWebview';

export function activate(context: vscode.ExtensionContext) {
  const statusBarManager = new StatusBarManager(context);

  // Register the webview provider
  const christmasWebviewProvider = new ChristmasWebviewProvider(context.extensionUri);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      ChristmasWebviewProvider.viewType,
      christmasWebviewProvider
    )
  );

  setInterval(() => {
    statusBarManager.updateStatusBarText();
  }, 1000);
}

export function deactivate() { }