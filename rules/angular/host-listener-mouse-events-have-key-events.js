const hasHostListenerMouseKeyEvent = function (keyEvent, members) {
  for (let i = 0; i < members.length; i++) {
    const member = members[i];
    if (member.type === "MethodDefinition" && member.kind === "method") {
      const decorators = member.decorators;
      for (let j = 0; j < decorators?.length; j++) {
        const decorator = decorators[j];
        const [event] = decorator.expression.arguments ?? [];
        if (
          decorator.expression.callee?.name === "HostListener" &&
          event?.value === keyEvent
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
      hostListenerMouseEventsHaveKeyEvents:
        "HostListener {{ mouseEvent }} must be accompanied by {{ keyEvent }} event for accessibility.",
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
        const mouseEvent = event?.value;
        const isMouseEvent =
          mouseEvent === "mouseout" || mouseEvent === "mouseover";
        if (!isMouseEvent) {
          return;
        }

        const hostClass = node.parent.parent;
        const mouseKeyEvents = {
          mouseout: "blur",
          mouseover: "focus",
        };
        const keyEvent = mouseKeyEvents[mouseEvent];
        if (!hasHostListenerMouseKeyEvent(keyEvent, hostClass.body)) {
          context.report({
            node: node,
            messageId: "hostListenerMouseEventsHaveKeyEvents",
            data: { keyEvent, mouseEvent },
          });
        }
      },
    };
  },
};
