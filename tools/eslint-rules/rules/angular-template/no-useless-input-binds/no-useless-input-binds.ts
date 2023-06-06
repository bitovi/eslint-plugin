import { TmplAstBoundAttribute } from '@angular/compiler';
import { ESLintUtils } from '@typescript-eslint/utils';

export const RULE_NAME = 'angular-template/no-useless-input-binds';

export type Options = [];
export type MessageIds = 'noUselessInputBinds';

interface BoundAttributeWithLiteralPrimitive {
  value?: {
    // ASTWithSource
    ast?: {
      // ASTWithSource
      value: unknown;
    };
  };
}

export const rule = ESLintUtils.RuleCreator(() => __filename)<
  Options,
  MessageIds
>({
  name: RULE_NAME,
  meta: {
    fixable: 'code',
    type: 'problem',
    docs: {
      description: `Binding string literals to inputs can be simplified to just using an attribute`,
      recommended: 'error',
    },
    schema: [],
    messages: {
      noUselessInputBinds: `Unexpected input bind using string literal value`,
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      // Element$1:has(TextAttribute[name="ngSrc"])
      ['BoundAttribute[value.ast.type="LiteralPrimitive"]']: function (
        boundAttribute: TmplAstBoundAttribute
      ) {
        const {
          sourceSpan: { start, end },
        } = boundAttribute;

        // Type assertion is safe here since the selector validates that BoundAttribute has these properties
        const value = (boundAttribute as BoundAttributeWithLiteralPrimitive)
          ?.value?.ast?.value;

        if (typeof value !== 'string') {
          return;
        }

        context.report({
          loc: {
            start: {
              column: start.col,
              line: start.line + 1,
            },
            end: {
              column: end.col,
              line: end.line + 1,
            },
          },
          messageId: 'noUselessInputBinds',
          fix: (fixer) => {
            const boundAttributeText = context
              .getSourceCode()
              .text.substring(start.offset, end.offset);
            return fixer.replaceTextRange(
              [start.offset, end.offset],
              removeBoundingSyntax(boundAttributeText)
            );
          },
        });
      },
    };
  },
});

function removeBoundingSyntax(boundAttribute: string): string {
  const firstEqualSymbolIndex = boundAttribute.indexOf('=');

  const key = boundAttribute.substring(0, firstEqualSymbolIndex).trim();
  const value = boundAttribute.substring(firstEqualSymbolIndex + 1).trim();

  return `${removeFirstAndLastCharacter(key)}="${removeFirstAndLastCharacter(
    value,
    2
  )}"`;
}

function removeFirstAndLastCharacter(value: string, amount = 1): string {
  if (amount * 2 > value.length) {
    return '';
  }

  return value.substring(amount, value.length - amount);
}
