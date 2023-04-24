import { ESLintUtils } from '@typescript-eslint/utils';
import { rule, RULE_NAME } from './no-dynamic-enum-access';

// const ruleTester = new ESLintUtils.RuleTester({
// parser: require.resolve('@typescript-eslint/parser'),
const ruleTester = new ESLintUtils.RuleTester({
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
});

ruleTester.run(RULE_NAME, rule, {
  valid: [
    {
      name: 'Should be able to access enums',
      code: `
      enum Moo {
        cow = 'cow'
      };
    
      const moo = Moo.cow;
      `,
    },
    {
      name: 'Should be able using literals',
      code: `
      enum Moo {
        cow = 'cow'
      };
    
      const moo = Moo['cow'];
      `,
    }
  ],
  invalid: [
    {
      code: `
      enum Moo {
        cow = 'cow'
      };
    
      const key = 'cow';
      const moo = Moo[key];
      `,
      errors: [
        {
          messageId: 'dynamicEnumAccess',
        },
      ],
    },
    {
      code: `
      enum Moo {
        cow = 'cow'
      };
    
      const moo = Moo[getKey()];
      `,
      errors: [
        {
          messageId: 'dynamicEnumAccess',
        },
      ],
    },
    {
      code: `
      enum Moo {
        cow = 'cow',
        milk = 'milk',
      }
      
      function getVal(): 'cow' {
        return 'cow';
      }
      
      const test = Moo.cow;
      const test2 = Moo['cow'];
      const val = 'cow';
      const test3 = Moo[val];
      // const test4 = Moo[getVal()];
      `,
      errors: [
        {
          messageId: 'dynamicEnumAccess',
        },
      ],
    },
  ],
});
