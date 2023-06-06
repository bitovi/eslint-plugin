import {
  ESLintUtils,
  AST_NODE_TYPES,
  TSESTree,
} from '@typescript-eslint/utils';

export const RULE_NAME = 'opinionated/no-stateful-methods';

export type Options = [{ exceptions: string[] }];
export type MessageIds = 'noStatefulMethods';

export const rule = ESLintUtils.RuleCreator(() => __filename)<
  Options,
  MessageIds
>({
  name: RULE_NAME,
  meta: {
    type: 'problem',
    docs: {
      description: `Methods should not mutate values`,
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
      noStatefulMethods: 'Unexpected method is mutating some value',
    },
  },
  defaultOptions: [{ exceptions: [] }],
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
            messageId: 'noStatefulMethods',
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
          messageId: 'noStatefulMethods',
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
