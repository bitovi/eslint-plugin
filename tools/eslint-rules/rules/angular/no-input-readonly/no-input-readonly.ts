import {
  ESLintUtils,
  AST_NODE_TYPES,
  TSESTree,
} from '@typescript-eslint/utils';
import { isInDecoratedClass } from '../../../utilities/node/is-in-decorated-class';

export const RULE_NAME = 'angular/no-input-readonly';

export type Options = [];
export type MessageIds = 'noInputReadonly';

export const rule = ESLintUtils.RuleCreator(
  () =>
    `https://github.com/bitovi/eslint-plugin/tree/main/tools/eslint-rules#readme`
)<Options, MessageIds>({
  name: RULE_NAME,
  meta: {
    type: 'problem',
    docs: {
      description: `Marking @Input properties as read-only prevents consumers from binding to inputs`,
      recommended: 'error',
    },
    fixable: 'code',
    schema: [],
    messages: {
      noInputReadonly: `@Input properties marked as read-only cannot be bound to`,
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      [AST_NODE_TYPES.Decorator]: function (node: TSESTree.Decorator) {
        if (
          node.expression.type !== AST_NODE_TYPES.CallExpression ||
          !(
            node.expression.callee.type === AST_NODE_TYPES.Identifier &&
            node.expression.callee.name === 'Input'
          )
        ) {
          // Decorator is not of type @Input
          return;
        }

        // Check if owning class is a Component or a Directive
        if (!isInDecoratedClass(node, ['Component', 'Directive'])) {
          // not in a class decorated by @Component or @Directive, skip
          return;
        }

        const propertyDefinition = node.parent;
        if (
          propertyDefinition?.type !== AST_NODE_TYPES.PropertyDefinition ||
          !propertyDefinition?.readonly
        ) {
          // Skip if not on a readonly property definition
          return;
        }

        context.report({
          node: propertyDefinition,
          messageId: 'noInputReadonly',
          fix: function (fixer) {
            const readonlyIndex = context
              .getSourceCode()
              .getText(propertyDefinition)
              .indexOf('readonly');
            if (readonlyIndex < 0) {
              return null;
            }
            // Remove 'readonly '
            return fixer.replaceTextRange(
              [
                propertyDefinition.range[0] + readonlyIndex,
                propertyDefinition.range[0] + readonlyIndex + 9,
              ],
              ''
            );
          },
        });
      },
    };
  },
});
