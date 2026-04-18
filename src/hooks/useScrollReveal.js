import { useEffect } from 'react';
import { motion, useInView, useAnimate } from 'framer-motion';
import { useRef } from 'react';

export function useScrollReveal(options = {}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px', ...options });
  
  return { ref, isInView };
}

export function ScrollReveal({ 
  children, 
  direction = 'up', 
  delay = 0, 
  duration = 0.6,
  className = '',
  ...props 
}) {
  const [scope, animate] = useAnimate();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (isInView) {
      animate(
        scope.current,
        { opacity: 1, x: 0, y: 0 },
        { duration, delay, ease: [0.25, 0.46, 0.45, 0.94] }
      );
    }
  }, [isInView, animate, scope, duration, delay]);

  const getInitial = () => {
    switch (direction) {
      case 'up': return { opacity: 0, y: 50 };
      case 'down': return { opacity: 0, y: -50 };
      case 'left': return { opacity: 0, x: -50 };
      case 'right': return { opacity: 0, x: 50 };
      case 'fade': return { opacity: 0 };
      case 'scale': return { opacity: 0, scale: 0.8 };
      default: return { opacity: 0, y: 50 };
    }
  };

  return (
    <motion.div
      ref={scope}
      initial={getInitial()}
      animate={isInView ? { opacity: 1, x: 0, y: 0, scale: 1 } : getInitial()}
      transition={{ duration, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StaggerReveal({ children, className = '', staggerDelay = 0.1 }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, direction = 'up', className = '' }) {
  const getInitial = () => {
    switch (direction) {
      case 'up': return { opacity: 0, y: 30 };
      case 'down': return { opacity: 0, y: -30 };
      case 'left': return { opacity: 0, x: -30 };
      case 'right': return { opacity: 0, x: 30 };
      default: return { opacity: 0, y: 30 };
    }
  };

  return (
    <motion.div
      variants={{
        hidden: getInitial(),
        visible: { opacity: 1, x: 0, y: 0 },
      }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}