import { TSESLint } from '@typescript-eslint/utils';
import { rule, RULE_NAME } from './event-emitter-has-output';

const ruleTester = new TSESLint.RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
});

ruleTester.run(RULE_NAME, rule, {
  valid: [
    {
      code: `
      @Component()
      class MyComponent {
        @Output() complete = new EventEmitter();
      }`,
    },
    {
      code: `
      @Component()
      class MyComponent {
        @Output() complete!: EventEmitter;
      }`,
    },
  ],
  invalid: [
    {
      code: `class MyComponent {
        @Input() myInput: EventEmitter<MyEvent>;
      }`,
      errors: [{ messageId: 'eventEmitterHasOutput' }],
    },
    {
      code: `class MyComponent {
        myProperty: EventEmitter;
      }`,
      errors: [{ messageId: 'eventEmitterHasOutput' }],
    },
    {
      code: `class MyComponent {
        myProperty = new EventEmitter();
      }`,
      errors: [{ messageId: 'eventEmitterHasOutput' }],
    },
  ],
});
