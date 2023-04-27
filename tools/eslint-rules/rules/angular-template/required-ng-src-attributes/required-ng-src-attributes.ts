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
import type { TmplAstElement } from '@angular-eslint/bundled-angular-compiler';
import { getVSCodeMessages } from '../../../utilities/vscode/get-vscode-messages';

export const RULE_NAME = 'angular-template/required-ng-src-attributes';

export type Options = [];
export type MessageIds = 'missingRequiredNgSrcAttributes';

const standardMessages = {
  missingRequiredNgSrcAttributes: `Unexpected missing required attributes for ngSrc directive`,
};

const messages = getVSCodeMessages(standardMessages, {
  missingRequiredNgSrcAttributes: `In order to prevent image-related layout shifts, NgOptimizedImage requires that you specify a height and width for your image, as follows:

<img ngSrc="cat.jpg" width="400" height="200">

If you don't know the size of your images, consider using "fill mode" to inherit the size of the parent container, as described below:

<img ngSrc="cat.jpg" fill>

Important note: For the "fill" image to render properly, its parent element must be styled with position: "relative", position: "fixed", or position: "absolute".

For more information, visit https://angular.io/guide/image-directive#step-5-include-height-and-width
`,
});

export const rule = ESLintUtils.RuleCreator(() => __filename)<
  Options,
  MessageIds
>({
  name: RULE_NAME,
  meta: {
    type: 'problem',
    docs: {
      description: `The NgOptimizedImage directive, ngSrc requires either height and width attributes or the fill attribute`,
      recommended: 'error',
    },
    schema: [],
    messages,
  },
  defaultOptions: [],
  create(context) {
    return {
      'Element$1:has(TextAttribute[name="ngSrc"]),Element$1:has(BoundAttribute[name="ngSrc"])':
        function (node: TmplAstElement) {
          let hasWidth = false;
          let hasHeight = false;
          let hasFill = false;

          [...node.attributes, ...node.inputs].forEach((attribute) => {
            if (attribute.name === 'width') {
              hasWidth = true;
            }

            if (attribute.name === 'height') {
              hasHeight = true;
            }

            if (attribute.name === 'fill') {
              hasFill = true;
            }
          });

          if (hasFill) {
            return;
          }

          if (hasWidth && hasHeight) {
            return;
          }

          const {
            sourceSpan: { start, end },
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
            messageId: 'missingRequiredNgSrcAttributes',
          });
        },
    };
  },
});
