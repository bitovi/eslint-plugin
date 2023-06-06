import {
  AST_NODE_TYPES,
  ESLintUtils,
  TSESTree,
} from '@typescript-eslint/utils';
import { isInDecoratedClass } from '../../../utilities/node/is-in-decorated-class';

export const RULE_NAME = 'angular/event-emitter-has-output';

export type Options = [];
export type MessageIds =
  | 'eventEmitterHasOutput'
  | 'addOutputDecoratorSuggestion'
  | 'replaceInputDecoratorWithOutputDecoratorSuggestion';

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

export const rule = createRule<Options, MessageIds>({
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
        // Check if owning class is a Component or a Directive
        if (!isInDecoratedClass(node, ['Component', 'Directive'])) {
          // not in a class decorated by @Component or @Directive, skip
          return;
        }
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
