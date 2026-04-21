import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Camera, MapPin, Calendar, Award, Users, Clock, Sparkles } from 'lucide-react';

const stats = [
  { value: 5, label: 'Projects Completed', suffix: '+', icon: Camera },
  { value: 3, label: 'Years Hobby', suffix: '+', icon: Clock },
  { value: 0, label: 'Awards Won', suffix: '+', icon: Award },
  { value: 30, label: 'Happy Clients', suffix: '%', icon: Users },
];

function Counter({ value, suffix, icon: Icon, label }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  
  useEffect(() => {
    if (!isInView) return;
    
    let start = 0;
    const end = value;
    const duration = 2000;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-accent/10 flex items-center justify-center">
        <Icon className="w-8 h-8 text-accent" />
      </div>
      <span className="text-4xl md:text-5xl font-heading text-gradient">
        {count}{suffix}
      </span>
      <p className="text-text-secondary mt-2 font-body text-sm">{label}</p>
    </motion.div>
  );
}

export default function About() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <section id="about" className="min-h-screen py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-bg-secondary/50 to-bg-primary" />
      
      <div className="absolute top-20 left-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/3 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative z-10" ref={containerRef}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.span 
            className="text-accent text-sm tracking-[0.3em] uppercase block mb-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            About Me
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-heading text-text-primary mb-6">
            The Story Behind the <span className="text-gradient">Lens</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            A passionate photographer capturing life's beautiful moments as a hobby, alongside my career as a software developer.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="/images/About Me/esakkimani.jpg" 
                  alt="Esakkimani - Photographer" 
                  className={`w-full h-full object-cover object-center transition-all duration-700 ${
                    imageLoaded ? 'blur-0 opacity-100' : 'blur-xl opacity-50'
                  }`}
                  loading="eager"
                  onLoad={handleImageLoad}
                />
              </div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.6 }}
                className="absolute -bottom-6 -right-6 glass p-6 rounded-2xl"
              >
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-accent" />
                  <span className="text-text-primary font-body">Bengaluru, India</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.8 }}
                className="absolute -top-4 -left-4 glass p-4 rounded-2xl"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-accent" />
                  <span className="text-text-primary font-body text-sm">Hobbyist</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl md:text-3xl font-heading text-text-primary mb-4">
                Capturing Life's Beautiful Moments
              </h3>
              <p className="text-text-secondary font-body leading-relaxed">
                I'm a software developer by profession and a passionate photographer as a hobby. 
                I love capturing life's beautiful moments through my lens, combining my technical 
                background with artistic vision to create images that tell unique stories. 
                Photography is my creative outlet that allows me to express my perspective 
                on the world around us.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { title: 'Portrait', desc: 'Personal & Family' },
                { title: 'Wedding', desc: 'Love Stories' },
                { title: 'Landscape', desc: 'Nature & Travel' },
                { title: 'Commercial', desc: 'Brand & Product' },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 + idx * 0.1 }}
                  className="glass p-4 rounded-xl"
                >
                  <h4 className="text-accent font-heading">{item.title}</h4>
                  <p className="text-text-secondary text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="flex items-center gap-3 text-text-secondary">
              <Calendar className="w-5 h-5 text-accent" />
              <span className="font-body">Available for bookings worldwide</span>
            </div>

            <motion.a
              href="#contact"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-bg-primary font-body font-medium tracking-wide hover:glow-accent transition-all duration-300 rounded-full"
            >
              Let's Work Together
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                →
              </motion.span>
            </motion.a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16 border-t border-accent/10"
        >
          {stats.map((stat, index) => (
            <Counter key={index} {...stat} />
          ))}
        </motion.div>
      </div>

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