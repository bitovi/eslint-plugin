import { convertAnnotatedSourceToFailureCase } from '@angular-eslint/utils';
import { ESLintUtils } from '@typescript-eslint/utils';
import { MessageIds, rule, RULE_NAME } from './no-input-readonly';

const ruleTester = new ESLintUtils.RuleTester({
  parser: '@typescript-eslint/parser',
});

ruleTester.run<MessageIds, unknown[]>(RULE_NAME, rule, {
  valid: [
    {
      name: 'should pass for non-readonly input',
      code: `
    @Component()
    class MyComponent {
      @Input() userName!: string;
      @Input() color = 'red';
    }`,
    },
    {
      name: 'should pass when readonly is used in non-component or directive class',
      code: `
      @Fancy()
      class MyComponent {
        @Input() readonly neverGonnaChangeMe = 'hah';
      }`,
    },
  ],
  invalid: [
    convertAnnotatedSourceToFailureCase({
      description: 'should fail for readonly input',
      annotatedSource: `
      @Component()
      class MyComponent {
        @Input() readonly userName!: string;
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      }`,
      messageId: 'noInputReadonly',
      annotatedOutput: `
      @Component()
      class MyComponent {
        @Input() userName!: string;
        
      }`,
    }),
  ],
});
