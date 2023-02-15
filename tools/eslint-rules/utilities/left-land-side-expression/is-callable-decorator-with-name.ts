import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/utils';

/**
 * Confirms `LeftHandSideExpression` is a callable Decorator and verifies that its identifer name matches.
 */
export function isCallableDecoratorWithName(
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
