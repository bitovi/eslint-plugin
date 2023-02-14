import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/utils';

/**
 * `VariableDeclarator` has `TSTypeReference` with `typeName` name.
 *
 * `const value: T;` where name is `T` and is the
 * typename `Identifer` name.
 */
export type TypedVariableDeclarator<T extends string> =
  TSESTree.VariableDeclarator & {
    id: {
      type: AST_NODE_TYPES.Identifier;
      typeAnnotation: {
        typeAnnotation: {
          type: AST_NODE_TYPES.TSTypeReference;
          typeName: {
            type: AST_NODE_TYPES.Identifier;
            name: T;
          };
        };
      };
    };
  };

/**
 * `VariableDeclarator` that has `TSArrayType` typeAnnotation
 * where its generic argument's typename `Identifier` name matches:
 *
 * `const value: Array<T>;` where name is `T` and is
 * the typename `Identifer` name.
 *
 * // or
 *
 * `const value: T[];` where name is `T` and is the
 * typename `Identifer` name.
 */
export type TypedArrayVariableDeclarator<T extends string> =
  TSESTree.VariableDeclarator & {
    id: {
      type: AST_NODE_TYPES.Identifier;
      typeAnnotation: {
        typeAnnotation: {
          type: AST_NODE_TYPES.TSArrayType;
          elementType: {
            type: AST_NODE_TYPES.TSTypeReference;
            typeName: {
              type: AST_NODE_TYPES.Identifier;
              name: T;
            };
          };
        };
      };
    };
  };
