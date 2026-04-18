import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const galleryImages = [
  { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80', title: 'Portrait' },
  { url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32dfb?w=600&q=80', title: 'Landscape' },
  { url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80', title: 'Wedding' },
  { url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&q=80', title: 'Couple' },
  { url: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=600&q=80', title: 'Nature' },
  { url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80', title: 'Product' },
];

const phrases = [
  { text: "Capturing Moments", gradient: false },
  { text: "Creating Memories", gradient: true },
  { text: "Framing Stories", gradient: true },
  { text: "Freezing Time", gradient: false },
  { text: "Painting with Light", gradient: true },
];

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [activeIndex, isTransitioning]);

  const goToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
    setTimeout(() => setIsTransitioning(false), 1000);
  };

  const goToPrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveIndex((prev) => (prev + 1) % galleryImages.length);
    setTimeout(() => setIsTransitioning(false), 1000);
  };
    
  useEffect(() => {
    const phrase = phrases[currentPhrase].text;
    
    if (isTyping) {
      let index = 0;
      const timer = setInterval(() => {
        if (index <= phrase.length) {
          setDisplayText(phrase.slice(0, index));
          index++;
        } else {
          clearInterval(timer);
          setTimeout(() => setIsTyping(false), 2000);
        }
      }, 120);
      return () => clearInterval(timer);
    } else {
      let index = phrase.length;
      const timer = setInterval(() => {
        if (index >= 0) {
          setDisplayText(phrase.slice(0, index));
          index--;
        } else {
          clearInterval(timer);
          setCurrentPhrase((prev) => (prev + 1) % phrases.length);
          setIsTyping(true);
        }
      }, 60);
      return () => clearInterval(timer);
    }
  }, [currentPhrase, isTyping]);

  const handleScrollClick = () => {
    const element = document.querySelector('#about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getVisibleIndices = (center) => {
    const indices = [];
    for (let i = -3; i <= 3; i++) {
      indices.push((center + i + galleryImages.length) % galleryImages.length);
    }
    return indices;
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-accent/5" />
      
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <div className="text-center md:text-left order-2 md:order-1 z-20">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-accent text-sm tracking-[0.3em] uppercase mb-4 block"
          >
            Photography Portfolio
          </motion.span>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading text-text-primary mb-6 min-h-[1.2em]">
            <div className="typing-wrapper">
              <span className={phrases[currentPhrase].gradient ? "typing-gradient" : ""}>
                {displayText}
              </span>
              <span className="typing-cursor" />
            </div>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-text-secondary text-lg max-w-xl mx-auto md:mx-0 mb-8 font-body"
          >
            A visual journey through light, shadow, and the art of seeing the unseen.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="flex gap-6 justify-center md:justify-start"
          >
            <a href="#portfolio" className="view-work-btn">
              <span className="btn-text">View Work</span>
              <span className="btn-shimmer" />
              <span className="btn-corner tl" />
              <span className="btn-corner tr" />
              <span className="btn-corner bl" />
              <span className="btn-corner br" />
            </a>
            
            <a href="#contact" className="get-touch-btn">
              <span className="btn-content">
                <span className="btn-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 2v4m0 12v4M2 12h4m12 0h4" />
                  </svg>
                </span>
                <span className="btn-text">Get in Touch</span>
              </span>
              <span className="btn-ring" />
              <span className="btn-ring delay" />
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="order-1 md:order-2"
        >
          <div className="film-strip-container" ref={containerRef}>
            <div className="film-strip-track">
              {getVisibleIndices(activeIndex).map((idx, position) => {
                const distance = Math.abs(position - 3);
                const isCenter = distance === 0;
                const isVisible = distance < 3;
                
                return (
                  <motion.div
                    key={`${activeIndex}-${idx}`}
                    className="film-frame-wrapper"
                    initial={false}
                    animate={{
                      x: (position - 3) * 180,
                      scale: isCenter ? 1 : isVisible ? 0.75 : 0.5,
                      opacity: isVisible ? 1 : 0.3,
                      zIndex: 10 - distance,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 100,
                      damping: 20,
                      duration: 0.8,
                    }}
                    onClick={() => {
                      if (!isCenter && !isTransitioning) {
                        setIsTransitioning(true);
                        setActiveIndex(idx);
                        setTimeout(() => setIsTransitioning(false), 1000);
                      }
                    }}
                    style={{ cursor: isCenter ? 'default' : 'pointer' }}
                  >
                    <motion.div 
                      className={`film-frame ${isCenter ? 'active' : ''}`}
                      animate={isCenter ? { scale: [1, 1.02, 1] } : {}}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <img 
                        src={galleryImages[idx].url} 
                        alt={galleryImages[idx].title}
                        className="film-image"
                      />
                      <div className="film-sprockets left">
                        {[...Array(8)].map((_, i) => (
                          <div key={i} className="sprocket-hole" />
                        ))}
                      </div>
                      <div className="film-sprockets right">
                        {[...Array(8)].map((_, i) => (
                          <div key={i} className="sprocket-hole" />
                        ))}
                      </div>
                      {isCenter && (
                        <motion.div 
                          className="film-label"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          {galleryImages[idx].title}
                        </motion.div>
                      )}
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        onClick={handleScrollClick}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer group"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="w-6 h-10 border-2 border-accent/30 rounded-full flex justify-center pt-2 group-hover:border-accent/60 transition-colors"
        >
          <ChevronDown className="w-4 h-4 text-accent" />
        </motion.div>
      </motion.button>

      <style>{`
        .film-strip-container {
          position: relative;
          width: 100%;
          max-width: 600px;
          height: 320px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .film-strip-track {
          position: relative;
          width: 100%;
          height: 240px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .film-frame-wrapper {
          position: absolute;
          width: 160px;
          height: 200px;
        }

        .film-frame {
          width: 100%;
          height: 100%;
          position: relative;
          border-radius: 4px;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
          transition: box-shadow 0.3s ease;
        }

        .film-frame.active {
          box-shadow: 0 12px 48px rgba(212, 165, 116, 0.3), 0 0 0 2px rgba(212, 165, 116, 0.5);
        }

        .film-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .film-sprockets {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 12px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 8px 0;
        }

        .film-sprockets.left {
          left: 0;
        }

        .film-sprockets.right {
          right: 0;
        }

        .sprocket-hole {
          width: 6px;
          height: 10px;
          background: #0D0D0D;
          border-radius: 2px;
        }

        .film-label {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0, 0, 0, 0.8);
          color: #D4A574;
          padding: 6px 16px;
          border-radius: 4px;
          font-size: 12px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .film-navigation {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-top: 20px;
        }

        .nav-btn {
          width: 40px;
          height: 40px;
          border: 1px solid rgba(212, 165, 116, 0.3);
          background: transparent;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .nav-btn:hover {
          border-color: #D4A574;
          background: rgba(212, 165, 116, 0.1);
        }

        .nav-btn svg {
          width: 18px;
          height: 18px;
          color: #D4A574;
        }

        .film-indicators {
          display: flex;
          gap: 8px;
        }

        .film-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(212, 165, 116, 0.3);
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .film-dot.active {
          background: #D4A574;
          box-shadow: 0 0 10px rgba(212, 165, 116, 0.5);
        }

        @media (max-width: 768px) {
          .film-strip-container {
            height: 280px;
          }

          .film-strip-track {
            height: 200px;
          }

          .film-frame-wrapper {
            width: 120px;
            height: 160px;
          }
        }

        .camera-3d-container {
          perspective: 1000px;
          transform-style: preserve-3d;
        }

        .camera-scene {
          position: relative;
          width: 300px;
          height: 220px;
          transform-style: preserve-3d;
        }

        .camera-body-group {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%) rotateX(5deg);
          transform-style: preserve-3d;
        }

        .camera-body {
          position: relative;
          width: 220px;
          height: 150px;
          background: linear-gradient(160deg, #2d2924 0%, #1a1815 50%, #141211 100%);
          border-radius: 16px;
          box-shadow: 
            25px 25px 50px rgba(0, 0, 0, 0.6),
            -5px -5px 25px rgba(60, 50, 40, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.08);
          transform: translateZ(30px);
          padding: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: box-shadow 0.3s;
        }

        .camera-body:hover {
          box-shadow: 
            25px 25px 50px rgba(0, 0, 0, 0.6),
            -5px -5px 25px rgba(212, 165, 116, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.08),
            0 0 30px rgba(212, 165, 116, 0.15);
        }

        .camera-lens-outer {
          position: relative;
          width: 90px;
          height: 90px;
          border-radius: 50%;
          background: linear-gradient(145deg, #3d3933 0%, #1f1d1a 100%);
          box-shadow: 
            inset 0 0 25px rgba(0, 0, 0, 0.9),
            0 0 15px rgba(0, 0, 0, 0.5),
            0 4px 8px rgba(0, 0, 0, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .camera-lens-inner {
          width: 65px;
          height: 65px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 35%, #5a5550 0%, #1a1815 40%, #050505 90%);
          box-shadow: 
            inset 0 0 20px rgba(0, 0, 0, 0.95),
            inset 2px 2px 4px rgba(255, 255, 255, 0.05);
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .lens-glass {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          overflow: hidden;
        }

        .lens-reflection {
          position: absolute;
          top: 12%;
          left: 18%;
          width: 25%;
          height: 25%;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.5) 0%, transparent 70%);
          border-radius: 50%;
          animation: lensShimmer 3s ease-in-out infinite;
        }

        .lens-reflection.secondary {
          top: 50%;
          left: 55%;
          width: 15%;
          height: 15%;
          background: radial-gradient(circle, rgba(212, 165, 116, 0.3) 0%, transparent 70%);
          animation: lensShimmer 3s ease-in-out infinite 0.5s;
        }

        @keyframes lensShimmer {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }

        .lens-aperture {
          position: absolute;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: 2px solid rgba(80, 75, 65, 0.8);
          box-shadow: 0 0 10px rgba(212, 165, 116, 0.3);
        }

        .lens-ring-outer {
          position: absolute;
          width: 110px;
          height: 110px;
          border-radius: 50%;
          border: 2px solid rgba(212, 165, 116, 0.2);
        }

        .lens-ring-segment {
          position: absolute;
          width: 100%;
          height: 100%;
          border: 2px dashed rgba(212, 165, 116, 0.3);
          border-radius: 50%;
        }

        .lens-ring-segment:nth-child(1) { transform: rotate(0deg); }
        .lens-ring-segment:nth-child(2) { transform: rotate(90deg); }
        .lens-ring-segment:nth-child(3) { transform: rotate(180deg); }
        .lens-ring-segment:nth-child(4) { transform: rotate(270deg); }

        .camera-shutter-group {
          position: absolute;
          top: 20%;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }

        .shutter-button {
          width: 30px;
          height: 6px;
          background: linear-gradient(180deg, #4a4540 0%, #2d2924 100%);
          border-radius: 3px;
          cursor: pointer;
        }

        .shutter-label {
          font-size: 6px;
          color: rgba(166, 155, 141, 0.6);
          letter-spacing: 0.5px;
        }

        .camera-grip {
          position: absolute;
          right: -12px;
          top: 25%;
          width: 18px;
          height: 70px;
          background: linear-gradient(90deg, #1a1815 0%, #2d2924 50%, #1a1815 100%);
          border-radius: 0 8px 8px 0;
          box-shadow: inset -3px 0 6px rgba(0, 0, 0, 0.4);
        }

        .camera-top-section {
          position: absolute;
          top: -12px;
          left: 15%;
          width: 70%;
          height: 16px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .viewfinder-window {
          width: 30px;
          height: 14px;
          background: linear-gradient(180deg, #1a1815 0%, #0d0c0a 100%);
          border-radius: 3px 3px 0 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .viewfinder-inner {
          width: 18px;
          height: 8px;
          background: #0a0908;
          border-radius: 2px;
        }

        .hot-shoe {
          width: 16px;
          height: 8px;
          background: #3d3933;
          border-radius: 2px;
        }

        .mode-dial {
          width: 20px;
          height: 12px;
          background: #2d2924;
          border-radius: 2px;
          display: flex;
          align-items: center;
          justify-content: space-around;
          padding: 0 3px;
        }

        .dial-marking {
          width: 2px;
          height: 4px;
          background: rgba(166, 155, 141, 0.5);
        }

        .flash-unit {
          position: absolute;
          top: 18%;
          right: 8%;
          width: 24px;
          height: 14px;
          background: #2d2924;
          border-radius: 3px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .flash-icon {
          width: 14px;
          height: 14px;
          color: #D4A574;
        }

        .brand-text {
          position: absolute;
          bottom: 8px;
          right: 12px;
          font-size: 8px;
          letter-spacing: 2px;
          color: rgba(212, 165, 116, 0.4);
          font-weight: 600;
        }

        .camera-base-plate {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%) rotateX(60deg);
          width: 240px;
          height: 35px;
          background: linear-gradient(160deg, #1a1815 0%, #0d0c0a 100%);
          border-radius: 0 0 16px 16px;
          box-shadow: 0 25px 40px rgba(0, 0, 0, 0.5);
        }

        .lens-mount-group {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .lens-mount-ring {
          width: 120px;
          height: 120px;
          border: 3px solid rgba(212, 165, 116, 0.15);
          border-radius: 50%;
        }

        .floating-particles {
          position: absolute;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: #D4A574;
          border-radius: 50%;
        }

        .typing-wrapper {
          display: inline-block;
        }

        .typing-gradient {
          background: linear-gradient(135deg, #D4A574, #E8C9A0);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          display: inline;
        }

        .typing-cursor {
          display: inline-block;
          width: 4px;
          height: 0.85em;
          background: #D4A574;
          margin-left: 3px;
          vertical-align: text-bottom;
          animation: cursorBlink 0.8s ease-in-out infinite;
        }

@keyframes cursorBlink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        
        .view-work-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          padding: 14px 32px;
          background: #D4A574;
          color: #0D0D0D;
          font-family: 'Outfit', sans-serif;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          overflow: hidden;
          transition: all 0.4s ease;
        }
        
        .view-work-btn:hover {
          box-shadow: 0 0 30px rgba(212, 165, 116, 0.5), 0 0 60px rgba(212, 165, 116, 0.2);
        }
        
        .view-work-btn .btn-text {
          position: relative;
          z-index: 1;
        }
        
        .view-work-btn .btn-shimmer {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          animation: shimmer 2s infinite;
        }
        
        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 100%; }
        }
        
        .view-work-btn .btn-corner {
          position: absolute;
          width: 8px;
          height: 8px;
          border-color: #0D0D0D;
          transition: all 0.3s ease;
        }
        
        .view-work-btn .btn-corner.tl {
          top: 0;
          left: 0;
          border-top: 2px solid;
          border-left: 2px solid;
        }
        
        .view-work-btn .btn-corner.tr {
          top: 0;
          right: 0;
          border-top: 2px solid;
          border-right: 2px solid;
        }
        
        .view-work-btn .btn-corner.bl {
          bottom: 0;
          left: 0;
          border-bottom: 2px solid;
          border-left: 2px solid;
        }
        
        .view-work-btn .btn-corner.br {
          bottom: 0;
          right: 0;
          border-bottom: 2px solid;
          border-right: 2px solid;
        }
        
        .view-work-btn:hover .btn-corner {
          width: 12px;
          height: 12px;
        }
        
        .get-touch-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          padding: 12px 28px;
          background: transparent;
          color: #D4A574;
          font-family: 'Outfit', sans-serif;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          overflow: visible;
          transition: all 0.4s ease;
        }
        
        .get-touch-btn .btn-content {
          display: flex;
          align-items: center;
          gap: 10px;
          z-index: 1;
        }
        
        .get-touch-btn .btn-icon {
          width: 18px;
          height: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: focus-pulse 2s infinite;
        }
        
        .get-touch-btn .btn-icon svg {
          width: 14px;
          height: 14px;
        }
        
        @keyframes focus-pulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        
        .get-touch-btn .btn-ring {
          position: absolute;
          inset: 0;
          border: 1px solid #D4A574;
          border-radius: 0;
          opacity: 0.3;
          transition: all 0.4s ease;
        }
        
        .get-touch-btn .btn-ring.delay {
          animation: ring-expand 2s infinite;
          animation-delay: 1s;
        }
        
        @keyframes ring-expand {
          0% { transform: scale(1); opacity: 0.3; }
          100% { transform: scale(1.1); opacity: 0; }
        }
        
        .get-touch-btn:hover {
          background: rgba(212, 165, 116, 0.1);
        }
        
        .get-touch-btn:hover .btn-ring {
          opacity: 1;
          box-shadow: 0 0 20px rgba(212, 165, 116, 0.3);
        }
        
        @media (max-width: 768px) {
          .camera-scene {
            width: 220px;
            height: 160px;
          }
          
          .camera-body {
            width: 160px;
            height: 110px;
          }
          
          .camera-lens-outer {
            width: 65px;
            height: 65px;
          }
          
          .camera-lens-inner {
            width: 48px;
            height: 48px;
          }
        }
      `}</style>
    </section>
  );
}