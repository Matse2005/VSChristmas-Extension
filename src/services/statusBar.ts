import * as vscode from 'vscode';
import { daysLeft } from '../commands/daysLeft';
import { ConfigManager } from './configManager';
import * as statusbar from '../utils/visible';
import { ChristmasCountdownCalculator } from './christmasCountdownCalculator';

export class StatusBarManager {
  private statusBarRight!: vscode.StatusBarItem;
  private statusBarLeft!: vscode.StatusBarItem;
  private daysLeftCommand!: { command: vscode.Disposable; id: string };
  private configManager: ConfigManager;
  private calculator: ChristmasCountdownCalculator;
  private readonly loadingStatusBarText: string = "$(loading~spin) VSChirstmas is starting"
  private readonly statusBarIcon: string = "$(santa-hat)"

  constructor(private context: vscode.ExtensionContext) {
    this.configManager = new ConfigManager();
    this.daysLeftCommand = daysLeft();
    this.calculator = new ChristmasCountdownCalculator()
    this.initialize();
  }

  private initialize(): void {
    this.statusBarRight = this.createStatusBarItem(this.daysLeftCommand.id);
    this.statusBarLeft = this.createStatusBarItem(
      this.daysLeftCommand.id,
      vscode.StatusBarAlignment.Left
    );

    this.context.subscriptions.push(
      this.statusBarRight,
      this.statusBarLeft,
      vscode.workspace.onDidChangeConfiguration(() => this.updateStatusBarSettings())
    );

    this.updateStatusBarSettings();
  }

  private createStatusBarItem(
    id: string,
    alignment: vscode.StatusBarAlignment = vscode.StatusBarAlignment.Right,
    tooltip: string = "Shows the days until Christmas.",
    text: string = this.loadingStatusBarText,
    priority: number = 100
  ): vscode.StatusBarItem {
    const statusBar = vscode.window.createStatusBarItem(alignment, priority);
    statusBar.text = text;
    statusBar.tooltip = tooltip;
    statusBar.command = id;
    return statusBar;
  }

  private updateStatusBarSettings(): void {
    const location = this.configManager.getStatusBarLocation();
    const beforeChristmas = this.configManager.getVisibleTimeBeforeChristmas();

    // Check if status bar should be visible
    if (!statusbar.visible(beforeChristmas)) {
      this.hideStatusBars();
      return;
    }

    // Adjust visibility based on location
    switch (location) {
      case 'None':
        this.hideStatusBars();
        break;
      case 'Left':
        this.statusBarRight.hide();
        this.statusBarLeft.show();
        break;
      case 'Right':
        this.statusBarRight.show();
        this.statusBarLeft.hide();
        break;
      case 'Both':
        this.statusBarRight.show();
        this.statusBarLeft.show();
        break;
    }
  }

  private hideStatusBars(): void {
    this.statusBarRight.hide();
    this.statusBarLeft.hide();
  }

  public updateStatusBarText(): void {
    const isLargeText = this.configManager.isLargeTextEnabled();
    const text = isLargeText ? `${this.statusBarIcon} ${this.calculator.getFormattedCountdown()}` : this.statusBarIcon;
    this.statusBarRight.text = text;
    this.statusBarLeft.text = text;
  }
}