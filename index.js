const hostListenerClickEventsHaveKeyEvents = require("./rules/angular/host-listener-click-events-have-key-events");
const hostListenerMouseEventsHaveKeyEvents = require("./rules/angular/host-listener-mouse-events-have-key-events");

module.exports = {
  rules: {
    "angular/host-listener-click-events-have-key-events":
      hostListenerClickEventsHaveKeyEvents,
    "angular/host-listener-mouse-events-have-key-events":
      hostListenerMouseEventsHaveKeyEvents,
    // TO-DO: on next major version (2), remove deprecated rules
    "host-listener-click-events-have-key-events": {
      ...hostListenerClickEventsHaveKeyEvents,
      meta: {
        messages: {
          hostListenerClickEventsHaveKeyEvents:
            "DEPRECATED RULE: please use the new angular/host-listener-click-events-have-key-events rule. HostListener click must be accompanied by either keyup, keydown or keypress event for accessibility.",
        },
      },
    },
    "host-listener-mouse-events-have-key-events": {
      ...hostListenerMouseEventsHaveKeyEvents,
      meta: {
        messages: {
          hostListenerMouseEventsHaveKeyEvents:
            "DEPRECATED RULE: please use the new angular/host-listener-mouse-events-have-key-events rule. HostListener {{ mouseEvent }} must be accompanied by {{ keyEvent }} event for accessibility.",
        },
      },
    },
  },
};
