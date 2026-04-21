import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2, MapPin, Camera, Award, Filter, ChevronDown, Download } from 'lucide-react';
import { portfolioItems, categories } from '../data/portfolio';

function Lightbox({ image, title, description, category, onClose, onPrev, onNext, hasPrev, hasNext }) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [showSwipeHint, setShowSwipeHint] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (showSwipeHint && isMobile) {
      const timer = setTimeout(() => {
        setShowSwipeHint(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSwipeHint, isMobile]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (isFullscreen) setIsFullscreen(false);
        else onClose();
      }
      if (!isFullscreen) {
        if (e.key === 'ArrowLeft' && hasPrev) onPrev();
        if (e.key === 'ArrowRight' && hasNext) onNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext, hasPrev, hasNext, isFullscreen]);

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (!touchStart) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (Math.abs(diff) > 50) {
      setShowSwipeHint(false);
      if (diff > 0 && hasNext) onNext();
      else if (diff < 0 && hasPrev) onPrev();
    }
    setTouchStart(null);
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(image);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${title.replace(/\s+/g, '_')}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      window.open(image, '_blank');
    }
  };

  const handleExpand = () => {
    setIsFullscreen(true);
  };

  const handleExitFullscreen = () => {
    setIsFullscreen(false);
  };

  if (isFullscreen) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] bg-black flex items-center justify-center"
        onClick={handleExitFullscreen}
      >
        <button
          className="absolute top-4 right-4 p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors z-10"
          onClick={handleExitFullscreen}
        >
          <X className="w-6 h-6 text-white" />
        </button>
        <img
          src={image}
          alt={title}
          className="max-w-full max-h-full object-contain"
        />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-bg-primary/98 backdrop-blur-xl flex items-center justify-center"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <motion.div
        className="absolute top-4 left-4 right-4 flex items-center justify-between"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
      >
        <span className="text-accent text-sm tracking-widest uppercase">{category}</span>
        <button
          className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
          onClick={onClose}
        >
          <X className="w-6 h-6 text-white" />
        </button>
      </motion.div>

      {hasPrev && (
        <button
          className="absolute left-2 md:left-6 p-3 md:p-4 bg-white/10 rounded-full hover:bg-white/20 transition-all backdrop-blur-sm z-10"
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
        >
          <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 text-white" />
        </button>
      )}

      {hasNext && (
        <button
          className="absolute right-2 md:right-6 p-3 md:p-4 bg-white/10 rounded-full hover:bg-white/20 transition-all backdrop-blur-sm z-10"
          onClick={(e) => { e.stopPropagation(); onNext(); }}
        >
          <ChevronRight className="w-6 h-6 md:w-8 md:h-8 text-white" />
        </button>
      )}

      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8" onClick={(e) => e.stopPropagation()}>
        <div className="flex-1 flex items-center justify-center order-1">
          <img
            src={image}
            alt={title}
            className="max-w-full max-h-[50vh] md:max-h-[80vh] object-contain rounded-2xl shadow-2xl"
          />
        </div>

        <motion.div
          className="w-full md:w-80 flex flex-col justify-center md:pr-4 order-2 text-center md:text-left px-4 md:px-0"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-2xl md:text-3xl font-heading text-white mb-3 md:mb-4">{title}</h3>
          <p className="text-gray-400 font-body leading-relaxed mb-6">
            {description}
          </p>
        </motion.div>

        <div className="flex flex-col gap-3 items-center order-3">
          <button
            className="p-4 border border-white/20 rounded-full hover:bg-white/10 transition-colors"
            onClick={handleDownload}
            title="Download"
          >
            <Download className="w-5 h-5 text-white" />
          </button>
          <button
            className="p-4 border border-white/20 rounded-full hover:bg-white/10 transition-colors"
            onClick={handleExpand}
            title="Expand"
          >
            <Maximize2 className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function PortfolioCard({ item, index, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      <img
        src={item.image}
        alt={item.title}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
        <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 bg-accent/20 text-accent text-xs rounded-full">
              {item.category}
            </span>
          </div>
          <h3 className="text-white text-xl font-heading mb-1">{item.title}</h3>
          <p className="text-gray-400 text-sm">{item.description}</p>
        </div>
      </div>

      <div className="absolute top-4 right-4 p-2 bg-black/30 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300">
        <Maximize2 className="w-4 h-4 text-white" />
      </div>
    </motion.div>
  );
}

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [filteredItems, setFilteredItems] = useState(portfolioItems);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [isInPortfolio, setIsInPortfolio] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showAllImages, setShowAllImages] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const currentScroll = window.scrollY;
    let items = portfolioItems;

    if (activeCategory === 'All') {
      items = portfolioItems;
    } else {
      items = portfolioItems.filter((item) => item.category === activeCategory);
    }

    if (isMobile && activeCategory === 'Photography') {
      items = items.slice(0, 3);
    }

    setFilteredItems(items);

    requestAnimationFrame(() => {
      window.scrollTo(0, currentScroll);
    });

    const timer = setTimeout(() => {
      window.scrollTo(0, currentScroll);
    }, 50);

    return () => clearTimeout(timer);
  }, [activeCategory, isMobile]);

  useEffect(() => {
    const handleScroll = () => {
      const portfolioSection = document.getElementById('portfolio');
      if (portfolioSection) {
        const rect = portfolioSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.7 && rect.bottom > window.innerHeight * 0.3;
        setIsInPortfolio(isVisible);
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (selectedImage && window.innerWidth < 768) {
      document.body.classList.add('in-lightbox-view');
    } else {
      document.body.classList.remove('in-lightbox-view');
    }
    return () => document.body.classList.remove('in-lightbox-view');
  }, [selectedImage]);

  const currentIndex = selectedImage
    ? filteredItems.findIndex((item) => item.id === selectedImage.id)
    : -1;

  const handlePrev = () => {
    if (currentIndex > 0) {
      setSelectedImage(filteredItems[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (currentIndex < filteredItems.length - 1) {
      setSelectedImage(filteredItems[currentIndex + 1]);
    }
  };

  const stats = [
    { icon: Camera, value: '500+', label: 'Photoshoot' },
    { icon: MapPin, value: '50+', label: 'Locations' },
    { icon: Award, value: '100+', label: 'Clients' },
  ];

  return (
    <section id="portfolio" className="min-h-screen py-24 bg-gradient-to-b from-bg-primary via-bg-primary to-bg-secondary">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center md:text-left flex-1"
          >
            <motion.span
              className="text-accent text-sm tracking-[0.3em] uppercase block mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
            >
              Portfolio
            </motion.span>
            <h2 className="text-4xl md:text-6xl font-heading text-text-primary mb-6">
              My <span className="text-gradient">Creative</span> Work
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto md:mx-0">
              A curated collection of moments captured through my lens, telling unique stories across various themes.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="hidden md:flex flex-wrap justify-center gap-4 mb-16"
        >
          {categories.map((category, idx) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-8 py-3 rounded-full text-sm font-body tracking-wide transition-all duration-300 ${activeCategory === category
                  ? 'bg-accent text-black shadow-lg shadow-accent/25'
                  : 'border border-accent/20 text-text-secondary hover:border-accent/60 hover:text-accent hover:bg-accent/5'
                }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"        >
          <AnimatePresence mode="popLayout">
            {(showAllImages ? filteredItems : filteredItems.slice(0, 6)).map((item, index) => (
              <PortfolioCard
                key={item.id}
                item={item}
                index={index}
                onClick={() => setSelectedImage(item)}
              />
            ))}
          </AnimatePresence>

          

          {/* Mobile Floating Filter Button */}
          {isInPortfolio && (
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden fixed z-40 flex items-center gap-2 px-4 py-3 glass rounded-full shadow-lg"
              style={{
                bottom: 100,
                left: 24,
              }}
            >
              <Filter className="w-5 h-5 text-accent" />
              <span className="text-text-primary text-sm">{activeCategory}</span>
              <ChevronDown className={`w-4 h-4 text-accent transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          )}

          {/* Mobile Filter Dropdown */}
          {showFilters && isInPortfolio && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="md:hidden fixed z-50 glass py-2 px-2 rounded-xl"
              style={{
                bottom: 155,
                left: 24,
              }}
            >
              <div className="flex flex-col gap-1">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setActiveCategory(category);
                      setShowFilters(false);
                    }}
                    className={`px-4 py-2 rounded-lg text-sm text-left transition-all ${activeCategory === category
                        ? 'bg-accent text-black'
                        : 'text-text-secondary hover:bg-accent/10'
                      }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>

        {!showAllImages && filteredItems.length > 6 && (
            <div className="text-center mt-8 flex justify-center w-full items-center">
              <button
                onClick={() => setShowAllImages(true)}
                className="mx-auto px-8 py-3 border border-accent/30 text-accent rounded-full hover:bg-accent/10 transition-colors"
              >
                View All Images ({filteredItems.length})
              </button>
            </div>
          )}

        {filteredItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-text-secondary text-lg">No projects found in this category.</p>
            <button
              onClick={() => setActiveCategory('All')}
              className="mt-4 px-6 py-2 bg-accent/10 text-accent rounded-full hover:bg-accent/20 transition-colors"
            >
              View All Projects
            </button>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 pt-16 border-t border-accent/10"
        >
          <div className="grid grid-cols-3 gap-8 max-w-xl mx-auto">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center"
              >
                <stat.icon className="w-6 h-6 text-accent mx-auto mb-3" />
                <div className="text-3xl font-heading text-text-primary">{stat.value}</div>
                <div className="text-text-secondary text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <Lightbox
            image={selectedImage.image}
            title={selectedImage.title}
            description={selectedImage.description}
            category={selectedImage.category}
            onClose={() => setSelectedImage(null)}
            onPrev={handlePrev}
            onNext={handleNext}
            hasPrev={currentIndex > 0}
            hasNext={currentIndex < filteredItems.length - 1}
          />
        )}
      </AnimatePresence>

      <style>{`
        .text-gradient {
          background: linear-gradient(135deg, #D4A574, #E8C9A0);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>
    </section>
  );
}