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

// NOTE: The rule will be available in ESLint configs as "@nrwl/nx/workspace/angular/host-listener-on-method"
export const RULE_NAME = 'angular/host-listener-on-method';

export const rule = ESLintUtils.RuleCreator(() => __filename)({
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
