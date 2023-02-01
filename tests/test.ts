
import { ESLintUtils } from '@typescript-eslint/utils';
import { hostListenerClickEventsHaveKeyEventsName, hostListenerClickEventsHaveKeyEventsRule } from '../src/rules/angular/host-listener-click-events-have-key-events';
import { hostListenerMouseEventsHaveKeyEventsName, hostListenerMouseEventsHaveKeyEventsRule } from '../src/rules/angular/host-listener-mouse-events-have-key-events';

const tester = new ESLintUtils.RuleTester({
  parser: '@typescript-eslint/parser',
});

tester.run(
  hostListenerClickEventsHaveKeyEventsName,
  hostListenerClickEventsHaveKeyEventsRule, {
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


tester.run(
  hostListenerMouseEventsHaveKeyEventsName,
  hostListenerMouseEventsHaveKeyEventsRule, {
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


