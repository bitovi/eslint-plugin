import { join } from 'path';
import { generateDocs } from 'bitlint';

generateDocs(
  join(__dirname, '../eslint-rules/rules/angular'),
  join(__dirname, '../../docs/angular'),
  undefined,
  true
);
generateDocs(
  join(__dirname, '../eslint-rules/rules/opinionated'),
  join(__dirname, '../../docs/opinionated'),
  undefined,
  true
);
generateDocs(
  join(__dirname, '../eslint-rules/rules/angular-template'),
  join(__dirname, '../../docs/angular-template'),
  undefined,
  true
);
