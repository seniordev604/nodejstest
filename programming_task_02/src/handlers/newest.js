class NewestHandler {
  static handle(...items) {
    let newestItem = null;
    items.forEach(item => {
      if (!newestItem || item.timestamp > newestItem.timestamp) {
        newestItem = item;
      }
    });
    return newestItem;
  }
}

module.exports = NewestHandler;