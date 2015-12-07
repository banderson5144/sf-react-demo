# React Redux Demo

We will be using two JavaScript libraries in this demo:
React and Redux.

##What is React:
* The “V” in MVC
* React abstracts away the DOM from you, giving a simpler programming model and
  better performance.
* Creates the view based on your Data

##What is Redux:
* Awesome
* A predictable state container for JavaScript apps (similar to Flux, Alt, etc.)
  Simple Overview
* The whole state of your app is stored in an object tree inside a single store.
* The only way to change the state tree is to emit an action, an object
  describing what happened.
* To specify how the actions transform the state tree, you write pure reducers.

##Parts of Redux:
###Actions
Actions are payloads of information that send data from your application to your
store. They are the only source of information for the store
```javascript
{
  type: ACTION_TYPE,
  ...Additional Data
}
```
