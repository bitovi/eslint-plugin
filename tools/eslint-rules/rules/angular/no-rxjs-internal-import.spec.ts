import { TSESLint } from '@typescript-eslint/utils';
import { rule, RULE_NAME } from './no-rxjs-internal-import';

const ruleTester = new TSESLint.RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
});

ruleTester.run(RULE_NAME, rule, {
  valid: [
    `import { Observable } from 'rxjs';`,
    `import { switchMap } from 'rxjs';`,
    `import { switchMap } from 'rxjs/operators';`,
    `import { ajax } from 'rxjs/ajax';`,
    `import { AjaxDirection } from 'rxjs/ajax';`,
  ],
  invalid: [
    {
      code: `
      import { Observable } from 'rxjs/internal/Observable';
    `,
      errors: [
        {
          messageId: 'rxjsInternalImport',
        },
      ],
      output: `
      import { Observable } from 'rxjs';
    `,
    },
    {
      code: `
      import { switchMap } from 'rxjs/internal/operators/switchMap';
    `,
      errors: [
        {
          messageId: 'rxjsInternalImport',
        },
      ],
      output: `
      import { switchMap } from 'rxjs/operators';
    `,
    },
    {
      code: `
      import { ajax } from 'rxjs/internal/ajax/ajax';
    `,
      errors: [
        {
          messageId: 'rxjsInternalImport',
        },
      ],
      output: `
      import { ajax } from 'rxjs/ajax';
    `,
    },
    {
      code: `
      import { AjaxDirection } from 'rxjs/internal/ajax/types';
    `,
      errors: [
        {
          messageId: 'rxjsInternalImport',
        },
      ],
      output: `
      import { AjaxDirection } from 'rxjs/ajax';
    `,
    },
  ],
});
