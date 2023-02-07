# BitoviEslintPlugin

[@bitovi/eslint-plugin](./tools/eslint-rules) - An ESLint-specific plugin that contains our custom rules which are specific to Angular projects. It can be combined with any other ESLint plugins in the normal way.

## Walkthrough

You can learn about how to create your eslint rules by following [this walkthrough](https://www.youtube.com/watch?v=tEVNYmJ05Ew)

## Development

When creating eslint rules, you should use [AST Explorer](https://astexplorer.net/) to create your rules.

It's an interactive tool that allows you to view AST as you write your rules. To start creating your rules, you should update your parser and transform configuration options:

Parser: @typescript-eslint/parser (default is acorn)
Transform: eslint: ESLint v8 (off)

You can view your current parser and transform configuration by looking at the upper right hand corner of the tool.

It is recommended to turn on Prettier (a toggle found at the upper right corner of the bottom left panel once you've turned on your configuration options)

Be sure to restart eslint server whenever you are adding / removing eslint rules from `.eslintrc.json` or updating their fix conditions.

## Commands

```bash
nx test eslint-rules
```

```bash
nx build eslint-rules
```

```bash
nx lint eslint-rules
```

## Angular Team's Utilities

```bash
npm i @angular-eslint/utils@~12.4.1# Should match whatever version you are using for @angular-eslint/eslint-plugin
```

This allows for visualizing the red quigly lines involved for eslint errors. We do this by taking advantage of `convertAnnotatedSourceToFailureCase` exported by `@angular-eslint/utils`

// TODO: link to documentation on `convertAnnotatedSourceToFailureCase`
// TODO: document how to properly link up to eslintrc
// TODO: document how to properly create extendables (configs)
// TODO: document ESLintUtils.RuleCreator(() => __filename) -> ESLintUtils.RuleCreator(name => `https://github.com/bitovi/eslint-plugin#readme`)
// TODO: Monorepo for all the tooling related to using ESLint with Angular
// TODO: Look into prettier/formatter
