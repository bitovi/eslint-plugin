import { ESLintUtils } from '@typescript-eslint/utils';
import { convertAnnotatedSourceToFailureCase } from '@angular-eslint/utils';
import {
  MessageIds,
  rule,
  RULE_NAME,
} from './prefer-readonly-dependency-injection';

const ruleTester = new ESLintUtils.RuleTester({
  parser: '@typescript-eslint/parser',
});

ruleTester.run<MessageIds, unknown[]>(RULE_NAME, rule, {
  valid: [
    {
      name: "Should pass for any class that doesn't use Angular's decorators",
      code: `
      @MyCustomDecorator()
      class MyClass {
        constructor(private http: HttpClient) {}
      }
      `,
    },
    {
      name: 'Should pass for dependency injection that uses readonly keyword that provides accessibility keyword',
      code: `
      @Directive()
      class MyDirective {
        constructor(private readonly http: HttpClient) {}
      }
      `,
    },
    {
      name: 'Should pass for dependency injection that uses readonly keyword that uses Inject decorator',
      code: `
      @Component()
      class MyService {
        constructor(@Inject('token') readonly data) {}
      }
      `,
    },
    {
      name: 'Should pass for any property that uses readonly keyword',
      code: `
      @Injectable()
      class MyService {
        readonly http = inject(HttpClient);
      }
      `,
    },
  ],
  invalid: [
    convertAnnotatedSourceToFailureCase({
      description:
        'Should fail for dependency injection that does NOT use readonly keyword',
      annotatedSource: `
      @Component()
      class MyComponent {
        constructor(private http: HttpClient) {}
                    ~~~~~~~~~~~~~~~~~~~~~~~~
      }
      `,
      messageId: 'missingReadonly',
      annotatedOutput: `
      @Component()
      class MyComponent {
        constructor(private readonly http: HttpClient) {}
                    
      }
      `,
    }),
    convertAnnotatedSourceToFailureCase({
      description:
        'Should fail for any property that references dependency injection that does NOT use readonly keyword',
      annotatedSource: `
      @Pipe()
      class MyPipe {
        private http = inject(HttpClient);
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      }
      `,
      messageId: 'missingReadonly',
      annotatedOutput: `
      @Pipe()
      class MyPipe {
        private readonly http = inject(HttpClient);
        
      }
      `,
    }),
  ],
});
