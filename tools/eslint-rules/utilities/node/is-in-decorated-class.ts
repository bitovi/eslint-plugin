import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/utils';
import { hasSomeDecoratorWithName } from '../class-declaration/has-decorator-with-name';

/**
 * Search upwards from node to check if nearest class is decorated by any of
 * the provided decorator names
 *
 * @param node Node to search upwards from
 * @param decorators List of decorators to check for on class
 * @returns
 */
export function isInDecoratedClass(
  node: TSESTree.Node,
  decorators: string[]
): boolean {
  const parent = node.parent;

  if (!parent) {
    return false;
  }

  if (parent.type === AST_NODE_TYPES.ClassDeclaration) {
    return hasSomeDecoratorWithName(parent, decorators);
  }

  return isInDecoratedClass(parent, decorators);
}
