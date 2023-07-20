# Bitovi ESLint Workspace

## Libraries

[@bitovi/eslint-plugin](./tools/eslint-rules) - An ESLint-specific plugin that contains our custom rules which are specific to Angular projects. It can be combined with any other ESLint plugins in the normal way.

## Walkthrough

You can learn about how to create your eslint rules by following [this walkthrough](https://www.youtube.com/watch?v=tEVNYmJ05Ew)

## Development

When creating eslint rules, you should use [AST Explorer](https://astexplorer.net/).

It's an interactive tool that allows you to view AST as you write your rules. To start creating your rules, you should update your parser and transform configuration options:

Parser: `@typescript-eslint/parser` (default is acorn)
Transform: eslint: `ESLint v8` (off)

You can view your current parser and transform configuration by looking at the upper right hand corner of the tool.

It is recommended to turn on Prettier (a toggle found at the upper right corner of the bottom left panel once you've turned on your configuration options)

Be sure to restart eslint server whenever you are adding / removing eslint rules from `.eslintrc.json` or updating their fix conditions.

## Debugging

While debugging eslint rules, one way to isolate a bug is to create a unit test for that use case. Then you can debug using jest debug to inspect state. It is recommended you install [firsttris/vscode-jest-runner](https://github.com/firsttris/vscode-jest-runner) so you can quickly run tests for an individual rule and toggle debug mode.

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

This allows for visualizing the red squiggly lines involved for eslint errors. We do this by taking advantage of `convertAnnotatedSourceToFailureCase()` exported by `@angular-eslint/utils`.

### `convertAnnotatedSourceToFailureCase()`

The `convertAnnotatedSourceToFailureCase()` function from `@angular-eslint/utils` provides a way to test ESLint rule failure cases while improving readability and granting additional capabilities not included in the base `RuleTester` class.

Calls to `convertAnnotatedSourceToFailureCase()` are made within the `invalid` array passed to `RuleTester.run`, in place of the usual failure objects.

```ts
const ruleTester = new ESLintUtils.RuleTester({
  parser: '@typescript-eslint/parser',
});

ruleTester.run<MessageIds, unknown[]>(RULE_NAME, rule, {
  valid: [],
  invalid: [
    convertAnnotatedSourceToFailureCase({
      /* ... */
    }),
  ],
});
```

**Description**

A `description` string is a required parameter. This is analogous to the optional `name` parameter available in normal `invalid` and `valid` case objects, and should be written in the same manner as you'd write a unit test description.

**Testing Annotations**

Passing a string to the `annotatedSource` parameter of the function can assert the expected location of the warning underline. This behaves the same way as the `code` parameter of `valid` and `invalid` examples, with the expected annotation location expressed using tildes (`~`):

```ts
convertAnnotatedSourceToFailureCase({
  annotatedSource: `
    let myVariable: any;
        ~~~~~~~~~~~~~~~
    `,
});
```

Note that if your rule provides suggestions or fixes, you _must_ also provide strings showing the result of applying these fixes that have the same indentation and extra line, but with the tildes removed.

**Testing Fix Results**

If the invalid test case you are authoring is expected to provide a fix, the expected results of that fix should be passed to the `annotatedOutput` property. The test case will fail if this is excluded.

You can find examples of this in the tests for `angular/event-emitter-has-output`.

**Testing Suggestion Results**

If the invalid test case you are authoring offers suggestions, you must document the expected message and output of each of these suggestions or the test will fail.

Available suggestions can be tested by populating the `suggestions` array with objects providing values for the expected suggestion description (`messageId`) and output (`output`).

You can find examples of this in the tests for `angular/event-emitter-has-output`.
