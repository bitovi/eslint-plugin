import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/utils';
import { MemberExpressionGetter, TESNode } from './types';
import { parametersToIdentifiers } from '../parameter/get-parameter-identifiers';
import { excludeMemberExpressionsByIdentifiers } from './exclude-member-expressions-by-identifier';
/**
 * Used to note that node never returns MemberExpressions
 */
const EMPTY: MemberExpressionGetter = () => [];
const TS_EMPTY: MemberExpressionGetter = () => [
  /* TODO: Handle all TS related nodes */
];
const JSX_EMPTY: MemberExpressionGetter = () => [
  /* TODO: Consider JSX related nodes */
];
const EXPORT_EMPTY: MemberExpressionGetter = () => [
  /* TODO: Consider Export related nodes */
];
const IMPORT_EMPTY: MemberExpressionGetter = () => [
  /* TODO: Consider Import related nodes */
];

/**
 * Searches node tree deeply for all MemberExpressions
 */
export function getMemberExpressionsFromNode(
  node?: TESNode | null
): TSESTree.MemberExpression[] {
  if (!node) {
    return [];
  }

  const type = node.type;

  if (!type || !(type in memberExpressionGetterMap)) {
    throw new Error('Unexpected not in map');
  }

  const fn = memberExpressionGetterMap[type] as (
    node: TESNode
  ) => TSESTree.MemberExpression[];

  return fn(node);
}

/**
 * Searches multiple node trees deeply for all MemberExpressions
 */
export function getMemberExpressionsFromNodes(
  nodes?: (TESNode | undefined | null)[]
): TSESTree.MemberExpression[] {
  if (!nodes) {
    return [];
  }

  return nodes.map(getMemberExpressionsFromNode).flat();
}

/**
 * Used to map which node branches to search
 *
 * All branches will terminate to an empty array or to `AST_NODE_TYPES.MemberExpression` handler
 *
 * Function scopes that redeclare MemberExpressions are skipped:
 *
 * const test = { prop: 'value' };// <-- tracked
 *
 * function someFn(test) {
 *   test;// <-- skipped
 * }
 *
 * test;// <-- still tracked
 */
const memberExpressionGetterMap = {
  [AST_NODE_TYPES.ArrayExpression]: function (
    node: TSESTree.ArrayExpression
  ): TSESTree.MemberExpression[] {
    return getMemberExpressionsFromNodes(node.elements);
  },
  [AST_NODE_TYPES.ArrayPattern]: function (
    node: TSESTree.ArrayPattern
  ): TSESTree.MemberExpression[] {
    const elements = getMemberExpressionsFromNodes(node.elements);
    const decorators = getMemberExpressionsFromNodes(node.decorators);
    const typeAnnotation = getMemberExpressionsFromNode(node.typeAnnotation);

    return [...elements, ...decorators, ...typeAnnotation];
  },
  [AST_NODE_TYPES.ArrowFunctionExpression]: function (
    node: TSESTree.ArrowFunctionExpression
  ): TSESTree.MemberExpression[] {
    const parameterIdentifiers = parametersToIdentifiers(node.params);
    const params = getMemberExpressionsFromNodes(node.params);
    const body = excludeMemberExpressionsByIdentifiers(
      getMemberExpressionsFromNode(node.body),
      parameterIdentifiers
    );
    const returnType = getMemberExpressionsFromNode(node.returnType);
    const typeParameters = getMemberExpressionsFromNode(node.typeParameters);

    return [...params, ...body, ...returnType, ...typeParameters];
  },
  [AST_NODE_TYPES.AssignmentExpression]: function (
    node: TSESTree.AssignmentExpression
  ): TSESTree.MemberExpression[] {
    const left = getMemberExpressionsFromNode(node.left);
    const right = getMemberExpressionsFromNode(node.right);

    return [...left, ...right];
  },
  [AST_NODE_TYPES.AssignmentPattern]: function (
    node: TSESTree.AssignmentPattern
  ): TSESTree.MemberExpression[] {
    const decorators = getMemberExpressionsFromNodes(node.decorators);
    const left = getMemberExpressionsFromNode(node.left);
    const right = getMemberExpressionsFromNode(node.right);
    const typeAnnotation = getMemberExpressionsFromNode(node.typeAnnotation);

    return [...decorators, ...left, ...right, ...typeAnnotation];
  },
  [AST_NODE_TYPES.AwaitExpression]: function (
    node: TSESTree.AwaitExpression
  ): TSESTree.MemberExpression[] {
    return getMemberExpressionsFromNode(node.argument);
  },
  [AST_NODE_TYPES.BinaryExpression]: function (
    node: TSESTree.BinaryExpression
  ): TSESTree.MemberExpression[] {
    const left = getMemberExpressionsFromNode(node.left);
    const right = getMemberExpressionsFromNode(node.right);

    return [...left, ...right];
  },
  [AST_NODE_TYPES.BlockStatement]: function (
    node: TSESTree.BlockStatement
  ): TSESTree.MemberExpression[] {
    return getMemberExpressionsFromNodes(node.body);
  },
  [AST_NODE_TYPES.BreakStatement]: EMPTY,
  [AST_NODE_TYPES.CallExpression]: function (
    node: TSESTree.CallExpression
  ): TSESTree.MemberExpression[] {
    const callee = getMemberExpressionsFromNode(node.callee);
    const args = getMemberExpressionsFromNodes(node.arguments);
    const typeParameters = getMemberExpressionsFromNode(node.typeParameters);

    return [...callee, ...args, ...typeParameters];
  },
  [AST_NODE_TYPES.CatchClause]: function (
    node: TSESTree.CatchClause
  ): TSESTree.MemberExpression[] {
    const param = getMemberExpressionsFromNode(node.param);
    const body = getMemberExpressionsFromNode(node.body);

    return [...param, ...body];
  },
  [AST_NODE_TYPES.ChainExpression]: function (
    node: TSESTree.ChainExpression
  ): TSESTree.MemberExpression[] {
    return getMemberExpressionsFromNode(node.expression);
  },
  [AST_NODE_TYPES.ClassBody]: function (
    node: TSESTree.ClassBody
  ): TSESTree.MemberExpression[] {
    return getMemberExpressionsFromNodes(node.body);
  },
  [AST_NODE_TYPES.ClassDeclaration]: function (
    node: TSESTree.ClassDeclaration
  ): TSESTree.MemberExpression[] {
    // Extends ClassBase
    const body = getMemberExpressionsFromNode(node.body);
    const decorators = getMemberExpressionsFromNodes(node.decorators);
    const superClass = getMemberExpressionsFromNode(node.superClass);
    const superTypeParameters = getMemberExpressionsFromNode(
      node.superTypeParameters
    );
    const typeParameters = getMemberExpressionsFromNode(
      node.superTypeParameters
    );

    return [
      ...body,
      ...decorators,
      ...superClass,
      ...superTypeParameters,
      ...typeParameters,
    ];
  },
  [AST_NODE_TYPES.ClassExpression]: function (
    node: TSESTree.ClassExpression
  ): TSESTree.MemberExpression[] {
    // Extends ClassBase
    const body = getMemberExpressionsFromNode(node.body);
    const decorators = getMemberExpressionsFromNodes(node.decorators);
    const superClass = getMemberExpressionsFromNode(node.superClass);
    const superTypeParameters = getMemberExpressionsFromNode(
      node.superTypeParameters
    );
    const typeParameters = getMemberExpressionsFromNode(
      node.superTypeParameters
    );

    return [
      ...body,
      ...decorators,
      ...superClass,
      ...superTypeParameters,
      ...typeParameters,
    ];
  },
  [AST_NODE_TYPES.ConditionalExpression]: function (
    node: TSESTree.ConditionalExpression
  ): TSESTree.MemberExpression[] {
    const test = getMemberExpressionsFromNode(node.test);
    const consequent = getMemberExpressionsFromNode(node.consequent);
    const alternate = getMemberExpressionsFromNode(node.alternate);

    return [...test, ...consequent, ...alternate];
  },
  [AST_NODE_TYPES.ContinueStatement]: EMPTY,
  [AST_NODE_TYPES.DebuggerStatement]: EMPTY,
  [AST_NODE_TYPES.Decorator]: function (
    node: TSESTree.Decorator
  ): TSESTree.MemberExpression[] {
    return getMemberExpressionsFromNode(node.expression);
  },
  [AST_NODE_TYPES.DoWhileStatement]: function (
    node: TSESTree.DoWhileStatement
  ): TSESTree.MemberExpression[] {
    const test = getMemberExpressionsFromNode(node.test);
    const body = getMemberExpressionsFromNode(node.body);

    return [...test, ...body];
  },
  [AST_NODE_TYPES.EmptyStatement]: EMPTY,
  [AST_NODE_TYPES.ExportAllDeclaration]: EXPORT_EMPTY,
  [AST_NODE_TYPES.ExportDefaultDeclaration]: EXPORT_EMPTY,
  [AST_NODE_TYPES.ExportNamedDeclaration]: EXPORT_EMPTY,
  [AST_NODE_TYPES.ExportSpecifier]: EXPORT_EMPTY,
  [AST_NODE_TYPES.ExpressionStatement]: function (
    node: TSESTree.ExpressionStatement
  ): TSESTree.MemberExpression[] {
    return getMemberExpressionsFromNode(node.expression);
  },
  [AST_NODE_TYPES.ForInStatement]: function (
    node: TSESTree.ForInStatement
  ): TSESTree.MemberExpression[] {
    const left = getMemberExpressionsFromNode(node.left);
    const right = getMemberExpressionsFromNode(node.right);
    const body = getMemberExpressionsFromNode(node.body);

    return [...left, ...right, ...body];
  },
  [AST_NODE_TYPES.ForOfStatement]: function (
    node: TSESTree.ForOfStatement
  ): TSESTree.MemberExpression[] {
    const left = getMemberExpressionsFromNode(node.left);
    const right = getMemberExpressionsFromNode(node.right);
    const body = getMemberExpressionsFromNode(node.body);

    return [...left, ...right, ...body];
  },
  [AST_NODE_TYPES.ForStatement]: function (
    node: TSESTree.ForStatement
  ): TSESTree.MemberExpression[] {
    const init = getMemberExpressionsFromNode(node.init);
    const test = getMemberExpressionsFromNode(node.test);
    const update = getMemberExpressionsFromNode(node.update);
    const body = getMemberExpressionsFromNode(node.body);

    return [...init, ...test, ...update, ...body];
  },
  [AST_NODE_TYPES.FunctionDeclaration]: function (
    node: TSESTree.FunctionDeclaration
  ): TSESTree.MemberExpression[] {
    // Extends FunctionDeclarationBase

    const parameterIdentifiers = parametersToIdentifiers(node.params);
    const params = getMemberExpressionsFromNodes(node.params);
    const body = excludeMemberExpressionsByIdentifiers(
      getMemberExpressionsFromNode(node.body),
      parameterIdentifiers
    );
    const returnType = getMemberExpressionsFromNode(node.returnType);
    const typeParameters = getMemberExpressionsFromNode(node.typeParameters);

    return [...params, ...body, ...returnType, ...typeParameters];
  },
  [AST_NODE_TYPES.FunctionExpression]: function (
    node: TSESTree.FunctionExpression
  ): TSESTree.MemberExpression[] {
    // Extends FunctionBase

    const parameterIdentifiers = parametersToIdentifiers(node.params);
    const params = getMemberExpressionsFromNodes(node.params);
    const body = excludeMemberExpressionsByIdentifiers(
      getMemberExpressionsFromNode(node.body),
      parameterIdentifiers
    );
    const returnType = getMemberExpressionsFromNode(node.returnType);
    const typeParameters = getMemberExpressionsFromNode(node.typeParameters);

    return [...params, ...body, ...returnType, ...typeParameters];
  },
  [AST_NODE_TYPES.Identifier]: EMPTY,
  [AST_NODE_TYPES.IfStatement]: function (
    node: TSESTree.IfStatement
  ): TSESTree.MemberExpression[] {
    const test = getMemberExpressionsFromNode(node.test);
    const consequent = getMemberExpressionsFromNode(node.consequent);
    const alternate = getMemberExpressionsFromNode(node.alternate);

    return [...test, ...consequent, ...alternate];
  },
  [AST_NODE_TYPES.ImportAttribute]: IMPORT_EMPTY,
  [AST_NODE_TYPES.ImportDeclaration]: IMPORT_EMPTY,
  [AST_NODE_TYPES.ImportDefaultSpecifier]: IMPORT_EMPTY,
  [AST_NODE_TYPES.ImportExpression]: function (
    node: TSESTree.ImportExpression
  ): TSESTree.MemberExpression[] {
    const source = getMemberExpressionsFromNode(node.source);
    const attributes = getMemberExpressionsFromNode(node.attributes);

    return [...source, ...attributes];
  },
  [AST_NODE_TYPES.ImportNamespaceSpecifier]: IMPORT_EMPTY,
  [AST_NODE_TYPES.ImportSpecifier]: IMPORT_EMPTY,
  [AST_NODE_TYPES.JSXAttribute]: JSX_EMPTY,
  [AST_NODE_TYPES.JSXClosingElement]: JSX_EMPTY,
  [AST_NODE_TYPES.JSXClosingFragment]: JSX_EMPTY,
  [AST_NODE_TYPES.JSXElement]: JSX_EMPTY,
  [AST_NODE_TYPES.JSXEmptyExpression]: JSX_EMPTY,
  [AST_NODE_TYPES.JSXExpressionContainer]: JSX_EMPTY,
  [AST_NODE_TYPES.JSXFragment]: JSX_EMPTY,
  [AST_NODE_TYPES.JSXIdentifier]: JSX_EMPTY,
  [AST_NODE_TYPES.JSXMemberExpression]: JSX_EMPTY,
  [AST_NODE_TYPES.JSXNamespacedName]: JSX_EMPTY,
  [AST_NODE_TYPES.JSXOpeningElement]: JSX_EMPTY,
  [AST_NODE_TYPES.JSXOpeningFragment]: JSX_EMPTY,
  [AST_NODE_TYPES.JSXSpreadAttribute]: JSX_EMPTY,
  [AST_NODE_TYPES.JSXSpreadChild]: JSX_EMPTY,
  [AST_NODE_TYPES.JSXText]: JSX_EMPTY,
  [AST_NODE_TYPES.LabeledStatement]: function (
    node: TSESTree.LabeledStatement
  ): TSESTree.MemberExpression[] {
    return getMemberExpressionsFromNode(node.body);
  },
  [AST_NODE_TYPES.Literal]: EMPTY,
  [AST_NODE_TYPES.LogicalExpression]: function (
    node: TSESTree.LogicalExpression
  ): TSESTree.MemberExpression[] {
    const left = getMemberExpressionsFromNode(node.left);
    const right = getMemberExpressionsFromNode(node.right);

    return [...left, ...right];
  },
  [AST_NODE_TYPES.MemberExpression]: function (
    node: TSESTree.MemberExpression
  ): TSESTree.MemberExpression[] {
    // Extends MemberExpressionBase
    const object = getMemberExpressionsFromNode(node.object);
    const property = getMemberExpressionsFromNode(node.property);

    return [node, ...object, ...property];
  },
  [AST_NODE_TYPES.MetaProperty]: EMPTY,
  [AST_NODE_TYPES.MethodDefinition]: function (
    node: TSESTree.MethodDefinition
  ): TSESTree.MemberExpression[] {
    // Extends MethodDefinitionBase
    const value = getMemberExpressionsFromNode(node.value);
    const decorators = getMemberExpressionsFromNodes(node.decorators);
    const typeParameters = getMemberExpressionsFromNode(node.typeParameters);

    return [...value, ...decorators, ...typeParameters];
  },
  [AST_NODE_TYPES.NewExpression]: function (
    node: TSESTree.NewExpression
  ): TSESTree.MemberExpression[] {
    const callee = getMemberExpressionsFromNode(node.callee);
    const args = getMemberExpressionsFromNodes(node.arguments);
    const typeParameters = getMemberExpressionsFromNode(node.typeParameters);

    return [...callee, ...args, ...typeParameters];
  },
  [AST_NODE_TYPES.ObjectExpression]: function (
    node: TSESTree.ObjectExpression
  ): TSESTree.MemberExpression[] {
    return getMemberExpressionsFromNodes(node.properties);
  },
  [AST_NODE_TYPES.ObjectPattern]: function (
    node: TSESTree.ObjectPattern
  ): TSESTree.MemberExpression[] {
    // TODO: typeAnnotation?: TSTypeAnnotation;
    const properties = getMemberExpressionsFromNodes(node.properties);
    const decorators = getMemberExpressionsFromNodes(node.decorators);
    const typeAnnotation = getMemberExpressionsFromNode(node.typeAnnotation);

    return [...properties, ...decorators, ...typeAnnotation];
  },
  [AST_NODE_TYPES.PrivateIdentifier]: EMPTY,
  [AST_NODE_TYPES.Program]: function (
    node: TSESTree.Program
  ): TSESTree.MemberExpression[] {
    return getMemberExpressionsFromNodes(node.body);
  },
  [AST_NODE_TYPES.Property]: function (
    node: TSESTree.Property
  ): TSESTree.MemberExpression[] {
    const key = getMemberExpressionsFromNode(node.key);
    const value = getMemberExpressionsFromNode(node.value);

    return [...key, ...value];
  },
  [AST_NODE_TYPES.PropertyDefinition]: function (
    node: TSESTree.PropertyDefinition
  ): TSESTree.MemberExpression[] {
    // Extends PropertyDefinitionBase
    const key = getMemberExpressionsFromNode(node.key);
    const value = getMemberExpressionsFromNode(node.value);
    const decorators = getMemberExpressionsFromNodes(node.decorators);
    const typeAnnotation = getMemberExpressionsFromNode(node.typeAnnotation);

    return [...key, ...value, ...decorators, ...typeAnnotation];
  },
  [AST_NODE_TYPES.RestElement]: function (
    node: TSESTree.RestElement
  ): TSESTree.MemberExpression[] {
    const argument = getMemberExpressionsFromNode(node.argument);
    const typeAnnotation = getMemberExpressionsFromNode(node.typeAnnotation);
    const value = getMemberExpressionsFromNode(node.value);
    const decorators = getMemberExpressionsFromNodes(node.decorators);

    return [...argument, ...typeAnnotation, ...value, ...decorators];
  },
  [AST_NODE_TYPES.ReturnStatement]: function (
    node: TSESTree.ReturnStatement
  ): TSESTree.MemberExpression[] {
    return getMemberExpressionsFromNode(node.argument);
  },
  [AST_NODE_TYPES.SequenceExpression]: function (
    node: TSESTree.SequenceExpression
  ): TSESTree.MemberExpression[] {
    return getMemberExpressionsFromNodes(node.expressions);
  },
  [AST_NODE_TYPES.SpreadElement]: function (
    node: TSESTree.SpreadElement
  ): TSESTree.MemberExpression[] {
    return getMemberExpressionsFromNode(node.argument);
  },
  [AST_NODE_TYPES.StaticBlock]: function (
    node: TSESTree.StaticBlock
  ): TSESTree.MemberExpression[] {
    return getMemberExpressionsFromNodes(node.body);
  },
  [AST_NODE_TYPES.Super]: EMPTY,
  [AST_NODE_TYPES.SwitchCase]: function (
    node: TSESTree.SwitchCase
  ): TSESTree.MemberExpression[] {
    const test = getMemberExpressionsFromNode(node.test);
    const consequent = getMemberExpressionsFromNodes(node.consequent);

    return [...test, ...consequent];
  },
  [AST_NODE_TYPES.SwitchStatement]: function (
    node: TSESTree.SwitchStatement
  ): TSESTree.MemberExpression[] {
    const discriminant = getMemberExpressionsFromNode(node.discriminant);
    const cases = getMemberExpressionsFromNodes(node.cases);

    return [...discriminant, ...cases];
  },
  [AST_NODE_TYPES.TaggedTemplateExpression]: function (
    node: TSESTree.TaggedTemplateExpression
  ): TSESTree.MemberExpression[] {
    const typeParameters = getMemberExpressionsFromNode(node.typeParameters);
    const tag = getMemberExpressionsFromNode(node.tag);
    const quasi = getMemberExpressionsFromNode(node.quasi);

    return [...typeParameters, ...tag, ...quasi];
  },
  [AST_NODE_TYPES.TemplateElement]: EMPTY,
  [AST_NODE_TYPES.TemplateLiteral]: function (
    node: TSESTree.TemplateLiteral
  ): TSESTree.MemberExpression[] {
    const quasis = getMemberExpressionsFromNodes(node.quasis);
    const expressions = getMemberExpressionsFromNodes(node.expressions);

    return [...quasis, ...expressions];
  },
  [AST_NODE_TYPES.ThisExpression]: EMPTY,
  [AST_NODE_TYPES.ThrowStatement]: function (
    node: TSESTree.ThrowStatement
  ): TSESTree.MemberExpression[] {
    return getMemberExpressionsFromNode(node.argument);
  },
  [AST_NODE_TYPES.TryStatement]: function (
    node: TSESTree.TryStatement
  ): TSESTree.MemberExpression[] {
    const block = getMemberExpressionsFromNode(node.block);
    const handler = getMemberExpressionsFromNode(node.handler);
    const finalizer = getMemberExpressionsFromNode(node.finalizer);

    return [...block, ...handler, ...finalizer];
  },
  [AST_NODE_TYPES.UnaryExpression]: function (
    node: TSESTree.UnaryExpression
  ): TSESTree.MemberExpression[] {
    // Extends UnaryExpressionBase
    return getMemberExpressionsFromNode(node.argument);
  },
  [AST_NODE_TYPES.UpdateExpression]: function (
    node: TSESTree.UpdateExpression
  ): TSESTree.MemberExpression[] {
    // Extends UnaryExpressionBase
    return getMemberExpressionsFromNode(node.argument);
  },
  [AST_NODE_TYPES.VariableDeclaration]: function (
    node: TSESTree.VariableDeclaration
  ): TSESTree.MemberExpression[] {
    return getMemberExpressionsFromNodes(node.declarations);
  },
  [AST_NODE_TYPES.VariableDeclarator]: function (
    node: TSESTree.VariableDeclarator
  ): TSESTree.MemberExpression[] {
    const id = getMemberExpressionsFromNode(node.id);
    const init = getMemberExpressionsFromNode(node.init);

    return [...id, ...init];
  },
  [AST_NODE_TYPES.WhileStatement]: function (
    node: TSESTree.WhileStatement
  ): TSESTree.MemberExpression[] {
    const test = getMemberExpressionsFromNode(node.test);
    const body = getMemberExpressionsFromNode(node.body);

    return [...test, ...body];
  },
  [AST_NODE_TYPES.WithStatement]: function (
    node: TSESTree.WithStatement
  ): TSESTree.MemberExpression[] {
    const object = getMemberExpressionsFromNode(node.object);
    const body = getMemberExpressionsFromNode(node.body);

    return [...object, ...body];
  },
  [AST_NODE_TYPES.YieldExpression]: function (
    node: TSESTree.YieldExpression
  ): TSESTree.MemberExpression[] {
    return getMemberExpressionsFromNode(node.argument);
  },
  [AST_NODE_TYPES.TSAbstractKeyword]: TS_EMPTY,
  [AST_NODE_TYPES.TSAbstractMethodDefinition]: TS_EMPTY,
  [AST_NODE_TYPES.TSAbstractPropertyDefinition]: TS_EMPTY,
  [AST_NODE_TYPES.TSAnyKeyword]: TS_EMPTY,
  [AST_NODE_TYPES.TSArrayType]: TS_EMPTY,
  [AST_NODE_TYPES.TSAsExpression]: TS_EMPTY,
  [AST_NODE_TYPES.TSAsyncKeyword]: TS_EMPTY,
  [AST_NODE_TYPES.TSBigIntKeyword]: TS_EMPTY,
  [AST_NODE_TYPES.TSBooleanKeyword]: TS_EMPTY,
  [AST_NODE_TYPES.TSCallSignatureDeclaration]: TS_EMPTY,
  [AST_NODE_TYPES.TSClassImplements]: TS_EMPTY,
  [AST_NODE_TYPES.TSConditionalType]: TS_EMPTY,
  [AST_NODE_TYPES.TSConstructorType]: TS_EMPTY,
  [AST_NODE_TYPES.TSConstructSignatureDeclaration]: TS_EMPTY,
  [AST_NODE_TYPES.TSDeclareFunction]: TS_EMPTY,
  [AST_NODE_TYPES.TSDeclareKeyword]: TS_EMPTY,
  [AST_NODE_TYPES.TSEmptyBodyFunctionExpression]: TS_EMPTY,
  [AST_NODE_TYPES.TSEnumDeclaration]: TS_EMPTY,
  [AST_NODE_TYPES.TSEnumMember]: TS_EMPTY,
  [AST_NODE_TYPES.TSExportAssignment]: TS_EMPTY,
  [AST_NODE_TYPES.TSExportKeyword]: TS_EMPTY,
  [AST_NODE_TYPES.TSExternalModuleReference]: TS_EMPTY,
  [AST_NODE_TYPES.TSFunctionType]: TS_EMPTY,
  [AST_NODE_TYPES.TSInstantiationExpression]: TS_EMPTY,
  [AST_NODE_TYPES.TSImportEqualsDeclaration]: TS_EMPTY,
  [AST_NODE_TYPES.TSImportType]: TS_EMPTY,
  [AST_NODE_TYPES.TSIndexedAccessType]: TS_EMPTY,
  [AST_NODE_TYPES.TSIndexSignature]: TS_EMPTY,
  [AST_NODE_TYPES.TSInferType]: TS_EMPTY,
  [AST_NODE_TYPES.TSInterfaceBody]: TS_EMPTY,
  [AST_NODE_TYPES.TSInterfaceDeclaration]: TS_EMPTY,
  [AST_NODE_TYPES.TSInterfaceHeritage]: TS_EMPTY,
  [AST_NODE_TYPES.TSIntersectionType]: TS_EMPTY,
  [AST_NODE_TYPES.TSIntrinsicKeyword]: TS_EMPTY,
  [AST_NODE_TYPES.TSLiteralType]: TS_EMPTY,
  [AST_NODE_TYPES.TSMappedType]: TS_EMPTY,
  [AST_NODE_TYPES.TSMethodSignature]: TS_EMPTY,
  [AST_NODE_TYPES.TSModuleBlock]: TS_EMPTY,
  [AST_NODE_TYPES.TSModuleDeclaration]: TS_EMPTY,
  [AST_NODE_TYPES.TSNamedTupleMember]: TS_EMPTY,
  [AST_NODE_TYPES.TSNamespaceExportDeclaration]: TS_EMPTY,
  [AST_NODE_TYPES.TSNeverKeyword]: TS_EMPTY,
  [AST_NODE_TYPES.TSNonNullExpression]: TS_EMPTY,
  [AST_NODE_TYPES.TSNullKeyword]: TS_EMPTY,
  [AST_NODE_TYPES.TSNumberKeyword]: TS_EMPTY,
  [AST_NODE_TYPES.TSObjectKeyword]: TS_EMPTY,
  [AST_NODE_TYPES.TSOptionalType]: TS_EMPTY,
  [AST_NODE_TYPES.TSParameterProperty]: TS_EMPTY,
  [AST_NODE_TYPES.TSPrivateKeyword]: TS_EMPTY,
  [AST_NODE_TYPES.TSPropertySignature]: TS_EMPTY,
  [AST_NODE_TYPES.TSProtectedKeyword]: TS_EMPTY,
  [AST_NODE_TYPES.TSPublicKeyword]: TS_EMPTY,
  [AST_NODE_TYPES.TSQualifiedName]: TS_EMPTY,
  [AST_NODE_TYPES.TSReadonlyKeyword]: TS_EMPTY,
  [AST_NODE_TYPES.TSRestType]: TS_EMPTY,
  [AST_NODE_TYPES.TSStaticKeyword]: TS_EMPTY,
  [AST_NODE_TYPES.TSStringKeyword]: TS_EMPTY,
  [AST_NODE_TYPES.TSSymbolKeyword]: TS_EMPTY,
  [AST_NODE_TYPES.TSTemplateLiteralType]: TS_EMPTY,
  [AST_NODE_TYPES.TSThisType]: TS_EMPTY,
  [AST_NODE_TYPES.TSTupleType]: TS_EMPTY,
  [AST_NODE_TYPES.TSTypeAliasDeclaration]: TS_EMPTY,
  [AST_NODE_TYPES.TSTypeAnnotation]: TS_EMPTY,
  [AST_NODE_TYPES.TSTypeAssertion]: TS_EMPTY,
  [AST_NODE_TYPES.TSTypeLiteral]: TS_EMPTY,
  [AST_NODE_TYPES.TSTypeOperator]: TS_EMPTY,
  [AST_NODE_TYPES.TSTypeParameter]: TS_EMPTY,
  [AST_NODE_TYPES.TSTypeParameterDeclaration]: TS_EMPTY,
  [AST_NODE_TYPES.TSTypeParameterInstantiation]: EMPTY,
  [AST_NODE_TYPES.TSTypePredicate]: TS_EMPTY,
  [AST_NODE_TYPES.TSTypeQuery]: TS_EMPTY,
  [AST_NODE_TYPES.TSTypeReference]: TS_EMPTY,
  [AST_NODE_TYPES.TSUndefinedKeyword]: TS_EMPTY,
  [AST_NODE_TYPES.TSUnionType]: TS_EMPTY,
  [AST_NODE_TYPES.TSUnknownKeyword]: TS_EMPTY,
  [AST_NODE_TYPES.TSVoidKeyword]: TS_EMPTY,
} as const;
