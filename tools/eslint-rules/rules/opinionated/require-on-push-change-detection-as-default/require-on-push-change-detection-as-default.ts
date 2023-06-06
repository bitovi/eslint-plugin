import {
  ESLintUtils,
  AST_NODE_TYPES,
  TSESTree,
  TSESLint,
} from '@typescript-eslint/utils';
import { getVSCodeMessages } from '../../../utilities/vscode/get-vscode-messages';

export const RULE_NAME =
  'opinionated/require-on-push-change-detection-as-default';

export type Options = [];
export type MessageIds =
  | 'missingSchematics'
  | 'missingComponentSchematics'
  | 'missingChangeDetectionDefault'
  | 'requireOnPushChangeDetection';

interface InsertJson {
  [x: string]: string | InsertJson;
}

const SCHEMATICS_SETTING = {
  schematics: {
    '@schematics/angular:component': {
      changeDetection: 'OnPush',
    },
  },
};

const jsonExample = `/* angular.json */
{
  "projects": {
    "{{ projectName }}": {
      "schematics": {
        "@schematics/angular:component": {
          "changeDetection": "OnPush"
        }
      }
    }
  }
}
`;

const standardMessages = {
  missingSchematics: 'Add schematics property to "{{ projectName }}" project',
  missingComponentSchematics:
    'Add component schematics property to "{{ projectName }}" project',
  missingChangeDetectionDefault:
    'Add default change detection to "{{ projectName }}" project',
  requireOnPushChangeDetection:
    'Set default change detection to OnPush for "{{ projectName }}" project',
};

const messages = getVSCodeMessages(standardMessages, {
  missingSchematics: `${standardMessages.missingSchematics}:\n\n${jsonExample}`,
  missingComponentSchematics: `${standardMessages.missingComponentSchematics}:\n\n${jsonExample}`,
  missingChangeDetectionDefault: `${standardMessages.missingChangeDetectionDefault}:\n\n${jsonExample}`,
  requireOnPushChangeDetection: `${standardMessages.requireOnPushChangeDetection}:\n\n${jsonExample}`,
});

export const rule = ESLintUtils.RuleCreator(() => __filename)<
  Options,
  MessageIds
>({
  name: RULE_NAME,
  meta: {
    fixable: 'code',
    type: 'problem',
    docs: {
      description: `Always default to OnPush plz`,
      recommended: 'error',
    },
    schema: [],
    messages,
  },
  defaultOptions: [],
  create(context) {
    return {
      [AST_NODE_TYPES.AssignmentExpression]: function (
        node: TSESTree.AssignmentExpression
      ) {
        const json = node.right as TSESTree.ObjectExpression;

        const projects = getPropertyByKeyValue(json.properties, 'projects');

        if (!projects) {
          return;
        }

        if (projects.value.type !== AST_NODE_TYPES.ObjectExpression) {
          return;
        }

        projects.value.properties.forEach((project) => {
          if (project.type !== AST_NODE_TYPES.Property) {
            return;
          }

          const projectName =
            (project.key.type === AST_NODE_TYPES.Literal &&
              project.key.value) ||
            'project';

          if (project.value.type !== AST_NODE_TYPES.ObjectExpression) {
            return;
          }

          const schematics = getPropertyByKeyValue(
            project.value.properties,
            'schematics'
          );

          if (!schematics) {
            context.report({
              node: project.key,
              messageId: 'missingSchematics',
              data: {
                projectName,
              },
              fix(fixer) {
                return fixer.replaceText(
                  project.value,
                  insertJson(
                    context,
                    project.value,
                    SCHEMATICS_SETTING,
                    project.key.loc.start.column
                  )
                );
              },
            });
            return;
          }

          if (schematics.type !== AST_NODE_TYPES.Property) {
            return;
          }

          if (schematics.value.type !== AST_NODE_TYPES.ObjectExpression) {
            return;
          }

          const componentSchematicSettings = getPropertyByKeyValue(
            schematics.value.properties,
            '@schematics/angular:component'
          );

          if (!componentSchematicSettings) {
            context.report({
              node: schematics.key,
              messageId: 'missingComponentSchematics',
              data: {
                projectName,
              },
              fix(fixer) {
                return fixer.replaceText(
                  schematics.value,
                  insertJson(
                    context,
                    schematics.value,
                    SCHEMATICS_SETTING.schematics,
                    schematics.key.loc.start.column
                  )
                );
              },
            });
            return;
          }

          if (
            componentSchematicSettings.value.type !==
            AST_NODE_TYPES.ObjectExpression
          ) {
            return;
          }

          const changeDetectionDefault = getPropertyByKeyValue(
            componentSchematicSettings.value.properties,
            'changeDetection'
          );

          if (!changeDetectionDefault) {
            context.report({
              loc: componentSchematicSettings.key.loc,
              messageId: 'missingChangeDetectionDefault',
              data: {
                projectName,
              },
              fix(fixer) {
                return fixer.replaceText(
                  componentSchematicSettings.value,
                  insertJson(
                    context,
                    componentSchematicSettings.value,
                    SCHEMATICS_SETTING.schematics[
                      '@schematics/angular:component'
                    ],
                    componentSchematicSettings.key.loc.start.column
                  )
                );
              },
            });
            return;
          }

          if (
            changeDetectionDefault.value.type === AST_NODE_TYPES.Literal &&
            changeDetectionDefault.value.value !== 'OnPush'
          ) {
            context.report({
              loc: changeDetectionDefault.value.loc,
              messageId: 'requireOnPushChangeDetection',
              data: {
                projectName,
              },
              fix(fixer) {
                return fixer.replaceText(
                  componentSchematicSettings.value,
                  insertJson(
                    context,
                    componentSchematicSettings.value,
                    SCHEMATICS_SETTING.schematics[
                      '@schematics/angular:component'
                    ],
                    componentSchematicSettings.key.loc.start.column
                  )
                );
              },
            });
            return;
          }
        });
      },
    };
  },
});

function insertJson<T extends string, V extends readonly unknown[]>(
  context: Readonly<TSESLint.RuleContext<T, V>>,
  node: TSESTree.Node,
  insert: InsertJson,
  indentation: number
): string {
  const sourceCode = context.getSourceCode();

  const text = sourceCode.getText(node);

  return indentJsonString(
    JSON.stringify({ ...JSON.parse(text), ...insert }, null, 2),
    indentation
  );
}

function indentJsonString(json: string, width: number): string {
  const indentation = Array(width).fill(' ').join('');

  const [first, ...rest] = json.split('\n');

  const temp = [first, ...rest.map((line) => `${indentation}${line}`)].join(
    '\n'
  );

  return temp.trim();
}

function getPropertyByKeyValue(
  properties: TSESTree.ObjectLiteralElement[],
  key: string
): TSESTree.Property | undefined {
  return properties
    .filter(
      (property): property is TSESTree.Property =>
        property.type === AST_NODE_TYPES.Property
    )
    .find(
      (property) =>
        property.key.type === AST_NODE_TYPES.Literal &&
        property.key.value === key
    );
}
