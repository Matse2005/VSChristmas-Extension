import * as vscode from 'vscode';

export class ConfigManager {
  private readonly CONFIGURATION_SECTION = 'VSChristmas';

  getStatusBarLocation(): string {
    return this.getConfiguration('StatusBarItemLocation', 'Both');
  }

  isLargeTextEnabled(): boolean {
    return this.getConfiguration('toggleLargeStatusBarText', true);
  }

  getVisibleTimeBeforeChristmas(): string {
    return this.getConfiguration('StatusBarButtonVisibleTimeBeforeChistmas', '30');
  }

  getChristmasDayAndMonth(): { day: number, month: number } {
    const day = Number(this.getConfiguration('ChristmasDay', '25'));
    const month = Number(this.getConfiguration('ChristmasMonth', '12'));

    return { day, month }
  }

  private getConfiguration<T>(key: string, defaultValue: T): T {
    const config = vscode.workspace.getConfiguration(this.CONFIGURATION_SECTION);
    return config.get<T>(key, defaultValue);
  }
}