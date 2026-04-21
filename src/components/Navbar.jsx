import { useState, useEffect } from 'react';
import { Aperture, Menu, X, Star, Sparkles, Camera, Heart, Zap, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'Home', href: '#home', icon: Star },
  { name: 'About', href: '#about', icon: Sparkles },
  { name: 'Portfolio', href: '#portfolio', icon: Camera },
  { name: 'Services', href: '#services', icon: Heart },
  { name: 'Feedback', href: '#feedback', icon: MessageCircle },
  { name: 'Contact', href: '#contact', icon: Zap },
];

function NavLink({ link, isActive, onClick }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    onClick();
  };

  return (
    <a
      href={link.href}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="nav-item group"
    >
      <div className="aperture-wrapper">
        <motion.div
          className="aperture-ring"
          animate={{
            scale: isHovered ? 1 : 0.8,
            rotate: isHovered ? 90 : 0,
          }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <div className="aperture-blade blade-1" />
          <div className="aperture-blade blade-2" />
          <div className="aperture-blade blade-3" />
          <div className="aperture-blade blade-4" />
        </motion.div>
        <div className="aperture-center" />
      </div>
      
      <motion.span
        className="nav-text"
        animate={{
          color: isHovered ? '#D4A574' : isActive ? '#D4A574' : '#A69B8D',
        }}
      >
        {link.name}
      </motion.span>
      
      <motion.div
        className="focus-indicator"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      
      {isHovered && (
        <motion.div
          className="flash-burst"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 2] }}
          transition={{ duration: 0.4 }}
        />
      )}
    </a>
  );
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('#home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = navLinks.map(link => document.querySelector(link.href));
      const scrollPos = window.scrollY + 100;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPos) {
          setActiveLink(navLinks[i].href);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href) => {
    const elements = document.querySelectorAll(href);
    const element = elements.length > 0 ? elements[0] : null;
    
    if (element) {
      const navbarHeight = 70;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - navbarHeight,
        behavior: 'smooth'
      });
    }
    
    setActiveLink(href);
    setIsMobileOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-2' : 'py-4'
      }`}
      style={{
        background: 'rgba(26, 23, 20, 0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(212, 165, 116, 0.1)',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between relative">
        <a
          href="#home"
          onClick={(e) => { e.preventDefault(); document.querySelector('#home')?.scrollIntoView({ behavior: 'smooth' }); }}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="logo-icon"
          >
            <Aperture className="w-8 h-8 text-accent" />
          </motion.div>
          <span className="font-heading text-xl tracking-wide text-text-primary">
            NS FRAME HOUSE
          </span>
        </a>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              link={link}
              isActive={activeLink === link.href}
              onClick={() => handleNavClick(link.href)}
            />
          ))}
        </div>

        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="md:hidden p-2 text-text-primary"
        >
          {isMobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setIsMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-72 z-50 md:hidden flex flex-col"
              style={{
                background: 'linear-gradient(180deg, #1A1714 0%, #0D0D0D 100%)',
                boxShadow: '-10px 0 30px rgba(0, 0, 0, 0.5)',
                height: '100vh',
              }}
            >
              <div className="p-6 border-b border-accent/10 flex justify-end">
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-text-primary" />
                </button>
              </div>
              <div className="px-6 py-4 flex flex-col gap-2">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <button
                      type="button"
                      key={link.name}
                      onClick={() => handleNavClick(link.href)}
                      className={`flex items-center gap-3 text-lg py-3 px-4 rounded-lg transition-all w-full text-left ${
                        activeLink === link.href
                          ? 'bg-accent/20 text-accent'
                          : 'text-text-secondary hover:bg-accent/10 hover:text-accent'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {link.name}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        .nav-bg-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(13, 13, 13, 0.8) 0%, transparent 100%);
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s;
        }
        
        .glass .nav-bg-gradient {
          opacity: 1;
        }
        
        .nav-item {
          position: relative;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          cursor: pointer;
        }
        
        .aperture-wrapper {
          position: relative;
          width: 18px;
          height: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .aperture-ring {
          position: absolute;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .aperture-blade {
          position: absolute;
          width: 8px;
          height: 2px;
          background: #A69B8D;
          transform-origin: center;
          transition: background 0.3s;
        }
        
        .group:hover .aperture-blade {
          background: #D4A574;
        }
        
        .blade-1 { transform: rotate(0deg) translateY(-5px); }
        .blade-2 { transform: rotate(90deg) translateY(-5px); }
        .blade-3 { transform: rotate(180deg) translateY(-5px); }
        .blade-4 { transform: rotate(270deg) translateY(-5px); }
        
        .aperture-center {
          width: 4px;
          height: 4px;
          background: #A69B8D;
          border-radius: 50%;
          transition: all 0.3s;
        }
        
        .group:hover .aperture-center {
          background: #D4A574;
          box-shadow: 0 0 8px rgba(212, 165, 116, 0.8);
        }
        
        .nav-text {
          font-size: 12px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          font-weight: 500;
          transition: color 0.3s;
        }
        
        .focus-indicator {
          position: absolute;
          bottom: 2px;
          left: 16px;
          right: 16px;
          height: 1px;
          background: linear-gradient(90deg, transparent, #D4A574, transparent);
          transform-origin: center;
        }
        
        .flash-burst {
          position: absolute;
          inset: 0;
          border-radius: 8px;
          background: radial-gradient(circle at center, rgba(212, 165, 116, 0.3) 0%, transparent 70%);
          pointer-events: none;
        }
        
        .logo-icon {
          filter: drop-shadow(0 0 8px rgba(212, 165, 116, 0.3));
        }
        
        .logo-icon:hover {
          filter: drop-shadow(0 0 15px rgba(212, 165, 116, 0.6));
        }
      `}</style>
    </motion.nav>
  );
}