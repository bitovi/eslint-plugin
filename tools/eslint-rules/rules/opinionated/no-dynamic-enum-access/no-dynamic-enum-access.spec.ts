import { ESLintUtils } from '@typescript-eslint/utils';
import { rule, RULE_NAME } from './no-dynamic-enum-access';

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
    },
    {
      name: 'Should allow dynamic keys for objects that are not enums',
      code: `
      const Moo = {
        cow: 'cow'
      };
      
      const val = 'cow';
      const moo = Moo[val];
      const moo = Moo[getVal()];
      `,
    },
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
  ],
});
