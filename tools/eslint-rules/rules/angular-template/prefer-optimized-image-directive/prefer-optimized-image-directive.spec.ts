import {
  RuleTester,
  convertAnnotatedSourceToFailureCase,
} from '@angular-eslint/utils';
import {
  MessageIds,
  rule,
  RULE_NAME,
} from './prefer-optimized-image-directive';

const ruleTester = new RuleTester({
  parser: '@angular-eslint/template-parser',
});

ruleTester.run<MessageIds, unknown[]>(RULE_NAME, rule, {
  valid: [
    {
      name: 'Should pass for any attribute that is NOT src',
      code: '<img prop="value">',
    },
    {
      name: 'Should pass for any Input bind that is NOT src',
      code: '<img [prop]="value">',
    },
  ],
  invalid: [
    convertAnnotatedSourceToFailureCase({
      description: 'Should report for src attribute',
      annotatedSource: `
      <img src="value">
           ~~~
      `,
      messageId: 'preferOptimizedImageDirective',
      annotatedOutput: `
      <img ngSrc="value">
           
      `,
    }),
    convertAnnotatedSourceToFailureCase({
      description: 'Should report for src Input bind',
      annotatedSource: `
      <img [src]="value">
            ~~~
      `,
      messageId: 'preferOptimizedImageDirective',
      annotatedOutput: `
      <img [ngSrc]="value">
            
      `,
    }),
  ],
});
