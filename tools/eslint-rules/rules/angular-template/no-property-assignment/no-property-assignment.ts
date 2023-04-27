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

import type { PropertyWrite } from '@angular-eslint/bundled-angular-compiler';

import { ESLintUtils } from '@typescript-eslint/utils';

export const RULE_NAME = 'angular-template/no-property-assignment';

export type Options = [];
export type MessageIds = 'noPropertyAssignment';

export const rule = ESLintUtils.RuleCreator(() => __filename)<
  Options,
  MessageIds
>({
  name: RULE_NAME,
  meta: {
    type: 'problem',
    docs: {
      description: `Property assignment in templates is discouraged for enforcing immutability and can be hard to detect`,
      recommended: 'error',
    },
    schema: [],
    messages: {
      noPropertyAssignment: `Unexpected property assignment in template`,
    },
  },
  defaultOptions: [],
  create(context) {
    const sourceCode = context.getSourceCode();
    return {
      PropertyWrite: function (node: PropertyWrite) {
        const {
          sourceSpan: { start, end },
        } = node;

        context.report({
          loc: {
            start: sourceCode.getLocFromIndex(start),
            end: sourceCode.getLocFromIndex(end),
          },
          messageId: 'noPropertyAssignment',
        });
      },
    };
  },
});
