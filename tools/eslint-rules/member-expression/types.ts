// import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/utils';

// type MemberExpressionGetter = (
//   node: TESNode
// ) => TSESTree.MemberExpression[];

// type TESNodes = Readonly<{
//   [AST_NODE_TYPES.ArrayExpression]: TSESTree.ArrayExpression;
//   [AST_NODE_TYPES.ArrayPattern]: TSESTree.ArrayPattern;
//   [AST_NODE_TYPES.ArrowFunctionExpression]: TSESTree.ArrowFunctionExpression;
//   [AST_NODE_TYPES.AssignmentExpression]: TSESTree.AssignmentExpression;
//   [AST_NODE_TYPES.AssignmentPattern]: TSESTree.AssignmentPattern;
//   [AST_NODE_TYPES.AwaitExpression]: TSESTree.AwaitExpression;
//   [AST_NODE_TYPES.BinaryExpression]: TSESTree.BinaryExpression;
//   [AST_NODE_TYPES.BlockStatement]: TSESTree.BlockStatement;
//   [AST_NODE_TYPES.BreakStatement]: TSESTree.BreakStatement;
//   [AST_NODE_TYPES.CallExpression]: TSESTree.CallExpression;
//   [AST_NODE_TYPES.CatchClause]: TSESTree.CatchClause;
//   [AST_NODE_TYPES.ChainExpression]: TSESTree.ChainExpression;
//   [AST_NODE_TYPES.ClassBody]: TSESTree.ClassBody;
//   [AST_NODE_TYPES.ClassDeclaration]: TSESTree.ClassDeclaration;
//   [AST_NODE_TYPES.ClassExpression]: TSESTree.ClassExpression;
//   [AST_NODE_TYPES.ConditionalExpression]: TSESTree.ConditionalExpression;
//   [AST_NODE_TYPES.ContinueStatement]: TSESTree.ContinueStatement;
//   [AST_NODE_TYPES.DebuggerStatement]: TSESTree.DebuggerStatement;
//   [AST_NODE_TYPES.Decorator]: TSESTree.Decorator;
//   [AST_NODE_TYPES.DoWhileStatement]: TSESTree.DoWhileStatement;
//   [AST_NODE_TYPES.EmptyStatement]: TSESTree.EmptyStatement;
//   [AST_NODE_TYPES.ExportAllDeclaration]: TSESTree.ExportAllDeclaration;
//   [AST_NODE_TYPES.ExportDefaultDeclaration]: TSESTree.ExportDefaultDeclaration;
//   [AST_NODE_TYPES.ExportNamedDeclaration]: TSESTree.ExportNamedDeclaration;
//   [AST_NODE_TYPES.ExportSpecifier]: TSESTree.ExportSpecifier;
//   [AST_NODE_TYPES.ExpressionStatement]: TSESTree.ExpressionStatement;
//   [AST_NODE_TYPES.ForInStatement]: TSESTree.ForInStatement;
//   [AST_NODE_TYPES.ForOfStatement]: TSESTree.ForOfStatement;
//   [AST_NODE_TYPES.ForStatement]: TSESTree.ForStatement;
//   [AST_NODE_TYPES.FunctionDeclaration]: TSESTree.FunctionDeclaration;
//   [AST_NODE_TYPES.FunctionExpression]: TSESTree.FunctionExpression;
//   [AST_NODE_TYPES.Identifier]: TSESTree.Identifier;
//   [AST_NODE_TYPES.IfStatement]: TSESTree.IfStatement;
//   [AST_NODE_TYPES.ImportAttribute]: TSESTree.ImportAttribute;
//   [AST_NODE_TYPES.ImportDeclaration]: TSESTree.ImportDeclaration;
//   [AST_NODE_TYPES.ImportDefaultSpecifier]: TSESTree.ImportDefaultSpecifier;
//   [AST_NODE_TYPES.ImportExpression]: TSESTree.ImportExpression;
//   [AST_NODE_TYPES.ImportNamespaceSpecifier]: TSESTree.ImportNamespaceSpecifier;
//   [AST_NODE_TYPES.ImportSpecifier]: TSESTree.ImportSpecifier;
//   [AST_NODE_TYPES.JSXAttribute]: TSESTree.JSXAttribute;
//   [AST_NODE_TYPES.JSXClosingElement]: TSESTree.JSXClosingElement;
//   [AST_NODE_TYPES.JSXClosingFragment]: TSESTree.JSXClosingFragment;
//   [AST_NODE_TYPES.JSXElement]: TSESTree.JSXElement;
//   [AST_NODE_TYPES.JSXEmptyExpression]: TSESTree.JSXEmptyExpression;
//   [AST_NODE_TYPES.JSXExpressionContainer]: TSESTree.JSXExpressionContainer;
//   [AST_NODE_TYPES.JSXFragment]: TSESTree.JSXFragment;
//   [AST_NODE_TYPES.JSXIdentifier]: TSESTree.JSXIdentifier;
//   [AST_NODE_TYPES.JSXMemberExpression]: TSESTree.JSXMemberExpression;
//   [AST_NODE_TYPES.JSXNamespacedName]: TSESTree.JSXNamespacedName;
//   [AST_NODE_TYPES.JSXOpeningElement]: TSESTree.JSXOpeningElement;
//   [AST_NODE_TYPES.JSXOpeningFragment]: TSESTree.JSXOpeningFragment;
//   [AST_NODE_TYPES.JSXSpreadAttribute]: TSESTree.JSXSpreadAttribute;
//   [AST_NODE_TYPES.JSXSpreadChild]: TSESTree.JSXSpreadChild;
//   [AST_NODE_TYPES.JSXText]: TSESTree.JSXText;
//   [AST_NODE_TYPES.LabeledStatement]: TSESTree.LabeledStatement;
//   [AST_NODE_TYPES.Literal]: TSESTree.Literal;
//   [AST_NODE_TYPES.LogicalExpression]: TSESTree.LogicalExpression;
//   [AST_NODE_TYPES.MemberExpression]: TSESTree.MemberExpression;
//   [AST_NODE_TYPES.MetaProperty]: TSESTree.MetaProperty;
//   [AST_NODE_TYPES.MethodDefinition]: TSESTree.MethodDefinition;
//   [AST_NODE_TYPES.NewExpression]: TSESTree.NewExpression;
//   [AST_NODE_TYPES.ObjectExpression]: TSESTree.ObjectExpression;
//   [AST_NODE_TYPES.ObjectPattern]: TSESTree.ObjectPattern;
//   [AST_NODE_TYPES.PrivateIdentifier]: TSESTree.PrivateIdentifier;
//   [AST_NODE_TYPES.Program]: TSESTree.Program;
//   [AST_NODE_TYPES.Property]: TSESTree.Property;
//   [AST_NODE_TYPES.PropertyDefinition]: TSESTree.PropertyDefinition;
//   [AST_NODE_TYPES.RestElement]: TSESTree.RestElement;
//   [AST_NODE_TYPES.ReturnStatement]: TSESTree.ReturnStatement;
//   [AST_NODE_TYPES.SequenceExpression]: TSESTree.SequenceExpression;
//   [AST_NODE_TYPES.SpreadElement]: TSESTree.SpreadElement;
//   [AST_NODE_TYPES.StaticBlock]: TSESTree.StaticBlock;
//   [AST_NODE_TYPES.Super]: TSESTree.Super;
//   [AST_NODE_TYPES.SwitchCase]: TSESTree.SwitchCase;
//   [AST_NODE_TYPES.SwitchStatement]: TSESTree.SwitchStatement;
//   [AST_NODE_TYPES.TaggedTemplateExpression]: TSESTree.TaggedTemplateExpression;
//   [AST_NODE_TYPES.TemplateElement]: TSESTree.TemplateElement;
//   [AST_NODE_TYPES.TemplateLiteral]: TSESTree.TemplateLiteral;
//   [AST_NODE_TYPES.ThisExpression]: TSESTree.ThisExpression;
//   [AST_NODE_TYPES.ThrowStatement]: TSESTree.ThrowStatement;
//   [AST_NODE_TYPES.TryStatement]: TSESTree.TryStatement;
//   [AST_NODE_TYPES.UnaryExpression]: TSESTree.UnaryExpression;
//   [AST_NODE_TYPES.UpdateExpression]: TSESTree.UpdateExpression;
//   [AST_NODE_TYPES.VariableDeclaration]: TSESTree.VariableDeclaration;
//   [AST_NODE_TYPES.VariableDeclarator]: TSESTree.VariableDeclarator;
//   [AST_NODE_TYPES.WhileStatement]: TSESTree.WhileStatement;
//   [AST_NODE_TYPES.WithStatement]: TSESTree.WithStatement;
//   [AST_NODE_TYPES.YieldExpression]: TSESTree.YieldExpression;
//   [AST_NODE_TYPES.TSAbstractKeyword]: TSESTree.TSAbstractKeyword;
//   [AST_NODE_TYPES.TSAbstractMethodDefinition]: TSESTree.TSAbstractMethodDefinition;
//   [AST_NODE_TYPES.TSAbstractPropertyDefinition]: TSESTree.TSAbstractPropertyDefinition;
//   [AST_NODE_TYPES.TSAnyKeyword]: TSESTree.TSAnyKeyword;
//   [AST_NODE_TYPES.TSArrayType]: TSESTree.TSArrayType;
//   [AST_NODE_TYPES.TSAsExpression]: TSESTree.TSAsExpression;
//   [AST_NODE_TYPES.TSAsyncKeyword]: TSESTree.TSAsyncKeyword;
//   [AST_NODE_TYPES.TSBigIntKeyword]: TSESTree.TSBigIntKeyword;
//   [AST_NODE_TYPES.TSBooleanKeyword]: TSESTree.TSBooleanKeyword;
//   [AST_NODE_TYPES.TSCallSignatureDeclaration]: TSESTree.TSCallSignatureDeclaration;
//   [AST_NODE_TYPES.TSClassImplements]: TSESTree.TSClassImplements;
//   [AST_NODE_TYPES.TSConditionalType]: TSESTree.TSConditionalType;
//   [AST_NODE_TYPES.TSConstructorType]: TSESTree.TSConstructorType;
//   [AST_NODE_TYPES.TSConstructSignatureDeclaration]: TSESTree.TSConstructSignatureDeclaration;
//   [AST_NODE_TYPES.TSDeclareFunction]: TSESTree.TSDeclareFunction;
//   [AST_NODE_TYPES.TSDeclareKeyword]: TSESTree.TSDeclareKeyword;
//   [AST_NODE_TYPES.TSEmptyBodyFunctionExpression]: TSESTree.TSEmptyBodyFunctionExpression;
//   [AST_NODE_TYPES.TSEnumDeclaration]: TSESTree.TSEnumDeclaration;
//   [AST_NODE_TYPES.TSEnumMember]: TSESTree.TSEnumMember;
//   [AST_NODE_TYPES.TSExportAssignment]: TSESTree.TSExportAssignment;
//   [AST_NODE_TYPES.TSExportKeyword]: TSESTree.TSExportKeyword;
//   [AST_NODE_TYPES.TSExternalModuleReference]: TSESTree.TSExternalModuleReference;
//   [AST_NODE_TYPES.TSFunctionType]: TSESTree.TSFunctionType;
//   [AST_NODE_TYPES.TSInstantiationExpression]: TSESTree.TSInstantiationExpression;
//   [AST_NODE_TYPES.TSImportEqualsDeclaration]: TSESTree.TSImportEqualsDeclaration;
//   [AST_NODE_TYPES.TSImportType]: TSESTree.TSImportType;
//   [AST_NODE_TYPES.TSIndexedAccessType]: TSESTree.TSIndexedAccessType;
//   [AST_NODE_TYPES.TSIndexSignature]: TSESTree.TSIndexSignature;
//   [AST_NODE_TYPES.TSInferType]: TSESTree.TSInferType;
//   [AST_NODE_TYPES.TSInterfaceBody]: TSESTree.TSInterfaceBody;
//   [AST_NODE_TYPES.TSInterfaceDeclaration]: TSESTree.TSInterfaceDeclaration;
//   [AST_NODE_TYPES.TSInterfaceHeritage]: TSESTree.TSInterfaceHeritage;
//   [AST_NODE_TYPES.TSIntersectionType]: TSESTree.TSIntersectionType;
//   [AST_NODE_TYPES.TSIntrinsicKeyword]: TSESTree.TSIntrinsicKeyword;
//   [AST_NODE_TYPES.TSLiteralType]: TSESTree.TSLiteralType;
//   [AST_NODE_TYPES.TSMappedType]: TSESTree.TSMappedType;
//   [AST_NODE_TYPES.TSMethodSignature]: TSESTree.TSMethodSignature;
//   [AST_NODE_TYPES.TSModuleBlock]: TSESTree.TSModuleBlock;
//   [AST_NODE_TYPES.TSModuleDeclaration]: TSESTree.TSModuleDeclaration;
//   [AST_NODE_TYPES.TSNamedTupleMember]: TSESTree.TSNamedTupleMember;
//   [AST_NODE_TYPES.TSNamespaceExportDeclaration]: TSESTree.TSNamespaceExportDeclaration;
//   [AST_NODE_TYPES.TSNeverKeyword]: TSESTree.TSNeverKeyword;
//   [AST_NODE_TYPES.TSNonNullExpression]: TSESTree.TSNonNullExpression;
//   [AST_NODE_TYPES.TSNullKeyword]: TSESTree.TSNullKeyword;
//   [AST_NODE_TYPES.TSNumberKeyword]: TSESTree.TSNumberKeyword;
//   [AST_NODE_TYPES.TSObjectKeyword]: TSESTree.TSObjectKeyword;
//   [AST_NODE_TYPES.TSOptionalType]: TSESTree.TSOptionalType;
//   [AST_NODE_TYPES.TSParameterProperty]: TSESTree.TSParameterProperty;
//   [AST_NODE_TYPES.TSPrivateKeyword]: TSESTree.TSPrivateKeyword;
//   [AST_NODE_TYPES.TSPropertySignature]: TSESTree.TSPropertySignature;
//   [AST_NODE_TYPES.TSProtectedKeyword]: TSESTree.TSProtectedKeyword;
//   [AST_NODE_TYPES.TSPublicKeyword]: TSESTree.TSPublicKeyword;
//   [AST_NODE_TYPES.TSQualifiedName]: TSESTree.TSQualifiedName;
//   [AST_NODE_TYPES.TSReadonlyKeyword]: TSESTree.TSReadonlyKeyword;
//   [AST_NODE_TYPES.TSRestType]: TSESTree.TSRestType;
//   [AST_NODE_TYPES.TSStaticKeyword]: TSESTree.TSStaticKeyword;
//   [AST_NODE_TYPES.TSStringKeyword]: TSESTree.TSStringKeyword;
//   [AST_NODE_TYPES.TSSymbolKeyword]: TSESTree.TSSymbolKeyword;
//   [AST_NODE_TYPES.TSTemplateLiteralType]: TSESTree.TSTemplateLiteralType;
//   [AST_NODE_TYPES.TSThisType]: TSESTree.TSThisType;
//   [AST_NODE_TYPES.TSTupleType]: TSESTree.TSTupleType;
//   [AST_NODE_TYPES.TSTypeAliasDeclaration]: TSESTree.TSTypeAliasDeclaration;
//   [AST_NODE_TYPES.TSTypeAnnotation]: TSESTree.TSTypeAnnotation;
//   [AST_NODE_TYPES.TSTypeAssertion]: TSESTree.TSTypeAssertion;
//   [AST_NODE_TYPES.TSTypeLiteral]: TSESTree.TSTypeLiteral;
//   [AST_NODE_TYPES.TSTypeOperator]: TSESTree.TSTypeOperator;
//   [AST_NODE_TYPES.TSTypeParameter]: TSESTree.TSTypeParameter;
//   [AST_NODE_TYPES.TSTypeParameterDeclaration]: TSESTree.TSTypeParameterDeclaration;
//   [AST_NODE_TYPES.TSTypeParameterInstantiation]: TSESTree.TSTypeParameterInstantiation;
//   [AST_NODE_TYPES.TSTypePredicate]: TSESTree.TSTypePredicate;
//   [AST_NODE_TYPES.TSTypeQuery]: TSESTree.TSTypeQuery;
//   [AST_NODE_TYPES.TSTypeReference]: TSESTree.TSTypeReference;
//   [AST_NODE_TYPES.TSUndefinedKeyword]: TSESTree.TSUndefinedKeyword;
//   [AST_NODE_TYPES.TSUnionType]: TSESTree.TSUnionType;
//   [AST_NODE_TYPES.TSUnknownKeyword]: TSESTree.TSUnknownKeyword;
//   [AST_NODE_TYPES.TSVoidKeyword]: TSESTree.TSVoidKeyword;
// }>;

// type TESNode = TESNodes[keyof TESNodes];

// export type TESNodesMap = Record<AST_NODE_TYPES, MemberExpressionGetter>;

// type TESNode = Readonly<TESNodes[keyof TESNodes]>;

// export interface TESNodeMap {
//   [AST_NODE_TYPES.ArrayExpression]: (
//     node: TSESTree.ArrayExpression
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.ArrayPattern]: (
//     node: TSESTree.ArrayPattern
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.ArrowFunctionExpression]: (
//     node: TSESTree.ArrowFunctionExpression
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.AssignmentExpression]: (
//     node: TSESTree.AssignmentExpression
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.AssignmentPattern]: (
//     node: TSESTree.AssignmentPattern
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.AwaitExpression]: (
//     node: TSESTree.AwaitExpression
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.BinaryExpression]: (
//     node: TSESTree.BinaryExpression
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.BlockStatement]: (
//     node: TSESTree.BlockStatement
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.BreakStatement]: (
//     node: TSESTree.BreakStatement
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.CallExpression]: (
//     node: TSESTree.CallExpression
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.CatchClause]: (
//     node: TSESTree.CatchClause
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.ChainExpression]: (
//     node: TSESTree.ChainExpression
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.ClassBody]: (
//     node: TSESTree.ClassBody
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.ClassDeclaration]: (
//     node: TSESTree.ClassDeclaration
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.ClassExpression]: (
//     node: TSESTree.ClassExpression
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.ConditionalExpression]: (
//     node: TSESTree.ConditionalExpression
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.ContinueStatement]: (
//     node: TSESTree.ContinueStatement
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.DebuggerStatement]: (
//     node: TSESTree.DebuggerStatement
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.Decorator]: (
//     node: TSESTree.Decorator
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.DoWhileStatement]: (
//     node: TSESTree.DoWhileStatement
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.EmptyStatement]: (
//     node: TSESTree.EmptyStatement
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.ExportAllDeclaration]: (
//     node: TSESTree.ExportAllDeclaration
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.ExportDefaultDeclaration]: (
//     node: TSESTree.ExportDefaultDeclaration
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.ExportNamedDeclaration]: (
//     node: TSESTree.ExportNamedDeclaration
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.ExportSpecifier]: (
//     node: TSESTree.ExportSpecifier
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.ExpressionStatement]: (
//     node: TSESTree.ExpressionStatement
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.ForInStatement]: (
//     node: TSESTree.ForInStatement
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.ForOfStatement]: (
//     node: TSESTree.ForOfStatement
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.ForStatement]: (
//     node: TSESTree.ForStatement
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.FunctionDeclaration]: (
//     node: TSESTree.FunctionDeclaration
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.FunctionExpression]: (
//     node: TSESTree.FunctionExpression
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.Identifier]: (
//     node: TSESTree.Identifier
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.IfStatement]: (
//     node: TSESTree.IfStatement
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.ImportAttribute]: (
//     node: TSESTree.ImportAttribute
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.ImportDeclaration]: (
//     node: TSESTree.ImportDeclaration
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.ImportDefaultSpecifier]: (
//     node: TSESTree.ImportDefaultSpecifier
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.ImportExpression]: (
//     node: TSESTree.ImportExpression
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.ImportNamespaceSpecifier]: (
//     node: TSESTree.ImportNamespaceSpecifier
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.ImportSpecifier]: (
//     node: TSESTree.ImportSpecifier
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.JSXAttribute]: (
//     node: TSESTree.JSXAttribute
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.JSXClosingElement]: (
//     node: TSESTree.JSXClosingElement
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.JSXClosingFragment]: (
//     node: TSESTree.JSXClosingFragment
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.JSXElement]: (
//     node: TSESTree.JSXElement
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.JSXEmptyExpression]: (
//     node: TSESTree.JSXEmptyExpression
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.JSXExpressionContainer]: (
//     node: TSESTree.JSXExpressionContainer
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.JSXFragment]: (
//     node: TSESTree.JSXFragment
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.JSXIdentifier]: (
//     node: TSESTree.JSXIdentifier
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.JSXMemberExpression]: (
//     node: TSESTree.JSXMemberExpression
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.JSXNamespacedName]: (
//     node: TSESTree.JSXNamespacedName
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.JSXOpeningElement]: (
//     node: TSESTree.JSXOpeningElement
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.JSXOpeningFragment]: (
//     node: TSESTree.JSXOpeningFragment
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.JSXSpreadAttribute]: (
//     node: TSESTree.JSXSpreadAttribute
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.JSXSpreadChild]: (
//     node: TSESTree.JSXSpreadChild
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.JSXText]: (
//     node: TSESTree.JSXText
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.LabeledStatement]: (
//     node: TSESTree.LabeledStatement
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.Literal]: (
//     node: TSESTree.Literal
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.LogicalExpression]: (
//     node: TSESTree.LogicalExpression
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.MemberExpression]: (
//     node: TSESTree.MemberExpression
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.MetaProperty]: (
//     node: TSESTree.MetaProperty
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.MethodDefinition]: (
//     node: TSESTree.MethodDefinition
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.NewExpression]: (
//     node: TSESTree.NewExpression
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.ObjectExpression]: (
//     node: TSESTree.ObjectExpression
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.ObjectPattern]: (
//     node: TSESTree.ObjectPattern
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.PrivateIdentifier]: (
//     node: TSESTree.PrivateIdentifier
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.Program]: (
//     node: TSESTree.Program
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.Property]: (
//     node: TSESTree.Property
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.PropertyDefinition]: (
//     node: TSESTree.PropertyDefinition
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.RestElement]: (
//     node: TSESTree.RestElement
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.ReturnStatement]: (
//     node: TSESTree.ReturnStatement
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.SequenceExpression]: (
//     node: TSESTree.SequenceExpression
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.SpreadElement]: (
//     node: TSESTree.SpreadElement
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.StaticBlock]: (
//     node: TSESTree.StaticBlock
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.Super]: (node: TSESTree.Super) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.SwitchCase]: (
//     node: TSESTree.SwitchCase
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.SwitchStatement]: (
//     node: TSESTree.SwitchStatement
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.TaggedTemplateExpression]: (
//     node: TSESTree.TaggedTemplateExpression
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.TemplateElement]: (
//     node: TSESTree.TemplateElement
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.TemplateLiteral]: (
//     node: TSESTree.TemplateLiteral
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.ThisExpression]: (
//     node: TSESTree.ThisExpression
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.ThrowStatement]: (
//     node: TSESTree.ThrowStatement
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.TryStatement]: (
//     node: TSESTree.TryStatement
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.UnaryExpression]: (
//     node: TSESTree.UnaryExpression
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.UpdateExpression]: (
//     node: TSESTree.UpdateExpression
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.VariableDeclaration]: (
//     node: TSESTree.VariableDeclaration
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.VariableDeclarator]: (
//     node: TSESTree.VariableDeclarator
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.WhileStatement]: (
//     node: TSESTree.WhileStatement
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.WithStatement]: (
//     node: TSESTree.WithStatement
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.YieldExpression]: (
//     node: TSESTree.YieldExpression
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.TSAbstractKeyword]: (
//     node: TSESTree.TSAbstractKeyword
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.TSAbstractMethodDefinition]: (
//     node: TSESTree.TSAbstractMethodDefinition
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.TSAbstractPropertyDefinition]: (
//     node: TSESTree.TSAbstractPropertyDefinition
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.TSAnyKeyword]: (
//     node: TSESTree.TSAnyKeyword
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.TSArrayType]: (
//     node: TSESTree.TSArrayType
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.TSAsExpression]: (
//     node: TSESTree.TSAsExpression
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.TSAsyncKeyword]: (
//     node: TSESTree.TSAsyncKeyword
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.TSBigIntKeyword]: (
//     node: TSESTree.TSBigIntKeyword
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.TSBooleanKeyword]: (
//     node: TSESTree.TSBooleanKeyword
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.TSCallSignatureDeclaration]: (
//     node: TSESTree.TSCallSignatureDeclaration
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.TSClassImplements]: (
//     node: TSESTree.TSClassImplements
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.TSConditionalType]: (
//     node: TSESTree.TSConditionalType
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.TSConstructorType]: (
//     node: TSESTree.TSConstructorType
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.TSConstructSignatureDeclaration]: (
//     node: TSESTree.TSConstructSignatureDeclaration
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.TSDeclareFunction]: (
//     node: TSESTree.TSDeclareFunction
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.TSDeclareKeyword]: (
//     node: TSESTree.TSDeclareKeyword
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.TSEmptyBodyFunctionExpression]: (
//     node: TSESTree.TSEmptyBodyFunctionExpression
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.TSEnumDeclaration]: (
//     node: TSESTree.TSEnumDeclaration
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.TSEnumMember]: (
//     node: TSESTree.TSEnumMember
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.TSExportAssignment]: (
//     node: TSESTree.TSExportAssignment
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.TSExportKeyword]: (
//     node: TSESTree.TSExportKeyword
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.TSExternalModuleReference]: (
//     node: TSESTree.TSExternalModuleReference
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.TSFunctionType]: (
//     node: TSESTree.TSFunctionType
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.TSInstantiationExpression]: (
//     node: TSESTree.TSInstantiationExpression
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.TSImportEqualsDeclaration]: (
//     node: TSESTree.TSImportEqualsDeclaration
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.TSImportType]: (
//     node: TSESTree.TSImportType
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.TSIndexedAccessType]: (
//     node: TSESTree.TSIndexedAccessType
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.TSIndexSignature]: (
//     node: TSESTree.TSIndexSignature
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.TSInferType]: (
//     node: TSESTree.TSInferType
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.TSInterfaceBody]: (
//     node: TSESTree.TSInterfaceBody
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.TSInterfaceDeclaration]: (
//     node: TSESTree.TSInterfaceDeclaration
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.TSInterfaceHeritage]: (
//     node: TSESTree.TSInterfaceHeritage
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.TSIntersectionType]: (
//     node: TSESTree.TSIntersectionType
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.TSIntrinsicKeyword]: (
//     node: TSESTree.TSIntrinsicKeyword
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.TSLiteralType]: (
//     node: TSESTree.TSLiteralType
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.TSMappedType]: (
//     node: TSESTree.TSMappedType
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.TSMethodSignature]: (
//     node: TSESTree.TSMethodSignature
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.TSModuleBlock]: (
//     node: TSESTree.TSModuleBlock
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.TSModuleDeclaration]: (
//     node: TSESTree.TSModuleDeclaration
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.TSNamedTupleMember]: (
//     node: TSESTree.TSNamedTupleMember
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.TSNamespaceExportDeclaration]: (
//     node: TSESTree.TSNamespaceExportDeclaration
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.TSNeverKeyword]: (
//     node: TSESTree.TSNeverKeyword
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.TSNonNullExpression]: (
//     node: TSESTree.TSNonNullExpression
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.TSNullKeyword]: (
//     node: TSESTree.TSNullKeyword
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.TSNumberKeyword]: (
//     node: TSESTree.TSNumberKeyword
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.TSObjectKeyword]: (
//     node: TSESTree.TSObjectKeyword
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.TSOptionalType]: (
//     node: TSESTree.TSOptionalType
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.TSParameterProperty]: (
//     node: TSESTree.TSParameterProperty
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.TSPrivateKeyword]: (
//     node: TSESTree.TSPrivateKeyword
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.TSPropertySignature]: (
//     node: TSESTree.TSPropertySignature
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.TSProtectedKeyword]: (
//     node: TSESTree.TSProtectedKeyword
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.TSPublicKeyword]: (
//     node: TSESTree.TSPublicKeyword
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.TSQualifiedName]: (
//     node: TSESTree.TSQualifiedName
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.TSReadonlyKeyword]: (
//     node: TSESTree.TSReadonlyKeyword
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.TSRestType]: (
//     node: TSESTree.TSRestType
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.TSStaticKeyword]: (
//     node: TSESTree.TSStaticKeyword
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.TSStringKeyword]: (
//     node: TSESTree.TSStringKeyword
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.TSSymbolKeyword]: (
//     node: TSESTree.TSSymbolKeyword
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.TSTemplateLiteralType]: (
//     node: TSESTree.TSTemplateLiteralType
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.TSThisType]: (
//     node: TSESTree.TSThisType
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.TSTupleType]: (
//     node: TSESTree.TSTupleType
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.TSTypeAliasDeclaration]: (
//     node: TSESTree.TSTypeAliasDeclaration
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.TSTypeAnnotation]: (
//     node: TSESTree.TSTypeAnnotation
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.TSTypeAssertion]: (
//     node: TSESTree.TSTypeAssertion
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.TSTypeLiteral]: (
//     node: TSESTree.TSTypeLiteral
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.TSTypeOperator]: (
//     node: TSESTree.TSTypeOperator
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.TSTypeParameter]: (
//     node: TSESTree.TSTypeParameter
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.TSTypeParameterDeclaration]: (
//     node: TSESTree.TSTypeParameterDeclaration
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.TSTypeParameterInstantiation]: (
//     node: TSESTree.TSTypeParameterInstantiation
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.TSTypePredicate]: (
//     node: TSESTree.TSTypePredicate
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.TSTypeQuery]: (
//     node: TSESTree.TSTypeQuery
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.TSTypeReference]: (
//     node: TSESTree.TSTypeReference
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.TSUndefinedKeyword]: (
//     node: TSESTree.TSUndefinedKeyword
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.TSUnionType]: (
//     node: TSESTree.TSUnionType
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.TSUnknownKeyword]: (
//     node: TSESTree.TSUnknownKeyword
//   ) => TSESTree.MemberExpression[];
//   [AST_NODE_TYPES.TSVoidKeyword]: (
//     node: TSESTree.TSVoidKeyword
//   ) => TSESTree.MemberExpression[];
// };
