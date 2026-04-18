import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2, MapPin, Camera, Award } from 'lucide-react';
import { portfolioItems, categories } from '../data/portfolio';

function Lightbox({ image, title, description, category, onClose, onPrev, onNext, hasPrev, hasNext }) {
  const [isFullscreen, setIsFullscreen] = useState(false);

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
          className="absolute left-6 p-4 bg-white/10 rounded-full hover:bg-white/20 transition-all backdrop-blur-sm"
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
        >
          <ChevronLeft className="w-8 h-8 text-white" />
        </button>
      )}
      
      {hasNext && (
        <button
          className="absolute right-6 p-4 bg-white/10 rounded-full hover:bg-white/20 transition-all backdrop-blur-sm"
          onClick={(e) => { e.stopPropagation(); onNext(); }}
        >
          <ChevronRight className="w-8 h-8 text-white" />
        </button>
      )}
      
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", damping: 25 }}
        className="max-w-6xl max-h-[85vh] mx-4 flex gap-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex-1 flex items-center justify-center">
          <img
            src={image}
            alt={title}
            className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
          />
        </div>
        
        <motion.div 
          className="w-80 flex flex-col justify-center pr-4"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-3xl font-heading text-white mb-4">{title}</h3>
          <p className="text-gray-400 font-body leading-relaxed mb-6">
            {description}
          </p>
          <div className="flex items-center gap-4 pt-6 border-t border-white/10">
            <button 
              className="flex-1 py-3 bg-accent text-black font-medium rounded-lg hover:bg-accent/90 transition-colors"
              onClick={handleDownload}
            >
              Download
            </button>
            <button 
              className="p-3 border border-white/20 rounded-lg hover:bg-white/10 transition-colors"
              onClick={handleExpand}
            >
              <Maximize2 className="w-5 h-5 text-white" />
            </button>
          </div>
        </motion.div>
      </motion.div>
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

  useEffect(() => {
    if (activeCategory === 'All') {
      setFilteredItems(portfolioItems);
    } else {
      setFilteredItems(portfolioItems.filter((item) => item.category === activeCategory));
    }
  }, [activeCategory]);

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
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
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
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            A curated collection of moments captured through my lens, telling unique stories across various themes.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {categories.map((category, idx) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-8 py-3 rounded-full text-sm font-body tracking-wide transition-all duration-300 ${
                activeCategory === category
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <PortfolioCard
                key={item.id}
                item={item}
                index={index}
                onClick={() => setSelectedImage(item)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

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