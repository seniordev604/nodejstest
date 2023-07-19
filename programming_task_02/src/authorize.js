const actionsData = require("../data/actions.json");

function isAuthorized(userRole, requiredRole) {
  // Implement your authorization logic here
  // For this example, we'll simply check if the user role matches the required role
  return userRole === requiredRole;
}

async function authorize(event) {
  const { Headers, body } = event;
  const { userid: userId } = Headers;
  const { actionid: actionId } = JSON.parse(body);

  // Fetch user role from your authentication system (e.g., database, API, etc.)
  const userRole = await getUserRole(userId);

  // Find the requested action from actionsData
  const requestedAction = actionsData.find(action => action.id === actionId);

  if (!requestedAction) {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: "Action not found." }),
    };
  }

  if (!requestedAction.role) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Action role is missing." }),
    };
  }

  if (!requestedAction.handler) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Action handler is missing." }),
    };
  }

  if (!handlers[requestedAction.handler]) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: `Handler "${requestedAction.handler}" is not defined.` }),
    };
  }

  if (!isAuthorized(userRole, requestedAction.role)) {
    return {
      statusCode: 403,
      body: JSON.stringify({ message: "Unauthorized" }),
    };
  }

  // If the action requires authorization, call the corresponding handler function
  const result = handlers[requestedAction.handler].handle(requestedAction.data);

  return {
    statusCode: 200,
    body: JSON.stringify(result),
  };
}

module.exports = authorize;