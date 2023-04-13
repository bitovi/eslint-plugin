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
  AST_NODE_TYPES,
  TSESTree,
} from '@typescript-eslint/utils';

// NOTE: The rule will be available in ESLint configs as "@nrwl/nx/workspace/no-storing-this-reference"
export const RULE_NAME = 'opinionated/no-storing-this-reference';

export const rule = ESLintUtils.RuleCreator(() => __filename)({
  name: RULE_NAME,
  meta: {
    type: 'problem',
    docs: {
      description: ``,
      recommended: 'error',
    },
    schema: [],
    messages: {
      moo: 'stahp',
      cow: 'plz stahp',
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      [AST_NODE_TYPES.VariableDeclarator]: function (
        node: TSESTree.VariableDeclarator
      ) {
        if (node.init?.type === AST_NODE_TYPES.ThisExpression) {
          context.report({
            node: node.init,
            messageId: 'cow',
          });
        }
      },
      [AST_NODE_TYPES.AssignmentExpression]: function (
        node: TSESTree.AssignmentExpression
      ) {
        if (node.right?.type === AST_NODE_TYPES.ThisExpression) {
          context.report({
            node: node.right,
            messageId: 'cow',
          });
        }
      },
      [AST_NODE_TYPES.CallExpression]: function (
        node: TSESTree.CallExpression
      ) {
        const args = node.arguments;

        const thisParam = args.find(
          (arg) => arg.type === AST_NODE_TYPES.ThisExpression
        );

        if (thisParam) {
          context.report({
            node: thisParam,
            messageId: 'moo',
          });
        }
      },
    };
  },
});
