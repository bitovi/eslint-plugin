import {
  ESLintUtils,
  AST_NODE_TYPES,
  TSESTree,
} from '@typescript-eslint/utils';

export const RULE_NAME = 'angular/host-listener-on-method';

export type Options = [];
export type MessageIds = 'hostListenerOnMethod';

export const rule = ESLintUtils.RuleCreator(
  () =>
    `https://github.com/bitovi/eslint-plugin/tree/main/tools/eslint-rules#readme`
)({
  name: RULE_NAME,
  meta: {
    type: 'problem',
    docs: {
      description: `@HostListener decorator must be used on a method or function member.`,
      recommended: 'error',
    },
    schema: [],
    messages: {
      hostListenerOnMethod: `@HostListener should decorate a method or a property with a method value.`,
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      [AST_NODE_TYPES.Decorator]: function (node: TSESTree.Decorator) {
        const expression = node.expression;
        if (
          expression.type !== AST_NODE_TYPES.CallExpression ||
          expression.callee.type !== AST_NODE_TYPES.Identifier
        ) {
          return;
        }

        const isHostListener = expression.callee?.name === 'HostListener';

        if (!isHostListener) {
          return;
        }

        const parentNode = node.parent;
        if (
          parentNode?.type === AST_NODE_TYPES.PropertyDefinition &&
          (parentNode.value?.type === AST_NODE_TYPES.ArrowFunctionExpression ||
            parentNode.value?.type === AST_NODE_TYPES.FunctionExpression)
        ) {
          // Decorator is on a property with a value that is an arrow function or a function expression, pass
          return;
        }
        if (parentNode?.type === AST_NODE_TYPES.MethodDefinition) {
          // Decorator is on a method, pass
          return;
        }

        context.report({
          node,
          messageId: 'hostListenerOnMethod',
        });
      },
    };
  },
});
