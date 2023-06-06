import { convertAnnotatedSourceToFailureCase } from '@angular-eslint/utils';
import { ESLintUtils } from '@typescript-eslint/utils';
import { MessageIds, rule, RULE_NAME } from './host-listener-on-method';

const ruleTester = new ESLintUtils.RuleTester({
  parser: '@typescript-eslint/parser',
});

ruleTester.run<MessageIds, unknown[]>(RULE_NAME, rule, {
  valid: [
    {
      name: 'should be allowed on method definitions',
      code: `
      @Component()
      class MyComponent {
        @HostListener('click')
        handleClick(): void { }
      }`,
    },
    {
      name: 'should be allowed on members assigned to arrow functions',
      code: `
      @Component()
      class MyComponent {
        @HostListener('click') clickHandler = () => {};
      }`,
    },
    {
      name: 'should be allowed on members assigned to function expressions',
      code: `
      @Component()
      class MyComponent {
        @HostListener('click') clickHandler = function() {};
      }`,
    },
  ],
  invalid: [
    {
      name: 'should error when decorator is used on member with no value',
      code: `
      @Component()
      class MyComponent {
        @HostListener('click') clickHandler!: () => void;
      }`,
      errors: [{ messageId: 'hostListenerOnMethod' }],
    },
    convertAnnotatedSourceToFailureCase({
      description: 'Should warn when decorator is used on non-function member',
      annotatedSource: `
@Component()
class MyComponent {
  @HostListener('click')
  ~~~~~~~~~~~~~~~~~~~~~~
  myProperty = true;
}`,
      messageId: 'hostListenerOnMethod',
    }),
  ],
});
