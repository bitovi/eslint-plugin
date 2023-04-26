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
  TSESLint,
} from '@typescript-eslint/utils';

export const RULE_NAME = 'opinionated/prefer-readonly-observable-property';

export type Options = [];
export type MessageIds = 'missingReadonly';

export const rule = ESLintUtils.RuleCreator(() => __filename)<
  Options,
  MessageIds
>({
  name: RULE_NAME,
  meta: {
    type: 'problem',
    fixable: 'code',
    docs: {
      description: `Properties that reference an Observable should never be reassigned`,
      recommended: 'error',
    },
    schema: [],
    messages: {
      missingReadonly: `Unexpected missing readonly keyword missing for property`,
    },
  },
  defaultOptions: [],
  create(context) {
    return {
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

        if (!isObservable(context, identifier)) {
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

function isObservable<T extends string, V extends readonly unknown[]>(
  context: Readonly<TSESLint.RuleContext<T, V>>,
  identifier: TSESTree.Identifier
): boolean {
  if (identifier.name.endsWith('$')) {
    return true;
  }

  const parserServices = ESLintUtils.getParserServices(context);
  const checker = parserServices.program.getTypeChecker();

  const tsIdentifier = parserServices.esTreeNodeToTSNodeMap.get(identifier);

  const tsIdentifierType = checker.getTypeAtLocation(tsIdentifier);

  const symbol = tsIdentifierType.symbol?.name;

  return (
    !!symbol &&
    [
      'Observable',
      'Subject',
      'AsyncSubject',
      'BehaviorSubject',
      'ReplaySubject',
      'AnonymousSubject',
      'HotObservable',
      'Connectable',
    ].includes(symbol)
  );
}
