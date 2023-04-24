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
  // TSESLint,
  // ASTUtils
} from '@typescript-eslint/utils';
import { SymbolFlags } from 'typescript';

// NOTE: The rule will be available in ESLint configs as "@nrwl/nx/workspace/no-dynamic-enum-access"
export const RULE_NAME = 'opinionated/no-dynamic-enum-access';

export const rule = ESLintUtils.RuleCreator(() => __filename)({
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
