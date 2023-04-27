import {
  RuleTester,
  convertAnnotatedSourceToFailureCase,
} from '@angular-eslint/utils';
import { MessageIds, rule, RULE_NAME } from './required-ng-src-attributes';

const ruleTester = new RuleTester({
  parser: '@angular-eslint/template-parser',
});

ruleTester.run<MessageIds, unknown[]>(RULE_NAME, rule, {
  valid: [
    {
      name: 'Should pass using an attribute that is not ngSrc directive',
      code: '<img src="cat.jpg">',
    },
    {
      name: 'Should pass using an Input bind that is not ngSrc directive',
      code: '<img [src]="catImage">',
    },
    {
      name: 'Should pass using ngSrc attribute if width and height is provided',
      code: '<img ngSrc="cat.jpg" width="400" height="200">',
    },
    {
      name: 'Should pass using ngSrc Input bind if width and height is provided',
      code: '<img [ngSrc]="catImage" width="400" height="200">',
    },
    {
      name: 'Should pass using ngSrc attribute if fill is provided',
      code: '<img ngSrc="cat.jpg" fill>',
    },
    {
      name: 'Should pass using ngSrc Input bind if fill is provided',
      code: '<img [ngSrc]="cat.jpg" fill>',
    },
  ],
  invalid: [
    convertAnnotatedSourceToFailureCase({
      description:
        'Should report if using ngSrc attribute with missing width/height or fill attribute',
      annotatedSource: `
      <img ngSrc="cat.jpg">
      ~~~~~~~~~~~~~~~~~~~~~
      `,
      messageId: 'missingRequiredNgSrcAttributes',
    }),
    convertAnnotatedSourceToFailureCase({
      description:
        'Should report if using ngSrc Input bind with missing width/height or fill attribute',
      annotatedSource: `
      <img [ngSrc]="cat.jpg">
      ~~~~~~~~~~~~~~~~~~~~~~~
      `,
      messageId: 'missingRequiredNgSrcAttributes',
    }),
    convertAnnotatedSourceToFailureCase({
      description:
        'Should report if using ngSrc attribute with missing height or fill attribute',
      annotatedSource: `
      <img ngSrc="cat.jpg" width="400">
      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      `,
      messageId: 'missingRequiredNgSrcAttributes',
    }),
    convertAnnotatedSourceToFailureCase({
      description:
        'Should report if using ngSrc Input bind with missing height or fill attribute',
      annotatedSource: `
      <img [ngSrc]="cat.jpg" width="400">
      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      `,
      messageId: 'missingRequiredNgSrcAttributes',
    }),
    convertAnnotatedSourceToFailureCase({
      description:
        'Should report if using ngSrc attribute with missing width or fill attribute',
      annotatedSource: `
      <img ngSrc="cat.jpg" height="400">
      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      `,
      messageId: 'missingRequiredNgSrcAttributes',
    }),
    convertAnnotatedSourceToFailureCase({
      description:
        'Should report if using ngSrc Input bind with missing width or fill attribute',
      annotatedSource: `
      <img [ngSrc]="cat.jpg" height="400">
      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      `,
      messageId: 'missingRequiredNgSrcAttributes',
    }),
  ],
});
