# VSChristmas Extension

A VS Code extension that brings Christmas spirit to your editor by showing the countdown to Christmas.

## Features

- `Days Until Christmas` Command to check the countdown
- Status bar buttons showing days until Christmas
- Keybind `ctrl+shift+c` (Windows/Linux) or `shift+cmd+c` (Mac) to show the days until Christmas

## Extension Settings

This extension contributes the following settings:

- `VSChristmas.StatusBarItemLocation`: Display the Christmas button at the location of your choice
- `VSChristmas.toggleLargeStatusBarText`: Toggle the text beside the icon for the status bar icon
- `VSChristmas.StatusBarButtonVisibleTimeBeforeChistmas`: Make the Christmas button show up on a specific time before Christmas
- `VSChristmas.ChristmasDay`: The calendar day of Christmas at your location
- `VSChristmas.ChristmasMonth`: The calendar month of Christmas at your location

## Contributing

We welcome contributions from the community! Here's how you can help:

### Setting up the Development Environment

1. Fork and clone the repository
2. Run `npm install` to install dependencies
3. Open the project in VS Code
4. Press F5 to start debugging

### Development Workflow

1. Create a new branch for your feature/fix

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and ensure they follow our coding standards

<!-- 3. Test your changes:
   - Run `npm run test` to execute unit tests
   - Test the extension manually in a new VS Code window
   - Ensure settings and commands work as expected -->

4. Submit a Pull Request:
   - Write a clear description of your changes
   - Reference any related issues
   <!-- - Update documentation if needed -->

### Coding Guidelines

- Follow the existing code style
- Add comments for complex logic
<!-- - Update tests when adding new features -->
- Keep commits focused and descriptive

### Reporting Issues

- Use the GitHub issue tracker
- Include VS Code version and extension version
- Provide clear steps to reproduce the issue
- Include relevant error messages and screenshots

## Release Notes

Please see the [CHANGELOG.md](CHANGELOG.md) file for detailed release notes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
