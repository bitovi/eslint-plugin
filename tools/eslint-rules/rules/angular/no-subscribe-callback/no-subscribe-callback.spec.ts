import { ESLintUtils } from '@typescript-eslint/utils';
import { MessageIds, rule, RULE_NAME } from './no-subscribe-callback';
import { convertAnnotatedSourceToFailureCase } from '@angular-eslint/utils';

const ruleTester = new ESLintUtils.RuleTester({
  parser: '@typescript-eslint/parser',
});

ruleTester.run<MessageIds, unknown[]>(RULE_NAME, rule, {
  valid: [
    `
    const moo = {};
    moo.cow();
    `,
    `
    const moo = {};
    moo.subscribe();
    `,
  ],
  invalid: [
    convertAnnotatedSourceToFailureCase({
      description:
        'Should fail when importing Observable class from rxjs/internal/Observable',
      annotatedSource: `
      const moo = {};
      moo.subscribe(() => {/*...*/});
                    ~~~~~~~~~~~~~~~
    `,
      messageId: 'subscribeCallback',
      data: {
        prop: 'moo',
        callback: '() => {/*...*/}',
      },
    }),
  ],
});
