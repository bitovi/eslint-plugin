import {
  ESLintUtils,
  AST_NODE_TYPES,
  TSESTree,
} from '@typescript-eslint/utils';
import * as tsutils from 'tsutils';

export const RULE_NAME = 'angular/no-view-container-ref';

export type Options = [];
export type MessageIds = 'noComponentFactory';

export const rule = ESLintUtils.RuleCreator(() => __filename)<
  Options,
  MessageIds
>({
  name: RULE_NAME,
  meta: {
    type: 'problem',
    fixable: 'code',
    docs: {
      description: `ComponentFactory is deprecated and should be avoided`,
      recommended: 'error',
    },
    schema: [],
    messages: {
      noComponentFactory: 'Unexpected use of ComponentFactory (deprecated)',
    },
  },
  defaultOptions: [],
  create(context) {
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
              messageId: 'noComponentFactory',
              node: node.arguments[0],
              fix: (fixer) => {
                return fixer.replaceText(node.arguments[0], genericArgs[0]);
              },
            });
            return;
          }
          context.report({
            messageId: 'noComponentFactory',
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
