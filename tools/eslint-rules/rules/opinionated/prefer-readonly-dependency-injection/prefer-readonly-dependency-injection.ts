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
  TSESTree,
  AST_NODE_TYPES,
} from '@typescript-eslint/utils';
import { isInDecoratedClass } from '../../../utilities/node/is-in-decorated-class';

export const RULE_NAME = 'opininonated/prefer-readonly-dependency-injection';

export type Options = [];
export type MessageIds = 'placeholder';

export const rule = ESLintUtils.RuleCreator(() => __filename)<
  Options,
  MessageIds
>({
  name: RULE_NAME,
  meta: {
    fixable: 'code',
    type: 'problem',
    docs: {
      description: `References to dependency injections should not change`,
      recommended: 'error',
    },
    schema: [],
    messages: {
      placeholder: `Unexpected missing readonly keyword missing for dependency injections`,
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      ['ClassDeclaration > ClassBody > MethodDefinition:has([name=constructor]) > FunctionExpression']:
        function (node: TSESTree.FunctionExpression) {
          if (
            !isInDecoratedClass(node, [
              'Component',
              'Directive',
              'Pipe',
              'Injectable',
              'NgModule',
            ])
          ) {
            return;
          }

          node.params
            .filter(
              (param) =>
                param.type !== AST_NODE_TYPES.TSParameterProperty ||
                !param.readonly
            )
            .forEach((param) => {
              const identifier = getReportableParam(param);

              if (!identifier) {
                return;
              }

              context.report({
                node: param,
                messageId: 'placeholder',
                fix(fixer) {
                  return fixer.insertTextBefore(identifier, 'readonly ');
                },
              });
            });
        },
      ['ClassDeclaration > ClassBody > PropertyDefinition']: function (
        node: TSESTree.PropertyDefinition
      ) {
        if (node.readonly) {
          return;
        }

        const identifier = node.key;

        if (identifier.type !== AST_NODE_TYPES.Identifier) {
          return;
        }

        const callExpression = node.value;

        if (callExpression?.type !== AST_NODE_TYPES.CallExpression) {
          return;
        }

        const callee = callExpression.callee;

        if (callee.type !== AST_NODE_TYPES.Identifier) {
          return;
        }

        if (callee.name !== 'inject') {
          return;
        }

        context.report({
          node,
          messageId: 'placeholder',
          fix(fixer) {
            return fixer.insertTextBefore(identifier, `readonly `);
          },
        });
      },
    };
  },
});

function getReportableParam(
  param: TSESTree.Parameter
): TSESTree.Identifier | null {
  if (param.type === AST_NODE_TYPES.Identifier) {
    return param;
  }

  if (param.type !== AST_NODE_TYPES.TSParameterProperty) {
    return null;
  }

  return getReportableParam(param.parameter);
}
