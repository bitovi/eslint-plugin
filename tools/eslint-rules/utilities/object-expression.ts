import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/utils';

/**
 * Checks `ObjectExpression` for property with matching identity name.
 */
export function getObjectExpressionProperty(
  objectExpression: TSESTree.ObjectExpression,
  propertyName: string
):
  | TSESTree.PropertyComputedName
  | TSESTree.PropertyNonComputedName
  | undefined {
  return objectExpression.properties.find(
    (
      property
    ): property is
      | TSESTree.PropertyComputedName
      | TSESTree.PropertyNonComputedName => {
      if (property.type !== AST_NODE_TYPES.Property) {
        return false;
      }

      const identifier = property.key;

      if (identifier.type !== AST_NODE_TYPES.Identifier) {
        return false;
      }

      return identifier.name === propertyName;
    }
  );
}
