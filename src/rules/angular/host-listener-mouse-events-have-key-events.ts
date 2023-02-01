import { AST_NODE_TYPES, ESLintUtils, TSESTree } from '@typescript-eslint/utils';

const hasHostListenerMouseKeyEvent = function (keyEvent: string, members: TSESTree.ClassElement[]) {
  for (let i = 0; i < members.length; i++) {
    const member = members[i];
    if (
      !(member.type === AST_NODE_TYPES.MethodDefinition && member.kind === "method") &&
      member.type !== AST_NODE_TYPES.PropertyDefinition
    ) {
      continue;
    }
    const decorators = member.decorators;

    if (!decorators) {
      continue;
    }

    for (let j = 0; j < decorators?.length; j++) {
      const decorator = decorators[j];
      if(decorator.expression.type !== AST_NODE_TYPES.CallExpression) {
        continue;
      }
      const [event] = decorator.expression.arguments ?? [];
      if (
        decorator.expression.callee.type === AST_NODE_TYPES.Identifier &&
        decorator.expression.callee?.name === "HostListener" &&
        event.type === AST_NODE_TYPES.Literal &&
        event?.value === keyEvent
      ) {
        return true;
      }
    }

  }
  return false;
};

const createRule = ESLintUtils.RuleCreator(name => "https://github.com/bitovi/eslint-plugin#readme")

export const hostListenerMouseEventsHaveKeyEventsName = 'angular/host-listener-mouse-events-have-key-events';
export const hostListenerMouseEventsHaveKeyEventsRule = createRule({

  create(context) {
    return {
      Decorator: function (node: TSESTree.Decorator) {
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

        const mouseEvent = event?.value;
        const isMouseEvent =
          mouseEvent === "mouseout" || mouseEvent === "mouseover";
        if (!isMouseEvent) {
          return;
        }

        const hostClass = node.parent?.parent;
        const mouseKeyEvents = {
          mouseout: "blur",
          mouseover: "focus",
        };
        const keyEvent = mouseKeyEvents[mouseEvent];
        if(hostClass?.type !== AST_NODE_TYPES.ClassBody) {
          return;
        }
        if (!hasHostListenerMouseKeyEvent(keyEvent, hostClass.body)) {
          context.report({
            node: node,
            messageId: "hostListenerMouseEventsHaveKeyEvents",
            data: { keyEvent, mouseEvent },
          });
        }
      },
    };
  },
  meta: {
    docs: {
      description: "Support blur event when supporting mouseout and focus event when supporting mouseover for accessibility",
      recommended: "error"
    },
    messages: {
      hostListenerMouseEventsHaveKeyEvents:
        "HostListener {{ mouseEvent }} must be accompanied by {{ keyEvent }} event for accessibility.",
    },
    type: "suggestion",
    schema: []
  },
  name: hostListenerMouseEventsHaveKeyEventsName,
  defaultOptions: []
});