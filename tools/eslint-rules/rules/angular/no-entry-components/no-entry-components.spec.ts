import { ESLintUtils } from '@typescript-eslint/utils';
import { MessageIds, rule, RULE_NAME } from './no-entry-components';
import { convertAnnotatedSourceToFailureCase } from '@angular-eslint/utils';

const ruleTester = new ESLintUtils.RuleTester({
  parser: '@typescript-eslint/parser',
});

ruleTester.run<MessageIds, unknown[]>(RULE_NAME, rule, {
  valid: [
    `@NgModule()
    export class AppModule {}`,
    `@NgModule({})
    export class AppModule {}`,
    `@NgModule({
      declarations: [],
      imports: [],
      providers: [],
      bootstrap: [],
    })
    export class AppModule {}`,
    `@NgModule({
      declarations: [AppComponent, NxWelcomeComponent],
      imports: [BrowserModule],
      providers: [MyService],
      bootstrap: [AppComponent],
    })
    export class AppModule {}`,
  ],
  invalid: [
    convertAnnotatedSourceToFailureCase({
      description:
        'Should fail when NgModule metadata includes entryComponents property',
      annotatedSource: `
      @NgModule({
        declarations: [AppComponent, NxWelcomeComponent],
        imports: [BrowserModule],
        providers: [],
        bootstrap: [AppComponent],
        entryComponents: [DialogComponent]
        ~~~~~~~~~~~~~~~
      })
      export class AppModule {}
    `,
      messageId: 'moduleHasEntryComponents',
      annotatedOutput: `
      @NgModule({
        declarations: [AppComponent, NxWelcomeComponent],
        imports: [BrowserModule],
        providers: [],
        bootstrap: [AppComponent],
        
      })
      export class AppModule {}
    `,
    }),
    convertAnnotatedSourceToFailureCase({
      description:
        'Should remove entryComponents property, trailing comma, and unnecessary whitespace',
      annotatedSource: `
      @NgModule({
        declarations: [AppComponent, NxWelcomeComponent],
        imports: [BrowserModule],
        providers: [],
        bootstrap: [AppComponent],
        entryComponents: [DialogComponent],
        ~~~~~~~~~~~~~~~
      })
      export class MyModule {}
    `,
      messageId: 'moduleHasEntryComponents',
      annotatedOutput: `
      @NgModule({
        declarations: [AppComponent, NxWelcomeComponent],
        imports: [BrowserModule],
        providers: [],
        bootstrap: [AppComponent],
        
      })
      export class MyModule {}
    `,
    }),
    convertAnnotatedSourceToFailureCase({
      description:
        'Should remove entryComponents property even if its the only property',
      annotatedSource: `
      @NgModule({
        entryComponents: [DialogComponent]
        ~~~~~~~~~~~~~~~
      })
      export class EmptyModule {}
    `,
      messageId: 'moduleHasEntryComponents',
      annotatedOutput: `
      @NgModule({
        
      })
      export class EmptyModule {}
    `,
    }),
    convertAnnotatedSourceToFailureCase({
      description:
        'Should remove entryComponents property even if its the only property and its trailing comma',
      annotatedSource: `
      @NgModule({
        entryComponents: [DialogComponent],
        ~~~~~~~~~~~~~~~
      })
      export class EmptyModule {}
    `,
      messageId: 'moduleHasEntryComponents',
      annotatedOutput: `
      @NgModule({
        
      })
      export class EmptyModule {}
    `,
    }),
    convertAnnotatedSourceToFailureCase({
      description: 'Should remove inline entryComponents property',
      annotatedSource: `
      @NgModule({ entryComponents: [DialogComponent] })
                  ~~~~~~~~~~~~~~~
      export class EmptyModule {}
    `,
      messageId: 'moduleHasEntryComponents',
      annotatedOutput: `
      @NgModule({ })
                  
      export class EmptyModule {}
    `,
    }),
  ],
});
