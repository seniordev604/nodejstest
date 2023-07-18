const items = [
  { id: 1, type: "book", name: "Book A", price: 20, discount: 0.1 },
  { id: 2, type: "book", name: "Book B", price: 30 },
  { id: 3, type: "notebook", name: "Notebook", price: 10 },
]

class Item {
  // YOUR CODE HERE



  //
}

function setDiscount(type, discount) {
  const items = Item.getAllByType(type);
  items.forEach(item => {
    if (item.price > 20) {
      console.log(`Setting discount for ${item.name}.`)
      item.setDiscount(discount);
    }
  })
}

function setItemName(id, name) {
  const item = Item.getById(id);
  item.name = name;
}

