import { useEffect, useMemo } from 'react';

type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

export function JsonLd({ data }: JsonLdProps) {
  const serialized = useMemo(() => JSON.stringify(data), [data]);

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = serialized;
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, [serialized]);

  return null;
}
