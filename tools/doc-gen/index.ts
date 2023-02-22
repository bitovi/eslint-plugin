import { join } from 'path';
import { readFileSync, readdirSync, writeFileSync } from 'fs';
import ts from 'typescript';
import type { TSESLint } from '@typescript-eslint/utils';

interface RuleFileInfo {
  baseName: string;
  rule: string;
  spec: string;
}

interface ValidCase {
  name: string;
  code: string;
}

interface InvalidCase {
  name: string;
  code: string;
}

interface RuleData {
  name: string;
  files: RuleFileInfo;
  validCases: ValidCase[];
  invalidCases: InvalidCase[];
  description?: string;
  type: string;
  // TODO: consider supporting schema rule config options
}

const outputPath = join(__dirname, '../../docs');

/**
 * Gather file info for all rules in given directory
 * (Assumes filenames follow lower-snake-case.ts and lower-snake-case.spec.ts pattern)
 * @param sourcePath Directory to scrape for rules
 * @returns
 */
function gatherRuleFileInfo(sourcePath: string): RuleFileInfo[] {
  const files = readdirSync(sourcePath).filter((name) =>
    name.match(/[a-z\-\.]+\.ts/)
  );
  const ruleFiles: string[] = [];
  const specFiles: string[] = [];
  files.forEach((file) => {
    if (file.endsWith('.spec.ts')) {
      specFiles.push(file);
    } else {
      ruleFiles.push(file);
    }
  });
  const fileInfo: RuleFileInfo[] = ruleFiles
    .filter((file) => {
      const name = file.split('.')[0];
      if (!specFiles.includes(`${name}.spec.ts`)) {
        console.warn(`Couldn't find spec file for ${file}`);
        return false;
      }
      return true;
    })
    .map((file) => ({
      baseName: file.split('.')[0],
      rule: join(sourcePath, file),
      spec: join(sourcePath, `${file.split('.')[0]}.spec.ts`),
    }));

  return fileInfo;
}

/**
 * Read rule and test data and return it so it can be used to generated documentation
 * @param ruleInfo
 * @returns
 */
async function readRuleData(ruleInfo: RuleFileInfo): Promise<RuleData> {
  // Parse rule test file
  const specRawSource = readFileSync(ruleInfo.spec, 'utf-8');
  const specSource = ts.createSourceFile(
    ruleInfo.spec,
    specRawSource,
    ts.ScriptTarget.Latest
  );

  const validCases: ValidCase[] = [];
  const invalidCases: InvalidCase[] = [];

  const findTestCases = (node: ts.Node) => {
    if (
      ts.isPropertyAssignment(node) &&
      ts.isIdentifier(node.name) &&
      node.name.escapedText === 'valid' &&
      ts.isArrayLiteralExpression(node.initializer)
    ) {
      // Found valid test cases array
      const validCaseNodes = node.initializer.elements;
      validCaseNodes.forEach((caseNode) => {
        if (!ts.isObjectLiteralExpression(caseNode)) {
          // not expected format
          return;
        }
        const nameNode = caseNode.properties.find(
          (prop) =>
            ts.isPropertyAssignment(prop) &&
            ts.isIdentifier(prop.name) &&
            prop.name.escapedText === 'name'
        );
        const codeNode = caseNode.properties.find(
          (prop) =>
            ts.isPropertyAssignment(prop) &&
            ts.isIdentifier(prop.name) &&
            prop.name.escapedText === 'code'
        );

        const caseInfo: any = {};
        if (
          nameNode &&
          ts.isPropertyAssignment(nameNode) &&
          ts.isStringLiteral(nameNode.initializer)
        ) {
          caseInfo['name'] = nameNode.initializer.text;
        } else {
          caseInfo['name'] = 'No case name given';
        }

        if (
          codeNode &&
          ts.isPropertyAssignment(codeNode) &&
          ts.isNoSubstitutionTemplateLiteral(codeNode.initializer)
        ) {
          caseInfo['code'] = codeNode.initializer.text;
        }

        if (caseInfo['code']) {
          validCases.push(caseInfo);
        }
      });
    }
    if (
      ts.isPropertyAssignment(node) &&
      ts.isIdentifier(node.name) &&
      node.name.escapedText === 'invalid' &&
      ts.isArrayLiteralExpression(node.initializer)
    ) {
      // Found invalid test cases array
      const invalidCaseNodes = node.initializer.elements;
      invalidCaseNodes.forEach((caseNode) => {
        if (ts.isObjectLiteralExpression(caseNode)) {
          // Object format case
          const nameNode = caseNode.properties.find(
            (prop) =>
              ts.isPropertyAssignment(prop) &&
              ts.isIdentifier(prop.name) &&
              prop.name.escapedText === 'name'
          );
          const codeNode = caseNode.properties.find(
            (prop) =>
              ts.isPropertyAssignment(prop) &&
              ts.isIdentifier(prop.name) &&
              prop.name.escapedText === 'code'
          );

          const caseInfo: any = {};
          if (
            nameNode &&
            ts.isPropertyAssignment(nameNode) &&
            ts.isStringLiteral(nameNode.initializer)
          ) {
            caseInfo['name'] = nameNode.initializer.text;
          } else {
            caseInfo['name'] = 'No case name given';
          }

          if (
            codeNode &&
            ts.isPropertyAssignment(codeNode) &&
            ts.isNoSubstitutionTemplateLiteral(codeNode.initializer)
          ) {
            caseInfo['code'] = codeNode.initializer.text;
          }

          if (caseInfo['code']) {
            invalidCases.push(caseInfo);
          }
        }

        // TODO: parse convertAnnotatedSourceToFailureCase() call
      });
    }
    ts.forEachChild(node, findTestCases);
  };

  findTestCases(specSource);

  // Get rule file exports
  const { rule, RULE_NAME } = await import(ruleInfo.rule);

  const ruleConfig = rule as TSESLint.RuleModule<string, []> & {
    defaultOptions?: Record<string, unknown>[];
  };

  return {
    name: RULE_NAME,
    files: ruleInfo,
    description: ruleConfig.meta.docs?.description,
    type: ruleConfig.meta.type,
    validCases,
    invalidCases,
  };
}

/**
 * Remove leading indentation on code block while maintaining overall
 * indentation
 * @param codeblock Code block to clean up
 * @returns
 */
function normalizeCodeBlockIndentation(codeblock: string): string {
  const indentSize = (line: string) => (line.match(/^[\s]+/) ?? [''])[0].length;
  const lines = codeblock.replace(/^\n/, '').split('\n');

  const minIndent = Math.min(...lines.map(indentSize));
  return lines.map((l) => l.substring(minIndent)).join('\n');
}

/**
 * Generate markdown documentation for given rule
 * (Goes to path stored in outputPath)
 * @param name rule display name
 * @param info file info, including base file name
 * @param validCases
 * @param invalidCases
 */
function generateDocumentation(ruleData: RuleData) {
  const valid = ruleData.validCases.map((testCase) => {
    return `### ${testCase.name}

\`\`\`ts
${normalizeCodeBlockIndentation(testCase.code)}
\`\`\`

`;
  }).join(`
`);

  const invalid = ruleData.invalidCases.map((testCase) => {
    return `### ${testCase.name}

\`\`\`ts
${normalizeCodeBlockIndentation(testCase.code)}
\`\`\`

`;
  }).join(`
`);

  const md = `# Rule \`${ruleData.name}\`

${ruleData.description}

## Valid Usage

${valid}

## Invalid Usage

${invalid}
`;

  writeFileSync(join(outputPath, `${ruleData.files.baseName}.md`), md);
}

// -----

const rulesInfo = gatherRuleFileInfo(
  join(__dirname, '../eslint-rules/rules/angular')
);

for (const info of rulesInfo) {
  readRuleData(info).then((result) => {
    console.log(`----cases for ${result.name}:----`);
    console.log('VALID:', result.validCases);
    console.log('INVALID:', result.invalidCases);
    generateDocumentation(result);
  });
}