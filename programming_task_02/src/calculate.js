function performCalculation(action, actionData, handlers, actionDataCache = {}) {
  if (!action.children || action.children.length === 0) {
    return actionData;
  }

  const childResults = action.children.map(childAction => {
    if (actionDataCache[childAction.id]) {
      return actionDataCache[childAction.id];
    }

    const childActionHandler = handlers[childAction.handler];
    const childActionData = performCalculation(childAction, actionData, handlers, actionDataCache);

    const childResult = childActionHandler(childActionData);
    actionDataCache[childAction.id] = childResult;

    return childResult;
  });

  return action.handler(childResults);
}

function calculate(actionId, actions, handlers) {
  const requestedAction = actions.find(action => action.id === actionId);
  const result = performCalculation(requestedAction, null, handlers);

  return result;
}

module.exports = calculate;