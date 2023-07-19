const { dbClient, TableNames } = require("./common/db");
const Action = require("./model/action");
const Handler = require("./handlers/index");

async function performCalculation(action, actionData, handlers, actionDataCache = {}) {
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
    const childResults = await Promise.all(
      action.children.map(async (childAction) => {
        if (actionDataCache[childAction.id]) {
          return actionDataCache[childAction.id];
        }

        const childActionData = await performCalculation(
          childAction,
          actionData,
          handlers,
          actionDataCache
        );

        const childActionHandler = handlers[childAction.handler];
        const childResult = childActionHandler.handle(...childActionData);
        actionDataCache[childAction.id] = childResult;

        return childResult;
      })
    );

    return actionData;
  }

  const handler = handlers[action.handler];
  const result = handler.handle(actionData);

  return result;
}

async function calculate(actionId) {
  const requestedAction = await Action.getById(actionId);

  const result = await performCalculation(requestedAction, null, Handler);

  return result;
}

module.exports = calculate;