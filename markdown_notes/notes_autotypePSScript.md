# Auto-Type PowerShell Tool

A small Windows PowerShell utility for quickly typing a block of text into another application.

## ⚠️ DISCLAIMER

This script is provided "as is", without warranty of any kind.

Use it at your own risk. The script simulates keyboard input and may enter text into the currently targeted application or field. Always verify the destination before using the **TYPE** function, especially when working with passwords, API keys, credentials, or other sensitive information.

The author is not responsible for any data loss, unintended input, security issues, or other damage resulting from the use or misuse of this script.

Review the source code before running it, particularly if the script was obtained from a third party or modified by someone else.

## ⚠️ Security Considerations

This tool does not provide secure credential storage. Text entered into the application is held in memory while the script is running.

Do not assume that entering a password or secret into this tool makes it secure. The script uses simulated keyboard input, and the destination application receives the text as keyboard input.

For sensitive credentials, consider using a dedicated password manager or secret-management solution instead.

## What it does

The tool provides a simple graphical interface with:

- A multiline text box for entering or pasting text.
- A **TYPE** button that sends the contents of the text box to the previously active application.
- A **Cancel** button to close the application.
- Support for multiline text, tabs, and common special characters.

The tool uses PowerShell's Windows Forms interface and `SendKeys` to simulate keyboard input.

## Usage

1. Start the PowerShell script.
2. Enter or paste the text you want to type into the text box.
3. Switch to the application and text field where you want the text entered.
4. Click **TYPE** in the Auto-Type window.
5. The text is sent to the target application.

## Notes

- The Auto-Type window is configured to stay on top.
- The script is intended for Windows PowerShell environments with Windows Forms support.
- Because the tool uses `SendKeys`, behavior may vary between applications.
- For large blocks of text or applications with complex input handling, clipboard-based pasting may be more reliable than simulated keystrokes.
- The script only simulates keyboard input. It does not store, transmit, or otherwise process the entered text outside of the running PowerShell process.
- You can download the script from [scripts/autotypeapp.ps1](../scripts/autotypeapp.ps1) in case you do not find in the Github repo anymore

## Requirements

- Windows
- PowerShell
- `.NET Windows Forms`

No additional modules or external software are required.
