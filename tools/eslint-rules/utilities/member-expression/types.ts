import { TSESTree } from '@typescript-eslint/utils';

/**
 * General function that returns MemberExpressions.
 * Normally first argument is a `TSESTree` node, but could be empty
 * if function always returns the same result like an empty array.
 */
export type MemberExpressionGetter = (
  ...args: unknown[]
) => TSESTree.MemberExpression[];
