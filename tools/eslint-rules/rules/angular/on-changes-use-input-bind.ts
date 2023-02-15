/**
 * This file sets you up with structure needed for an ESLint rule.
 *
 * It leverages utilities from @typescript-eslint to allow TypeScript to
 * provide autocompletions etc for the configuration.
 *
 * Your rule's custom logic will live within the create() method below
 * and you can learn more about writing ESLint rules on the official guide:
 *
 * https://eslint.org/docs/developer-guide/working-with-rules
 *
 * You can also view many examples of existing rules here:
 *
 * https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin/src/rules
 */

import {
  ESLintUtils,
  AST_NODE_TYPES,
  TSESTree,
  TSESLint,
} from '@typescript-eslint/utils';
import { isCallableDecoratorWithName } from '../../utilities/left-land-side-expression/is-callable-decorator-with-name';
import { hasDecoratorWithName } from '../../utilities/class-declaration/has-decorator-with-name';
import { getMemberExpressionsFromNode } from '../../utilities/member-expression/get-member-expressions-from-node';

// NOTE: The rule will be available in ESLint configs as "@nrwl/nx/workspace/on-changes-use-input-bind"
export const RULE_NAME = 'angular/on-changes-use-input-bind';

export const rule = ESLintUtils.RuleCreator(
  () =>
    `https://github.com/bitovi/eslint-plugin/tree/main/tools/eslint-rules#readme`
)({
  name: RULE_NAME,
  meta: {
    fixable: 'code',
    type: 'problem',
    docs: {
      description: `OnChanges lifecycle hook is only called on data-bound properties.
      
      This requires using the Input bind directive on the member of a Component or Directive`,
      recommended: 'error',
    },
    schema: [],
    messages: {
      simpleChangeExcludesInputBindProperty:
        'OnChanges lifecycle hook requires property to use Input bind.',
      simpleChangeExcludesProperty:
        'OnChanges lifecycle hook requires property to exist and to use Input bind.',
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      [AST_NODE_TYPES.ClassDeclaration]: function (
        node: TSESTree.ClassDeclaration
      ) {
        // Confirm class is Component or Directive
        if (
          !['Component', 'Directive'].some((directiveName) =>
            hasDecoratorWithName(node, directiveName)
          )
        ) {
          return;
        }

        const body = node.body.body;

        // Find `ngOnChanges` method of Component or Directive class
        const ngOnChanges = body.find(
          (element): element is TSESTree.MethodDefinition => {
            if (element.type !== AST_NODE_TYPES.MethodDefinition) {
              return false;
            }

            return (
              element.key.type === AST_NODE_TYPES.Identifier &&
              element.key.name === 'ngOnChanges'
            );
          }
        );

        // Exit early if there is no `ngOnChanges` method
        if (!ngOnChanges) {
          return;
        }

        // Collect all members of class and store if it is an `Input` bind
        const propertyDefinitions = getPropertyDefinitions(body).reduce(
          (map, propertyDefinition) => {
            if (propertyDefinition.key.type === AST_NODE_TYPES.Identifier) {
              map[propertyDefinition.key.name] = {
                identifier: propertyDefinition.key,
                isInputBind: !!propertyDefinition.decorators?.some(
                  (decorator) =>
                    isCallableDecoratorWithName(decorator.expression, 'Input')
                ),
              };
            }

            return map;
          },
          {} as Record<
            string,
            {
              identifier: TSESTree.Identifier;
              isInputBind: boolean;
            }
          >
        );

        // Store ngOnChanges parameter name
        const [simpleChangesParam] = ngOnChanges.value.params;

        if (simpleChangesParam?.type !== AST_NODE_TYPES.Identifier) {
          return;
        }

        const blockStatement = ngOnChanges.value.body;

        if (blockStatement?.type !== AST_NODE_TYPES.BlockStatement) {
          return;
        }

        // Collect all MemberExpressions from body of `ngOnChanges`
        const memberExpressions = getMemberExpressionsFromNode(blockStatement);

        for (const memberExpression of memberExpressions) {
          const object = memberExpression.object;

          if (
            object.type !== AST_NODE_TYPES.Identifier ||
            object.name !== simpleChangesParam.name
          ) {
            continue;
          }

          const property = memberExpression.property;

          if (
            property.type !== AST_NODE_TYPES.Literal ||
            typeof property.value !== 'string'
          ) {
            continue;
          }

          const propertyDefinition = propertyDefinitions[property.value];

          // `MemberExpression` is `ngOnChanges` parameter
          // and value is a member of class with Input bind.
          if (propertyDefinition?.isInputBind) {
            continue;
          }

          // Report issue if `MemberExpression` is `ngOnChanges` parameter
          // and value isn't a class member.
          // Fix will add missing member with Input bind.
          if (!propertyDefinition) {
            context.report({
              node: property,
              messageId: 'simpleChangeExcludesProperty',
              fix(fixer) {
                // const startOfBody = node.body.range[0] + 1;
                // const firstElement = node.body.body[0].range[0];
                // // const spacing = context.getSourceCode().getText().substring(startOfBody, firstElement);
                return fixer.insertTextBefore(
                  node.body.body[0],
                  `@Input() ${property.value}!: unknown;${getIndentation(
                    context,
                    node.body.body[0]
                  )}`
                );
              },
            });
            return;
          }

          // Report issue if `MemberExpression` is `ngOnChanges` parameter
          // and the value checked is not an `Input` bind.
          // Fix will add missing Input bind.
          context.report({
            node: property,
            messageId: 'simpleChangeExcludesInputBindProperty',
            fix(fixer) {
              return fixer.insertTextBefore(
                propertyDefinition.identifier,
                '@Input() '
              );
            },
          });
        }
      },
    };
  },
});

/**
 * Gets whitespace of node up to newline (including newline)
 */
function getIndentation<T extends string, V extends readonly unknown[]>(
  context: Readonly<TSESLint.RuleContext<T, V>>,
  nodeOrToken: TSESTree.Node | TSESTree.Token
): string {
  const sourceCode = context.getSourceCode();

  const start = sourceCode.getTokenBefore(nodeOrToken)?.range[1] ?? 0;
  const end = nodeOrToken.range[0];

  const estimatedSpacing = sourceCode.getText().substring(start, end);

  const lines = estimatedSpacing.split('\n');

  if (lines.length === 1) {
    return lines[0];
  }

  return '\n' + lines[lines.length - 1];
}

/**
 * Return all members of a class
 */
function getPropertyDefinitions(
  elements: TSESTree.ClassElement[]
): TSESTree.PropertyDefinition[] {
  return elements.filter((element): element is TSESTree.PropertyDefinition => {
    return element.type === AST_NODE_TYPES.PropertyDefinition;
  });
}
