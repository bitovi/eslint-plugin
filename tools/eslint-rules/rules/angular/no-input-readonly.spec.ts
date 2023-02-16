import { convertAnnotatedSourceToFailureCase } from '@angular-eslint/utils';
import { TSESLint } from '@typescript-eslint/utils';
import { rule, RULE_NAME } from './no-input-readonly';

const ruleTester = new TSESLint.RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
});

ruleTester.run(RULE_NAME, rule, {
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
    }),
  ],
});
