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
import { mapNode } from '../../member-expression/member-expression-map';

// NOTE: The rule will be available in ESLint configs as "@nrwl/nx/workspace/on-changes-use-input-bind"
export const RULE_NAME = 'angular/on-changes-use-input-bind';

export const rule = ESLintUtils.RuleCreator(
  () =>
    `https://github.com/bitovi/eslint-plugin/tree/main/tools/eslint-rules#readme`
)({
  name: RULE_NAME,
  meta: {
    type: 'problem',
    docs: {
      description: ``,
      recommended: 'error',
    },
    schema: [],
    messages: {
      simpleChangeExcludesInputBindProperty: 'this is not an input bind',
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      [AST_NODE_TYPES.ClassDeclaration]: function (
        node: TSESTree.ClassDeclaration
      ) {
        const body = node.body.body;

        const ngOnChanges = body.find(
          (element): element is TSESTree.MethodDefinition => {
            if (element.type !== AST_NODE_TYPES.MethodDefinition) {
              return false;
            }

            return (
              element.key.type === AST_NODE_TYPES.Identifier &&
              element.key.name === 'ngOnChanges'
            );
          }
        );

        if (!ngOnChanges) {
          return;
        }

        const propertyDefinitions = getPropertyDefinitions(body).reduce(
          (map, propertyDefinition) => {
            if (propertyDefinition.key.type === AST_NODE_TYPES.Identifier) {
              map[propertyDefinition.key.name] = {
                identifier: propertyDefinition.key,
                isInputBind: !!propertyDefinition.decorators?.some(
                  (decorator) =>
                    isCallableDecoratorWithName(decorator.expression, 'Input')
                ),
              };
            }

            return map;
          },
          {} as Record<
            string,
            {
              identifier: TSESTree.Identifier;
              isInputBind: boolean;
            }
          >
        );

        const [simpleChangesParam] = ngOnChanges.value.params;

        if (simpleChangesParam?.type !== AST_NODE_TYPES.Identifier) {
          return;
        }

        const blockStatement = ngOnChanges.value.body;

        if (blockStatement?.type !== AST_NODE_TYPES.BlockStatement) {
          return;
        }

        const memberExpressions = mapNode(blockStatement);

        for (const memberExpression of memberExpressions) {
          const object = memberExpression.object;

          if (
            object.type !== AST_NODE_TYPES.Identifier ||
            object.name !== simpleChangesParam.name
          ) {
            continue;
          }

          const property = memberExpression.property;

          if (
            property.type !== AST_NODE_TYPES.Literal ||
            typeof property.value !== 'string'
          ) {
            continue;
          }

          const propertyDefinition = propertyDefinitions[property.value];

          if (propertyDefinition?.isInputBind) {
            continue;
          }

          context.report({
            node: property,
            messageId: 'simpleChangeExcludesInputBindProperty',
            // fix(fixer) {
            //   return removeNodeAndTrailingCommas(
            //     context,
            //     fixer,
            //     entryComponentsProperty
            //   );
            // },
          });
        }
      },
    };
  },
});

/**
 * Confirms `LeftHandSideExpression` is a callable Decorator and verifies that its identifer name matches.
 */
function isCallableDecoratorWithName(
  expression: TSESTree.LeftHandSideExpression,
  decoratorName: string
): expression is TSESTree.CallExpression {
  if (expression.type !== AST_NODE_TYPES.CallExpression) {
    return false;
  }

  const callee = expression.callee;

  if (callee.type !== AST_NODE_TYPES.Identifier) {
    return false;
  }

  return callee.name === decoratorName;
}

function getPropertyDefinitions(
  elements: TSESTree.ClassElement[]
): TSESTree.PropertyDefinition[] {
  return elements.filter((element): element is TSESTree.PropertyDefinition => {
    return element.type === AST_NODE_TYPES.PropertyDefinition;
  });
}
