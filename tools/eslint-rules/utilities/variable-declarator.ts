import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/utils';
import {
  TypedArrayVariableDeclarator,
  TypedVariableDeclarator,
} from '../types';

/**
 * Asserts that `VariableDeclarator` has `TSTypeReference` where
 * typename `Identifier` name matches.
 */
export function variableDeclaratorIsType<T extends string>(
  node: TSESTree.VariableDeclarator,
  typeName: T
): node is TypedVariableDeclarator<T> {
  const id = node.id;

  if (id.type !== AST_NODE_TYPES.Identifier) {
    return false;
  }

  const tsTypeAnnotation = id.typeAnnotation;

  const tsTypeReference = tsTypeAnnotation?.typeAnnotation;

  if (tsTypeReference?.type !== AST_NODE_TYPES.TSTypeReference) {
    return false;
  }

  const typeNameIdentifer = tsTypeReference.typeName;

  if (typeNameIdentifer.type !== AST_NODE_TYPES.Identifier) {
    return false;
  }

  if (typeNameIdentifer.name !== typeName) {
    return false;
  }

  return true;
}

/**
 * Asserts that `VariableDeclarator` has `TSArrayType` typeAnnotation
 * where its generic argument's `Identifier` name matches.
 */
export function variableDeclaratorIsArrayType<T extends string>(
  node: TSESTree.VariableDeclarator,
  typeName: T
): node is TypedArrayVariableDeclarator<T> {
  const id = node.id;

  if (id.type !== AST_NODE_TYPES.Identifier) {
    return false;
  }

  const tsTypeAnnotation = id.typeAnnotation;

  const tsTypeReference = tsTypeAnnotation?.typeAnnotation;

  if (tsTypeReference?.type !== AST_NODE_TYPES.TSArrayType) {
    return false;
  }

  const elementType = tsTypeReference.elementType;

  if (elementType.type !== AST_NODE_TYPES.TSTypeReference) {
    return false;
  }

  const typeNameIdentifer = elementType.typeName;

  if (typeNameIdentifer.type !== AST_NODE_TYPES.Identifier) {
    return false;
  }

  if (typeNameIdentifer.name !== typeName) {
    return false;
  }

  return true;
}
