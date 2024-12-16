import vscode from 'vscode';

const config = vscode.workspace.getConfiguration('VSChristmas');
const christmasDay = config.get('christmasDay') as number
const christmasMonth = config.get('christmasMonth') as number - 1

export { christmasDay, christmasMonth }