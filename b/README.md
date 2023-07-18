# NodeJS Candidate Test

## Basic knowledge questions

1. What is the difference between Asynchronous and Non-blocking?
2. What tools can be used to assure consistent style?
3. Is Node.js entirely based on a single-thread?
4. What is difference between JavaScript and Node.js?
5. What is TypeScript? Do you use it? Why / why not?
6. What are the key differences between regular and arrow functions?
7. Explain why following code does not work as one would expect it to. How would you fix it?
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
8. What are the types of AWS Lambda errors?
9. What are differences between AWS Lambda invocation types?
10. What mechanisms for error handling are provided by AWS?
11. Explain the difference between user pool and identity pool in AWS Cognito.

## Programming tasks

1. In file `items.js` you will find that some code is missing. Please write your implementation for `Item` class in marked area. Make sure all functions using that class are working correctly.

2. In file `fold.js` you will find simple implementation of popular `fold` function. Write type declaration file as accurate as possible for this function.

3. Directory `users` contains application for managing users, but the code is full of bugs. Fix them and write a short report on your debugging process and the changes you made.

4. Create a free tier AWS account and configure Cognito user pool. Create simple Vue.js application allowing users to sign in with email address.