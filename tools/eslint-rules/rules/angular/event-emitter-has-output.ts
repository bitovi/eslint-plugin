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

// NOTE: The rule will be available in ESLint configs as "@nrwl/nx/workspace/angular/event-emitter-has-output"
export const RULE_NAME = 'angular/event-emitter-has-output';

// const checkPropertyForEventEmitter = (
//   property: TSESTree.PropertyDefinition
// ) => {
//   if (
//     property.typeAnnotation &&
//     property.typeAnnotation.typeAnnotation.type ===
//       AST_NODE_TYPES.TSTypeReference &&
//       property.typeAnnotation.typeAnnotation.typeName.type === AST_NODE_TYPES.Identifier &&
//       property.typeAnnotation.typeAnnotation.typeName.name === 'EventEmitter'
//   ) {
//     return
//   }
// };

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

const createRule = ESLintUtils.RuleCreator(
  () =>
    `https://github.com/bitovi/eslint-plugin/tree/main/tools/eslint-rules#readme`
);

export const rule = createRule({
  name: RULE_NAME,
  meta: {
    type: 'suggestion',
    docs: {
      description: `Warns if a property of type EventEmitter doesn't have an @Output decorator to avoid mistakes`,
      recommended: 'warn',
    },
    hasSuggestions: true,
    schema: [],
    messages: {
      eventEmitterHasOutput:
        'EventEmitters are most often used with @Output decorators. Please double-check the decorators in use by this property.',
      addOutputDecoratorSuggestion: 'Add @Output() decorator',
      replaceInputDecoratorWithOutputDecoratorSuggestion:
        'Replace @Input() decorator with @Output()',
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      [AST_NODE_TYPES.PropertyDefinition]: function (
        node: TSESTree.PropertyDefinition
      ) {
        const decorators = node.decorators ?? [];
        if (
          !decorators.find((decorator) =>
            checkDecoratorName(decorator, 'Output')
          )
        ) {
          // Check for EventEmitter TS Type Annotation
          if (
            node.typeAnnotation &&
            node.typeAnnotation.typeAnnotation.type ===
              AST_NODE_TYPES.TSTypeReference &&
            node.typeAnnotation.typeAnnotation.typeName.type ===
              AST_NODE_TYPES.Identifier &&
            node.typeAnnotation.typeAnnotation.typeName.name === 'EventEmitter'
          ) {
            context.report({
              node: node,
              messageId: 'eventEmitterHasOutput',
              suggest: [
                {
                  messageId:
                    'replaceInputDecoratorWithOutputDecoratorSuggestion',
                  fix: function* (fixer) {
                    const inputDecorator = (node.decorators ?? []).find(
                      (decorator) => checkDecoratorName(decorator, 'Input')
                    );
                    if (inputDecorator) {
                      // Keep rule from showing if property has no @Input decorator
                      yield fixer.remove(inputDecorator);
                      yield fixer.insertTextBefore(node, '@Output()');
                    }
                  },
                },
                {
                  messageId: 'addOutputDecoratorSuggestion',
                  fix: function (fixer) {
                    return fixer.insertTextBefore(node, '@Output() ');
                  },
                },
              ],
            });
            return;
          }
          // Check for a value of `new EventEmitter()`
          if (
            node.value &&
            node.value.type === AST_NODE_TYPES.NewExpression &&
            node.value.callee.type === AST_NODE_TYPES.Identifier &&
            node.value.callee.name === 'EventEmitter'
          ) {
            context.report({
              node: node.value,
              messageId: 'eventEmitterHasOutput',
              suggest: [
                {
                  messageId:
                    'replaceInputDecoratorWithOutputDecoratorSuggestion',
                  fix: function* (fixer) {
                    const inputDecorator = (node.decorators ?? []).find(
                      (decorator) => checkDecoratorName(decorator, 'Input')
                    );
                    if (inputDecorator) {
                      // Keep rule from showing if property has no @Input decorator
                      yield fixer.remove(inputDecorator);
                      yield fixer.insertTextBefore(node, '@Output()');
                    }
                  },
                },
                {
                  messageId: 'addOutputDecoratorSuggestion',
                  fix: function (fixer) {
                    return fixer.insertTextBefore(node, '@Output() ');
                  },
                },
              ],
            });
          }
        }
      },
    };
  },
});
