import { ESLintUtils } from '@typescript-eslint/utils';
import { rule, RULE_NAME } from './no-view-container-ref';

const ruleTester = new ESLintUtils.RuleTester({
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
});

ruleTester.run(RULE_NAME, rule, {
  valid: [
    `
  import { ViewContainerRef, Type } from '@angular/core';

  @Component()
  class MyComponent {}
  
  class Thing {
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
      class MyComponent {}

      class Thing {
        constructor(private vcRef: ViewContainerRef) {
          vcRef.createComponent({} as ComponentFactory<MyComponent>);
        }
      }
      `,
      errors: [
        {
          messageId: 'moo',
        },
      ],
      output: `
      import { ViewContainerRef, ComponentFactory } from '@angular/core';
      
      @Component()
      class MyComponent {}

      class Thing {
        constructor(private vcRef: ViewContainerRef) {
          vcRef.createComponent(MyComponent);
        }
      }
      `,
    },
  ],
});
