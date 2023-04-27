import {
  RuleTester,
  convertAnnotatedSourceToFailureCase,
} from '@angular-eslint/utils';
import { MessageIds, rule, RULE_NAME } from './no-useless-input-binds';

const ruleTester = new RuleTester({
  parser: '@angular-eslint/template-parser',
});

ruleTester.run<MessageIds, unknown[]>(RULE_NAME, rule, {
  valid: [
    {
      name: 'Should pass for attributes',
      code: '<app-input label="value"></app-input>',
    },
    {
      name: 'Should pass for any primative value that is NOT a string',
      code: '<app-input [label]="1"></app-input>',
    },
    {
      name: 'Should pass for binded properties',
      code: '<app-input [label]="value"></app-input>',
    },
  ],
  invalid: [
    convertAnnotatedSourceToFailureCase({
      description: 'Should report for binded string literals',
      annotatedSource: `
      <app-input [label]="'username'"></app-input>
                 ~~~~~~~~~~~~~~~~~~~~
      `,
      messageId: 'noUselessInputBinds',
      annotatedOutput: `
      <app-input label="username"></app-input>
                 
      `,
    }),
  ],
});
