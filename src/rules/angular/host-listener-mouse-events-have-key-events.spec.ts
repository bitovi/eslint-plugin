import { ESLintUtils } from '@typescript-eslint/utils';
import { RULE_NAME, rule } from './host-listener-mouse-events-have-key-events';

const tester = new ESLintUtils.RuleTester({
  parser: '@typescript-eslint/parser',
});


tester.run(
  RULE_NAME,
  rule, {
  valid: [
    {
      code: `
      class MyComponent {
        @HostListener('mouseout') keyHandler() {}
        @HostListener('blur') clickHandler() {}
      }
    `
    },
    {
      code: `
      class MyComponent {
        @HostListener('mouseenter') keyHandler = () => {};
        @HostListener('focus') clickHandler() {}
      }
    `
    },
    {
      code: `
      class MyComponent {
        @HostListener('mouseout') keyHandler() {}
        @HostListener('blur') clickHandler() {}
      }
    `
    }
  ],
  invalid: [
    {
      code: `
      class MyComponent {
        @HostListener('mouseout') clickHandler() {}
      }
    `, errors: [
        {
          messageId: 'hostListenerMouseEventsHaveKeyEvents'
        }
      ]
    },
    {
      code: `
      class MyComponent {
        @HostListener('mouseover') clickHandler() {}
      }
    `, errors: [
        {
          messageId: 'hostListenerMouseEventsHaveKeyEvents'
        }
      ]
    }
  ]
})


