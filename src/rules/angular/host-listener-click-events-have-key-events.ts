import { AST_NODE_TYPES, ESLintUtils, TSESTree } from '@typescript-eslint/utils';

const hasHostListenerClickKeyEvent = function (members: TSESTree.ClassElement[]) {
  const keyEvents = { keydown: 1, keypress: 1, keyup: 1 };

  for (let i = 0; i < members.length; i++) {
    const member = members[i];
    let decorators;
    if (
      (member.type === AST_NODE_TYPES.MethodDefinition && member.kind === "method") ||
      member.type === AST_NODE_TYPES.PropertyDefinition
    ) {
      decorators = member.decorators;
    }
    if (!decorators) {
      return false;
    }
    for (let j = 0; j < decorators?.length; j++) {
      const decorator = decorators[j];
      const expression = (decorator.expression as TSESTree.CallExpression);
      const [event] = expression.arguments ?? [];
      if (
        (expression.callee as TSESTree.Identifier)?.name === "HostListener" &&
        keyEvents.hasOwnProperty((event as TSESTree.StringLiteral)?.value)
      ) {
        return true;
      }
    }
  }
  return false;
};

const createRule = ESLintUtils.RuleCreator(name => `https://github.com/bitovi/eslint-plugin#readme`);

export const hostListenerClickEventsHaveKeyEventsName = "angular/host-listener-click-events-have-key-events"
export const hostListenerClickEventsHaveKeyEventsRule = createRule({
  create(context) {
    return {
      [AST_NODE_TYPES.Decorator]: function (node: TSESTree.Decorator) {


        const expression = node.expression;
        if(expression.type !== AST_NODE_TYPES.CallExpression || expression.callee.type !== AST_NODE_TYPES.Identifier) {
          return;
        }
        const isHostListener = expression.callee?.name === "HostListener";

        if (!isHostListener) {
          return;
        }

        const [event] = expression.arguments ?? [];
        if(event.type !== AST_NODE_TYPES.Literal) {
          return;
        }

        const isClickEvent = event.value === "click";

        if (!isClickEvent) {
          return;
        }

        const hostClass = node.parent?.parent;
        if (!hasHostListenerClickKeyEvent((hostClass as TSESTree.ClassBody)?.body)) {
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
  name: hostListenerClickEventsHaveKeyEventsName,
  defaultOptions: []
});
