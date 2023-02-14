import { convertAnnotatedSourceToFailureCase } from '@angular-eslint/utils';
import { TSESLint } from '@typescript-eslint/utils';
import { rule, RULE_NAME } from './on-changes-use-input-bind';

const ruleTester = new TSESLint.RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
});

ruleTester.run(RULE_NAME, rule, {
  valid: [
    {
      code: `
      @Component({})
      class MyComponent {
        @Input() myInput!: number;

        ngOnChanges(changes: SimpleChanges): void {
          changes['myInput'];
        }
      }
      `,
    },
  ],
  invalid: [
    convertAnnotatedSourceToFailureCase({
      description: 'Should fail when ...',
      annotatedSource: `
      @Component({})
      class MyComponent {
        @Input() myInput!: number;

        ngOnChanges(changes: SimpleChanges): void {
          changes['moo'];
                  ~~~~~
        }
      }
    `,
      messageId: 'simpleChangeExcludesInputBindProperty',
      //   annotatedOutput: `
      //   @Component({})
      //   class MyComponent {
      //     @Input() myInput!: number;

      //     ngOnChanges(changes: SimpleChanges): void {
      //       changes['moo'];

      //     }
      //   }
      // `,
    }),
  ],
});
