import {
  ESLintUtils,
  AST_NODE_TYPES,
  TSESTree,
} from '@typescript-eslint/utils';
import { SymbolFlags } from 'typescript';

export const RULE_NAME = 'opinionated/no-dynamic-enum-access';

export type Options = [];
export type MessageIds = 'dynamicEnumAccess';

export const rule = ESLintUtils.RuleCreator(() => __filename)<
  Options,
  MessageIds
>({
  name: RULE_NAME,
  meta: {
    fixable: 'code',
    type: 'problem',
    docs: {
      description: `Enums should not be accessed dynamically and only only allow static keys`,
      recommended: 'error',
    },
    schema: [],
    messages: {
      dynamicEnumAccess: 'Enums cannot be accessed dynamically',
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      [AST_NODE_TYPES.MemberExpression]: function (
        node: TSESTree.MemberExpression
      ) {
        const { property, object } = node;

        // Allow for literals or anything that isn't computed
        if (property.type === AST_NODE_TYPES.Literal || !node.computed) {
          return;
        }

        const parserServices = ESLintUtils.getParserServices(context);
        const checker = parserServices.program.getTypeChecker();

        const tsObject = parserServices.esTreeNodeToTSNodeMap.get(object);

        const tsObjectType = checker.getTypeAtLocation(tsObject);

        const flags = tsObjectType.symbol?.flags;

        // Check type of object to confirm enum
        if (
          flags !== SymbolFlags.RegularEnum &&
          flags !== SymbolFlags.ConstEnum
        ) {
          return;
        }

        context.report({
          messageId: 'dynamicEnumAccess',
          node: property,
        });
      },
    };
  },
});
