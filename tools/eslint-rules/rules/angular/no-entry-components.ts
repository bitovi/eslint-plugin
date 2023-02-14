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
  TSESLint,
} from '@typescript-eslint/utils';

// NOTE: The rule will be available in ESLint configs as "@nrwl/nx/workspace/angular/no-entry-components"
export const RULE_NAME = 'angular/no-entry-components';

export const rule = ESLintUtils.RuleCreator(
  () =>
    `https://github.com/bitovi/eslint-plugin/tree/main/tools/eslint-rules#readme`
)({
  name: RULE_NAME,
  meta: {
    type: 'problem',
    docs: {
      description: `entryComponents property for NgModule metadata is deprecated in Angular v9. If project consumes Ivy Engine, entryComponents doesn't perform any functionality and are safe to remove.`,
      recommended: 'error',
    },
    fixable: 'code',
    schema: [],
    messages: {
      moduleHasEntryComponents:
        "entryComponents property for NgModule metadata is deprecated in Angular v9. If project consumes Ivy Engine, entryComponents doesn't perform any functionality and are safe to remove.",
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      [AST_NODE_TYPES.Decorator]: function (node: TSESTree.Decorator) {
        const expression = node.expression;

        if (!isCallableDecoratorWithName(expression, 'NgModule')) {
          return false;
        }

        // NgModule metadata is always the first argument
        const [moduleMetadata] = expression.arguments;

        if (moduleMetadata?.type !== AST_NODE_TYPES.ObjectExpression) {
          return;
        }

        const entryComponentsProperty = getObjectExpressionProperty(
          moduleMetadata,
          'entryComponents'
        );

        if (!entryComponentsProperty) {
          return;
        }

        context.report({
          node: entryComponentsProperty.key,
          messageId: 'moduleHasEntryComponents',
          fix(fixer) {
            return removeNodeAndTrailingCommas(
              context,
              fixer,
              entryComponentsProperty
            );
          },
        });
      },
    };
  },
});

/**
 * Removes node and trailing comma if there is one.
 * Also removes whitespace between node and its previous node.
 */
function removeNodeAndTrailingCommas<
  T extends string,
  V extends readonly unknown[]
>(
  context: Readonly<TSESLint.RuleContext<T, V>>,
  fixer: TSESLint.RuleFixer,
  node: TSESTree.Node | TSESTree.Token
): TSESLint.RuleFix {
  let [start, end] = node.range;

  const sourceCode = context.getSourceCode();

  const tokenBefore = sourceCode.getTokenBefore(node);
  const tokenAfter = sourceCode.getTokenAfter(node);

  // Removes whitespace up to the next the previous node
  if (tokenBefore) {
    start = tokenBefore.range[1];
  }

  // Remove unnessary trailing commas
  if (tokenAfter?.value === ',') {
    end = tokenAfter.range[1];
  }

  return fixer.removeRange([start, end]);
}

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

/**
 * Checks `ObjectExpression` for property with matching identity name.
 */
function getObjectExpressionProperty(
  objectExpression: TSESTree.ObjectExpression,
  propertyName: string
):
  | TSESTree.PropertyComputedName
  | TSESTree.PropertyNonComputedName
  | undefined {
  return objectExpression.properties.find(
    (
      property
    ): property is
      | TSESTree.PropertyComputedName
      | TSESTree.PropertyNonComputedName => {
      if (property.type !== AST_NODE_TYPES.Property) {
        return false;
      }

      const identifier = property.key;

      if (identifier.type !== AST_NODE_TYPES.Identifier) {
        return false;
      }

      return identifier.name === propertyName;
    }
  );
}
