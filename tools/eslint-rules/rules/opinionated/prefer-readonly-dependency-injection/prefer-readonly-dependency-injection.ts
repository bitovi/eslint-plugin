import {
  ESLintUtils,
  TSESTree,
  AST_NODE_TYPES,
} from '@typescript-eslint/utils';
import { isInDecoratedClass } from '../../../utilities/node/is-in-decorated-class';

export const RULE_NAME = 'opinionated/prefer-readonly-dependency-injection';

export type Options = [];
export type MessageIds = 'missingReadonly';

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
      missingReadonly: `Unexpected missing readonly keyword missing for dependency injections`,
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
                messageId: 'missingReadonly',
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
          messageId: 'missingReadonly',
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
