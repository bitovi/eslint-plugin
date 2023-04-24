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
  // TSESLint
} from '@typescript-eslint/utils';

const message = `Setting Component members within the callback of a subscription is not suggested.

Consider using 'async' pipe to access value in template instead:

\`\`\`
<p>{{ {{ prop }} | async }}</p>
\`\`\`

https://angular.io/api/common/AsyncPipe#examples
`

// NOTE: The rule will be available in ESLint configs as "@nrwl/nx/workspace/no-bindings-in-rxjs-stream"
export const RULE_NAME = 'angular/no-bindings-in-rxjs-stream';

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
      bindedToComponent: message,
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      [AST_NODE_TYPES.AssignmentExpression]: function (
        node: TSESTree.AssignmentExpression
      ) {
        if (node.operator !== '=') {
          return;
        }

        const left = node.left;

        if (left.type !== AST_NODE_TYPES.MemberExpression) {
          return;
        }

        if (left.object.type !== AST_NODE_TYPES.ThisExpression) {
          return;
        }

        const subscription = nestedSearchFromParent(node, (parent) => {
          if (parent.type !== AST_NODE_TYPES.CallExpression) {
            return;
          }

          const callee = parent.callee;

          if (callee.type !== AST_NODE_TYPES.MemberExpression) {
            return;
          }

          if (callee.property.type !== AST_NODE_TYPES.Identifier) {
            return;
          }

          if (callee.property.name === 'subscribe') {
            return callee;
          }
        });

        if (subscription) {
          context.report({
            node,
            messageId: 'bindedToComponent',
            data: {
              prop: getPropertyName(subscription.object),
            }
          });
        }
      }
    };
  },
});

function nestedSearchFromParent<T extends TSESTree.Node>(node: TSESTree.Node, finder: (node: TSESTree.Node) => T | undefined): T | undefined {
  if (!node.parent) {
    return;
  }

  const result = finder(node.parent);

  if (result) {
    return result;
  }

  return nestedSearchFromParent(node.parent, finder);
}

function getPropertyName(node: TSESTree.LeftHandSideExpression) {
  if (node.type === AST_NODE_TYPES.Identifier) {
    return node.name;
  }

  return 'prop$';
}
