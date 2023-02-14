import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/utils';

export function mapNode(node: {
  type: AST_NODE_TYPES;
}): TSESTree.MemberExpression[] {
  const type = node.type;

  if (!type || !(type in map)) {
    throw new Error('Unexpected not in map');
  }

  return map[type](node as any);
}

type MemberExpressionGetter = (
  ...args: unknown[]
) => TSESTree.MemberExpression[];

const EMPTY: MemberExpressionGetter = () => [];
const TS_EMPTY: MemberExpressionGetter = () => [
  /* TODO */
];
const JSX_EMPTY: MemberExpressionGetter = () => [
  /* TODO */
];

function mapExpression(
  expression?: TSESTree.Expression | null
): TSESTree.MemberExpression[] {
  return expression ? mapNode(expression) : [];
}

function mapDestructuringPattern(
  node: TSESTree.DestructuringPattern
): TSESTree.MemberExpression[] {
  return mapNode(node);
}

function mapParameter(node: TSESTree.Parameter): TSESTree.MemberExpression[] {
  return mapNode(node);
}

function mapDecorators(
  decorators?: TSESTree.Decorator[] | null
): TSESTree.MemberExpression[] {
  return (
    decorators
      ?.map((decorator) => map[AST_NODE_TYPES.Decorator](decorator))
      .flat() ?? []
  );
}

function mapBindingName(
  bindingName?: TSESTree.BindingName | null
): TSESTree.MemberExpression[] {
  return bindingName ? mapNode(bindingName) : [];
}

// function mapBindingPattern(
//   bindingPattern: TSESTree.BindingPattern
// ): TSESTree.MemberExpression[] {
//   return mapNode(bindingPattern);
// }

function mapForInitialiser(
  initialiser?: TSESTree.ForInitialiser | null
): TSESTree.MemberExpression[] {
  return initialiser ? mapNode(initialiser) : [];
}

function mapStatement(
  statement?: TSESTree.Statement | null
): TSESTree.MemberExpression[] {
  return statement ? mapNode(statement) : [];
}

function mapStatements(
  statements: TSESTree.Statement[]
): TSESTree.MemberExpression[] {
  return statements.map(mapStatement).flat();
}

function mapLeftHandSideExpression(
  expression: TSESTree.LeftHandSideExpression
): TSESTree.MemberExpression[] {
  return mapNode(expression);
}

function mapCallExpressionArgument(
  argument: TSESTree.CallExpressionArgument
): TSESTree.MemberExpression[] {
  return mapNode(argument);
}

function mapCallExpressionArguments(
  args: TSESTree.CallExpressionArgument[]
): TSESTree.MemberExpression[] {
  return args.map(mapCallExpressionArgument).flat();
}

// ChainElement = CallExpression | MemberExpression | TSNonNullExpression;

function mapChainElement(
  element: TSESTree.ChainElement
): TSESTree.MemberExpression[] {
  return mapNode(element);
}

function mapMemberExpression(
  expression: TSESTree.MemberExpression
): TSESTree.MemberExpression[] {
  return [expression];
}

function mapClassElement(
  element: TSESTree.ClassElement
): TSESTree.MemberExpression[] {
  return mapNode(element);
}

function mapClassElements(
  elements: TSESTree.ClassElement[]
): TSESTree.MemberExpression[] {
  return elements.map(mapClassElement).flat();
}

function mapObjectLiteralElement(
  element: TSESTree.ObjectLiteralElement
): TSESTree.MemberExpression[] {
  return mapNode(element);
}

function mapObjectLiteralElements(
  elements: TSESTree.ObjectLiteralElement[]
): TSESTree.MemberExpression[] {
  return elements.map(mapObjectLiteralElement).flat();
}

function mapPropertyValue(
  value: TSESTree.Property['value']
): TSESTree.MemberExpression[] {
  if (value.type === AST_NODE_TYPES.AssignmentPattern) {
    return map[AST_NODE_TYPES.AssignmentPattern](value);
  }

  return mapNode(value);
}

function mapUnaryExpressionArgument(
  argument: TSESTree.UnaryExpression['argument']
): TSESTree.MemberExpression[] {
  if (argument.type === AST_NODE_TYPES.Literal) {
    return map[AST_NODE_TYPES.Literal](argument);
  }

  if (argument.type === AST_NODE_TYPES.UnaryExpression) {
    return map[AST_NODE_TYPES.UnaryExpression](argument);
  }

  return mapLeftHandSideExpression(argument);
}

function mapExpressions(
  expressions: TSESTree.Expression[]
): TSESTree.MemberExpression[] {
  return expressions.map(mapExpression).flat();
}

function mapObjectPatternProperties(
  properties: TSESTree.ObjectPattern['properties']
): TSESTree.MemberExpression[] {
  return properties
    .map((property) => {
      if (property.type === AST_NODE_TYPES.Property) {
        return map[AST_NODE_TYPES.Property](property);
      }

      return map[AST_NODE_TYPES.RestElement](property);
    })
    .flat();
}

const map = {
  [AST_NODE_TYPES.ArrayExpression]: function (
    node: TSESTree.ArrayExpression
  ): TSESTree.MemberExpression[] {
    return node.elements
      .map((element) => {
        if (element.type === AST_NODE_TYPES.SpreadElement) {
          return map[AST_NODE_TYPES.SpreadElement](element);
        }

        return mapExpression(element);
      })
      .flat();
  },
  [AST_NODE_TYPES.ArrayPattern]: function (
    node: TSESTree.ArrayPattern
  ): TSESTree.MemberExpression[] {
    // TODO: typeAnnotation?: TSTypeAnnotation;
    const decoratorMemberExpressions = mapDecorators(node.decorators);

    const elementMemberExpressions = node.elements
      .filter((element): element is TSESTree.DestructuringPattern => !!element)
      .map(mapDestructuringPattern)
      .flat();

    return [...decoratorMemberExpressions, ...elementMemberExpressions];
  },
  [AST_NODE_TYPES.ArrowFunctionExpression]: function (
    node: TSESTree.ArrowFunctionExpression
  ): TSESTree.MemberExpression[] {
    // TODO: returnType?: TSTypeAnnotation;
    // TODO: typeParameters?: TSTypeParameterDeclaration;

    const bodyMemberExpressions =
      node.body.type === AST_NODE_TYPES.BlockStatement
        ? map[AST_NODE_TYPES.BlockStatement](node.body)
        : mapExpression(node.body);

    const paramMemberExpressions = node.params.map(mapParameter).flat();

    return [...bodyMemberExpressions, ...paramMemberExpressions];
  },
  [AST_NODE_TYPES.AssignmentExpression]: function (
    node: TSESTree.AssignmentExpression
  ): TSESTree.MemberExpression[] {
    const leftMemberExpressions = mapExpression(node.left);
    const rightMemberExpressions = mapExpression(node.right);

    return [...leftMemberExpressions, ...rightMemberExpressions];
  },
  [AST_NODE_TYPES.AssignmentPattern]: function (
    node: TSESTree.AssignmentPattern
  ): TSESTree.MemberExpression[] {
    // TODO: typeAnnotation?: TSTypeAnnotation;

    const decoratorMemberExpressions = mapDecorators(node.decorators);
    const leftMemberExpressions = mapBindingName(node.left);
    const rightMemberExpressions = mapExpression(node.right);

    return [
      ...decoratorMemberExpressions,
      ...leftMemberExpressions,
      ...rightMemberExpressions,
    ];
  },
  [AST_NODE_TYPES.AwaitExpression]: function (
    node: TSESTree.AwaitExpression
  ): TSESTree.MemberExpression[] {
    return mapExpression(node.argument);
  },
  [AST_NODE_TYPES.BinaryExpression]: function (
    node: TSESTree.BinaryExpression
  ): TSESTree.MemberExpression[] {
    const leftMemberExpressions =
      node.left.type === AST_NODE_TYPES.PrivateIdentifier
        ? []
        : mapExpression(node.left);
    const rightMemberExpressions = mapExpression(node.right);

    return [...leftMemberExpressions, ...rightMemberExpressions];
  },
  [AST_NODE_TYPES.BlockStatement]: function (
    node: TSESTree.BlockStatement
  ): TSESTree.MemberExpression[] {
    return mapStatements(node.body);
  },
  [AST_NODE_TYPES.BreakStatement]: EMPTY,
  [AST_NODE_TYPES.CallExpression]: function (
    node: TSESTree.CallExpression
  ): TSESTree.MemberExpression[] {
    // TODO: typeParameters?: TSTypeParameterInstantiation;

    const calleeMemberExpressions = mapLeftHandSideExpression(node.callee);
    const argumentMemberExpressions = mapCallExpressionArguments(
      node.arguments
    );
    return [...calleeMemberExpressions, ...argumentMemberExpressions];
  },
  [AST_NODE_TYPES.CatchClause]: function (
    node: TSESTree.CatchClause
  ): TSESTree.MemberExpression[] {
    // param: BindingName | null;
    const paramMemberExpressions = mapBindingName(node.param);
    const bodyMemberExpressions = map[AST_NODE_TYPES.BlockStatement](node.body);

    return [...paramMemberExpressions, ...bodyMemberExpressions];
  },
  [AST_NODE_TYPES.ChainExpression]: function (
    node: TSESTree.ChainExpression
  ): TSESTree.MemberExpression[] {
    return mapChainElement(node.expression);
  },
  [AST_NODE_TYPES.ClassBody]: function (
    node: TSESTree.ClassBody
  ): TSESTree.MemberExpression[] {
    return mapClassElements(node.body);
  },
  [AST_NODE_TYPES.ClassDeclaration]: EMPTY,
  [AST_NODE_TYPES.ClassExpression]: EMPTY,
  [AST_NODE_TYPES.ConditionalExpression]: function (
    node: TSESTree.ConditionalExpression
  ): TSESTree.MemberExpression[] {
    const testMemberExpressions = mapExpression(node.test);
    const consequentMemberExpressions = mapExpression(node.consequent);
    const alternateMemberExpressions = mapExpression(node.alternate);

    return [
      ...testMemberExpressions,
      ...consequentMemberExpressions,
      ...alternateMemberExpressions,
    ];
  },
  [AST_NODE_TYPES.ContinueStatement]: EMPTY,
  [AST_NODE_TYPES.DebuggerStatement]: EMPTY,
  [AST_NODE_TYPES.Decorator]: function (
    node: TSESTree.Decorator
  ): TSESTree.MemberExpression[] {
    return mapLeftHandSideExpression(node.expression);
  },
  [AST_NODE_TYPES.DoWhileStatement]: function (
    node: TSESTree.DoWhileStatement
  ): TSESTree.MemberExpression[] {
    const testMemberExpressions = mapExpression(node.test);
    const bodyMemberExpressions = mapStatement(node.body);

    return [...testMemberExpressions, ...bodyMemberExpressions];
  },
  [AST_NODE_TYPES.EmptyStatement]: EMPTY,
  [AST_NODE_TYPES.ExportAllDeclaration]: EMPTY,
  [AST_NODE_TYPES.ExportDefaultDeclaration]: EMPTY,
  [AST_NODE_TYPES.ExportNamedDeclaration]: EMPTY,
  [AST_NODE_TYPES.ExportSpecifier]: EMPTY,
  [AST_NODE_TYPES.ExpressionStatement]: function (
    node: TSESTree.ExpressionStatement
  ): TSESTree.MemberExpression[] {
    return mapExpression(node.expression);
  },
  [AST_NODE_TYPES.ForInStatement]: function (
    node: TSESTree.ForInStatement
  ): TSESTree.MemberExpression[] {
    const leftMemberExpressions = mapForInitialiser(node.left);
    const rightMemberExpressions = mapExpression(node.right);
    const bodyMemberExpressions = mapStatement(node.body);

    return [
      ...leftMemberExpressions,
      ...rightMemberExpressions,
      ...bodyMemberExpressions,
    ];
  },
  [AST_NODE_TYPES.ForOfStatement]: function (
    node: TSESTree.ForOfStatement
  ): TSESTree.MemberExpression[] {
    const leftMemberExpressions = mapForInitialiser(node.left);
    const rightMemberExpressions = mapExpression(node.right);
    const bodyMemberExpressions = mapStatement(node.body);

    return [
      ...leftMemberExpressions,
      ...rightMemberExpressions,
      ...bodyMemberExpressions,
    ];
  },
  [AST_NODE_TYPES.ForStatement]: function (
    node: TSESTree.ForStatement
  ): TSESTree.MemberExpression[] {
    // init: Expression | ForInitialiser | null;
    // test: Expression | null;
    // update: Expression | null;
    // body: Statement;
    const initMemberExpressions = mapForInitialiser(node.init);
    const testMemberExpressions = mapExpression(node.test);
    const updateMemberExpressions = mapExpression(node.update);
    const bodyMemberExpressions = mapStatement(node.body);

    return [
      ...initMemberExpressions,
      ...testMemberExpressions,
      ...updateMemberExpressions,
      ...bodyMemberExpressions,
    ];
  },
  [AST_NODE_TYPES.FunctionDeclaration]: function (
    node: TSESTree.FunctionDeclaration
  ): TSESTree.MemberExpression[] {
    return map[AST_NODE_TYPES.BlockStatement](node.body);
  },
  [AST_NODE_TYPES.FunctionExpression]: function (
    node: TSESTree.FunctionExpression
  ): TSESTree.MemberExpression[] {
    return map[AST_NODE_TYPES.BlockStatement](node.body);
  },
  [AST_NODE_TYPES.Identifier]: EMPTY,
  [AST_NODE_TYPES.IfStatement]: function (
    node: TSESTree.IfStatement
  ): TSESTree.MemberExpression[] {
    const testMemberExpressions = mapExpression(node.test);
    const consequentMemberExpressions = mapStatement(node.consequent);
    const alternateMemberExpressions = mapStatement(node.alternate);

    return [
      ...testMemberExpressions,
      ...consequentMemberExpressions,
      ...alternateMemberExpressions,
    ];
  },
  [AST_NODE_TYPES.ImportAttribute]: EMPTY,
  [AST_NODE_TYPES.ImportDeclaration]: EMPTY,
  [AST_NODE_TYPES.ImportDefaultSpecifier]: EMPTY,
  [AST_NODE_TYPES.ImportExpression]: function (
    node: TSESTree.ImportExpression
  ): TSESTree.MemberExpression[] {
    const sourceMemberExpressions = mapExpression(node.source);
    const attributesMemberExpressions = mapExpression(node.attributes);

    return [...sourceMemberExpressions, ...attributesMemberExpressions];
  },
  [AST_NODE_TYPES.ImportNamespaceSpecifier]: EMPTY,
  [AST_NODE_TYPES.ImportSpecifier]: EMPTY,
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
    return mapStatement(node.body);
  },
  [AST_NODE_TYPES.Literal]: function (
    node: TSESTree.Literal
  ): TSESTree.MemberExpression[] {
    return [];
  },
  [AST_NODE_TYPES.LogicalExpression]: function (
    node: TSESTree.LogicalExpression
  ): TSESTree.MemberExpression[] {
    const leftMemberExpressions = mapExpression(node.left);
    const rightMemberExpressions = mapExpression(node.right);

    return [...leftMemberExpressions, ...rightMemberExpressions];
  },
  [AST_NODE_TYPES.MemberExpression]: function (
    node: TSESTree.MemberExpression
  ): TSESTree.MemberExpression[] {
    return [node];
  },
  [AST_NODE_TYPES.MetaProperty]: EMPTY,
  [AST_NODE_TYPES.MethodDefinition]: function (
    node: TSESTree.MethodDefinition
  ): TSESTree.MemberExpression[] {
    // TODO: value: FunctionExpression | TSEmptyBodyFunctionExpression;
    // TODO: typeParameters?: TSTypeParameterDeclaration;

    const valueMemberExpressions = map[AST_NODE_TYPES.FunctionExpression](
      node.value as TSESTree.FunctionExpression
    );
    const decoratorsMemberExpressions = mapDecorators(node.decorators);

    return [...valueMemberExpressions, ...decoratorsMemberExpressions];
  },
  [AST_NODE_TYPES.NewExpression]: function (
    node: TSESTree.NewExpression
  ): TSESTree.MemberExpression[] {
    // TODO: typeParameters?: TSTypeParameterInstantiation;
    const calleeMemberExpressions = mapLeftHandSideExpression(node.callee);
    const argumentsMemberExpressions = mapCallExpressionArguments(
      node.arguments
    );

    return [...calleeMemberExpressions, ...argumentsMemberExpressions];
  },
  [AST_NODE_TYPES.ObjectExpression]: function (
    node: TSESTree.ObjectExpression
  ): TSESTree.MemberExpression[] {
    return mapObjectLiteralElements(node.properties);
  },
  [AST_NODE_TYPES.ObjectPattern]: function (
    node: TSESTree.ObjectPattern
  ): TSESTree.MemberExpression[] {
    // TODO: typeAnnotation?: TSTypeAnnotation;
    const properties = mapObjectPatternProperties(node.properties);
    const decoratorMemberExpressions = mapDecorators(node.decorators);

    return [...properties, ...decoratorMemberExpressions];
  },
  [AST_NODE_TYPES.PrivateIdentifier]: EMPTY,
  [AST_NODE_TYPES.Program]: function (
    node: TSESTree.Program
  ): TSESTree.MemberExpression[] {
    // TODO: node.body
    return mapStatements(node.body as TSESTree.Statement[]);
  },
  [AST_NODE_TYPES.Property]: function (
    node: TSESTree.Property
  ): TSESTree.MemberExpression[] {
    return mapPropertyValue(node.value);
  },
  [AST_NODE_TYPES.PropertyDefinition]: function (
    node: TSESTree.PropertyDefinition
  ): TSESTree.MemberExpression[] {
    // TODO: typeAnnotation?: TSTypeAnnotation;

    const value = mapExpression(node.value);
    const decorators = mapDecorators(node.decorators);

    return [...value, ...decorators];
  },
  [AST_NODE_TYPES.RestElement]: function (
    node: TSESTree.RestElement
  ): TSESTree.MemberExpression[] {
    // TODO: typeAnnotation?: TSTypeAnnotation;

    const valueMemberExpressions = node.value
      ? map[AST_NODE_TYPES.AssignmentPattern](node.value)
      : [];
    const argumentMemberExpressions = mapDestructuringPattern(node.argument);
    const decoratorMemberExpressions = mapDecorators(node.decorators);

    return [
      ...valueMemberExpressions,
      ...argumentMemberExpressions,
      ...decoratorMemberExpressions,
    ];
  },
  [AST_NODE_TYPES.ReturnStatement]: function (
    node: TSESTree.ReturnStatement
  ): TSESTree.MemberExpression[] {
    return mapExpression(node.argument);
  },
  [AST_NODE_TYPES.SequenceExpression]: function (
    node: TSESTree.SequenceExpression
  ): TSESTree.MemberExpression[] {
    return mapExpressions(node.expressions);
  },
  [AST_NODE_TYPES.SpreadElement]: function (
    node: TSESTree.SpreadElement
  ): TSESTree.MemberExpression[] {
    return mapExpression(node.argument);
  },
  [AST_NODE_TYPES.StaticBlock]: function (
    node: TSESTree.StaticBlock
  ): TSESTree.MemberExpression[] {
    return mapStatements(node.body);
  },
  [AST_NODE_TYPES.Super]: EMPTY,
  [AST_NODE_TYPES.SwitchCase]: function (
    node: TSESTree.SwitchCase
  ): TSESTree.MemberExpression[] {
    const testMemberExpressions = mapExpression(node.test);
    const consequentMemberExpressions = mapStatements(node.consequent);

    return [...testMemberExpressions, ...consequentMemberExpressions];
  },
  [AST_NODE_TYPES.SwitchStatement]: function (
    node: TSESTree.SwitchStatement
  ): TSESTree.MemberExpression[] {
    const discriminantMemberExpressions = mapExpression(node.discriminant);
    const caseMemberExpressions = node.cases
      .map((caseNode) => map[AST_NODE_TYPES.SwitchCase](caseNode))
      .flat();

    return [...discriminantMemberExpressions, ...caseMemberExpressions];
  },
  [AST_NODE_TYPES.TaggedTemplateExpression]: function (
    node: TSESTree.TaggedTemplateExpression
  ): TSESTree.MemberExpression[] {
    // TODO: typeParameters?: TSTypeParameterInstantiation;

    const tagMemberExpressions = mapLeftHandSideExpression(node.tag);
    const quasiMemberExpressions = map[AST_NODE_TYPES.TemplateLiteral](
      node.quasi
    );

    return [...tagMemberExpressions, ...quasiMemberExpressions];
  },
  [AST_NODE_TYPES.TemplateElement]: EMPTY,
  [AST_NODE_TYPES.TemplateLiteral]: function (
    node: TSESTree.TemplateLiteral
  ): TSESTree.MemberExpression[] {
    return mapExpressions(node.expressions);
  },
  [AST_NODE_TYPES.ThisExpression]: EMPTY,
  [AST_NODE_TYPES.ThrowStatement]: function (
    node: TSESTree.ThrowStatement
  ): TSESTree.MemberExpression[] {
    // TODO: argument: Statement | TSAsExpression | null;

    return mapStatement(node.argument as TSESTree.Statement | null);
  },
  [AST_NODE_TYPES.TryStatement]: function (
    node: TSESTree.TryStatement
  ): TSESTree.MemberExpression[] {
    const blockMemberExpressions = node.block
      ? map[AST_NODE_TYPES.BlockStatement](node.block)
      : [];
    const handlerMemberExpressions = node.handler
      ? map[AST_NODE_TYPES.CatchClause](node.handler)
      : [];
    const finalizerMemberExpressions = node.finalizer
      ? map[AST_NODE_TYPES.BlockStatement](node.finalizer)
      : [];

    return [
      ...blockMemberExpressions,
      ...handlerMemberExpressions,
      ...finalizerMemberExpressions,
    ];
  },
  [AST_NODE_TYPES.UnaryExpression]: function (
    node: TSESTree.UnaryExpression
  ): TSESTree.MemberExpression[] {
    return mapUnaryExpressionArgument(node.argument);
  },
  [AST_NODE_TYPES.UpdateExpression]: function (
    node: TSESTree.UpdateExpression
  ): TSESTree.MemberExpression[] {
    return mapUnaryExpressionArgument(node.argument);
  },
  [AST_NODE_TYPES.VariableDeclaration]: function (
    node: TSESTree.VariableDeclaration
  ): TSESTree.MemberExpression[] {
    return node.declarations
      .map((declaration) => map[AST_NODE_TYPES.VariableDeclarator](declaration))
      .flat();
  },
  [AST_NODE_TYPES.VariableDeclarator]: function (
    node: TSESTree.VariableDeclarator
  ): TSESTree.MemberExpression[] {
    const idMemberExpressions = mapBindingName(node.id);
    const initMemberExpressions = mapExpression(node.init);

    return [...idMemberExpressions, ...initMemberExpressions];
  },
  [AST_NODE_TYPES.WhileStatement]: function (
    node: TSESTree.WhileStatement
  ): TSESTree.MemberExpression[] {
    const testMemberExpressions = mapExpression(node.test);
    const bodyMemberExpressions = mapStatement(node.body);

    return [...testMemberExpressions, ...bodyMemberExpressions];
  },
  [AST_NODE_TYPES.WithStatement]: function (
    node: TSESTree.WithStatement
  ): TSESTree.MemberExpression[] {
    const objectMemberExpressions = mapExpression(node.object);
    const bodyMemberExpressions = mapStatement(node.body);

    return [...objectMemberExpressions, ...bodyMemberExpressions];
  },
  [AST_NODE_TYPES.YieldExpression]: function (
    node: TSESTree.YieldExpression
  ): TSESTree.MemberExpression[] {
    return mapExpression(node.argument);
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
  [AST_NODE_TYPES.TSTypeParameterInstantiation]: TS_EMPTY,
  [AST_NODE_TYPES.TSTypePredicate]: TS_EMPTY,
  [AST_NODE_TYPES.TSTypeQuery]: TS_EMPTY,
  [AST_NODE_TYPES.TSTypeReference]: TS_EMPTY,
  [AST_NODE_TYPES.TSUndefinedKeyword]: TS_EMPTY,
  [AST_NODE_TYPES.TSUnionType]: TS_EMPTY,
  [AST_NODE_TYPES.TSUnknownKeyword]: TS_EMPTY,
  [AST_NODE_TYPES.TSVoidKeyword]: TS_EMPTY,
} as const;
