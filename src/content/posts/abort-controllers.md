---
title: 'Abort Controllers'
date: 2025-05-24
description: Effectively remove event listeners and cancel promises in JavaScript.
author: 'fgkolf'
readingTime: '3min'
tags: ["javascript"]
image:
    url: '/src/assets/posts/abort-controllers.png'
    alt: 'A hand pressing a red abort button.'
---

### What is `AbortController`?

`AbortController` is a browser API ([MDN](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)) that allows you to create a signal (`AbortSignal`) and pass to certain APIs like `fetch`, `addEventListener`, and more. Calling `.abort()` on the controller triggers an "abort" signal, which notifies any listeners or handlers connected to that signal to cancel their operation.

A basic example:

```js
const controller = new AbortController();
const signal = controller.signal;
    
fetch('/api/data', { signal })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => {
    if (error.name === 'AbortError') {
      console.log('Fetch aborted');
    } else {
      console.error('Fetch failed:', error);
    }
  });

// Abort the request after 2 seconds
setTimeout(() => controller.abort(), 2000);
```

When the abort method is called, the fetch request is canceled, and the promise is rejected with an `AbortError`.

### Cleaning multiple cancellable effects

When working with browser APIs, you often introduce multiple event listeners or cancelable operations over the lifetime of an application or component, and managing these can become cumbersome.

Let's explore a common case of a React component, where we add a couple of event listeners on mount and need to clean them up on unmount.

Traditionally, you might write cleanup code like this:

```js
useEffect(() => {
  document.addEventListener('scroll', onScroll);
  document.addEventListener('resize', onResize);

  return () => {
    document.removeEventListener('scroll', onScroll);
    document.removeEventListener('resize', onResize);
  };
}, []);
```

### A Better Way: Using `AbortController`

Modern browsers allow `addEventListener` to accept a `signal` option. By passing an `AbortSignal`, we can automatically remove all listeners at once just by calling `.abort()` in the cleanup function.

```js
useEffect(() => {
  const abortController = new AbortController();
  const signal = abortController.signal;

  document.addEventListener('scroll', onScroll, { signal });
  document.addEventListener('resize', onResize, { signal });

  return () => {
    abortController.abort(); // Removes everyting tied to the signal
  };
}, []);
```

Finally, let's go even further and use the `AbortController` to also cancel a `fetch` request, along with the event listeners:

```js
useEffect(() => {
  const abortController = new AbortController();
  const signal = abortController.signal;

  fetch('/api/data', { signal })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => { console.error(error) });

  document.addEventListener('scroll', onScroll, { signal });
  document.addEventListener('resize', onResize, { signal });

  return () => {
    abortController.abort(); // Cancels the fetch request
  };
}, []);
```