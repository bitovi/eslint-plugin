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

import {
  ESLintUtils,
  TSESTree,
  AST_NODE_TYPES,
} from '@typescript-eslint/utils';

// NOTE: The rule will be available in ESLint configs as "@nrwl/nx/workspace/no-rxjs-internal-import"
export const RULE_NAME = 'angular/no-rxjs-internal-import';

export const rule = ESLintUtils.RuleCreator(
  () =>
    `https://github.com/bitovi/eslint-plugin/tree/main/tools/eslint-rules#readme`
)({
  name: RULE_NAME,
  meta: {
    type: 'problem',
    fixable: 'code',
    docs: {
      description: ``,
      recommended: 'error',
    },
    schema: [],
    messages: {
      rxjsInternalImport:
        "Importing from 'rxjs/internal/*' prevents tree shaking. Import from 'rxjs/*' instead.",
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      [AST_NODE_TYPES.ImportDeclaration]: function (
        node: TSESTree.ImportDeclaration
      ) {
        if (node.source.value.startsWith('rxjs/internal/')) {
          context.report({
            node: node.source,
            messageId: 'rxjsInternalImport',
            fix(fixer) {
              const [, , ...rest] = node.source.value.split('/');

              return fixer.replaceText(
                node.source,
                `'${['rxjs', ...rest].slice(0, -1).join('/')}'`
              );
            },
          });
        }
      },
    };
  },
});
