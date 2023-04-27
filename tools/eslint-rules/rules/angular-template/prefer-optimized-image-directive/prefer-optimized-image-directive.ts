/**
 * This file sets you up with structure needed for an ESLint rule.
 *
 * It leverages utilities from @typescript-eslint to allow TypeScript to
 * provide autocompletions etc for the configuration.
 *
 * Your rule's custom logic will live within the create() method below
 * and you can learn more about writing ESLint rules on the official guide:
 *
 * https://eslint.org/docs/developer-guide/working-with-rules
 *
 * You can also view many examples of existing rules here:
 *
 * https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin/src/rules
 */

import { ESLintUtils } from '@typescript-eslint/utils';
import type { TmplAstBoundAttribute } from '@angular-eslint/bundled-angular-compiler';
import { getVSCodeMessages } from '../../../utilities/vscode/get-vscode-messages';

export const RULE_NAME = 'angular-template/prefer-optimized-image-directive';

export type Options = [];
export type MessageIds = 'preferOptimizedImageDirective';

const standardMessages = {
  preferOptimizedImageDirective: JSON.stringify(process.env, null, 2), //'Expected ngSrc instead of src',
};

const messages = getVSCodeMessages(standardMessages, {
  preferOptimizedImageDirective: `The NgOptimizedImage directive makes it easy to adopt performance best practices for loading images.

For this reason, ngSrc directive is preferred over using src attribute:

Before:
<img src="cat.jpg">

After:
<img ngSrc="cat.jpg" width="400" height="200">

Note that width and height attributes are required. To find more information, visit https://angular.io/guide/image-directive
`,
});

export const rule = ESLintUtils.RuleCreator(() => __filename)<
  Options,
  MessageIds
>({
  name: RULE_NAME,
  meta: {
    fixable: 'code',
    type: 'problem',
    docs: {
      description: `The NgOptimizedImage directive is preferred for performance best practices for loading images`,
      recommended: 'error',
    },
    schema: [],
    messages,
  },
  defaultOptions: [],
  create(context) {
    return {
      'TextAttribute[name="src"],BoundAttribute[name="src"]': function (
        node: TmplAstBoundAttribute
      ) {
        const {
          keySpan: { start, end },
        } = node;
        context.report({
          loc: {
            start: {
              column: start.col,
              line: start.line + 1,
            },
            end: {
              column: end.col,
              line: end.line + 1,
            },
          },
          messageId: 'preferOptimizedImageDirective',
          fix: function (fixer) {
            return fixer.replaceTextRange([start.offset, end.offset], 'ngSrc');
          },
        });
      },
    };
  },
});
