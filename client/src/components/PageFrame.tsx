import { ReactNode } from 'react';

export function PageFrame({ children }: { children: ReactNode }) {
  return (
    <div className="page-shell">
      <div className="page-frame">{children}</div>
    </div>
  );
}

/** Small section label — not brackets, not all-caps */
export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="section-eyebrow">{children}</p>;
}
