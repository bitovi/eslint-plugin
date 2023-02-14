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

import {
  variableDeclaratorIsArrayType,
  variableDeclaratorIsType,
} from '../../utilities/variable-declarator';
import { getObjectExpressionProperty } from '../../utilities/object-expression';

// NOTE: The rule will be available in ESLint configs as "@nrwl/nx/workspace/seo-friendly-route-path"
export const RULE_NAME = 'angular/seo-friendly-route-path';

export const rule = ESLintUtils.RuleCreator(() => __filename)({
  name: RULE_NAME,
  meta: {
    type: 'suggestion',
    fixable: 'code',
    docs: {
      description: `SEO Friendly URLs should common all lowercase alphanumerics separated by forward slash ('/') or hyphens ('-')`,
      recommended: 'error',
    },
    schema: [],
    messages: {
      routePathIsNotSeoFriendly:
        "SEO Friendly URLs should common all lowercase alphanumerics separated by forward slash ('/') or hyphens ('-')",
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      [AST_NODE_TYPES.VariableDeclarator]: function (
        node: TSESTree.VariableDeclarator
      ) {
        if (
          !variableDeclaratorIsType(node, 'Routes') &&
          !variableDeclaratorIsArrayType(node, 'Route')
        ) {
          return;
        }

        const init = node.init;

        if (init?.type !== AST_NODE_TYPES.ArrayExpression) {
          return;
        }

        reportRoutePaths(context, init.elements, 'routePathIsNotSeoFriendly');
      },
      [AST_NODE_TYPES.ExpressionStatement]: function (
        node: TSESTree.ExpressionStatement
      ) {
        const expression = node.expression;

        if (expression.type !== AST_NODE_TYPES.CallExpression) {
          return;
        }

        const callee = expression.callee;

        if (callee.type !== AST_NODE_TYPES.MemberExpression) {
          return;
        }

        const objectIdentifer = callee.object;

        if (
          objectIdentifer.type !== AST_NODE_TYPES.Identifier ||
          objectIdentifer.name !== 'RouterModule'
        ) {
          return;
        }

        const property = callee.property;

        if (property.type !== AST_NODE_TYPES.Identifier) {
          return;
        }

        if (!['forRoot', 'forChild'].some((name) => property.name === name)) {
          return;
        }

        // Routes is always the first argument when using RouterModule
        const [routesArg] = expression.arguments;

        if (routesArg?.type !== AST_NODE_TYPES.ArrayExpression) {
          return;
        }

        reportRoutePaths(
          context,
          routesArg.elements,
          'routePathIsNotSeoFriendly'
        );
      },
    };
  },
});

/**
 * Reports every `ObjectExpression` element that has property
 * with name `path` that isn't slugified.
 */
function reportRoutePaths<T extends string, V extends readonly unknown[]>(
  context: Readonly<TSESLint.RuleContext<T, V>>,
  elements: (TSESTree.SpreadElement | TSESTree.Expression)[],
  messageId: T
): void {
  for (const element of elements) {
    if (element.type !== AST_NODE_TYPES.ObjectExpression) {
      continue;
    }

    const path = getObjectExpressionProperty(element, 'path');

    const literal = path?.value;

    if (
      literal?.type !== AST_NODE_TYPES.Literal ||
      typeof literal.value !== 'string'
    ) {
      continue;
    }

    // Skip if path is wildcard
    if (literal.value === '**') {
      continue;
    }

    const slug = slugify(literal.value);

    if (literal.value !== slug) {
      context.report({
        node: literal,
        messageId,
        fix(fixer) {
          return fixer.replaceText(literal, `'${slug}'`);
        },
      });
    }
  }
}

/**
 * Returns slugified string where all characters are
 *
 * 1. lowercased
 * 2. special characters are removed
 * 3. spaces, hyphens, and underscores are replaced with some `spaceChar`
 */
function slugify(value: string, spaceChar = '-'): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-/:]/g, '')
    .replace(/[\s_-]+/g, spaceChar)
    .replace(/^-+|-+$/g, '');
}
