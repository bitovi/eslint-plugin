import { TSESLint } from '@typescript-eslint/utils';
import { rule, RULE_NAME } from './no-storing-this-reference';
import { convertAnnotatedSourceToFailureCase } from '@angular-eslint/utils';

const ruleTester = new TSESLint.RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
});

ruleTester.run(RULE_NAME, rule, {
  valid: [
    {
      name: "Should allow call expressions that don't include 'this'",
      code: `
      foo(that);
      `,
    },
    {
      name: "Should allow self-Invoking functions that don't include 'this'",
      code: `
      (function (that) {
        that.moo = 'cow';
      })(foo);
      `,
    },
    {
      name: "Should allow Object.assign don't include 'this'",
      code: `
      Object.assign(moo, cow);
      `,
    },
    {
      name: 'Should allow variable declarations involving object property',
      code: `
      const moo = this.cow;
      `,
    },
    {
      name: 'Should allow assignment expressions involving object property',
      code: `
      this.moo = this.cow;
      `,
    },
  ],
  invalid: [
    convertAnnotatedSourceToFailureCase({
      description:
        "Should report call expressions includes 'this' as first argument",
      annotatedSource: `
      foo(this);
          ~~~~
      `,
      messageId: 'moo',
    }),
    convertAnnotatedSourceToFailureCase({
      description:
        "Should report call expressions includes 'this' as any argument",
      annotatedSource: `
      foo(that, and, this);
                     ~~~~
      `,
      messageId: 'moo',
    }),
    convertAnnotatedSourceToFailureCase({
      description: "Should report if Object.assign is used to mutate 'this'",
      annotatedSource: `
      Object.assign(this, values);
                    ~~~~
      `,
      messageId: 'moo',
    }),
    convertAnnotatedSourceToFailureCase({
      description:
        "Should report if mutating 'this' using self-Invoking functions",
      annotatedSource: `
      (function (that) {
        that.moo = 'cow';
      })(this);
         ~~~~
      `,
      messageId: 'moo',
    }),
    convertAnnotatedSourceToFailureCase({
      description: "Should report if variable declarations involves 'this'",
      annotatedSource: `
      const moo = this;
                  ~~~~
      `,
      messageId: 'cow',
    }),
    convertAnnotatedSourceToFailureCase({
      description: "Should report if assignment expressions involves 'this'",
      annotatedSource: `
      this.moo = this;
                 ~~~~
      `,
      messageId: 'cow',
    }),
  ],
});
