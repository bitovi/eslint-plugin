import { TSESLint } from '@typescript-eslint/utils';
import { rule, RULE_NAME } from './require-on-push-change-detection-as-default';
import { convertAnnotatedSourceToFailureCase } from '@angular-eslint/utils';
import { processor } from '../../utilities/json-processor';
import { applyPreprocess } from '../../tests/apply-preprocessor';

const ruleTester = new TSESLint.RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
});

ruleTester.run(
  RULE_NAME,
  rule,
  applyPreprocess(processor.preprocess, 'mock-file.json', {
    valid: [
      {
        name: 'Should allow json with no projects',
        code: `{ "moo": "cow" }`,
      },
      {
        name: 'Should allow for json with changeDetection default is OnPush',
        code: `{
        "projects": {
          "moo": {
            "schematics": {
              "@schematics/angular:component": {
                "changeDetection": "OnPush"
              }
            }
          }
        }
      }`,
      },
    ],
    invalid: [
      convertAnnotatedSourceToFailureCase({
        description: 'Should report if schematics is missing for project',
        annotatedSource: `{
        "projects": {
          "moo": {
          ~~~~~
            "cow": "milk"
          }
        }
      }`,
        annotatedOutput: `{
        "projects": {
          "moo": {
            "cow": "milk",
            "schematics": {
              "@schematics/angular:component": {
                "changeDetection": "OnPush"
              }
            }
          }
        }
      }`,
        messageId: 'missingSchematics',
        data: {
          projectName: 'moo',
        },
      }),
      convertAnnotatedSourceToFailureCase({
        description:
          'Should report if component schematic settings are missing for project',
        annotatedSource: `{
        "projects": {
          "moo": {
            "cow": "milk",
            "schematics": {
            ~~~~~~~~~~~~
              "carrot": "cake"
            }
          }
        }
      }`,
        annotatedOutput: `{
        "projects": {
          "moo": {
            "cow": "milk",
            "schematics": {
              "carrot": "cake",
              "@schematics/angular:component": {
                "changeDetection": "OnPush"
              }
            }
          }
        }
      }`,
        messageId: 'missingComponentSchematics',
        data: {
          projectName: 'moo',
        },
      }),
      convertAnnotatedSourceToFailureCase({
        description:
          'Should report if default change detection is missing from component schematic settings',
        annotatedSource: `{
        "projects": {
          "moo": {
            "cow": "milk",
            "schematics": {
              "@schematics/angular:component": {
              ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
              }
            }
          }
        }
      }`,
        annotatedOutput: `{
        "projects": {
          "moo": {
            "cow": "milk",
            "schematics": {
              "@schematics/angular:component": {
                "changeDetection": "OnPush"
              }
            }
          }
        }
      }`,
        messageId: 'missingChangeDetectionDefault',
        data: {
          projectName: 'moo',
        },
      }),
      convertAnnotatedSourceToFailureCase({
        description: 'Should report if default change detection is not OnPush',
        annotatedSource: `{
        "projects": {
          "moo": {
            "cow": "milk",
            "schematics": {
              "@schematics/angular:component": {
                "changeDetection": "meep"
                                   ~~~~~~
              }
            }
          }
        }
      }`,
        annotatedOutput: `{
        "projects": {
          "moo": {
            "cow": "milk",
            "schematics": {
              "@schematics/angular:component": {
                "changeDetection": "OnPush"
              }
            }
          }
        }
      }`,
        messageId: 'requireOnPushChangeDetection',
        data: {
          projectName: 'moo',
        },
      }),
    ],
  })
);
