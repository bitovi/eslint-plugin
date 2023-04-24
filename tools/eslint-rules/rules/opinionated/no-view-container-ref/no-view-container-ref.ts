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
  // import * as ts from 'typescript';
  import * as tsutils from 'tsutils';
  
  // NOTE: The rule will be available in ESLint configs as "@nrwl/nx/workspace/no-strings"
  export const RULE_NAME = 'angular/no-strings';
  
  export const rule = ESLintUtils.RuleCreator(() => __filename)({
    name: RULE_NAME,
    meta: {
      type: 'problem',
      fixable: 'code',
      docs: {
        description: ``,
        recommended: 'error',
      },
      schema: [],
      messages: {
        moo: 'stahp using ComponentFactory!!',
      },
    },
    defaultOptions: [],
    create(context) {
      // type ParserServices<
      //   T extends string = string,
      //   V extends readonly unknown[] = readonly unknown[]
      // > = ReturnType<typeof ESLintUtils.getParserServices<T, V>>;
      // type Checker = ReturnType<ParserServices['program']['getTypeChecker']>;
      const parserServices = ESLintUtils.getParserServices(context);
      const checker = parserServices.program.getTypeChecker();
  
      return {
        [AST_NODE_TYPES.CallExpression]: function (
          node: TSESTree.CallExpression
        ) {
          if (
            methodHasArgumentTypes(
              parserServices,
              checker,
              node,
              'ViewContainerRef',
              'createComponent',
              ['ComponentFactory']
            )
          ) {
            const arg = node.arguments[0];
            const genericArgs = getTypeArguments(parserServices, checker, arg);
  
            if (genericArgs[0]) {
              context.report({
                messageId: 'moo',
                node: node.arguments[0],
                fix: (fixer) => {
                  return fixer.replaceText(node.arguments[0], genericArgs[0]);
                },
              });
              return;
            }
            context.report({
              messageId: 'moo',
              node: node.arguments[0],
            });
          }
        },
      };
    },
  });
  
  type ParserServices<
    T extends string = string,
    V extends readonly unknown[] = readonly unknown[]
  > = ReturnType<typeof ESLintUtils.getParserServices<T, V>>;
  type Checker = ReturnType<ParserServices['program']['getTypeChecker']>;
  
  function methodHasArgumentTypes<T extends string, V extends readonly unknown[]>(
    parserServices: ParserServices<T, V>,
    checker: Checker,
    expression: TSESTree.CallExpression,
    callerType: string,
    methodName: string,
    argTypes: string[]
  ): boolean {
    const callee = expression.callee;
  
    if (callee.type !== AST_NODE_TYPES.MemberExpression) {
      return false;
    }
  
    const property = callee.property;
  
    if (!('name' in property)) {
      return false;
    }
  
    if (property.name !== methodName) {
      return false;
    }
  
    const tsObjectType = checker.getTypeAtLocation(
      parserServices.esTreeNodeToTSNodeMap.get(callee.object)
    );
  
    if (callerType !== tsObjectType.symbol.name) {
      return false;
    }
  
    return argTypes.every((argType, i) => {
      const arg = expression.arguments[i];
      const tsArg = parserServices.esTreeNodeToTSNodeMap.get(arg);
      const tsArgType = checker.getTypeAtLocation(tsArg);
      // Ignore any generic arguments for this type
      // So only check symbol and not use `Checker.typeToString`
      const _argType = tsArgType?.symbol?.name ?? '';
  
      return argType === _argType;
    });
  }
  
  function getTypeArguments<T extends string, V extends readonly unknown[]>(
    parserServices: ParserServices<T, V>,
    checker: Checker,
    node: TSESTree.Node
  ): string[] {
    const tsNode = parserServices.esTreeNodeToTSNodeMap.get(node);
    const tsNodeType = checker.getTypeAtLocation(tsNode);
    if (!tsutils.isTypeReference(tsNodeType)) {
      return [];
    }
  
    return checker.getTypeArguments(tsNodeType).map((tsArg) => {
      return checker.typeToString(tsArg);
    });
  }
  