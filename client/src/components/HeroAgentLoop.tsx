import { useEffect, useState } from 'react';

const LOOP_STEPS = [
  { tag: 'plan', line: 'decompose → 3 tool calls' },
  { tag: 'tool', line: 'mcp.search("user context")' },
  { tag: 'tool', line: 'workflow.run(build_step)' },
  { tag: 'eval', line: 'grounding check · pass' },
  { tag: 'done', line: 'handoff → UI · exit 0' },
] as const;

export function HeroAgentLoop() {
  const [visibleSteps, setVisibleSteps] = useState(0);
  const [cursorOn, setCursorOn] = useState(true);

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motion.matches) {
      setVisibleSteps(LOOP_STEPS.length);
      return;
    }

    const stepTimer = window.setInterval(() => {
      setVisibleSteps((count) => {
        if (count >= LOOP_STEPS.length) return 0;
        return count + 1;
      });
    }, 1400);

    const cursorTimer = window.setInterval(() => {
      setCursorOn((on) => !on);
    }, 530);

    return () => {
      window.clearInterval(stepTimer);
      window.clearInterval(cursorTimer);
    };
  }, []);

  const running = visibleSteps < LOOP_STEPS.length;

  return (
    <div className="hero-agent-loop" aria-label="Agent loop preview" role="img">
      <div className="hero-agent-loop__chrome">
        <span className="hero-agent-loop__lights" aria-hidden>
          <span />
          <span />
          <span />
        </span>
        <span className="hero-agent-loop__title">agent.loop</span>
        <span className={`hero-agent-loop__badge ${running ? 'is-live' : ''}`}>
          {running ? 'running' : 'idle'}
        </span>
      </div>
      <div className="hero-agent-loop__screen">
        <p className="hero-agent-loop__prompt">
          <span className="text-rust">$</span> run agent --max-steps 8 --env prod
        </p>
        <ol className="hero-agent-loop__steps">
          {LOOP_STEPS.slice(0, visibleSteps).map((step, i) => {
            const isLast = i === visibleSteps - 1;
            const branch = isLast && running ? '└─' : '├─';
            return (
              <li key={`${step.tag}-${i}`}>
                <span className="hero-agent-loop__branch">{branch}</span>
                <span className="hero-agent-loop__tag">{step.tag}</span>
                <span className="hero-agent-loop__line">{step.line}</span>
              </li>
            );
          })}
          {running && visibleSteps < LOOP_STEPS.length && (
            <li className="hero-agent-loop__cursor-line">
              <span className="hero-agent-loop__branch">└─</span>
              <span className={`hero-agent-loop__cursor ${cursorOn ? 'is-on' : ''}`} />
            </li>
          )}
        </ol>
      </div>
    </div>
  );
}
