import { ESLintUtils } from '@typescript-eslint/utils';
import {
  MessageIds,
  rule,
  RULE_NAME,
} from './host-listener-click-events-have-key-events';

const ruleTester = new ESLintUtils.RuleTester({
  parser: '@typescript-eslint/parser',
});

ruleTester.run<MessageIds, unknown[]>(RULE_NAME, rule, {
  valid: [
    {
      code: `
      export class MyComponent {
        someMember = true;
        @HostListener('keydown') keyHandler() {}
        @HostListener('click') clickHandler() {}
      }
    `,
    },
    {
      code: `
      class MyComponent {
        @HostListener('keydown') keyHandler() {}
        @HostListener('click') clickHandler() {}
      }
    `,
    },
    {
      code: `
      class MyComponent {
        @HostListener('keyup') keyHandler() {}
        @HostListener('click') clickHandler() {}
      }
    `,
    },
    {
      code: `
      class MyComponent {
        @HostListener('keypress') keyHandler() {}
        @HostListener('click') clickHandler() {}
      }
    `,
    },
    {
      code: `
      class MyComponent {
        @HostListener('keydown') keyHandler = () => {};
        @HostListener('click') clickHandler() {}
      }
    `,
    },
    {
      code: `
      class MyComponent {
        // passing, but bad
        @HostListener('keydown') keyHandler = true;
        @HostListener('click') clickHandler() {}
      }
    `,
    },
  ],
  invalid: [
    {
      code: `
      class MyComponent {
        @HostListener('click') clickHandler() {}
      }
    `,
      errors: [
        {
          messageId: 'hostListenerClickEventsHaveKeyEvents',
        },
      ],
    },
  ],
});
