export type BlogBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'code'; code: string; lang?: string };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  /** 2–3 bullets — what you'll learn without reading the full post */
  tldr: string[];
  /** One line: who should read this */
  audience: string;
  date: string;
  readMinutes: number;
  tags: string[];
  featured?: boolean;
  body: BlogBlock[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: 'agent-loops-that-actually-stop',
    title: 'Agent loops that actually stop',
    excerpt:
      'Most “autonomous” demos never terminate. Here’s how I structure loops with clear exit conditions, tool budgets, and human handoff points.',
    tldr: [
      'Set a hard step cap and tool budget before the loop starts.',
      'Make the model return a structured done / blocked / needs-human signal.',
      'Never retry blindly — reconcile state after ambiguous tool calls.',
    ],
    audience: 'For anyone shipping agent loops beyond a demo.',
    date: '2026-06-26',
    readMinutes: 6,
    tags: ['agents', 'workflows'],
    featured: true,
    body: [
      {
        type: 'p',
        text: 'An agent that runs forever isn’t autonomous — it’s a while loop with marketing. Production agents need a finish line: a state you can explain to a client without hand-waving.',
      },
      {
        type: 'h2',
        text: 'Three things every loop needs',
      },
      {
        type: 'ul',
        items: [
          'A hard step cap — not “usually enough”, an actual number.',
          'A tool budget — how many external calls before the run is considered stuck.',
          'A done signal the model must emit — structured output, not vibes.',
        ],
      },
      {
        type: 'p',
        text: 'I default to something boring: the agent returns `{ status: "done" | "blocked" | "needs_human", summary: string }` on every iteration. If it forgets, the orchestrator injects a reminder. If it still forgets, the loop stops and surfaces the last good state.',
      },
      {
        type: 'h2',
        text: 'When to bail out early',
      },
      {
        type: 'p',
        text: 'Repeated identical tool calls are the biggest smell. Same args twice in a row? Stop. Two failures on the same tool? Stop. The goal isn’t to brute-force success — it’s to fail in a way someone can fix.',
      },
      {
        type: 'h3',
        text: 'Reconcile before you retry',
      },
      {
        type: 'p',
        text: 'If a tool call times out, don’t fire it again immediately. Read state first — did the side effect land? Missing work is recoverable. Duplicate work is messy. That discipline matters twice as much when you’re wiring real APIs with no idempotency keys.',
      },
      {
        type: 'h2',
        text: 'What I ship to clients',
      },
      {
        type: 'p',
        text: 'A visible run log, a frozen snapshot at stop time, and one button: continue or abort. Agents feel magical in demos. In prod they feel like cron jobs with opinions — and that’s fine, as long as they’re predictable cron jobs.',
      },
    ],
  },
  {
    slug: 'mcp-without-the-hype',
    title: 'MCP without the hype',
    excerpt:
      'Model Context Protocol is just structured tool access. What changes when you treat servers like microservices instead of magic plugins.',
    tldr: [
      'Write tool descriptions like docs for a tired model at 2am.',
      'One domain per MCP server — split early.',
      'Skills encode workflows; tools fetch data. Don’t confuse the two.',
    ],
    audience: 'For devs wiring MCP servers or reviewing tool schemas.',
    date: '2026-06-14',
    readMinutes: 5,
    tags: ['MCP', 'tools'],
    body: [
      {
        type: 'p',
        text: 'MCP clicked for me when I stopped thinking “AI plugin” and started thinking “typed HTTP with a schema the model can read”. The model doesn’t care about your clever server name — it cares whether the tool description is honest.',
      },
      {
        type: 'h2',
        text: 'Write tool descriptions for a tired model',
      },
      {
        type: 'p',
        text: 'Assume the model is on its third retry at 2am. Say what the tool does, what it returns, and what will break if args are wrong. One paragraph beats a bullet list of buzzwords.',
      },
      {
        type: 'h2',
        text: 'Keep servers small',
      },
      {
        type: 'ul',
        items: [
          'One domain per server — billing, search, deployments, not “everything”.',
          'Auth at the server boundary, not sprinkled in every handler.',
          'Version your schemas when you change response shapes.',
        ],
      },
      {
        type: 'p',
        text: 'I’ve seen monolithic MCP servers become undebuggable fast. Split early. Your future self is the one grep-ing logs at midnight.',
      },
      {
        type: 'h2',
        text: 'Skills vs raw tools',
      },
      {
        type: 'p',
        text: 'Skills package opinionated workflows on top of tools. Tools fetch data; skills encode how your team actually uses that data. Both belong in the stack — just don’t confuse a thin wrapper with a product feature.',
      },
    ],
  },
  {
    slug: 'when-not-to-build-an-agent',
    title: 'When not to build an agent',
    excerpt:
      'Sometimes the right architecture is a form, a queue, and a function. A short checklist before you add a planner.',
    tldr: [
      'Fixed steps with no judgment → script, not agent.',
      'Use agents when tool choice depends on messy input.',
      'Say no to agents when latency must stay under ~2 seconds.',
    ],
    audience: 'For founders and engineers scoping the first AI feature.',
    date: '2026-06-02',
    readMinutes: 4,
    tags: ['agents', 'product'],
    body: [
      {
        type: 'p',
        text: 'Not every workflow deserves a planner. If the steps are fixed, known, and the same every time — that’s a script with logging, not an agent.',
      },
      {
        type: 'h2',
        text: 'Skip the agent if…',
      },
      {
        type: 'ul',
        items: [
          'The input map is 1:1 to an API call with no judgment.',
          'Failure modes are binary and you already have retries.',
          'Latency budget is under two seconds end-to-end.',
          'You can’t explain the happy path in one sentence.',
        ],
      },
      {
        type: 'h2',
        text: 'Reach for an agent when…',
      },
      {
        type: 'ul',
        items: [
          'Tool choice depends on messy, unstructured input.',
          'Humans need an audit trail of reasoning, not just output.',
          'The task decomposes differently per run but shares guardrails.',
        ],
      },
      {
        type: 'p',
        text: 'Clients ask for agents because it’s the word in the pitch deck. Your job is to translate that into something maintainable — even if the answer is “deterministic pipeline with one LLM call at the end”.',
      },
    ],
  },
  {
    slug: 'evals-that-catch-regressions',
    title: 'Evals that catch regressions',
    excerpt:
      'Golden sets, spot checks, and the difference between demo evals and the ones you run before deploy.',
    tldr: [
      'Turn every production bug into a permanent eval case.',
      'Score tool choice and grounding — not BLEU or cosine similarity.',
      'Run evals in CI like tests, or they’re just documentation.',
    ],
    audience: 'For teams that deploy agents and need regression safety.',
    date: '2026-05-18',
    readMinutes: 5,
    tags: ['evals', 'workflows'],
    body: [
      {
        type: 'p',
        text: 'An eval that only runs on cherry-picked prompts is a mood board. Useful for vibes, useless for shipping.',
      },
      {
        type: 'h2',
        text: 'Start with failures you’ve already seen',
      },
      {
        type: 'p',
        text: 'Every production bug becomes a test case. Tool hallucination, wrong env, partial JSON, over-eager retries — if it burned you once, it belongs in the set. Growth should be ugly and practical.',
      },
      {
        type: 'h2',
        text: 'Score what matters',
      },
      {
        type: 'ul',
        items: [
          'Did it call the right tool with valid args?',
          'Did it stop within the step budget?',
          'Is the final answer grounded in tool output, not invention?',
        ],
      },
      {
        type: 'p',
        text: 'BLEU scores and cosine similarity won’t save you when the agent confidently emails the wrong customer. Structure beats semantics for agent evals.',
      },
      {
        type: 'h2',
        text: 'Run them like tests',
      },
      {
        type: 'p',
        text: 'Same command, same seed where possible, fail the build on regression. If evals only live in a notebook, they’re documentation — not engineering.',
      },
    ],
  },
];

export const blogTags = ['all', 'agents', 'workflows', 'MCP', 'tools', 'evals', 'product'] as const;

export type BlogTag = (typeof blogTags)[number];

export const blogTagGuide: Record<Exclude<BlogTag, 'all'>, { title: string; blurb: string }> = {
  agents: {
    title: 'Agents',
    blurb: 'Loops, planners, and when autonomy actually helps.',
  },
  workflows: {
    title: 'Workflows',
    blurb: 'Multi-step automations that ship in production.',
  },
  MCP: {
    title: 'MCP',
    blurb: 'Model Context Protocol — tools the model can call.',
  },
  tools: {
    title: 'Tools',
    blurb: 'Tool design, schemas, and integration patterns.',
  },
  evals: {
    title: 'Evals',
    blurb: 'Testing agents before users find the bugs.',
  },
  product: {
    title: 'Product',
    blurb: 'Scoping AI features clients will maintain.',
  },
};

function sortNewestFirst(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date));
}

export function getSortedPosts(): BlogPost[] {
  return sortNewestFirst(blogPosts);
}

export function getTagCounts(): Record<Exclude<BlogTag, 'all'>, number> {
  const counts = {
    agents: 0,
    workflows: 0,
    MCP: 0,
    tools: 0,
    evals: 0,
    product: 0,
  } as Record<Exclude<BlogTag, 'all'>, number>;

  for (const post of blogPosts) {
    for (const tag of post.tags) {
      const key = tag as Exclude<BlogTag, 'all'>;
      if (key in counts) counts[key] += 1;
    }
  }

  return counts;
}

export function filterPosts(query: string, tag: BlogTag): BlogPost[] {
  const normalized = query.trim().toLowerCase();
  let posts = tag === 'all' ? getSortedPosts() : getSortedPosts().filter((post) => post.tags.includes(tag));

  if (!normalized) return posts;

  return posts.filter(
    (post) =>
      post.title.toLowerCase().includes(normalized) ||
      post.excerpt.toLowerCase().includes(normalized) ||
      post.audience.toLowerCase().includes(normalized) ||
      post.tldr.some((line) => line.toLowerCase().includes(normalized)) ||
      post.tags.some((t) => t.toLowerCase().includes(normalized)),
  );
}

export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const current = getPostBySlug(slug);
  if (!current) return [];

  return getSortedPosts()
    .filter((post) => post.slug !== slug)
    .map((post) => ({
      post,
      score: post.tags.filter((tag) => current.tags.includes(tag)).length,
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || b.post.date.localeCompare(a.post.date))
    .slice(0, limit)
    .map(({ post }) => post);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getFeaturedPost(): BlogPost {
  return blogPosts.find((post) => post.featured) ?? blogPosts[0];
}

export function getAdjacentPosts(slug: string): {
  prev: BlogPost | null;
  next: BlogPost | null;
} {
  const chronological = [...blogPosts].sort((a, b) => a.date.localeCompare(b.date));
  const index = chronological.findIndex((post) => post.slug === slug);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index > 0 ? chronological[index - 1] : null,
    next: index < chronological.length - 1 ? chronological[index + 1] : null,
  };
}

export function formatBlogDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}
