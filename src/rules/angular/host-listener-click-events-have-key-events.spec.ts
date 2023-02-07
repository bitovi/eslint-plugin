
import { ESLintUtils } from '@typescript-eslint/utils';
import { RULE_NAME, rule } from './host-listener-click-events-have-key-events';


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
        @HostListener('keydown') keyHandler() {}
        @HostListener('click') clickHandler() {}
      }
    `
    },
    {
      code: `
      class MyComponent {
        @HostListener('keyup') keyHandler() {}
        @HostListener('click') clickHandler() {}
      }
    `
    },
    {
      code: `
      class MyComponent {
        @HostListener('keypress') keyHandler() {}
        @HostListener('click') clickHandler() {}
      }
    `
    },
    {
      code: `
      class MyComponent {
        @HostListener('keydown') keyHandler = () => {};
        @HostListener('click') clickHandler() {}
      }
    `
    },
    {
      code: `
      class MyComponent {
        // passing, but bad
        @HostListener('keydown') keyHandler = true;
        @HostListener('click') clickHandler() {}
      }
    `
    }
  ],
  invalid: [
    {
      code: `
      class MyComponent {
        @HostListener('click') clickHandler() {}
      }
    `, errors: [
        {
          messageId: 'hostListenerClickEventsHaveKeyEvents'
        }
      ]
    }
  ]
});

