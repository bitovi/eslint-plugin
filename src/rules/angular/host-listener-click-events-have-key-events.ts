import { AST_NODE_TYPES, ESLintUtils, TSESTree } from '@typescript-eslint/utils';

const hasHostListenerClickKeyEvent = function (members: TSESTree.ClassElement[]) {
  const keyEvents = { keydown: 1, keypress: 1, keyup: 1 };

  for (const member of members) {
    if (
      !(member.type === AST_NODE_TYPES.MethodDefinition && member.kind === "method") &&
      member.type !== AST_NODE_TYPES.PropertyDefinition
    ) {
      continue;
    }
    const decorators = member.decorators;

    if (!decorators) {
      return false;
    }
    for (const decorator of decorators ?? []) {
      if (decorator.expression.type !== AST_NODE_TYPES.CallExpression) {
        continue;
      }
      const expression = decorator.expression;
      const [event] = expression.arguments ?? [];
      if (
        expression.callee.type === AST_NODE_TYPES.Identifier &&
        expression.callee?.name === "HostListener" &&
        event.type === AST_NODE_TYPES.Literal &&
        typeof event.value === "string" &&
        keyEvents.hasOwnProperty(event?.value)
      ) {
        return true;
      }
    }
  }
  return false;
};

const createRule = ESLintUtils.RuleCreator(name => `https://github.com/bitovi/eslint-plugin#readme`);

export const RULE_NAME = "angular/host-listener-click-events-have-key-events"
export const rule = createRule({
  create(context) {
    return {
      [AST_NODE_TYPES.Decorator]: function (node: TSESTree.Decorator) {

        const expression = node.expression;
        if (expression.type !== AST_NODE_TYPES.CallExpression || expression.callee.type !== AST_NODE_TYPES.Identifier) {
          return;
        }
        const isHostListener = expression.callee?.name === "HostListener";

        if (!isHostListener) {
          return;
        }

        const [event] = expression.arguments ?? [];
        if (event.type !== AST_NODE_TYPES.Literal) {
          return;
        }

        const isClickEvent = event.value === "click";

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
            messageId: "hostListenerClickEventsHaveKeyEvents",
          });
        }
      },
    };
  },
  meta: {
    docs: {
      description: "Support keyup, keydown, or keypress events when handling click events",
      recommended: "error"
    },
    messages: {
      hostListenerClickEventsHaveKeyEvents:
        "HostListener click must be accompanied by either keyup, keydown or keypress event for accessibility.",
    },
    type: "suggestion",
    schema: []
  },
  name: RULE_NAME,
  defaultOptions: []
});
