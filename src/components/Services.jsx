import { motion } from 'framer-motion';
import { Camera, Users, Mountain, Heart, Image, Sparkles, CircleCheck, Globe } from 'lucide-react';

const services = [
  {
    icon: Camera,
    title: 'Portrait Photography',
    description: 'Personalized portrait sessions that capture your unique personality and essence in timeless images.',
    features: ['Studio & outdoor locations', 'Multiple outfit changes', 'Professional retouching'],
  },
  {
    icon: Image,
    title: 'Event Photography',
    description: 'Comprehensive coverage for weddings, corporate events, and special celebrations.',
    features: ['Full day coverage', 'Online gallery', 'Highlight reel'],
  },
  {
    icon: Mountain,
    title: 'Landscape Photography',
    description: 'Stunning landscape and travel photography for prints, publications, and digital use.',
    features: ['Location scouting', 'Golden hour shoots', '4K prints'],
  },
  {
    icon: Users,
    title: 'Brand Photography',
    description: 'Professional imagery for brands, businesses, and marketing campaigns.',
    features: ['Commercial use rights', 'Multiple formats', 'Quick turnaround'],
  },
  {
    icon: Heart,
    title: 'Couple Sessions',
    description: 'Intimate and romantic photo sessions for couples and engagements.',
    features: ['Romantic locations', 'Anniversary specials', 'Save the date cards'],
  },
  {
    icon: Sparkles,
    title: 'Fine Art Photography',
    description: 'Artistic, conceptual photography for collectors and art enthusiasts.',
    features: ['Limited editions', 'Custom frames', 'Certificate of authenticity'],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export default function Services() {
  return (
    <section id="services" className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent text-sm tracking-[0.3em] uppercase block mb-4">
            What I Offer
          </span>
          <h2 className="text-4xl md:text-5xl font-heading text-text-primary">
            My <span className="text-accent">Services</span>
          </h2>
          <p className="text-text-secondary mt-4 max-w-xl mx-auto font-body">
            Professional photography services tailored to bring your vision to life.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -5 }}
              className="group glass p-8 rounded-lg hover:border-accent/30 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                <service.icon className="w-7 h-7 text-accent" />
              </div>

              <h3 className="text-xl font-heading text-text-primary mb-3">
                {service.title}
              </h3>

              <p className="text-text-secondary font-body leading-relaxed mb-4">
                {service.description}
              </p>

              <ul className="space-y-2">
                {service.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-center gap-2 text-text-secondary text-sm">
                    <CircleCheck className="w-4 h-4 text-accent" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-3 border border-accent/30 text-accent font-body tracking-wide hover:bg-accent/10 transition-all duration-300"
          >
            <Globe className="w-5 h-5" />
            Discuss Your Project
          </a>
        </motion.div>
      </div>
    </section>
  );
}