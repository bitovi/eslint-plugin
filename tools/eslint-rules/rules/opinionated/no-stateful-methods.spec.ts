import { TSESLint } from '@typescript-eslint/utils';
import { rule, RULE_NAME } from './no-stateful-methods';
import { convertAnnotatedSourceToFailureCase } from '@angular-eslint/utils';

const ruleTester = new TSESLint.RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
});

ruleTester.run(RULE_NAME, rule, {
  valid: [
    {
      name: 'Should allow setting members',
      code: `
      class Moo {
        moo = 'cow';
      }
      `,
    },
    {
      name: 'Should allow setting members in constructor',
      code: `
      class Moo {
        constructor() {
          this.moo = 'cow';
        }
      }
      `,
    },
    {
      name: 'Should allow setting variables',
      code: `
      class Moo {
        foo() {
          const moo = 'cow';
        }
      }
      `,
    },
    {
      name: 'Should allow setting variables to properties of class instance',
      code: `
      class Moo {
        cow = 'cow';
        foo() {
          const moo = this.cow;
        }
      }
      `,
    },
    {
      name: 'Should allow setting properties of new this context',
      code: `
      class Moo {
        cow = 'cow';
        foo() {
          function bar() {
            this.moo = 'cow';
          }
        }
      }
      `,
    },
    {
      name: 'Should allow whitelisted method names',
      options: [{ exceptions: ['ngOnInit', 'foo'] }],
      code: `
      class Moo {
        ngOnInit() {
          this.moo = 'cow';
        }
      }

      class Cow {
        foo() {
          this.moo = 'cow';
        }
      }
      `,
    },
  ],
  invalid: [
    convertAnnotatedSourceToFailureCase({
      description: 'Should report if setting property within class method',
      annotatedSource: `
      class Moo {
        foo() {
          this.moo = 'cow';
          ~~~~~~~~~~~~~~~~
        }
      }
      `,
      messageId: 'moo',
    }),
    convertAnnotatedSourceToFailureCase({
      description: 'Should report if setting property within arrow function',
      annotatedSource: `
      class Moo {
        foo() {
          const bar = () => {
            this.moo = 'cow';
            ~~~~~~~~~~~~~~~~
          }
        }
      }
      `,
      messageId: 'moo',
    }),
    convertAnnotatedSourceToFailureCase({
      description: 'Should report if setting nested property',
      annotatedSource: `
      class Moo {
        state = {};
        foo() {
          this.state.moo = 'cow';
          ~~~~~~~~~~~~~~~~~~~~~~
        }
      }
      `,
      messageId: 'moo',
    }),
  ],
});
