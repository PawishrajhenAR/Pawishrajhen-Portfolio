import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { Now } from '../components/Now';
import { Stats } from '../components/Stats';
import { About } from '../components/About';
import { Experience } from '../components/Experience';
import { ProjectsPinned } from '../components/ProjectsPinned';
import { Skills } from '../components/Skills';
import { Research } from '../components/Research';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';
import { PageFrame } from '../components/PageFrame';
import { ScrollProgress } from '../components/ScrollProgress';
import { JsonLd } from '../components/JsonLd';
import { AsciiPlacementProvider } from '../context/AsciiPlacementContext';
import { usePageMeta } from '../hooks/usePageMeta';
import { projects, site } from '../data/content';
import { DEFAULT_OG_IMAGE } from '../lib/seo';
import { scrollToHash } from '../lib/smoothScroll';

export function HomePage() {
  const location = useLocation();

  usePageMeta({
    title: `${site.name} — ${site.title}`,
    description: site.tagline,
    image: DEFAULT_OG_IMAGE,
    path: '/',
  });

  const structuredData = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Person',
          name: site.name,
          jobTitle: site.title,
          url: site.url,
          email: site.email,
          sameAs: [site.social.github, site.social.linkedin, site.social.instagram],
        },
        ...projects
          .filter((project) => project.featured)
          .map((project) => ({
            '@type': 'CreativeWork',
            name: project.title,
            description: project.description,
            url: project.github,
            author: { '@type': 'Person', name: site.name },
          })),
      ],
    }),
    [],
  );

  useEffect(() => {
    if (!location.hash) return;
    const id = requestAnimationFrame(() => {
      scrollToHash(location.hash);
    });
    return () => cancelAnimationFrame(id);
  }, [location.hash]);

  return (
    <AsciiPlacementProvider>
      <JsonLd data={structuredData} />
      <div className="relative min-h-screen text-ink">
        <ScrollProgress />
        <PageFrame>
          <Navbar />
          <main>
            <Hero />
            <Now />
            <Stats />
            <About />
            <Experience />
            <ProjectsPinned />
            <Skills />
            <Research />
            <Contact />
          </main>
          <Footer />
        </PageFrame>
      </div>
    </AsciiPlacementProvider>
  );
}
