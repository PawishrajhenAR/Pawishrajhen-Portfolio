import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Analytics } from './components/Analytics';
import { HomePage } from './pages/HomePage';

const BlogPage = lazy(() =>
  import('./pages/BlogPage').then((module) => ({ default: module.BlogPage })),
);
const BlogPostPage = lazy(() =>
  import('./pages/BlogPostPage').then((module) => ({ default: module.BlogPostPage })),
);

function PageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-cream text-[0.9rem] text-muted">
      Loading…
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Analytics />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/blog"
          element={
            <Suspense fallback={<PageLoader />}>
              <BlogPage />
            </Suspense>
          }
        />
        <Route
          path="/blog/:slug"
          element={
            <Suspense fallback={<PageLoader />}>
              <BlogPostPage />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
