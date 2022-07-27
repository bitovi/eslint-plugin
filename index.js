const hostListenerClickEventsHaveKeyEvents = require("./rules/host-listener-click-events-have-key-events");
const hostListenerMouseEventsHaveKeyEvents = require("./rules/host-listener-mouse-events-have-key-events");

module.exports = {
  rules: {
    "host-listener-click-events-have-key-events":
      hostListenerClickEventsHaveKeyEvents,
    "host-listener-mouse-events-have-key-events":
      hostListenerMouseEventsHaveKeyEvents,
  },
};
