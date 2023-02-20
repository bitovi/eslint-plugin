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
import { isInDecoratedClass } from '../../utilities/node/is-in-decorated-class';
import { isCallableDecoratorWithName } from '../../utilities/left-land-side-expression/is-callable-decorator-with-name';

// NOTE: The rule will be available in ESLint configs as "@nrwl/nx/workspace/angular/no-read-input-in-constructor"
export const RULE_NAME = 'angular/no-read-input-in-constructor';

export const rule = ESLintUtils.RuleCreator(
  () =>
    `https://github.com/bitovi/eslint-plugin/tree/main/tools/eslint-rules#readme`
)({
  name: RULE_NAME,
  meta: {
    type: 'problem',
    docs: {
      description: `@Input member values are not available in the constructor. Please use ngOnInit.`,
      recommended: 'error',
    },
    schema: [],
    messages: {},
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

        const classDeclaration = node.parent?.parent;
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

        // const constructorStatements = constructor.value.body.body;
        // TODO: Look through statements for usage of input
        // TODO: Consider changing to look at constructor FIRST
      },
    };
  },
});
