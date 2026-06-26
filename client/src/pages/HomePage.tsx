import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Experience } from '../components/Experience';
import { ProjectsPinned } from '../components/ProjectsPinned';
import { Skills } from '../components/Skills';
import { Research } from '../components/Research';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';
import { PageFrame } from '../components/PageFrame';
import { ScrollProgress } from '../components/ScrollProgress';
import { AsciiPlacementProvider } from '../context/AsciiPlacementContext';
import { scrollToHash } from '../lib/smoothScroll';

export function HomePage() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const id = requestAnimationFrame(() => {
      scrollToHash(location.hash);
    });
    return () => cancelAnimationFrame(id);
  }, [location.hash]);

  return (
    <AsciiPlacementProvider>
      <div className="relative min-h-screen text-ink">
        <ScrollProgress />
        <PageFrame>
          <Navbar />
          <main>
            <Hero />
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
