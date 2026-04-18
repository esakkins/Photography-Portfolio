import { lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const Hero = lazy(() => import('./components/Hero'));
const About = lazy(() => import('./components/About'));
const Portfolio = lazy(() => import('./components/Portfolio'));
const Services = lazy(() => import('./components/Services'));
const Contact = lazy(() => import('./components/Contact'));

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0D0D0D]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-3 border-[#D4A574] border-t-transparent rounded-full animate-spin" />
        <p className="text-[#A69B8D] text-sm">Loading...</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-[#0D0D0D]">
      <div style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        opacity: 0.03,
        zIndex: 9999,
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")'
      }} />
      <Navbar />
      <main>
        <Suspense fallback={<LoadingFallback />}>
          <Hero />
          <Suspense fallback={<LoadingFallback />}>
            <About />
            <Portfolio />
            <Services />
            <Contact />
          </Suspense>
        </Suspense>
      </main>
      <Footer />
      <a
        href="https://wa.me/919840492748"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50"
        style={{ width: 60, height: 60 }}
      >
        <div
          className="w-full h-full rounded-full flex items-center justify-center relative overflow-hidden animate-bounce-spring"
          style={{
            background: 'linear-gradient(145deg, #25D366, #128C7E)',
            boxShadow: `
              0 0 0 3px rgba(37, 211, 102, 0.3),
              0 0 0 6px rgba(37, 211, 102, 0.1),
              0 4px 20px rgba(37, 211, 102, 0.5)
            `,
          }}
        >
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 0%, transparent 50%)',
            }}
          />
          <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7 relative z-10">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          <div
            className="absolute inset-0 rounded-full"
            style={{
              boxShadow: 'inset 0 0 10px rgba(255,255,255,0.2)',
            }}
          />
        </div>
        <style>{`
          @keyframes bounce-spring {
            0%, 100% { transform: translateY(0); }
            30% { transform: translateY(-12px); }
            50% { transform: translateY(-4px); }
            70% { transform: translateY(-8px); }
          }
          .animate-bounce-spring {
            animation: bounce-spring 2s ease-in-out infinite;
          }
        `}</style>
      </a>
    </div>
  );
}

export default App;