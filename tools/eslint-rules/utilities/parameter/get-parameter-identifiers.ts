import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/utils';

/**
 * Returns `Identifier` for a `Property`
 */
function propertyToIdentifier(
  property: TSESTree.Property
): TSESTree.Identifier[] {
  if (property.key.type === AST_NODE_TYPES.Identifier) {
    return [property.key];
  }

  return [];
}

/**
 * Returns `Identifier` for a `ObjectPattern`
 */
function objectPatternToIdentifiers(
  objectPattern: TSESTree.ObjectPattern
): TSESTree.Identifier[] {
  return objectPattern.properties
    .map((property) => {
      if (property.type === AST_NODE_TYPES.Property) {
        return propertyToIdentifier(property);
      }

      return restElementToIdentifiers(property);
    })
    .flat();
}

/**
 * Returns `Identifier` for a `MemberExpression`
 */
function memberExpressionToIdentifiers(
  expression: TSESTree.MemberExpression
): TSESTree.Identifier[] {
  if (expression.object.type !== AST_NODE_TYPES.Identifier) {
    return [];
  }

  return [expression.object];
}

/**
 * Returns `Identifier` for a `DestructuringPattern`
 */
function destructuringPatternToIdentifiers(
  destructuringPattern: TSESTree.DestructuringPattern
): TSESTree.Identifier[] {
  if (destructuringPattern.type === AST_NODE_TYPES.ArrayPattern) {
    return arrayPatternToIdentifiers(destructuringPattern);
  }

  if (destructuringPattern.type === AST_NODE_TYPES.AssignmentPattern) {
    return assignmentPatternToIdentifiers(destructuringPattern);
  }

  if (destructuringPattern.type === AST_NODE_TYPES.MemberExpression) {
    return memberExpressionToIdentifiers(destructuringPattern);
  }

  if (destructuringPattern.type === AST_NODE_TYPES.ObjectPattern) {
    return objectPatternToIdentifiers(destructuringPattern);
  }

  if (destructuringPattern.type === AST_NODE_TYPES.RestElement) {
    return restElementToIdentifiers(destructuringPattern);
  }

  return [destructuringPattern];
}

/**
 * Returns `Identifier` for a `ArrayPattern`
 */
function arrayPatternToIdentifiers(
  arrayPattern: TSESTree.ArrayPattern
): TSESTree.Identifier[] {
  const elements = arrayPattern.elements.filter(
    (element): element is TSESTree.DestructuringPattern => !!element
  );

  if (!elements.length) {
    return [];
  }

  return elements.map(destructuringPatternToIdentifiers).flat();
}

/**
 * Returns `Identifiers` for a `BindingPattern`
 */
function bindingPatternToIdentifiers(
  bindingPattern: TSESTree.BindingPattern
): TSESTree.Identifier[] {
  if (bindingPattern.type === AST_NODE_TYPES.ArrayPattern) {
    return arrayPatternToIdentifiers(bindingPattern);
  }

  return objectPatternToIdentifiers(bindingPattern);
}

/**
 * Returns `Identifiers` for a `AssignmentPattern`
 */
function assignmentPatternToIdentifiers(
  assignmentPattern: TSESTree.AssignmentPattern
): TSESTree.Identifier[] {
  if (assignmentPattern.left.type === AST_NODE_TYPES.Identifier) {
    return [assignmentPattern.left];
  }

  return bindingPatternToIdentifiers(assignmentPattern.left);
}

/**
 * Returns `Identifiers` for a `RestElement`
 */
function restElementToIdentifiers(
  element: TSESTree.RestElement
): TSESTree.Identifier[] {
  if (element.argument.type === AST_NODE_TYPES.Identifier) {
    return [element.argument];
  }

  return destructuringPatternToIdentifiers(element.argument);
}

/**
 * Returns `Identifiers` for a `TSParameterProperty`
 */
function tsParameterPropertyToIdentifiers(
  property: TSESTree.TSParameterProperty
): TSESTree.Identifier[] {
  if (property.parameter.type === AST_NODE_TYPES.AssignmentPattern) {
    return assignmentPatternToIdentifiers(property.parameter);
  }

  // BindingName: ArrayPattern | ObjectPattern
  if (property.parameter.type === AST_NODE_TYPES.ArrayPattern) {
    return arrayPatternToIdentifiers(property.parameter);
  }
  if (property.parameter.type === AST_NODE_TYPES.ObjectPattern) {
    return objectPatternToIdentifiers(property.parameter);
  }

  if (property.parameter.type === AST_NODE_TYPES.RestElement) {
    return restElementToIdentifiers(property.parameter);
  }

  return [property.parameter];
}

/**
 * Returns `Identifiers` for a `Parameter`
 */
export function parameterToIdentifiers(
  parameter: TSESTree.Parameter
): TSESTree.Identifier[] {
  if (parameter.type === AST_NODE_TYPES.ArrayPattern) {
    return arrayPatternToIdentifiers(parameter);
  }

  if (parameter.type === AST_NODE_TYPES.AssignmentPattern) {
    return assignmentPatternToIdentifiers(parameter);
  }

  if (parameter.type === AST_NODE_TYPES.RestElement) {
    return restElementToIdentifiers(parameter);
  }

  if (parameter.type === AST_NODE_TYPES.ObjectPattern) {
    return objectPatternToIdentifiers(parameter);
  }

  if (parameter.type === AST_NODE_TYPES.TSParameterProperty) {
    return tsParameterPropertyToIdentifiers(parameter);
  }

  return [parameter];
}

/**
 * Returns every left-land `Identifier` of parameters:
 *
 * function (first, second) { ... }
 *
 * Identifiers: [{ name: 'first'}, { name: 'second' }]
 *
 */
export function parametersToIdentifiers(
  parameters: TSESTree.Parameter[]
): TSESTree.Identifier[] {
  return parameters.map(parameterToIdentifiers).flat();
}
