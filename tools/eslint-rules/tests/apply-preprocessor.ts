import type { Linter } from 'eslint';

interface HasCodeAndOutput {
  code?: string;
  output?: string;
  filename?: string;
}

interface Tests<A extends HasCodeAndOutput, B extends HasCodeAndOutput> {
  valid: A[];
  invalid: B[];
}

// RuleTester doesn't allow preprocessors
function applyPreprocessForTest<T extends HasCodeAndOutput>(
  preprocess: Linter.Processor['preprocess'],
  filename: string,
  item: T
): T {
  if (!preprocess) {
    return item;
  }

  if (!item.code) {
    console.warn("Test needs to include 'code' property");
    return item;
  }

  item.code = preprocess(item.code, filename)[0] as string;

  if (item.output) {
    item.output = preprocess(item.output, filename)[0] as string;
  }

  return item;
}

export function applyPreprocess<
  A extends HasCodeAndOutput,
  B extends HasCodeAndOutput,
  T extends Tests<A, B>
>(preprocess: Linter.Processor['preprocess'], filename: string, tests: T): T {
  tests.valid = tests.valid.map((test) =>
    applyPreprocessForTest(preprocess, filename, test)
  );
  tests.invalid = tests.invalid.map((test) =>
    applyPreprocessForTest(preprocess, filename, test)
  );

  return tests;
}
