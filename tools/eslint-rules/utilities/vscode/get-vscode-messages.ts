/**
 * Returns true if node script is running
 * within vscode extension environment
 */
export function isVsCode(): boolean {
  return process.env.VSCODE_CLI === '1';
}

/**
 * Conditionally returns messages that will only
 * show for vscode extension environment.
 *
 * This is useful for showing additional information
 * when using vscode while limiting information when
 * using eslint in the terminal.
 */
export function getVSCodeMessages<T>(
  messages: T,
  vscodeMessages: Partial<T>
): T {
  if (isVsCode()) {
    return {
      ...messages,
      ...vscodeMessages,
    };
  }

  return messages;
}
