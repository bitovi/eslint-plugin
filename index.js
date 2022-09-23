const hostListenerClickEventsHaveKeyEvents = require("./rules/angular/host-listener-click-events-have-key-events");
const hostListenerMouseEventsHaveKeyEvents = require("./rules/angular/host-listener-mouse-events-have-key-events");

module.exports = {
  rules: {
    "angular/host-listener-click-events-have-key-events":
      hostListenerClickEventsHaveKeyEvents,
    "angular/host-listener-mouse-events-have-key-events":
      hostListenerMouseEventsHaveKeyEvents,
  },
};
