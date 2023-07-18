# General questions

1. How do Promises work?
2. What kind of scopes are in Javascript? What are the differences between them? 
3. What is type coercion and when is it used?
4. Explain the difference between passing argument as a value and as a reference.
5. What are the local storage, session storage and cookies used for?
6. What are the key differences between regular and arrow functions?
7. When would you use destructuring assignment?
8. What is optional chaining useful for?
9. Explain why following code does not work as one would expect it to. How would you fix it?
```js
class IdGenerator {
  lastId = 0;
  getId() {
    return this.lastId++;
  }
}
const { getId } = new IdGenerator();
const people = ["Tom", "Kate", "Taylor"].map(name => ({name, id: getId()}));
```
10. Explain the difference:
```ts
const a: string = "hello";
const a = "hello" as string;
```
