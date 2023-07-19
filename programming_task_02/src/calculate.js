function performCalculation(action, actionData, handlers, actionDataCache = {}) {
  if (!action) {
    throw new Error("Action not found.");
  }

  if (!action.role) {
    throw new Error("Action role is missing.");
  }

  if (!action.handler) {
    throw new Error("Action handler is missing.");
  }

  if (!handlers[action.handler]) {
    throw new Error(`Handler "${action.handler}" is not defined.`);
  }

  if (!actionData) {
    actionData = {};
  }

  if (action.children && action.children.length > 0) {
    const childResults = action.children.map(childAction => {
      if (actionDataCache[childAction.id]) {
        return actionDataCache[childAction.id];
      }

      const childActionData = performCalculation(childAction, actionData, handlers, actionDataCache);

      const childActionHandler = handlers[childAction.handler];
      const childResult = childActionHandler.handle(childActionData);
      actionDataCache[childAction.id] = childResult;

      return childResult;
    });

    return action.handler(childResults);
  }

  const handler = handlers[action.handler];
  const result = handler.handle(actionData);

  return result;
}

function calculate(actionId, actions, handlers) {
  const requestedAction = actions.find(action => action.id === actionId);

  const result = performCalculation(requestedAction, null, handlers);

  return result;
}

module.exports = calculate;