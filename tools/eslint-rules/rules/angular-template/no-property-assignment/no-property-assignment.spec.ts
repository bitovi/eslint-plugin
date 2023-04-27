import { RuleTester } from '@angular-eslint/utils';
import { convertAnnotatedSourceToFailureCase } from '@angular-eslint/utils';
import { MessageIds, rule, RULE_NAME } from './no-property-assignment';

const ruleTester = new RuleTester({
  parser: '@angular-eslint/template-parser',
});

ruleTester.run<MessageIds, unknown[]>(RULE_NAME, rule, {
  valid: [
    {
      name: 'Should pass if no property assignment',
      code: '<div (click)="moo()"></div>',
    },
  ],
  invalid: [
    convertAnnotatedSourceToFailureCase({
      description: 'Should report if property assignment',
      annotatedSource: `
      <div (click)="moo = cow"></div>
                    ~~~~~~~~~
      `,
      messageId: 'noPropertyAssignment',
    }),
    convertAnnotatedSourceToFailureCase({
      description: 'Should report if nested property assignment',
      annotatedSource: `
      <div (click)="moo.milk = cow"></div>
                    ~~~~~~~~~~~~~~
      `,
      messageId: 'noPropertyAssignment',
    }),
  ],
});
