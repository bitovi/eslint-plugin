import { hostListenerClickEventsHaveKeyEventsRule, hostListenerClickEventsHaveKeyEventsName } from "./rules/angular/host-listener-click-events-have-key-events";
import { hostListenerMouseEventsHaveKeyEventsName, hostListenerMouseEventsHaveKeyEventsRule } from "./rules/angular/host-listener-mouse-events-have-key-events";

module.exports = {
  rules: {
    [hostListenerClickEventsHaveKeyEventsName]:
      hostListenerClickEventsHaveKeyEventsRule,
    [hostListenerMouseEventsHaveKeyEventsName]:
      hostListenerMouseEventsHaveKeyEventsRule,
  },
};
