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
  AST_NODE_TYPES,
  ESLintUtils,
  TSESTree,
} from '@typescript-eslint/utils';

// NOTE: The rule will be available in ESLint configs as "@nrwl/nx/workspace/angular/host-listener-click-events-have-key-events"
export const RULE_NAME = 'angular/host-listener-click-events-have-key-events';

const hasHostListenerClickKeyEvent = function (
  members: TSESTree.ClassElement[]
) {
  const keyEvents: Record<string, number> = {
    keydown: 1,
    keypress: 1,
    keyup: 1,
  };

  for (const member of members) {
    if (
      !(
        member.type === AST_NODE_TYPES.MethodDefinition &&
        member.kind === 'method'
      ) &&
      member.type !== AST_NODE_TYPES.PropertyDefinition
    ) {
      continue;
    }
    const decorators = member.decorators;

    if (!decorators) {
      continue;
    }
    for (const decorator of decorators ?? []) {
      if (decorator.expression.type !== AST_NODE_TYPES.CallExpression) {
        continue;
      }
      const expression = decorator.expression;
      const [event] = expression.arguments ?? [];

      if (
        expression.callee.type === AST_NODE_TYPES.Identifier &&
        expression.callee?.name === 'HostListener' &&
        event.type === AST_NODE_TYPES.Literal &&
        typeof event.value === 'string' &&
        keyEvents[event.value]
      ) {
        return true;
      }
    }
  }
  return false;
};

const createRule = ESLintUtils.RuleCreator(
  () =>
    `https://github.com/bitovi/eslint-plugin/tree/main/tools/eslint-rules#readme`
);

export const rule = createRule({
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

        const [event] = expression.arguments ?? [];
        if (event.type !== AST_NODE_TYPES.Literal) {
          return;
        }

        const isClickEvent = event.value === 'click';

        if (!isClickEvent) {
          return;
        }

        const hostClass = node.parent?.parent;
        if (hostClass?.type !== AST_NODE_TYPES.ClassBody) {
          return;
        }
        if (!hasHostListenerClickKeyEvent(hostClass?.body)) {
          context.report({
            node: node,
            messageId: 'hostListenerClickEventsHaveKeyEvents',
          });
        }
      },
    };
  },
  meta: {
    docs: {
      description:
        'Support keyup, keydown, or keypress events when handling click events',
      recommended: 'error',
    },
    messages: {
      hostListenerClickEventsHaveKeyEvents:
        'HostListener click must be accompanied by either keyup, keydown or keypress event for accessibility.',
    },
    type: 'suggestion',
    schema: [],
  },
  name: RULE_NAME,
  defaultOptions: [],
});
