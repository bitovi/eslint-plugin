import { ESLintUtils } from '@typescript-eslint/utils';
import { MessageIds, rule, RULE_NAME } from './no-component-factory';

const ruleTester = new ESLintUtils.RuleTester({
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
});

ruleTester.run<MessageIds, unknown[]>(RULE_NAME, rule, {
  valid: [
    `
  import { ViewContainerRef, Type } from '@angular/core';

  @Component()
  class MyComponent {
    constructor(private vcRef: ViewContainerRef) {
      vcRef.createComponent({} as Type<MyComponent>);
    }
  }
  `,
  ],
  invalid: [
    {
      code: `
      import { ViewContainerRef, ComponentFactory } from '@angular/core';
      
      @Component()
      class MyComponent {
        constructor(private vcRef: ViewContainerRef) {
          vcRef.createComponent({} as ComponentFactory<MyComponent>);
        }
      }
      `,
      errors: [
        {
          messageId: 'noComponentFactory',
        },
      ],
      output: `
      import { ViewContainerRef, ComponentFactory } from '@angular/core';
      
      @Component()
      class MyComponent {
        constructor(private vcRef: ViewContainerRef) {
          vcRef.createComponent(MyComponent);
        }
      }
      `,
    },
  ],
});
