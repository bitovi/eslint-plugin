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

// NOTE: The rule will be available in ESLint configs as "@nrwl/nx/workspace/angular/no-input-readonly"
export const RULE_NAME = 'angular/no-input-readonly';

export const rule = ESLintUtils.RuleCreator(
  () =>
    `https://github.com/bitovi/eslint-plugin/tree/main/tools/eslint-rules#readme`
)({
  name: RULE_NAME,
  meta: {
    type: 'problem',
    docs: {
      description: `Marking @Input properties as read-only prevents consumers from binding to inputs`,
      recommended: 'error',
    },
    schema: [],
    messages: {
      noInputReadonly: `@Input properties marked as read-only cannot be binded to`,
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
        const classDeclaration = node.parent?.parent?.parent;
        if (classDeclaration?.type === AST_NODE_TYPES.ClassDeclaration) {
          if (
            !(classDeclaration.decorators ?? []).find((d) =>
              checkDecoratorName(d, 'Component')
            ) &&
            !(classDeclaration.decorators ?? []).find((d) =>
              checkDecoratorName(d, 'Directive')
            )
          ) {
            // Doesn't have a @Component or @Directive decorator, so skip
            return;
          }
        } else {
          // Not in a class, so skip
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
          // fix: function (fixer) {
          //   // Remove 'readonly '
          //   return fixer.replaceTextRange(
          //     [propertyDefinition.range[0], propertyDefinition.range[0] + 9],
          //     ''
          //   );
          // },
        });
      },
    };
  },
});

const checkDecoratorName = (
  decorator: TSESTree.Decorator,
  decoratorName: string
): boolean => {
  const expression = decorator.expression;
  if (
    expression.type !== AST_NODE_TYPES.CallExpression ||
    expression.callee.type !== AST_NODE_TYPES.Identifier
  ) {
    return false;
  }
  return expression.callee.name === decoratorName;
};
