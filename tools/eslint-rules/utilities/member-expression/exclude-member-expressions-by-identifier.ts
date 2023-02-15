import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/utils';

export function memberExpressionHasIdentifier(
  expression: TSESTree.MemberExpression,
  identifier: TSESTree.Identifier
): boolean {
  if (expression.object.type !== AST_NODE_TYPES.Identifier) {
    return false;
  }

  return identifier.name === expression.object.name;
}

export function memberExpressionHasIdentifiers(
  expression: TSESTree.MemberExpression,
  identifiers: TSESTree.Identifier[]
): boolean {
  return identifiers.some((identifier) =>
    memberExpressionHasIdentifier(expression, identifier)
  );
}

export function excludeMemberExpressionsByIdentifiers(
  expressions: TSESTree.MemberExpression[],
  identifiers: TSESTree.Identifier[]
): TSESTree.MemberExpression[] {
  return expressions.filter(
    (expression) => !memberExpressionHasIdentifiers(expression, identifiers)
  );
}
