import {
  ESLintUtils,
  AST_NODE_TYPES,
  TSESTree,
} from '@typescript-eslint/utils';
import { isInDecoratedClass } from '../../../utilities/node/is-in-decorated-class';
import { isCallableDecoratorWithName } from '../../../utilities/left-land-side-expression/is-callable-decorator-with-name';
import { getMemberExpressionsFromNode } from '../../../utilities/member-expression/get-member-expressions-from-node';

export const RULE_NAME = 'angular/no-read-input-in-constructor';

export type Options = [];
export type MessageIds = 'noReadInputInConstructor';

export const rule = ESLintUtils.RuleCreator(
  () =>
    `https://github.com/bitovi/eslint-plugin/tree/main/tools/eslint-rules#readme`
)<Options, MessageIds>({
  name: RULE_NAME,
  meta: {
    type: 'problem',
    docs: {
      description: `@Input member values are not available in the constructor.`,
      recommended: 'error',
    },
    schema: [],
    messages: {
      noReadInputInConstructor: `@Input member values are not available in the constructor. Please use a lifecycle hook, such as ngOnInit.`,
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      [AST_NODE_TYPES.Decorator]: function (node: TSESTree.Decorator) {
        if (!isCallableDecoratorWithName(node.expression, 'Input')) {
          // Not @Input decorator, skip
          return;
        }

        if (!isInDecoratedClass(node, ['Component', 'Directive'])) {
          // Not in class decorated with @Component or @Directive, skip
          return;
        }

        const propertyDefinition = node.parent;
        if (propertyDefinition?.type !== AST_NODE_TYPES.PropertyDefinition) {
          // Decorator not on property
          return;
        }

        const propertyIdentifier = propertyDefinition.key;
        if (propertyIdentifier.type !== AST_NODE_TYPES.Identifier) {
          return;
        }

        const propertyName = propertyIdentifier.name;

        const classDeclaration = node.parent?.parent?.parent;
        if (classDeclaration?.type !== AST_NODE_TYPES.ClassDeclaration) {
          // Couldn't find class definition
          return;
        }

        const constructor = classDeclaration.body.body.find(
          (node) =>
            node.type === AST_NODE_TYPES.MethodDefinition &&
            node.key.type === AST_NODE_TYPES.Identifier &&
            node.key.name === 'constructor'
        );

        if (
          !constructor ||
          constructor.type !== AST_NODE_TYPES.MethodDefinition ||
          !constructor.value.body ||
          constructor.value.body.body.length === 0
        ) {
          // No constructor, or empty constructor, skip
          return;
        }

        const inputReferences = getMemberExpressionsFromNode(
          constructor
        ).filter(
          (exp) =>
            exp.property.type === AST_NODE_TYPES.Identifier &&
            exp.property.name === propertyName &&
            // Exclude left-hand assignment references
            (exp.parent?.type !== AST_NODE_TYPES.AssignmentExpression ||
              exp.parent.left !== exp)
        );

        inputReferences.forEach((node) => {
          context.report({
            node,
            messageId: 'noReadInputInConstructor',
          });
        });
      },
    };
  },
});
