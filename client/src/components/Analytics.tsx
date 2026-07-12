import { useEffect } from 'react';

export function Analytics() {
  const domain = import.meta.env.VITE_PLAUSIBLE_DOMAIN as string | undefined;

  useEffect(() => {
    if (!domain) return;

    const script = document.createElement('script');
    script.defer = true;
    script.dataset.domain = domain;
    script.src = 'https://plausible.io/js/script.js';
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [domain]);

  return null;
}
