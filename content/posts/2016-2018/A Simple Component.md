---
author: "Olof Sjögren"
date: 2017-02-16
title: A Simple Component
draft: true
---

React components implement a render() method that takes input data and returns what to display. This example uses an XML-like syntax called JSX. Input data that is passed into the component can be accessed by render() via this.props.

```jsx
render() {
  return (
    <div>
      Who do you wanna call? {this.props.name}!
    </div>
  );
}

ReactDOM.render(
  <MoviesFromBefore name="Ghostbusters" />,
  mountNode
);
```
