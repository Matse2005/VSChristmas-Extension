import * as vscode from 'vscode';
import { ChristmasCountdownCalculator } from '../services/christmasCountdownCalculator';
import { getNonce } from '../utils/getNonce';

export class ChristmasWebviewProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = 'christmas.countdown';
  private _view?: vscode.WebviewView;
  private calculator: ChristmasCountdownCalculator;

  constructor(private readonly _extensionUri: vscode.Uri) {
    this.calculator = new ChristmasCountdownCalculator();
  }

  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken,
  ) {
    this._view = webviewView;
    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this._extensionUri]
    };

    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

    setInterval(() => {
      if (this._view) {
        const timeLeft = this.calculator.calculateTimeLeft();
        const formattedTime = this.calculator.getFormattedCountdown();
        this._view.webview.postMessage({
          type: 'update',
          timeLeft,
          formattedTime
        });
      }
    }, 1000);

    webviewView.webview.onDidReceiveMessage(message => {
      switch (message.type) {
        case 'refresh':
          // Handle refresh request
          break;
      }
    });
  }

  private _getHtmlForWebview(webview: vscode.Webview): string {
    const nonce = getNonce();

    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; script-src 'nonce-${nonce}';">
        <title>Christmas Countdown</title>
        <style>
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                padding: 0;
                margin: 0;
                color: var(--vscode-foreground);
            }

            .container {
                padding: 20px;
                text-align: center;
            }

            h2 {
                margin: 0 0 20px;
                font-size: 1.5em;
                font-weight: 500;
                color: var(--vscode-editor-foreground);
                text-transform: uppercase;
                letter-spacing: 2px;
            }

            .countdown {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 10px;
                margin-bottom: 20px;
            }

            .time-section {
                background: var(--vscode-button-background);
                border-radius: 8px;
                padding: 10px 5px;
                display: flex;
                flex-direction: column;
                align-items: center;
                transition: transform 0.2s ease;
            }

            .time-section:hover {
                transform: translateY(-2px);
            }

            .time-section span {
                display: block;
            }

            .time-section span:first-child {
                font-size: 1.8em;
                font-weight: bold;
                color: var(--vscode-button-foreground);
                margin-bottom: 5px;
            }

            .label {
                font-size: 0.8em;
                text-transform: uppercase;
                color: var(--vscode-button-foreground);
                opacity: 0.8;
            }

            .message {
                margin-top: 20px;
                padding: 10px;
                border-radius: 6px;
                background: var(--vscode-textBlockQuote-background);
                font-size: 0.9em;
                color: var(--vscode-foreground);
            }

            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }

            .time-section:hover span:first-child {
                animation: pulse 1s infinite;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>Christmas Countdown</h2>
            <div class="countdown">
                <div class="time-section">
                    <span id="days">0</span>
                    <span class="label">Days</span>
                </div>
                <div class="time-section">
                    <span id="hours">0</span>
                    <span class="label">Hours</span>
                </div>
                <div class="time-section">
                    <span id="minutes">0</span>
                    <span class="label">Minutes</span>
                </div>
                <div class="time-section">
                    <span id="seconds">0</span>
                    <span class="label">Seconds</span>
                </div>
            </div>
            <div id="message" class="message"></div>
        </div>
        <script nonce="${nonce}">
            const vscode = acquireVsCodeApi();

            window.addEventListener('message', event => {
                const message = event.data;
                switch (message.type) {
                    case 'update':
                        const { timeLeft, formattedTime } = message;
                        document.getElementById('days').textContent = timeLeft.days;
                        document.getElementById('hours').textContent = timeLeft.hours;
                        document.getElementById('minutes').textContent = timeLeft.minutes;
                        document.getElementById('seconds').textContent = timeLeft.seconds;
                        document.getElementById('message').textContent = formattedTime + " left till Christmas! 🎄";
                        break;
                }
            });
        </script>
    </body>
    </html>`;
  }
}