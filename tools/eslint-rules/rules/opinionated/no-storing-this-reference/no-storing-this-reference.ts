import {
  ESLintUtils,
  AST_NODE_TYPES,
  TSESTree,
} from '@typescript-eslint/utils';

export const RULE_NAME = 'opinionated/no-storing-this-reference';

// TODO:
export type Options = [];
export type MessageIds = 'moo' | 'cow';

export const rule = ESLintUtils.RuleCreator(() => __filename)<
  Options,
  MessageIds
>({
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
