---
title: Hosting a Website for Zero Bucks
date: 2026-09-28
draft: false
description: How this site is built, hosted and edited without paying a cent.
tags:
  - hosting
  - cms
image:
  url: /src/assets/posts/zero-cost.png
  alt: Mug sold at zero price
---
### The bill

This site costs me nothing to run. No servers, no databases, no monthly invoice sitting in my inbox.

Well... except the domain. Someone has to keep the registrar happy.

### The stack

- A static site generator
- Markdown files in a GitHub repo
- Cloudflare Workers for hosting
- Pages CMS for editing

That's it. No backend anywhere in this list.

### Why static

A blog post doesn't change between requests. So why build it on every request?

A static generator turns markdown into plain HTML, CSS and images once, at build time. The result is a folder of files, and serving files is what a CDN is best at. There's no server to patch and nothing that crashes at 3am.

I use [Astro]([https://astro.build](https://astro.build)), but it's not the important part here. Hugo, Eleventy, Jekyll or a hand-written script would work just as well. The only thing that matters is the output: a `dist` folder you can put on any host.

The content is plain markdown with some front matter on top:

```md
---
title: Abort Controllers
date: 2025-05-24
draft: false
tags:
  - javascript
---

### What is an `AbortController`?
...
```

### ### Shipping it to Cloudflare

The site is hosted on [Cloudflare Workers]([https://workers.cloudflare.com](https://workers.cloudflare.com)). The dashboard calls the section "Workers & Pages", which is confusing, but for a static site it doesn't really matter. You connect the repo once and forget about it.

Every push to `master` builds the site and deploys it to Cloudflare's network. No CI config, no tokens, no secrets in the repo.

On the free plan, requests for static files are free and unlimited, and you get a custom domain and HTTPS. For a personal blog, that's effectively infinite.

### The missing piece: editing

Everything above has one weak spot. Writing a post meant opening a laptop, an editor and a terminal, typing front matter by hand, then committing and pushing. Good luck doing that from your phone.

That's where [Pages CMS]([https://pagescms.org](https://pagescms.org)) comes in. It's an top of your GitHub repo:

- you log in with GitHub
- it reads a `.pages.yml` file from the repo
- it gives you forms and a rich text editor for your content
- saving an entry is just a commit

That commit triggers Cloudflare, and the loop closes. There's no extra database or backend, and the content never leaves the repo.

The config is a description of your content:

```yaml
media:
  input: src/assets
  output: /src/assets
content:
  - name: posts
    label: Posts
    type: collection
    path: src/content/posts
    fields:
      - { name: title, label: Title, type: string, required: tr
      - { name: date, label: Date, type: date, required: true }
      - { name: draft, label: Draft, type: boolean, default: fa
      - { name: tags, label: Tags, type: string, list: true, required: true }
      - name: body
        label: Body
        type: rich-text
        options: { format: markdown }
```

- **Hosted or self-hosted.** [app.pagescms.org]([https://app.pagescms.org](https://app.pagescms.org)) is free to use, and since it's open source you can also run your own.

### The total

- Hosting: 0
- Servers: 0
- Deploy pipeline in the repo: 0 lines

And this post was written in Pages CMS, so if you're reading it, the whole thing works.