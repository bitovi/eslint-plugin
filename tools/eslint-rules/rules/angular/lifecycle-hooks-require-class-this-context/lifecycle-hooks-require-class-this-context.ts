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

import { ESLintUtils, TSESTree, TSESLint } from '@typescript-eslint/utils';

export const RULE_NAME = 'angular/lifecycle-hooks-require-class-this-context';

export type Options = [];
export type MessageIds = 'lifecycleHooksRequireClassThisContext';

const classDeclarationWithDirective = (regex: string) =>
  `ClassDeclaration:has(Decorator[expression.callee.name=${regex}])`;
const propertyDefinitionWithName = (regex: string) =>
  `PropertyDefinition[key.name=${regex}]`;
const componentOrDirectiveLifeCycle =
  '/^(ngOnChanges|ngOnInit|ngDoCheck|ngAfterContentInit|ngAfterContentChecked|ngAfterViewInit|ngAfterViewChecked|ngOnDestroy)$/';

const selectLifeCyclePropertyWithArrowFunctionExpression = (
  directiveRegex: string,
  lifecycleRegex: string
) =>
  `${classDeclarationWithDirective(
    directiveRegex
  )} > ClassBody > ${propertyDefinitionWithName(
    lifecycleRegex
  )}:has(ArrowFunctionExpression)`;

export const rule = ESLintUtils.RuleCreator(() => __filename)<
  Options,
  MessageIds
>({
  name: RULE_NAME,
  meta: {
    fixable: 'code',
    type: 'problem',
    docs: {
      description:
        'Lifecycle hooks must be methods and not arrow functions properties since lifecycle hooks require access to the "this" context of the class instance.',
      recommended: 'error',
    },
    schema: [],
    messages: {
      lifecycleHooksRequireClassThisContext:
        'The lifecycle hook {{ lifecycleHook }} cannot be an arrow funtion property and should be a method',
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      [`${selectLifeCyclePropertyWithArrowFunctionExpression(
        '/^(Component|Directive)$/',
        componentOrDirectiveLifeCycle
      )}, ${selectLifeCyclePropertyWithArrowFunctionExpression(
        '"Injectable"',
        '"ngOnDestroy"'
      )}`]: function (node: TSESTree.PropertyDefinition) {
        console.log(`${selectLifeCyclePropertyWithArrowFunctionExpression(
          '/^(Component|Directive)$/',
          componentOrDirectiveLifeCycle
        )},
        ${selectLifeCyclePropertyWithArrowFunctionExpression(
          '"Injectable"',
          '"ngOnDestroy"'
        )}`);
        context.report({
          node,
          messageId: 'lifecycleHooksRequireClassThisContext',
          fix: (fixer) => {
            return fixer.replaceText(
              node,
              getRemovedArrowNotation(
                getPropertyDefinitionAsString(context, node)
              )
            );
          },
          data: {
            // Type assertion should be valid because of selector requires name property
            lifecycleHook: (node.key as TSESTree.Identifier).name,
          },
        });
      },
    };
  },
});

function getPropertyDefinitionAsString<
  T extends string,
  V extends readonly unknown[]
>(
  context: Readonly<TSESLint.RuleContext<T, V>>,
  property: TSESTree.PropertyDefinition
): string {
  const sourceCode = context.getSourceCode();

  return sourceCode.getText(property);
}

function getRemovedArrowNotation(arrowFunctionProperty: string): string {
  return arrowFunctionProperty.replace(/\s*=\s/, '').replace(/\s*=>\s/, ' ');
}
