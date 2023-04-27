import { ESLintUtils } from '@typescript-eslint/utils';
import { convertAnnotatedSourceToFailureCase } from '@angular-eslint/utils';
import {
  MessageIds,
  rule,
  RULE_NAME,
} from './lifecycle-hooks-require-class-this-context';

const ruleTester = new ESLintUtils.RuleTester({
  parser: '@typescript-eslint/parser',
});

ruleTester.run<MessageIds, unknown[]>(RULE_NAME, rule, {
  valid: [
    {
      name: 'Should pass for lifecycle hooks that are methods for components',
      code: `
      @Component()
      class MyComponent {
        ngOnInit(): void {/* ... */}
      }
      `,
    },
    {
      name: 'Should pass for lifecycle hooks that are methods for directives',
      code: `
      @Directive()
      class MyDirective {
        ngAfterViewInit(): void {/* ... */}
      }
      `,
    },
    {
      name: 'Should pass for lifecycle hooks that are methods for services',
      code: `
      @Injectable()
      class MyService {
        ngOnDestroy(): void {/* ... */}
      }
      `,
    },
    {
      name: 'Should pass arrow function properties of classes with custom directives',
      code: `
      @MyDecorator()
      class MyComponent {
        ngOnInit = (): void => {/* ... */}
      }
      `,
    },
  ],
  invalid: [
    convertAnnotatedSourceToFailureCase({
      description:
        'Should report for lifecycle hooks that are arrow function properties of a component',
      annotatedSource: `
      @Component()
      class MyComponent {
        ngOnChanges = (changes: SimpleChanges): void => {/* ... */}
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      }
      `,
      annotatedOutput: `
      @Component()
      class MyComponent {
        ngOnChanges(changes: SimpleChanges): void {/* ... */}
        
      }
      `,
      data: {
        lifecycleHook: 'ngOnChanges',
      },
      messageId: 'lifecycleHooksRequireClassThisContext',
    }),
    convertAnnotatedSourceToFailureCase({
      description:
        'Should report for lifecycle hooks that are arrow function properties of a directive',
      annotatedSource: `
      @Directive()
      class MyDirective {
        ngDoCheck = (): void => {/* ... */}
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      }
      `,
      annotatedOutput: `
      @Directive()
      class MyDirective {
        ngDoCheck(): void {/* ... */}
        
      }
      `,
      data: {
        lifecycleHook: 'ngDoCheck',
      },
      messageId: 'lifecycleHooksRequireClassThisContext',
    }),
    convertAnnotatedSourceToFailureCase({
      description:
        'Should report for lifecycle hooks that are arrow function properties of a service',
      annotatedSource: `
      @Injectable()
      class MyService {
        ngOnDestroy = (): void => {/* ... */}
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      }
      `,
      annotatedOutput: `
      @Injectable()
      class MyService {
        ngOnDestroy(): void {/* ... */}
        
      }
      `,
      data: {
        lifecycleHook: 'ngOnDestroy',
      },
      messageId: 'lifecycleHooksRequireClassThisContext',
    }),
  ],
});
