import { TSESLint } from '@typescript-eslint/utils';
import { rule, RULE_NAME } from './no-rxjs-internal-import';
import { convertAnnotatedSourceToFailureCase } from '@angular-eslint/utils';

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
    convertAnnotatedSourceToFailureCase({
      description:
        'Should fail when importing Observable class from rxjs/internal/Observable',
      annotatedSource: `
      import { Observable } from 'rxjs/internal/Observable';
                                 ~~~~~~~~~~~~~~~~~~~~~~~~~~
    `,
      messageId: 'rxjsInternalImport',
      annotatedOutput: `
      import { Observable } from 'rxjs';
                                 
    `,
    }),
    convertAnnotatedSourceToFailureCase({
      description:
        'Should fail when importing operators from rxjs/internal/operators/*',
      annotatedSource: `
      import { switchMap } from 'rxjs/internal/operators/switchMap';
                                ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    `,
      messageId: 'rxjsInternalImport',
      annotatedOutput: `
      import { switchMap } from 'rxjs/operators';
                                
    `,
    }),
    convertAnnotatedSourceToFailureCase({
      description:
        'Should fail when importing other utilies from their internal exports',
      annotatedSource: `
      import { ajax } from 'rxjs/internal/ajax/ajax';
                           ~~~~~~~~~~~~~~~~~~~~~~~~~
    `,
      messageId: 'rxjsInternalImport',
      annotatedOutput: `
      import { ajax } from 'rxjs/ajax';
                           
    `,
    }),
    convertAnnotatedSourceToFailureCase({
      description:
        'Should fail when importing other types from their internal exports',
      annotatedSource: `
      import { AjaxDirection } from 'rxjs/internal/ajax/types';
                                    ~~~~~~~~~~~~~~~~~~~~~~~~~~
    `,
      messageId: 'rxjsInternalImport',
      annotatedOutput: `
      import { AjaxDirection } from 'rxjs/ajax';
                                    
    `,
    }),
  ],
});
