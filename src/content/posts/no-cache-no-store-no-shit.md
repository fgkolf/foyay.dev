---
title: 'no-cache no-store (no-shit)'
date: 2025-05-01
description: A guide on how to finally stop caching that damn JSON response. When to use each of them and how to distinguish.
author: 'fgkolf'
readingTime: '3min'
tags: ["http"]
image:
    url: '/src/assets/posts/no-cache-no-store-no-shit.png'
    alt: 'A belt with suspenders'
---

I am sure it's not the first time you see this header:  
```
Cache-Control: no-cache, no-store
```
You’ve seen it in the wild. Maybe you’ve even copy-pasted it into your headers, fingers crossed that your browser finally stops caching that damn JSON response. But what do these directives actually mean, and why are they often used together?

### `no-store`: Nothing saved

Tells the browser:  
**“Don’t store this anywhere — not even temporarily.”**  
Used for highly dynamic data or personalized/sensitive information.

### `no-cache`: Check first

Means:  
**“You *can* cache this, but you have to ask me before using it again.”**  
Useful when content changes often but caching still helps.

### Why both?

Because sometimes one isn't enough. Using both says:  
**"Don't cache. But if you somehow do... revalidate first."**  
It’s overkill, but it’s safe. Think belt *and* suspenders.

### TL;DR

- `no-store` = burn after reading
- `no-cache` = ask before reuse
- both = cover your ass

Bonus tip: Always combine these with the right headers (Pragma, Expires) if you're dealing with legacy HTTP/1.0 clients — but i hope you don’t care about IE6.

Inspired by this [stack-overflow post](https://stackoverflow.com/questions/866822/why-both-no-cache-and-no-store-should-be-used-in-http-response)