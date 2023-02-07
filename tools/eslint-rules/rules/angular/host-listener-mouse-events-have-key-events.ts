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

import { AST_NODE_TYPES, ESLintUtils, TSESTree } from '@typescript-eslint/utils';

// NOTE: The rule will be available in ESLint configs as "@nrwl/nx/workspace/angular/host-listener-mouse-events-have-key-events"
export const RULE_NAME = 'angular/host-listener-mouse-events-have-key-events';

const hasHostListenerMouseKeyEvent = function (keyEvent: string, members: TSESTree.ClassElement[]) {
  for (const member of members) {
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

    for (const decorator of decorators) {
      if (decorator.expression.type !== AST_NODE_TYPES.CallExpression) {
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

const createRule = ESLintUtils.RuleCreator(() => "https://github.com/bitovi/eslint-plugin/tree/main/tools/eslint-rules#readme")

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
        if (hostClass?.type !== AST_NODE_TYPES.ClassBody) {
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
  name: RULE_NAME,
  defaultOptions: []
});
