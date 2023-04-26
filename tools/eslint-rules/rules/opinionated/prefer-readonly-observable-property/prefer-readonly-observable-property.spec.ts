import { ESLintUtils } from '@typescript-eslint/utils';
import { convertAnnotatedSourceToFailureCase } from '@angular-eslint/utils';
import {
  MessageIds,
  rule,
  RULE_NAME,
} from './prefer-readonly-observable-property';

const ruleTester = new ESLintUtils.RuleTester({
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
});

ruleTester.run<MessageIds, unknown[]>(RULE_NAME, rule, {
  valid: [
    {
      name: 'should pass for true',
      code: `
      import { Observable } from 'rxjs';

      class MyClass {
        readonly moo = new Observable<string>();
      }
      `,
    },
    {
      name: 'should pass for true',
      code: `
      import { Observable } from 'rxjs';

      class MyClass {
        moo = 'value';
      }
      `,
    },
  ],
  invalid: [
    convertAnnotatedSourceToFailureCase({
      description: 'should fail for false',
      annotatedSource: `
      import { Observable } from 'rxjs';

      class MyClass {
        moo = new Observable<string>();
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      }
      `,
      messageId: 'missingReadonly',
      annotatedOutput: `
      import { Observable } from 'rxjs';

      class MyClass {
        readonly moo = new Observable<string>();
        
      }
      `,
    }),
    convertAnnotatedSourceToFailureCase({
      description: 'should fail for false 2',
      annotatedSource: `
      import { Subject } from 'rxjs';

      class MyClass {
        moo = new Subject<boolean>();
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      }
      `,
      messageId: 'missingReadonly',
      annotatedOutput: `
      import { Subject } from 'rxjs';

      class MyClass {
        readonly moo = new Subject<boolean>();
        
      }
      `,
    }),
  ],
});
