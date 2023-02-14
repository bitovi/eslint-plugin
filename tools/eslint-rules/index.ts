import {
  RULE_NAME as noEntryComponentsName,
  rule as noEntryComponents,
} from './rules/angular/no-entry-components';
import {
  RULE_NAME as eventEmitterHasOutputName,
  rule as eventEmitterHasOutput,
} from './rules/angular/event-emitter-has-output';
import {
  RULE_NAME as noRxjsInternalImportName,
  rule as noRxjsInternalImport,
} from './rules/angular/no-rxjs-internal-import';
import {
  RULE_NAME as hostListenerClickEventsHaveKeyEventsName,
  rule as hostListenerClickEventsHaveKeyEvents,
} from './rules/angular/host-listener-click-events-have-key-events';
import {
  RULE_NAME as hostListenerMouseEventsHaveKeyEventsName,
  rule as hostListenerMouseEventsHaveKeyEvents,
} from './rules/angular/host-listener-mouse-events-have-key-events';
/**
 * Import your custom workspace rules at the top of this file.
 *
 * For example:
 *
 * import { RULE_NAME as myCustomRuleName, rule as myCustomRule } from './rules/my-custom-rule';
 *
 * In order to quickly get started with writing rules you can use the
 * following generator command and provide your desired rule name:
 *
 * ```sh
 * npx nx g @nrwl/linter:workspace-rule {{ NEW_RULE_NAME }}
 * ```
 */

module.exports = {
  /**
   * Apply the imported custom rules here.
   *
   * For example (using the example import above):
   *
   * rules: {
   *  [myCustomRuleName]: myCustomRule
   * }
   */
  rules: {
    [hostListenerMouseEventsHaveKeyEventsName]:
      hostListenerMouseEventsHaveKeyEvents,
    [hostListenerClickEventsHaveKeyEventsName]:
      hostListenerClickEventsHaveKeyEvents,
    [eventEmitterHasOutputName]: eventEmitterHasOutput,
    [noRxjsInternalImportName]: noRxjsInternalImport,
    [noEntryComponentsName]: noEntryComponents,
  },
};
