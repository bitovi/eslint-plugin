import { RULE_NAME as hostListenerClickEventsHaveKeyEventsName, rule as hostListenerClickEventsHaveKeyEventsRule } from "./rules/angular/host-listener-click-events-have-key-events";
import { RULE_NAME as hostListenerMouseEventsHaveKeyEventsName, rule as hostListenerMouseEventsHaveKeyEventsRule } from "./rules/angular/host-listener-mouse-events-have-key-events";

module.exports = {
  rules: {
    [hostListenerClickEventsHaveKeyEventsName]:
      hostListenerClickEventsHaveKeyEventsRule,
    [hostListenerMouseEventsHaveKeyEventsName]:
      hostListenerMouseEventsHaveKeyEventsRule,
  },
};
