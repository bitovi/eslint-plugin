const hasHostListenerClickKeyEvent = function (members) {
  const keyEvents = { keydown: 1, keypress: 1, keyup: 1 };

  for (let i = 0; i < members.length; i++) {
    const member = members[i];
    if (member.type === "MethodDefinition" && member.kind === "method") {
      const decorators = member.decorators;
      for (let j = 0; j < decorators?.length; j++) {
        const decorator = decorators[j];
        const [event] = decorator.expression.arguments ?? [];
        if (
          decorator.expression.callee?.name === "HostListener" &&
          keyEvents.hasOwnProperty(event?.value)
        ) {
          return true;
        }
      }
    }
  }
  return false;
};

module.exports = {
  meta: {
    messages: {
      hostListenerClickEventsHaveKeyEvents:
        "HostListener click must be accompanied by either keyup, keydown or keypress event for accessibility.",
    },
  },
  create: function (context) {
    return {
      Decorator: function (node) {
        const expression = node.expression;
        const isHostListener = expression.callee?.name === "HostListener";

        if (!isHostListener) {
          return;
        }

        const [event] = expression.arguments ?? [];
        const isClickEvent = event?.value === "click";
        if (!isClickEvent) {
          return;
        }

        const hostClass = node.parent.parent;
        if (!hasHostListenerClickKeyEvent(hostClass.body)) {
          context.report({
            node: node,
            messageId: "hostListenerClickEventsHaveKeyEvents",
          });
        }
      },
    };
  },
};
