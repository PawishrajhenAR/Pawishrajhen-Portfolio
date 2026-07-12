# Blog content (future)

Posts currently live in `src/data/blog.ts`. When you reach ~8–10 posts, migrate to markdown here:

```
content/blog/
  agent-loops-that-actually-stop.md
  mcp-without-the-hype.md
  ...
```

## Frontmatter format

```yaml
---
slug: agent-loops-that-actually-stop
title: Agent loops that actually stop
excerpt: Most autonomous demos never terminate...
tldr:
  - Set a hard step cap and tool budget
audience: For anyone shipping agent loops beyond a demo.
date: 2026-06-26
readMinutes: 6
tags: [agents, workflows]
featured: true
---
```

Body uses standard markdown. A build script (`scripts/generate-blog.mjs`) can compile these into `blog.generated.ts` using `gray-matter` — wire it into `npm run build` when you migrate.
