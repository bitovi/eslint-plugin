import { convertAnnotatedSourceToFailureCase } from '@angular-eslint/utils';
import { TSESLint } from '@typescript-eslint/utils';
import { rule, RULE_NAME } from './no-read-input-in-constructor';

const ruleTester = new TSESLint.RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
});

ruleTester.run(RULE_NAME, rule, {
  valid: [
    {
      name: 'should allow non-input values to be referenced in constructor',
      code: `
    @Component()
    class MyComponent {
      @Input() myInput!: string;
      nonInput!; string;

      constructor() {
        if(this.nonInput) {
          console.log('hi!');
        }
        const value = this.nonInput;
        this.nonInput = 'someValue';
      }
    }
    `,
    },
    // Avoid flagging members on the left-hand of an assignment
    // (a different rule should cover this, but it isn't in scope here since it doesn't involve reading)
    {
      name: 'should allow assigning to @Input() decorated members in constructor',
      code: `
      @Component()
      class MyComponent {
        @Input() myInput!: string;
        nonInput!; string;
  
        constructor() {
         this.myInput = this.nonInput;
        }
      }`,
    },
  ],
  invalid: [
    convertAnnotatedSourceToFailureCase({
      description:
        'should fail when accessing @Input decorated member within condition in constructor',
      annotatedSource: `
      @Component()
      class MyComponent {
        @Input() inputA!: boolean;
        myProp = 'x';

        constructor() {
          if(this.inputA) {
             ~~~~~~~~~~~
             this.myProp = 'other value';
          }
        }
      }
      `,
      messageId: 'noReadInputInConstructor',
    }),
    convertAnnotatedSourceToFailureCase({
      description:
        'should fail when reading @Input decorated member in constructor',
      annotatedSource: `
      @Component()
      class MyComponent {
        @Input() inputA!: boolean;
        myProp = 'x';

        constructor() {
          const temp = this.inputA;
                       ~~~~~~~~~~~
        }
      }
      `,
      messageId: 'noReadInputInConstructor',
    }),
  ],
});
