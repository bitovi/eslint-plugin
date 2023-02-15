import { TSESTree } from '@typescript-eslint/utils';
import { isCallableDecoratorWithName } from '../left-land-side-expression/is-callable-decorator-with-name';

/**
 * Confirms that Class has Decorator with name
 */
export function hasDecoratorWithName(
  declaration: TSESTree.ClassDeclaration,
  decoratorName: string
): boolean {
  if (!declaration.decorators) {
    return false;
  }

  return declaration.decorators.some((decorator) =>
    isCallableDecoratorWithName(decorator.expression, decoratorName)
  );
}
