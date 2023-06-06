import {
  AST_NODE_TYPES,
  ESLintUtils,
  TSESTree,
} from '@typescript-eslint/utils';

export const RULE_NAME = 'angular/host-listener-click-events-have-key-events';

export type Options = [];
export type MessageIds = 'hostListenerClickEventsHaveKeyEvents';

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

export const rule = createRule<Options, MessageIds>({
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
