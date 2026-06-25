import { useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { ProjectsPinned } from './components/ProjectsPinned';
import { Skills } from './components/Skills';
import { Research } from './components/Research';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { PageFrame } from './components/PageFrame';
import { Background } from './components/Background';
import { ScrollProgress } from './components/ScrollProgress';
import { AsciiPlacementProvider } from './context/AsciiPlacementContext';

export default function App() {
  useEffect(() => {
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return (
    <AsciiPlacementProvider>
      <div className="relative min-h-screen text-ink">
        <Background />
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
