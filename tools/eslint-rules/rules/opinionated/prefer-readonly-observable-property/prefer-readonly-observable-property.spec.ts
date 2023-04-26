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
      name: 'Should pass for properties with readonly property',
      code: `
      import { Observable } from 'rxjs';

      class MyClass {
        readonly moo = new Observable<string>();
      }
      `,
    },
    {
      name: 'Should pass for properties that do NOT reference an Observable',
      code: `
      import { Observable } from 'rxjs';

      class MyClass {
        moo = 'value';
      }
      `,
    },
    {
      name: 'Should pass for readonly properties with name that ends with $',
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
      description:
        'Should report for non-readonly properties that reference an Observable',
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
      description:
        'Should report for non-readonly properties that reference an rxjs classes that extend Observable',
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
    convertAnnotatedSourceToFailureCase({
      description:
        'Should report for non-readonly properties with name that ends with $',
      annotatedSource: `
      import { Subject } from 'rxjs';

      class MyClass {
        moo$ = new MyObs();
        ~~~~~~~~~~~~~~~~~~~
      }
      `,
      messageId: 'missingReadonly',
      annotatedOutput: `
      import { Subject } from 'rxjs';

      class MyClass {
        readonly moo$ = new MyObs();
        
      }
      `,
    }),
  ],
});
