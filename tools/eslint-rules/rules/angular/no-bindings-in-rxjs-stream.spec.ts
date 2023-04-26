import { TSESLint } from '@typescript-eslint/utils';
import { rule, RULE_NAME } from './no-bindings-in-rxjs-stream';
import { convertAnnotatedSourceToFailureCase } from '@angular-eslint/utils';

const ruleTester = new TSESLint.RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
});

ruleTester.run(RULE_NAME, rule, {
  valid: [
    `
    const moo = {};
    moo.cow();
    `,
    `
    const moo = {};
    moo.subscribe();
    `,
    `
    const moo = {};
    moo.subscribe((value) => {console.log(value)});
    `,
  ],
  invalid: [
    convertAnnotatedSourceToFailureCase({
      description:
        'Should fail when importing Observable class from rxjs/internal/Observable',
      annotatedSource: `
      const moo = {};
      moo.subscribe((value) => { this.value = value });
                                 ~~~~~~~~~~~~~~~~~~
    `,
      messageId: 'bindedToComponent',
      data: {
        prop: 'moo',
      },
    }),
  ],
});
