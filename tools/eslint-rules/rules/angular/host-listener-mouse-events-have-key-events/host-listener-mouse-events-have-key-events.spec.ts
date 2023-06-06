import { ESLintUtils } from '@typescript-eslint/utils';
import {
  MessageIds,
  rule,
  RULE_NAME,
} from './host-listener-mouse-events-have-key-events';

const ruleTester = new ESLintUtils.RuleTester({
  parser: '@typescript-eslint/parser',
});

ruleTester.run<MessageIds, unknown[]>(RULE_NAME, rule, {
  valid: [
    {
      code: `
      class MyComponent {
        @HostListener('mouseout') keyHandler() {}
        @HostListener('blur') clickHandler() {}
      }
    `,
    },
    {
      code: `
      class MyComponent {
        @HostListener('mouseenter') keyHandler = () => {};
        @HostListener('focus') clickHandler() {}
      }
    `,
    },
  ],
  invalid: [
    {
      code: `
      class MyComponent {
        @HostListener('mouseout') clickHandler() {}
      }
    `,
      errors: [
        {
          messageId: 'hostListenerMouseEventsHaveKeyEvents',
        },
      ],
    },
    {
      code: `
      class MyComponent {
        @HostListener('mouseover') clickHandler() {}
      }
    `,
      errors: [
        {
          messageId: 'hostListenerMouseEventsHaveKeyEvents',
        },
      ],
    },
  ],
});
