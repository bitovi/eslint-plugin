import type { Linter } from 'eslint';

const prefix = 'module.exports = ';

/**
 * Used to process json files as if they were
 * JavaScript files by prefixing file with `module.exports = `:
 *
 * ```
 * module.exports = {
 *   "some": "json"
 * }
 * ```
 */
export const processor: Linter.Processor = {
  // takes text of the file and filename
  preprocess: function (text) {
    return [`${prefix}${text}`];
  },
  // takes a Message[][] and filename
  postprocess: function (messages) {
    // `messages` argument contains two-dimensional array of Message objects
    // where each top-level array item contains array of lint messages related
    // to the text that was returned in array from preprocess() method

    // you need to return a one-dimensional array of the messages you want to keep
    return ([] as Linter.LintMessage[]).concat(...messages).map((message) => {
      const fix = getFix(message.fix);

      return {
        ...message,
        // column: message.column - padding,
        // endColumn: message.endColumn ? message.endColumn - padding : message.endColumn,
        fix,
        // TODO: handle suggestions
      };
    });
  },
  supportsAutofix: true, // (optional, defaults to false)
};

function getFix(fix: Linter.LintMessage['fix']) {
  if (!fix) {
    return;
  }

  return {
    ...fix,
    range: fix.range.map((rangePart) =>
      Math.max(0, rangePart - prefix.length)
    ) as [number, number],
  };
}
