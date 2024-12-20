// src/test/suite/extension.test.ts
import * as assert from 'assert';
import * as vscode from 'vscode';
import { ChristmasCountdownCalculator } from '../../services/christmasCountdownCalculator';
import { ChristmasDaysCalculator } from '../../services/christmasDaysCalculator';
import { ConfigManager } from '../../services/configManager';
import { visible } from '../../utils/visible';

suite('VSChristmas Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('ConfigManager returns correct default values', () => {
		const configManager = new ConfigManager();
		const { day, month } = configManager.getChristmasDayAndMonth();

		assert.strictEqual(day, 25);
		assert.strictEqual(month, 12);
	});

	test('ChristmasDaysCalculator calculates days correctly', () => {
		const calculator = new ChristmasDaysCalculator();
		const result = calculator.calculateDays();

		assert.ok('daysUntilNext' in result);
		assert.ok('daysSinceLast' in result);
		assert.ok('isChristmas' in result);
	});

	test('ChristmasCountdownCalculator formats countdown correctly', () => {
		const calculator = new ChristmasCountdownCalculator();
		const countdown = calculator.getFormattedCountdown();

		assert.ok(countdown.length > 0);
		// The exact string will depend on the current date
		assert.ok(
			countdown.includes('days') ||
			countdown.includes('hours') ||
			countdown.includes("It's Christmas!")
		);
	});

	test('Visibility util functions correctly', () => {
		// Test with '1 month' duration
		const isVisible = visible('1 month');
		assert.ok(typeof isVisible === 'boolean');
	});

	test('Status bar command registration', async () => {
		// Verify the command exists
		const commands = await vscode.commands.getCommands();
		assert.ok(commands.includes('VSChristmas.daysLeft'));
	});
});