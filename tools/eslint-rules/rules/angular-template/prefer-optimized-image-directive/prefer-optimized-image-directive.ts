import { ESLintUtils } from '@typescript-eslint/utils';
import type {
  TmplAstBoundAttribute,
  TmplAstTextAttribute,
} from '@angular-eslint/bundled-angular-compiler';
import { getVSCodeMessages } from '../../../utilities/vscode/get-vscode-messages';

export const RULE_NAME = 'angular-template/prefer-optimized-image-directive';

export type Options = [];
export type MessageIds = 'preferOptimizedImageDirective';

const standardMessages = {
  preferOptimizedImageDirective: 'Expected ngSrc instead of src',
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
        node: TmplAstTextAttribute | TmplAstBoundAttribute
      ) {
        const { keySpan } = node;

        const start = keySpan?.start;
        const end = keySpan?.end;

        if (!start || !end) {
          return;
        }

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
