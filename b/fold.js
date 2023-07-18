export function fold(operator, initial, items) {
  if (operator === undefined) {
    return fold;
  }
  if (initial === undefined) {
    return (initial, items) => fold(operator, initial, items);
  }
  if (items === undefined) {
    return (items) => fold(operator, initial, items)
  }
  return items.reduce((acc, curr) => operator(acc, curr), initial)
}
