import {
  RULE_NAME as noUselessInputBindsName,
  rule as noUselessInputBinds,
} from './rules/angular-template/no-useless-input-binds/no-useless-input-binds';
import {
  RULE_NAME as lifecycleHooksRequireClassThisContextName,
  rule as lifecycleHooksRequireClassThisContext,
} from './rules/angular/lifecycle-hooks-require-class-this-context/lifecycle-hooks-require-class-this-context';
import {
  RULE_NAME as requiredNgSrcAttributesName,
  rule as requiredNgSrcAttributes,
} from './rules/angular-template/required-ng-src-attributes/required-ng-src-attributes';
import {
  RULE_NAME as preferOptimizedImageDirectiveName,
  rule as preferOptimizedImageDirective,
} from './rules/angular-template/prefer-optimized-image-directive/prefer-optimized-image-directive';
import {
  RULE_NAME as noPropertyAssignmentName,
  rule as noPropertyAssignment,
} from './rules/angular-template/no-property-assignment/no-property-assignment';
import {
  RULE_NAME as preferReadonlyObservablePropertyName,
  rule as preferReadonlyObservableProperty,
} from './rules/opinionated/prefer-readonly-observable-property/prefer-readonly-observable-property';
import {
  RULE_NAME as preferReadonlyDependencyInjectionName,
  rule as preferReadonlyDependencyInjection,
} from './rules/opinionated/prefer-readonly-dependency-injection/prefer-readonly-dependency-injection';
import {
  RULE_NAME as noDynamicEnumAccessName,
  rule as noDynamicEnumAccess,
} from './rules/opinionated/no-dynamic-enum-access/no-dynamic-enum-access';
import {
  RULE_NAME as requireOnPushChangeDetectionAsDefaultName,
  rule as requireOnPushChangeDetectionAsDefault,
} from './rules/opinionated/require-on-push-change-detection-as-default';
import {
  RULE_NAME as noThisAsArgumentName,
  rule as noThisAsArgument,
} from './rules/opinionated/no-storing-this-reference';
import {
  RULE_NAME as noStatefulMethodsName,
  rule as noStatefulMethods,
} from './rules/opinionated/no-stateful-methods';
import {
  RULE_NAME as noBindingsInRxjsStreamName,
  rule as noBindingsInRxjsStream,
} from './rules/angular/no-bindings-in-rxjs-stream';
import {
  RULE_NAME as noSubscribeCallbackName,
  rule as noSubscribeCallback,
} from './rules/angular/no-subscribe-callback';
import {
  RULE_NAME as noReadInputInConstructorName,
  rule as noReadInputInConstructor,
} from './rules/angular/no-read-input-in-constructor';
import {
  RULE_NAME as noInputReadonlyName,
  rule as noInputReadonly,
} from './rules/angular/no-input-readonly';
import {
  RULE_NAME as hostListenerOnMethodName,
  rule as hostListenerOnMethod,
} from './rules/angular/host-listener-on-method';
import {
  RULE_NAME as onChangesUseInputBindName,
  rule as onChangesUseInputBind,
} from './rules/angular/on-changes-use-input-bind';
import {
  RULE_NAME as seoFriendlyRoutePathName,
  rule as seoFriendlyRoutePath,
} from './rules/angular/seo-friendly-route-path';
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
import { processor } from './utilities/json-processor';

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
    [seoFriendlyRoutePathName]: seoFriendlyRoutePath,
    [onChangesUseInputBindName]: onChangesUseInputBind,
    [hostListenerOnMethodName]: hostListenerOnMethod,
    [noInputReadonlyName]: noInputReadonly,
    [noReadInputInConstructorName]: noReadInputInConstructor,
    [noSubscribeCallbackName]: noSubscribeCallback,
    [noBindingsInRxjsStreamName]: noBindingsInRxjsStream,
    [noStatefulMethodsName]: noStatefulMethods,
    [noThisAsArgumentName]: noThisAsArgument,
    [requireOnPushChangeDetectionAsDefaultName]:
      requireOnPushChangeDetectionAsDefault,
    [noDynamicEnumAccessName]: noDynamicEnumAccess,
    [preferReadonlyDependencyInjectionName]: preferReadonlyDependencyInjection,
    [preferReadonlyObservablePropertyName]: preferReadonlyObservableProperty,
    [noPropertyAssignmentName]: noPropertyAssignment,
    [preferOptimizedImageDirectiveName]: preferOptimizedImageDirective,
    [requiredNgSrcAttributesName]: requiredNgSrcAttributes,
    [lifecycleHooksRequireClassThisContextName]:
      lifecycleHooksRequireClassThisContext,
    [noUselessInputBindsName]: noUselessInputBinds,
  },
  processors: {
    ['json']: processor,
  },
};
