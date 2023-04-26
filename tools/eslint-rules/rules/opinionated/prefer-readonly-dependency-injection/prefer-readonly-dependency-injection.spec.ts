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
      name: 'should pass for true',
      code: `
      @MyCustomDecorator()
      class MyClass {
        constructor(private http: HttpClient) {}
      }
      `,
    },
    {
      name: 'should pass for true 2',
      code: `
      @Directive()
      class MyDirective {
        constructor(private readonly http: HttpClient) {}
      }
      `,
    },
    {
      name: 'should pass for true 3',
      code: `
      @Component()
      class MyService {
        constructor(@Inject('token') readonly data) {}
      }
      `,
    },
    {
      name: 'should pass for true 4',
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
      description: 'should fail for false',
      annotatedSource: `
      @Component()
      class MyComponent {
        constructor(private http: HttpClient) {}
                    ~~~~~~~~~~~~~~~~~~~~~~~~
      }
      `,
      messageId: 'placeholder',
      annotatedOutput: `
      @Component()
      class MyComponent {
        constructor(private readonly http: HttpClient) {}
                    
      }
      `,
    }),
    convertAnnotatedSourceToFailureCase({
      description: 'should fail for false 2',
      annotatedSource: `
      @Pipe()
      class MyPipe {
        private http = inject(HttpClient);
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      }
      `,
      messageId: 'placeholder',
      annotatedOutput: `
      @Pipe()
      class MyPipe {
        private readonly http = inject(HttpClient);
        
      }
      `,
    }),
  ],
});
