import { convertAnnotatedSourceToFailureCase } from '@angular-eslint/utils';
import { ESLintUtils } from '@typescript-eslint/utils';
import { MessageIds, rule, RULE_NAME } from './on-changes-use-input-bind';

const ruleTester = new ESLintUtils.RuleTester({
  parser: '@typescript-eslint/parser',
});

ruleTester.run<MessageIds, unknown[]>(RULE_NAME, rule, {
  valid: [
    {
      code: `
      @Pipe({})
      class MyPipe {
        ngOnChanges(changes: SimpleChanges): void {
          changes['myInput'];
        }
      }
      `,
    },
    {
      code: `
      @Service({})
      class MyService {
        myInput!: any;
        ngOnChanges(changes: SimpleChanges): void {
          changes['myInput'];
        }
      }
      `,
    },
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
    {
      code: `
      @Component({})
      export class MyComponent {
        ngOnChanges(changes: SimpleChanges): void {
          // Reusing 'changes' in nested function is valid
          const test = function({ changes }) {
            const test = changes['prop'];
          }

          const test2 = function test({ ...changes }) {
            const test = changes['moo'];
          }
      
          const test3 = (...changes) => {
            const test = changes['moo'];
          }
        }
      }
      `,
    },
  ],
  invalid: [
    convertAnnotatedSourceToFailureCase({
      description: 'Should fail when Input bind is missing',
      annotatedSource: `
      @Component({})
      class MyComponent {
        prop = 50;

        ngOnChanges(changes: SimpleChanges): void {
          changes['prop'];
                  ~~~~~~
        }
      }
      `,
      messageId: 'simpleChangeExcludesInputBindProperty',
      annotatedOutput: `
      @Component({})
      class MyComponent {
        @Input() prop = 50;

        ngOnChanges(changes: SimpleChanges): void {
          changes['prop'];
                  
        }
      }
      `,
    }),
    convertAnnotatedSourceToFailureCase({
      description: 'Should fail when member is missing',
      annotatedSource: `
      @Component({})
      class MyComponent {
        ngOnChanges(changes: SimpleChanges): void {
          changes['prop'];
                  ~~~~~~
        }
      }
      `,
      messageId: 'simpleChangeExcludesProperty',
      annotatedOutput: `
      @Component({})
      class MyComponent {
        @Input() prop!: unknown;
        ngOnChanges(changes: SimpleChanges): void {
          changes['prop'];
                  
        }
      }
      `,
    }),
    convertAnnotatedSourceToFailureCase({
      description: 'Should fail even if mistake is within if statement',
      annotatedSource: `
      @Directive({})
      class MyDirective {
        ngOnChanges(changes: SimpleChanges): void {
          if (changes['prop']) {
                      ~~~~~~
            console.log('changed');
          }
        }
      }
      `,
      messageId: 'simpleChangeExcludesProperty',
      annotatedOutput: `
      @Directive({})
      class MyDirective {
        @Input() prop!: unknown;
        ngOnChanges(changes: SimpleChanges): void {
          if (changes['prop']) {
                      
            console.log('changed');
          }
        }
      }
      `,
    }),
  ],
});
