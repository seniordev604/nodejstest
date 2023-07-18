function newestHandler(actions) {
    let newestItem = null;
  
    actions.forEach(action => {
      if (newestItem === null || action.timestamp > newestItem.timestamp) {
        newestItem = action;
      }
    });
  
    return newestItem;
  }
  
  module.exports = newestHandler;