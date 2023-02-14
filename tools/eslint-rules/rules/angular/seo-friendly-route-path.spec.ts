import { convertAnnotatedSourceToFailureCase } from '@angular-eslint/utils';
import { TSESLint } from '@typescript-eslint/utils';
import { rule, RULE_NAME } from './seo-friendly-route-path';

const ruleTester = new TSESLint.RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
});

ruleTester.run(RULE_NAME, rule, {
  valid: [
    `const routes: Routes = [{ path: 'cow' }];`,
    `const routes: Routes = [{ path: '**' }];`,
    `const routes: Routes = [{ }];`,
    `const routes: Routes = [{ matcher: (path: string) => {return { path }} }];`,
    `const routes = [{ path: 'first second third' }];`,
    `const routes: Routes[] = [{ path: 'first second third' }];`,
    `const routes: MyRoute[] = [{ path: 'first second third' }];`,
  ],
  invalid: [
    convertAnnotatedSourceToFailureCase({
      description: 'Should fail when path includes uppercase characters',
      annotatedSource: `
      const routes: Routes = [{ path: 'first/Second/Third' }];
                                      ~~~~~~~~~~~~~~~~~~~~
    `,
      messageId: 'routePathIsNotSeoFriendly',
      annotatedOutput: `
      const routes: Routes = [{ path: 'first/second/third' }];
                                      
    `,
    }),
    convertAnnotatedSourceToFailureCase({
      description: 'Should fail when path is not slugified and type Route[]',
      annotatedSource: `
      const routes: Route[] = [{ path: 'first/Second/Third' }];
                                       ~~~~~~~~~~~~~~~~~~~~
    `,
      messageId: 'routePathIsNotSeoFriendly',
      annotatedOutput: `
      const routes: Route[] = [{ path: 'first/second/third' }];
                                       
    `,
    }),
    convertAnnotatedSourceToFailureCase({
      description:
        'Should fail when path is not slugified and used with RouterModule.forRoot',
      annotatedSource: `
      RouterModule.forRoot([{ path: 'first/Second/Third' }]);
                                    ~~~~~~~~~~~~~~~~~~~~
    `,
      messageId: 'routePathIsNotSeoFriendly',
      annotatedOutput: `
      RouterModule.forRoot([{ path: 'first/second/third' }]);
                                    
    `,
    }),
    convertAnnotatedSourceToFailureCase({
      description:
        'Should fail when path is not slugified and used with RouterModule.forChild',
      annotatedSource: `
      RouterModule.forChild([{ path: 'first/Second/Third' }]);
                                     ~~~~~~~~~~~~~~~~~~~~
    `,
      messageId: 'routePathIsNotSeoFriendly',
      annotatedOutput: `
      RouterModule.forChild([{ path: 'first/second/third' }]);
                                     
    `,
    }),
    convertAnnotatedSourceToFailureCase({
      description:
        'Should fail when path includes (unexpected) special characters',
      annotatedSource: `
      const routes: Routes = [{ path: 'firs$t/second#third' }];
                                      ~~~~~~~~~~~~~~~~~~~~~
    `,
      messageId: 'routePathIsNotSeoFriendly',
      annotatedOutput: `
      const routes: Routes = [{ path: 'first/secondthird' }];
                                      
    `,
    }),
    convertAnnotatedSourceToFailureCase({
      description: 'Should fail when path includes spaces',
      annotatedSource: `
      const routes: Routes = [{ path: 'first second third' }];
                                      ~~~~~~~~~~~~~~~~~~~~
    `,
      messageId: 'routePathIsNotSeoFriendly',
      annotatedOutput: `
      const routes: Routes = [{ path: 'first-second-third' }];
                                      
    `,
    }),
    convertAnnotatedSourceToFailureCase({
      description: 'Should fail when path includes unexpected spaceChar',
      annotatedSource: `
      const routes: Routes = [{ path: 'first_second_third' }];
                                      ~~~~~~~~~~~~~~~~~~~~
    `,
      messageId: 'routePathIsNotSeoFriendly',
      annotatedOutput: `
      const routes: Routes = [{ path: 'first-second-third' }];
                                      
    `,
    }),
    convertAnnotatedSourceToFailureCase({
      description: 'Should fail when at least one route has a bad path',
      annotatedSource: `
      const routes: Routes = [
        { path: 'a-b-c' },
        { path: 'x^y^z' },
                ~~~~~~~
        { path: '1-2-3' },
      ];
    `,
      messageId: 'routePathIsNotSeoFriendly',
      annotatedOutput: `
      const routes: Routes = [
        { path: 'a-b-c' },
        { path: 'xyz' },
                
        { path: '1-2-3' },
      ];
    `,
    }),
    convertAnnotatedSourceToFailureCase({
      description: 'Should fail when path does NOT match slugified path',
      annotatedSource: `
      const routes: Routes = [{ path: 'moo/"Cow"/:yoo/space check/under_score/hyphen-check' }];
                                      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    `,
      messageId: 'routePathIsNotSeoFriendly',
      annotatedOutput: `
      const routes: Routes = [{ path: 'moo/cow/:yoo/space-check/under-score/hyphen-check' }];
                                      
    `,
    }),
  ],
});
