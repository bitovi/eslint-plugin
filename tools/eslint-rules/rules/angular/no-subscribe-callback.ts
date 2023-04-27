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
  TSESTree,
  AST_NODE_TYPES,
  TSESLint,
} from '@typescript-eslint/utils';

const message = `Using the subscribe callback is discouraged. There are better alternatives to utilize Observables.

1. Use 'async' pipe to access value in template:

\`\`\`
<p>{{ {{ prop }} | async }}</p>
\`\`\`

https://angular.io/api/common/AsyncPipe#examples

2. Use 'tap' operator to run side-effects:

\`\`\`
{{ prop }}.pipe(
  tap({{ callback }})
).subscribe();
\`\`\`

https://rxjs.dev/api/operators/tap
`;

// NOTE: The rule will be available in ESLint configs as "@nrwl/nx/workspace/no-subscribe-callback"
export const RULE_NAME = 'angular/no-subscribe-callback';

export const rule = ESLintUtils.RuleCreator(() => __filename)({
  name: RULE_NAME,
  meta: {
    type: 'problem',
    docs: {
      description: ``,
      recommended: 'error',
    },
    schema: [],
    messages: {
      subscribeCallback: message,
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      [AST_NODE_TYPES.MemberExpression]: function (
        node: TSESTree.MemberExpression
      ) {
        const identifer = node.property;

        if (
          identifer.type !== AST_NODE_TYPES.Identifier ||
          identifer.name !== 'subscribe'
        ) {
          return;
        }

        const callback = getFirstArgument(node);

        if (callback) {
          context.report({
            node: callback,
            messageId: 'subscribeCallback',
            data: {
              prop: getPropertyName(node.object),
              callback: getCallbackAsString(context, callback),
            },
          });
        }
      },
    };
  },
});

function getPropertyName(node: TSESTree.LeftHandSideExpression) {
  if (node.type === AST_NODE_TYPES.Identifier) {
    return node.name;
  }

  return 'prop$';
}

function getFirstArgument(
  node: TSESTree.Node
): TSESTree.CallExpressionArgument | undefined {
  const parent = node.parent;

  if (parent?.type === AST_NODE_TYPES.CallExpression) {
    return parent.arguments[0];
  }

  return undefined;
}

function getCallbackAsString<T extends string, V extends readonly unknown[]>(
  context: Readonly<TSESLint.RuleContext<T, V>>,
  callback: TSESTree.CallExpressionArgument
): string {
  const sourceCode = context.getSourceCode();

  return sourceCode.getText(callback);
}
