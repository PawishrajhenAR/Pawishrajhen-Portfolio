import type { BlogBlock } from '../data/blog';

type BlogPostBodyProps = {
  blocks: BlogBlock[];
};

export function BlogPostBody({ blocks }: BlogPostBodyProps) {
  return (
    <article className="blog-prose">
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'p':
            return <p key={i}>{block.text}</p>;
          case 'h2':
            return (
              <h2 key={i} id={slugify(block.text)}>
                {block.text}
              </h2>
            );
          case 'h3':
            return (
              <h3 key={i} id={slugify(block.text)}>
                {block.text}
              </h3>
            );
          case 'ul':
            return (
              <ul key={i}>
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );
          case 'code':
            return (
              <pre key={i} className="blog-code">
                <code>{block.code}</code>
              </pre>
            );
          default:
            return null;
        }
      })}
    </article>
  );
}

export function getHeadings(blocks: BlogBlock[]): { id: string; text: string; level: 2 | 3 }[] {
  return blocks
    .filter((block): block is Extract<BlogBlock, { type: 'h2' | 'h3' }> =>
      block.type === 'h2' || block.type === 'h3',
    )
    .map((block) => ({
      id: slugify(block.text),
      text: block.text,
      level: block.type === 'h2' ? 2 : 3,
    }));
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}
