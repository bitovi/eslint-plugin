import {
  ESLintUtils,
  AST_NODE_TYPES,
  TSESTree,
  TSESLint,
} from '@typescript-eslint/utils';
import { isCallableDecoratorWithName } from '../../../utilities/left-land-side-expression/is-callable-decorator-with-name';
import { getObjectExpressionProperty } from '../../../utilities/object-expression';

export const RULE_NAME = 'angular/no-entry-components';

export type Options = [];
export type MessageIds = 'moduleHasEntryComponents';

export const rule = ESLintUtils.RuleCreator(
  () =>
    `https://github.com/bitovi/eslint-plugin/tree/main/tools/eslint-rules#readme`
)<Options, MessageIds>({
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
