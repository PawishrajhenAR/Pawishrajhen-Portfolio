import { projectAsciiAccent } from '../data/ascii/arts/ascii-project-accent';

type ProjectAsciiAccentProps = {
  className?: string;
};

export function ProjectAsciiAccent({ className = '' }: ProjectAsciiAccentProps) {
  return (
    <div className={`project-ascii-accent ${className}`.trim()}>
      <div className="project-ascii-accent__scale">
        <pre className="ascii-art ascii-art--project" aria-hidden>
          {projectAsciiAccent.content}
        </pre>
      </div>
    </div>
  );
}
