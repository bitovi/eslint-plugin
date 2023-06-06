import { ESLintUtils } from '@typescript-eslint/utils';
import { convertAnnotatedSourceToFailureCase } from '@angular-eslint/utils';
import { MessageIds, rule, RULE_NAME } from './event-emitter-has-output';

const ruleTester = new ESLintUtils.RuleTester({
  parser: '@typescript-eslint/parser',
});

ruleTester.run<MessageIds, unknown[]>(RULE_NAME, rule, {
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
    {
      code: `
      @Directive()
      class MyComponent {
        @Output() complete!: EventEmitter;
      }`,
    },
    // Okay since it doesn't have a Component or Directive decorator
    {
      code: `
      class MyUndecoratedComponent {
        @Input() event = new EventEmitter();
      }
      `,
    },
  ],
  invalid: [
    {
      code: `
      @Directive()
      class MyComponent {
        @Input() myInput: EventEmitter<MyEvent>;
      }`,
      errors: [{ messageId: 'eventEmitterHasOutput' }],
    },
    {
      code: `
      @Component()
      class MyComponent {
        myProperty: EventEmitter;
      }`,
      errors: [{ messageId: 'eventEmitterHasOutput' }],
    },
    {
      code: `
      @Component()
      class MyComponent {
        myProperty = new EventEmitter();
      }`,
      errors: [{ messageId: 'eventEmitterHasOutput' }],
    },
    convertAnnotatedSourceToFailureCase({
      description:
        'Should warn when property not decorated by @Output is assigned new EventEmitter value',
      annotatedSource: `
@Component()
class MyComponent {
  myProperty = new EventEmitter();
               ~~~~~~~~~~~~~~~~~~
}`,
      messageId: 'eventEmitterHasOutput',
      suggestions: [
        {
          messageId: 'addOutputDecoratorSuggestion',
          output: `
@Component()
class MyComponent {
  @Output() myProperty = new EventEmitter();
               
}`,
        },
      ],
    }),
    convertAnnotatedSourceToFailureCase({
      description:
        'Should warn when property not decorated by @Output has EventEmitter type annotation',
      annotatedSource: `
@Component()
class MyComponent {
  myProperty: EventEmitter<MyType>;
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}`,
      messageId: 'eventEmitterHasOutput',
      suggestions: [
        {
          messageId: 'addOutputDecoratorSuggestion',
          output: `
@Component()
class MyComponent {
  @Output() myProperty: EventEmitter<MyType>;
  
}`,
        },
      ],
    }),
  ],
});
