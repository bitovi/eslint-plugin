// import {
//     AST_NODE_TYPES,
//     TSESTree,
// } from '@typescript-eslint/utils';

// type TESNode = TEMP[keyof TEMP];

// type GetMemberExpressions = (node: TESNode) => TSESTree.MemberExpression[];

// type AST_NODE_TYPES_MAP = {
//     [K in AST_NODE_TYPES]: GetMemberExpressions;
// }

// type TEMP = {
//     [AST_NODE_TYPES.ArrayExpression]: TSESTree.ArrayExpression,
//     [AST_NODE_TYPES.ArrayPattern]: TSESTree.ArrayPattern,
//     [AST_NODE_TYPES.ArrowFunctionExpression]: TSESTree.ArrowFunctionExpression,
//     [AST_NODE_TYPES.AssignmentExpression]: TSESTree.AssignmentExpression,
//     [AST_NODE_TYPES.AssignmentPattern]: TSESTree.AssignmentPattern,
//     [AST_NODE_TYPES.AwaitExpression]: TSESTree.AwaitExpression,
//     [AST_NODE_TYPES.BinaryExpression]: TSESTree.BinaryExpression,
//     [AST_NODE_TYPES.BlockStatement]: TSESTree.BlockStatement,
//     [AST_NODE_TYPES.BreakStatement]: TSESTree.BreakStatement,
//     [AST_NODE_TYPES.CallExpression]: TSESTree.CallExpression,
//     [AST_NODE_TYPES.CatchClause]: TSESTree.CatchClause,
//     [AST_NODE_TYPES.ChainExpression]: TSESTree.ChainExpression,
//     [AST_NODE_TYPES.ClassBody]: TSESTree.ClassBody,
//     [AST_NODE_TYPES.ClassDeclaration]: TSESTree.ClassDeclaration,
//     [AST_NODE_TYPES.ClassExpression]: TSESTree.ClassExpression,
//     [AST_NODE_TYPES.ConditionalExpression]: TSESTree.ConditionalExpression,
//     [AST_NODE_TYPES.ContinueStatement]: TSESTree.ContinueStatement,
//     [AST_NODE_TYPES.DebuggerStatement]: TSESTree.DebuggerStatement,
//     [AST_NODE_TYPES.Decorator]: TSESTree.Decorator,
//     [AST_NODE_TYPES.DoWhileStatement]: TSESTree.DoWhileStatement,
//     [AST_NODE_TYPES.EmptyStatement]: TSESTree.EmptyStatement,
//     [AST_NODE_TYPES.ExportAllDeclaration]: TSESTree.ExportAllDeclaration,
//     [AST_NODE_TYPES.ExportDefaultDeclaration]: TSESTree.ExportDefaultDeclaration,
//     [AST_NODE_TYPES.ExportNamedDeclaration]: TSESTree.ExportNamedDeclaration,
//     [AST_NODE_TYPES.ExportSpecifier]: TSESTree.ExportSpecifier,
//     [AST_NODE_TYPES.ExpressionStatement]: TSESTree.ExpressionStatement,
//     [AST_NODE_TYPES.ForInStatement]: TSESTree.ForInStatement,
//     [AST_NODE_TYPES.ForOfStatement]: TSESTree.ForOfStatement,
//     [AST_NODE_TYPES.ForStatement]: TSESTree.ForStatement,
//     [AST_NODE_TYPES.FunctionDeclaration]: TSESTree.FunctionDeclaration,
//     [AST_NODE_TYPES.FunctionExpression]: TSESTree.FunctionExpression,
//     [AST_NODE_TYPES.Identifier]: TSESTree.Identifier,
//     [AST_NODE_TYPES.IfStatement]: TSESTree.IfStatement,
//     [AST_NODE_TYPES.ImportAttribute]: TSESTree.ImportAttribute,
//     [AST_NODE_TYPES.ImportDeclaration]: TSESTree.ImportDeclaration,
//     [AST_NODE_TYPES.ImportDefaultSpecifier]: TSESTree.ImportDefaultSpecifier,
//     [AST_NODE_TYPES.ImportExpression]: TSESTree.ImportExpression,
//     [AST_NODE_TYPES.ImportNamespaceSpecifier]: TSESTree.ImportNamespaceSpecifier,
//     [AST_NODE_TYPES.ImportSpecifier]: TSESTree.ImportSpecifier,
//     [AST_NODE_TYPES.JSXAttribute]: TSESTree.JSXAttribute,
//     [AST_NODE_TYPES.JSXClosingElement]: TSESTree.JSXClosingElement,
//     [AST_NODE_TYPES.JSXClosingFragment]: TSESTree.JSXClosingFragment,
//     [AST_NODE_TYPES.JSXElement]: TSESTree.JSXElement,
//     [AST_NODE_TYPES.JSXEmptyExpression]: TSESTree.JSXEmptyExpression,
//     [AST_NODE_TYPES.JSXExpressionContainer]: TSESTree.JSXExpressionContainer,
//     [AST_NODE_TYPES.JSXFragment]: TSESTree.JSXFragment,
//     [AST_NODE_TYPES.JSXIdentifier]: TSESTree.JSXIdentifier,
//     [AST_NODE_TYPES.JSXMemberExpression]: TSESTree.JSXMemberExpression,
//     [AST_NODE_TYPES.JSXNamespacedName]: TSESTree.JSXNamespacedName,
//     [AST_NODE_TYPES.JSXOpeningElement]: TSESTree.JSXOpeningElement,
//     [AST_NODE_TYPES.JSXOpeningFragment]: TSESTree.JSXOpeningFragment,
//     [AST_NODE_TYPES.JSXSpreadAttribute]: TSESTree.JSXSpreadAttribute,
//     [AST_NODE_TYPES.JSXSpreadChild]: TSESTree.JSXSpreadChild,
//     [AST_NODE_TYPES.JSXText]: TSESTree.JSXText,
//     [AST_NODE_TYPES.LabeledStatement]: TSESTree.LabeledStatement,
//     [AST_NODE_TYPES.Literal]: TSESTree.Literal,
//     [AST_NODE_TYPES.LogicalExpression]: TSESTree.LogicalExpression,
//     [AST_NODE_TYPES.MemberExpression]: TSESTree.MemberExpression,
//     [AST_NODE_TYPES.MetaProperty]: TSESTree.MetaProperty,
//     [AST_NODE_TYPES.MethodDefinition]: TSESTree.MethodDefinition,
//     [AST_NODE_TYPES.NewExpression]: TSESTree.NewExpression,
//     [AST_NODE_TYPES.ObjectExpression]: TSESTree.ObjectExpression,
//     [AST_NODE_TYPES.ObjectPattern]: TSESTree.ObjectPattern,
//     [AST_NODE_TYPES.PrivateIdentifier]: TSESTree.PrivateIdentifier,
//     [AST_NODE_TYPES.Program]: TSESTree.Program,
//     [AST_NODE_TYPES.Property]: TSESTree.Property,
//     [AST_NODE_TYPES.PropertyDefinition]: TSESTree.PropertyDefinition,
//     [AST_NODE_TYPES.RestElement]: TSESTree.RestElement,
//     [AST_NODE_TYPES.ReturnStatement]: TSESTree.ReturnStatement,
//     [AST_NODE_TYPES.SequenceExpression]: TSESTree.SequenceExpression,
//     [AST_NODE_TYPES.SpreadElement]: TSESTree.SpreadElement,
//     [AST_NODE_TYPES.StaticBlock]: TSESTree.StaticBlock,
//     [AST_NODE_TYPES.Super]: TSESTree.Super,
//     [AST_NODE_TYPES.SwitchCase]: TSESTree.SwitchCase,
//     [AST_NODE_TYPES.SwitchStatement]: TSESTree.SwitchStatement,
//     [AST_NODE_TYPES.TaggedTemplateExpression]: TSESTree.TaggedTemplateExpression,
//     [AST_NODE_TYPES.TemplateElement]: TSESTree.TemplateElement,
//     [AST_NODE_TYPES.TemplateLiteral]: TSESTree.TemplateLiteral,
//     [AST_NODE_TYPES.ThisExpression]: TSESTree.ThisExpression,
//     [AST_NODE_TYPES.ThrowStatement]: TSESTree.ThrowStatement,
//     [AST_NODE_TYPES.TryStatement]: TSESTree.TryStatement,
//     [AST_NODE_TYPES.UnaryExpression]: TSESTree.UnaryExpression,
//     [AST_NODE_TYPES.UpdateExpression]: TSESTree.UpdateExpression,
//     [AST_NODE_TYPES.VariableDeclaration]: TSESTree.VariableDeclaration,
//     [AST_NODE_TYPES.VariableDeclarator]: TSESTree.VariableDeclarator,
//     [AST_NODE_TYPES.WhileStatement]: TSESTree.WhileStatement,
//     [AST_NODE_TYPES.WithStatement]: TSESTree.WithStatement,
//     [AST_NODE_TYPES.YieldExpression]: TSESTree.YieldExpression,
//     [AST_NODE_TYPES.TSAbstractKeyword]: TSESTree.TSAbstractKeyword,
//     [AST_NODE_TYPES.TSAbstractMethodDefinition]: TSESTree.TSAbstractMethodDefinition,
//     [AST_NODE_TYPES.TSAbstractPropertyDefinition]: TSESTree.TSAbstractPropertyDefinition,
//     [AST_NODE_TYPES.TSAnyKeyword]: TSESTree.TSAnyKeyword,
//     [AST_NODE_TYPES.TSArrayType]: TSESTree.TSArrayType,
//     [AST_NODE_TYPES.TSAsExpression]: TSESTree.TSAsExpression,
//     [AST_NODE_TYPES.TSAsyncKeyword]: TSESTree.TSAsyncKeyword,
//     [AST_NODE_TYPES.TSBigIntKeyword]: TSESTree.TSBigIntKeyword,
//     [AST_NODE_TYPES.TSBooleanKeyword]: TSESTree.TSBooleanKeyword,
//     [AST_NODE_TYPES.TSCallSignatureDeclaration]: TSESTree.TSCallSignatureDeclaration,
//     [AST_NODE_TYPES.TSClassImplements]: TSESTree.TSClassImplements,
//     [AST_NODE_TYPES.TSConditionalType]: TSESTree.TSConditionalType,
//     [AST_NODE_TYPES.TSConstructorType]: TSESTree.TSConstructorType,
//     [AST_NODE_TYPES.TSConstructSignatureDeclaration]: TSESTree.TSConstructSignatureDeclaration,
//     [AST_NODE_TYPES.TSDeclareFunction]: TSESTree.TSDeclareFunction,
//     [AST_NODE_TYPES.TSDeclareKeyword]: TSESTree.TSDeclareKeyword,
//     [AST_NODE_TYPES.TSEmptyBodyFunctionExpression]: TSESTree.TSEmptyBodyFunctionExpression,
//     [AST_NODE_TYPES.TSEnumDeclaration]: TSESTree.TSEnumDeclaration,
//     [AST_NODE_TYPES.TSEnumMember]: TSESTree.TSEnumMember,
//     [AST_NODE_TYPES.TSExportAssignment]: TSESTree.TSExportAssignment,
//     [AST_NODE_TYPES.TSExportKeyword]: TSESTree.TSExportKeyword,
//     [AST_NODE_TYPES.TSExternalModuleReference]: TSESTree.TSExternalModuleReference,
//     [AST_NODE_TYPES.TSFunctionType]: TSESTree.TSFunctionType,
//     [AST_NODE_TYPES.TSInstantiationExpression]: TSESTree.TSInstantiationExpression,
//     [AST_NODE_TYPES.TSImportEqualsDeclaration]: TSESTree.TSImportEqualsDeclaration,
//     [AST_NODE_TYPES.TSImportType]: TSESTree.TSImportType,
//     [AST_NODE_TYPES.TSIndexedAccessType]: TSESTree.TSIndexedAccessType,
//     [AST_NODE_TYPES.TSIndexSignature]: TSESTree.TSIndexSignature,
//     [AST_NODE_TYPES.TSInferType]: TSESTree.TSInferType,
//     [AST_NODE_TYPES.TSInterfaceBody]: TSESTree.TSInterfaceBody,
//     [AST_NODE_TYPES.TSInterfaceDeclaration]: TSESTree.TSInterfaceDeclaration,
//     [AST_NODE_TYPES.TSInterfaceHeritage]: TSESTree.TSInterfaceHeritage,
//     [AST_NODE_TYPES.TSIntersectionType]: TSESTree.TSIntersectionType,
//     [AST_NODE_TYPES.TSIntrinsicKeyword]: TSESTree.TSIntrinsicKeyword,
//     [AST_NODE_TYPES.TSLiteralType]: TSESTree.TSLiteralType,
//     [AST_NODE_TYPES.TSMappedType]: TSESTree.TSMappedType,
//     [AST_NODE_TYPES.TSMethodSignature]: TSESTree.TSMethodSignature,
//     [AST_NODE_TYPES.TSModuleBlock]: TSESTree.TSModuleBlock,
//     [AST_NODE_TYPES.TSModuleDeclaration]: TSESTree.TSModuleDeclaration,
//     [AST_NODE_TYPES.TSNamedTupleMember]: TSESTree.TSNamedTupleMember,
//     [AST_NODE_TYPES.TSNamespaceExportDeclaration]: TSESTree.TSNamespaceExportDeclaration,
//     [AST_NODE_TYPES.TSNeverKeyword]: TSESTree.TSNeverKeyword,
//     [AST_NODE_TYPES.TSNonNullExpression]: TSESTree.TSNonNullExpression,
//     [AST_NODE_TYPES.TSNullKeyword]: TSESTree.TSNullKeyword,
//     [AST_NODE_TYPES.TSNumberKeyword]: TSESTree.TSNumberKeyword,
//     [AST_NODE_TYPES.TSObjectKeyword]: TSESTree.TSObjectKeyword,
//     [AST_NODE_TYPES.TSOptionalType]: TSESTree.TSOptionalType,
//     [AST_NODE_TYPES.TSParameterProperty]: TSESTree.TSParameterProperty,
//     [AST_NODE_TYPES.TSPrivateKeyword]: TSESTree.TSPrivateKeyword,
//     [AST_NODE_TYPES.TSPropertySignature]: TSESTree.TSPropertySignature,
//     [AST_NODE_TYPES.TSProtectedKeyword]: TSESTree.TSProtectedKeyword,
//     [AST_NODE_TYPES.TSPublicKeyword]: TSESTree.TSPublicKeyword,
//     [AST_NODE_TYPES.TSQualifiedName]: TSESTree.TSQualifiedName,
//     [AST_NODE_TYPES.TSReadonlyKeyword]: TSESTree.TSReadonlyKeyword,
//     [AST_NODE_TYPES.TSRestType]: TSESTree.TSRestType,
//     [AST_NODE_TYPES.TSStaticKeyword]: TSESTree.TSStaticKeyword,
//     [AST_NODE_TYPES.TSStringKeyword]: TSESTree.TSStringKeyword,
//     [AST_NODE_TYPES.TSSymbolKeyword]: TSESTree.TSSymbolKeyword,
//     [AST_NODE_TYPES.TSTemplateLiteralType]: TSESTree.TSTemplateLiteralType,
//     [AST_NODE_TYPES.TSThisType]: TSESTree.TSThisType,
//     [AST_NODE_TYPES.TSTupleType]: TSESTree.TSTupleType,
//     [AST_NODE_TYPES.TSTypeAliasDeclaration]: TSESTree.TSTypeAliasDeclaration,
//     [AST_NODE_TYPES.TSTypeAnnotation]: TSESTree.TSTypeAnnotation,
//     [AST_NODE_TYPES.TSTypeAssertion]: TSESTree.TSTypeAssertion,
//     [AST_NODE_TYPES.TSTypeLiteral]: TSESTree.TSTypeLiteral,
//     [AST_NODE_TYPES.TSTypeOperator]: TSESTree.TSTypeOperator,
//     [AST_NODE_TYPES.TSTypeParameter]: TSESTree.TSTypeParameter,
//     [AST_NODE_TYPES.TSTypeParameterDeclaration]: TSESTree.TSTypeParameterDeclaration,
//     [AST_NODE_TYPES.TSTypeParameterInstantiation]: TSESTree.TSTypeParameterInstantiation,
//     [AST_NODE_TYPES.TSTypePredicate]: TSESTree.TSTypePredicate,
//     [AST_NODE_TYPES.TSTypeQuery]: TSESTree.TSTypeQuery,
//     [AST_NODE_TYPES.TSTypeReference]: TSESTree.TSTypeReference,
//     [AST_NODE_TYPES.TSUndefinedKeyword]: TSESTree.TSUndefinedKeyword,
//     [AST_NODE_TYPES.TSUnionType]: TSESTree.TSUnionType,
//     [AST_NODE_TYPES.TSUnknownKeyword]: TSESTree.TSUnknownKeyword,
//     [AST_NODE_TYPES.TSVoidKeyword]: TSESTree.TSVoidKeyword
// };

// const _map: AST_NODE_TYPES_MAP = {
//     [AST_NODE_TYPES.ArrayExpression]: function (node: TESNode): TSESTree.MemberExpression[] {
//         if (node.type !== AST_NODE_TYPES.ArrayExpression) {
//             throw new Error(
//               `Unexpected node is not of type ${AST_NODE_TYPES.ArrayExpression}`
//             );
//           }

//         node;
//         return maps[AST_NODE_TYPES.ArrayExpression](
//             node,
//             objectIdentiferName
//         );
//     },
//     [AST_NODE_TYPES.ArrayPattern]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.ArrowFunctionExpression]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.AssignmentExpression]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.AssignmentPattern]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.AwaitExpression]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.BinaryExpression]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.BlockStatement]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.BreakStatement]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.CallExpression]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.CatchClause]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.ChainExpression]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.ClassBody]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.ClassDeclaration]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.ClassExpression]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.ConditionalExpression]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.ContinueStatement]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.DebuggerStatement]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.Decorator]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.DoWhileStatement]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.EmptyStatement]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.ExportAllDeclaration]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.ExportDefaultDeclaration]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.ExportNamedDeclaration]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.ExportSpecifier]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.ExpressionStatement]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.ForInStatement]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.ForOfStatement]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.ForStatement]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.FunctionDeclaration]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.FunctionExpression]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.Identifier]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.IfStatement]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.ImportAttribute]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.ImportDeclaration]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.ImportDefaultSpecifier]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.ImportExpression]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.ImportNamespaceSpecifier]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.ImportSpecifier]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.JSXAttribute]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.JSXClosingElement]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.JSXClosingFragment]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.JSXElement]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.JSXEmptyExpression]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.JSXExpressionContainer]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.JSXFragment]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.JSXIdentifier]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.JSXMemberExpression]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.JSXNamespacedName]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.JSXOpeningElement]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.JSXOpeningFragment]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.JSXSpreadAttribute]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.JSXSpreadChild]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.JSXText]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.LabeledStatement]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.Literal]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.LogicalExpression]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.MemberExpression]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.MetaProperty]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.MethodDefinition]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.NewExpression]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.ObjectExpression]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.ObjectPattern]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.PrivateIdentifier]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.Program]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.Property]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.PropertyDefinition]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.RestElement]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.ReturnStatement]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.SequenceExpression]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.SpreadElement]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.StaticBlock]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.Super]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.SwitchCase]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.SwitchStatement]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.TaggedTemplateExpression]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.TemplateElement]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.TemplateLiteral]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.ThisExpression]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.ThrowStatement]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.TryStatement]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.UnaryExpression]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.UpdateExpression]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.VariableDeclaration]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.VariableDeclarator]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.WhileStatement]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.WithStatement]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.YieldExpression]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.TSAbstractKeyword]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.TSAbstractMethodDefinition]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.TSAbstractPropertyDefinition]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.TSAnyKeyword]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.TSArrayType]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.TSAsExpression]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.TSAsyncKeyword]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.TSBigIntKeyword]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.TSBooleanKeyword]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.TSCallSignatureDeclaration]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.TSClassImplements]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.TSConditionalType]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.TSConstructorType]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.TSConstructSignatureDeclaration]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.TSDeclareFunction]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.TSDeclareKeyword]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.TSEmptyBodyFunctionExpression]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.TSEnumDeclaration]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.TSEnumMember]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.TSExportAssignment]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.TSExportKeyword]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.TSExternalModuleReference]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.TSFunctionType]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.TSInstantiationExpression]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.TSImportEqualsDeclaration]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.TSImportType]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.TSIndexedAccessType]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.TSIndexSignature]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.TSInferType]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.TSInterfaceBody]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.TSInterfaceDeclaration]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.TSInterfaceHeritage]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.TSIntersectionType]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.TSIntrinsicKeyword]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.TSLiteralType]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.TSMappedType]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.TSMethodSignature]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.TSModuleBlock]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.TSModuleDeclaration]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.TSNamedTupleMember]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.TSNamespaceExportDeclaration]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.TSNeverKeyword]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.TSNonNullExpression]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.TSNullKeyword]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.TSNumberKeyword]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.TSObjectKeyword]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.TSOptionalType]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.TSParameterProperty]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.TSPrivateKeyword]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.TSPropertySignature]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.TSProtectedKeyword]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.TSPublicKeyword]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.TSQualifiedName]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.TSReadonlyKeyword]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.TSRestType]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.TSStaticKeyword]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.TSStringKeyword]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.TSSymbolKeyword]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.TSTemplateLiteralType]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.TSThisType]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.TSTupleType]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.TSTypeAliasDeclaration]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.TSTypeAnnotation]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.TSTypeAssertion]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.TSTypeLiteral]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.TSTypeOperator]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.TSTypeParameter]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.TSTypeParameterDeclaration]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.TSTypeParameterInstantiation]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.TSTypePredicate]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.TSTypeQuery]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.TSTypeReference]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.TSUndefinedKeyword]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.TSUnionType]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.TSUnknownKeyword]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     },
//     [AST_NODE_TYPES.TSVoidKeyword]: function (node: TESNode): TSESTree.MemberExpression[] {
//         throw new Error('Function not implemented.');
//     }
// };
