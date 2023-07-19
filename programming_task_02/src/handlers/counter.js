class CounterHandler {
  static handle(actionData) {
    if (!actionData || !Array.isArray(actionData)) {
      throw new Error("Invalid action data. Expected an array of items.");
    }

    const result = actionData.length;
    return { result };
  }
}

module.exports = CounterHandler;