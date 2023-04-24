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
  TSESLint,
} from '@typescript-eslint/utils';

// NOTE: The rule will be available in ESLint configs as "@nrwl/nx/workspace/no-stateful-methods"
export const RULE_NAME = 'opinionated/no-stateful-methods';

export const rule = ESLintUtils.RuleCreator(() => __filename)({
  name: RULE_NAME,
  meta: {
    type: 'problem',
    docs: {
      description: ``,
      recommended: 'error',
    },
    schema: [
      {
        type: 'object',
        items: {
          exceptions: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
        },
      },
    ],
    messages: {
      moo: 'dont do dat',
    },
  },
  defaultOptions: [{ exceptions: [] as string[] }],
  create(context, options) {
    return {
      [AST_NODE_TYPES.AssignmentExpression]: function (
        node: TSESTree.AssignmentExpression
      ) {
        if (node.operator !== '=') {
          return;
        }

        if (!hasThisExpression(node.left)) {
          return;
        }

        const declaration = searchNestedParent(node, (node: TSESTree.Node) => {
          if (
            node.type === AST_NODE_TYPES.MethodDefinition ||
            node.type === AST_NODE_TYPES.ArrowFunctionExpression ||
            node.type === AST_NODE_TYPES.FunctionDeclaration
          ) {
            return node;
          }
        });

        if (
          !declaration ||
          declaration.type === AST_NODE_TYPES.FunctionDeclaration
        ) {
          return;
        }

        if (declaration.type === AST_NODE_TYPES.ArrowFunctionExpression) {
          context.report({
            node,
            messageId: 'moo',
          });
          return;
        }

        const key = declaration.key;

        // constructors are okay
        if (key.type !== AST_NODE_TYPES.Identifier) {
          return;
        }

        if (key.name === 'constructor') {
          return;
        }

        // TODO: ngOnInit / whitelisting
        if (
          options[0].exceptions.some((whitelistedMethodName) => {
            return key.name === whitelistedMethodName;
          })
        ) {
          return;
        }

        context.report({
          node,
          messageId: 'moo',
        });
      },
    };
  },
});

function searchNestedParent<T>(
  node: TSESTree.Node,
  find: (parent: TSESTree.Node) => T | undefined
): T | undefined {
  if (!node.parent) {
    return;
  }

  const result = find(node.parent);

  if (result) {
    return result;
  }

  return searchNestedParent(node.parent, find);
}

function hasThisExpression(node: TSESTree.Expression): boolean {
  if (node.type !== AST_NODE_TYPES.MemberExpression) {
    return false;
  }

  if (node.object.type === AST_NODE_TYPES.ThisExpression) {
    return true;
  }

  if (node.object.type === AST_NODE_TYPES.MemberExpression) {
    return hasThisExpression(node.object);
  }

  return false;
}
