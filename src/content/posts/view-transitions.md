---
title: 'Enabling View Transitions'
date: 2025-06-14
description: Get Single Page Application transitions with minimal effort using CSS.
author: 'fgkolf'
readingTime: '2min'
tags: ["css", "web"]
image:
  url: '/src/assets/posts/view-transitions.png'
  alt: 'An siege full of olives in a field.'
---

### Living the SPA dream

I've been around web development for a couple of years now and lived the single page application (SPA) dream.
Watching a site using the old full page reload way, felt like visiting a museum.
So when I stumbled upon [View Transitions](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API), I was thrilled.

I was able to get the same SPA-like transitions in my vanilla projects now!

The best part is how simple they are to implement. Here's all you need to add to your CSS:

### How to enable view transitions

```css
@media (prefers-reduced-motion: no-preference) {
    @view-transition {
        navigation: auto;
    }
}
```

This code enables view transitions between pages in your web application.
Elements that exist on both pages will appear to morph from one state to another.

It does this only for users who haven't requested reduced motion, ensuring your site respects accessibility preferences.

That's it! Your site now supports view transitions while maintaining a great experience for all users.

### What's more about them?

There are many more to view transitions than that, like transitioning specific elements and handling their state changes between pages, but personally i find
these 3 lines of css to be the greatest feature of it.

You can explore more about view transitions in the [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API).
