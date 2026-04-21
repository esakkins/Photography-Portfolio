import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Users, Mountain, Heart, Image, Sparkles, CircleCheck, Globe, X, Check, ArrowRight, Send, Loader } from 'lucide-react';
import emailjs from '@emailjs/browser';

const servicesData = [
  {
    id: 'portrait',
    icon: Camera,
    title: 'Portrait Photography',
    tagline: 'Capture Your True Essence',
    description: 'Outdoor/natural light photoshoot session that captures your unique personality in timeless images. Perfect for profiles, portfolios, or personal memories.',
    duration: '30-45 Minutes',
    delivery: '2-3 Days',
    price: '₹800',
    features: [
      'Outdoor / Natural Light Photoshoot',
      '30-45 Minutes Session',
      '5 Edited High-Quality Photos',
      'Basic Retouching & Color Correction',
      'Single Outfit',
      'Online Delivery (Google Drive)',
      'Delivery within 2-3 Days',
    ],
  },
  {
    id: 'event',
    icon: Image,
    title: 'Event Photography',
    tagline: 'Every Moment, Perfectly Captured',
    description: 'Professional event coverage for weddings, birthday parties, corporate events, and special celebrations. We capture all the emotions and unforgettable moments of your special day.',
    duration: '3-4 Hours',
    delivery: '3-5 Days',
    price: '₹5,000',
    features: [
      '3-4 Hours Event Coverage',
      'Single Photographer',
      '50-80 Edited Photos',
      'Candid & Natural Shots',
      'Basic Retouching & Color Correction',
      'Online Delivery (Google Drive)',
      'Delivery within 3-5 Days',
    ],
  },
  {
    id: 'landscape',
    icon: Mountain,
    title: 'Landscape Photography',
    tagline: 'Nature\'s Beauty, Forever Preserved',
    description: 'Stunning landscape and outdoor photography for travel enthusiasts, nature lovers, and scenic location shoots.',
    duration: '1-2 Hours',
    delivery: '3-5 Days',
    price: '₹3,000',
    features: [
      'Golden Hour Outdoor Shoot',
      '1-2 Hour Session',
      '15 Edited High-Quality Photos',
      'Natural Light & Scenic Compositions',
      'Basic Color Grading',
      'High-Resolution Images',
      'Social Media Optimized Versions',
      'Online Delivery (Google Drive)',
      'Delivery within 3-5 Days',
    ],
  },
  {
    id: 'brand',
    icon: Users,
    title: 'Personal Branding Package',
    tagline: 'Elevate Your Brand Identity',
    description: 'Professional imagery for personal branding, LinkedIn, Instagram, or business profiles. Create compelling visual content that communicates your professional brand values.',
    duration: '2 Hours',
    delivery: '3-5 Days',
    price: '₹4,500',
    features: [
      '2 Hour Photoshoot',
      'Outdoor / Natural Light Locations',
      '20 Edited High-Quality Photos',
      '1-2 Nearby Locations',
      'Social Media Ready Images',
      'Basic Retouching & Color Correction',
      'Posing Guidance',
      'Online Delivery (Google Drive)',
      'Delivery within 3-5 Days',
    ],
  },
  {
    id: 'street',
    icon: Globe,
    title: 'Street Photography Package',
    tagline: 'Urban Stories, Raw Emotions',
    description: 'Capturing life in its purest form on the streets. Perfect for street photography enthusiasts, urban explorers, and documentary-style shooting.',
    duration: '1-1.5 Hours',
    delivery: '3-4 Days',
    price: '₹2,500',
    features: [
      '1-1.5 Hour Street Photoshoot',
      'Urban Outdoor Locations',
      '15 Professionally Edited High-Quality Photos',
      'Color & Black & White Edits',
      'Candid & Natural Storytelling Shots',
      'Basic Color Grading & Exposure Correction',
      'Social Media Ready Images',
      'Online Delivery via Google Drive',
      'Delivery within 3-4 Days',
    ],
  },
  {
    id: 'mobile-portrait',
    icon: Camera,
    title: 'Mobile Portrait Photography',
    tagline: 'Professional Portraits with Your Phone',
    description: 'Professional portrait photography using your smartphone. Perfect for LinkedIn, Instagram, profiles, and personal memories.',
    duration: '1-2 Hours',
    delivery: '3-4 Days',
    price: '₹2,000',
    features: [
      '1-2 Hour Mobile Photoshoot',
      'Shot using Nothing Phone 3a Pro',
      'Outdoor / Natural Light Locations',
      '10-15 Professionally Edited Photos',
      'Candid & Posed Portrait Shots',
      'Basic Color Correction & Retouching',
      'Creative Framing & Composition',
      'Social Media Ready Images',
      'Online Delivery via Google Drive',
      'Delivery within 3-4 Days',
    ],
  },
  {
    id: 'couple',
    icon: Heart,
    title: 'Couple Session Package',
    tagline: 'Love Stories in Every Frame',
    description: 'Intimate and romantic photo sessions for couples, engaged pairs, and anniversaries. Create timeless memories celebrating your unique love story.',
    duration: '1-1.5 Hours',
    delivery: '3-4 Days',
    price: '₹3,200',
    features: [
      '1-1.5 Hour Couple Photoshoot',
      'Outdoor / Natural Light Location',
      '15 Edited High-Quality Photos',
      'Romantic & Candid Shots',
      'Color & Black & White Edits',
      'Basic Retouching',
      'Posing Guidance',
      'Online Delivery (Google Drive)',
      'Delivery within 3-4 Days',
    ],
  },
];

export default function Services() {
  const [selectedService, setSelectedService] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showCustomQuote, setShowCustomQuote] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formRef = useRef(null);
  const serviceRef = useRef(null);

  const openService = (service) => {
    setSelectedService(service);
    setShowBookingForm(false);
    setShowCustomQuote(false);
    setIsSubmitted(false);
    document.body.style.overflow = 'hidden';
  };

  const closeService = () => {
    setSelectedService(null);
    setShowBookingForm(false);
    setFormData({ name: '', phone: '', email: '', message: '' });
    setFormErrors({});
    document.body.style.overflow = 'auto';
  };

  const openCustomQuote = () => {
    setSelectedService(null);
    setShowCustomQuote(true);
    setIsSubmitted(false);
    setFormData({ name: '', phone: '', email: '', message: '' });
    document.body.style.overflow = 'hidden';
  };

  const closeCustomQuote = () => {
    setShowCustomQuote(false);
    setFormData({ name: '', phone: '', email: '', message: '' });
    setFormErrors({});
    document.body.style.overflow = 'auto';
  };

  const validateBooking = () => {
    const newErrors = {};
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Enter valid 10-digit number';
    }
    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBookSubmit = async (e, isCustomQuote = false) => {
    e.preventDefault();
    if (!validateBooking()) return;
    
    setIsSubmitting(true);
    
    try {
      let templateParams = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        service: isCustomQuote ? 'Custom Quote Request' : (selectedService?.title || ''),
        message: isCustomQuote 
          ? formData.message 
          : `Booking Request for ${selectedService?.price} ${selectedService?.title} Package`,
      };
      
      await emailjs.send(
        'service_xq0doz7',
        'template_0ns3lu7',
        templateParams,
        'TYoxZZIV1GhozKcDX'
      );
      setIsSubmitted(true);
    } catch (error) {
      console.error('EmailJS Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
            My <span className="text-accent">Services</span> & Pricing
          </h2>
          <p className="text-text-secondary mt-4 max-w-xl mx-auto font-body">
            Professional photography services with transparent pricing. Click on any service to see complete details.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {servicesData.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => openService(service)}
              className="group glass p-8 rounded-lg hover:border-accent/30 transition-all duration-300 cursor-pointer hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <service.icon className="w-7 h-7 text-accent" />
                </div>
                <span className="text-accent text-lg font-heading font-bold">{service.price}</span>
              </div>

              <h3 className="text-xl font-heading text-text-primary mb-2">
                {service.title}
              </h3>
              
              <p className="text-accent/80 text-sm italic mb-3">{service.tagline}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {service.features.slice(0, 3).map((feature, i) => (
                  <span key={i} className="text-xs text-text-secondary bg-accent/5 px-2 py-1 rounded-full">
                    {feature}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between text-text-secondary text-xs mb-4">
                <span>⏱ {service.duration}</span>
                <span>📦 {service.delivery}</span>
              </div>

              <div className="flex items-center gap-2 text-accent text-sm font-medium">
                View Details <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16 glass p-8 rounded-lg"
        >
          <h3 className="text-2xl font-heading text-text-primary mb-4">Custom Package?</h3>
          <p className="text-text-secondary font-body mb-6 max-w-lg mx-auto">
            Need something unique? Let me create a custom package tailored to your specific requirements and budget.
          </p>
          <button
            onClick={openCustomQuote}
            className="inline-flex items-center gap-2 px-8 py-3 bg-accent text-black font-body tracking-wide hover:bg-accent/90 transition-all duration-300 rounded-lg"
          >
            <Globe className="w-5 h-5" />
            Get Custom Quote
          </button>
        </motion.div>
      </div>

      {/* Custom Quote Modal */}
      <AnimatePresence>
        {showCustomQuote && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm overflow-y-auto"
            onClick={closeCustomQuote}
          >
            <div className="min-h-screen py-8 px-4 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="max-w-md w-full bg-bg-secondary rounded-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative p-8">
                  <button
                    onClick={closeCustomQuote}
                    className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6 text-text-secondary" />
                  </button>
                  
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                      <Globe className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-xl font-heading text-text-primary">Custom Quote</h3>
                      <p className="text-text-secondary text-sm">Tell us about your requirements</p>
                    </div>
                  </div>
                  
                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-6"
                    >
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/20 flex items-center justify-center">
                        <Check className="w-8 h-8 text-accent" />
                      </div>
                      <h4 className="text-xl font-heading text-text-primary mb-2">Request Sent!</h4>
                      <p className="text-text-secondary mb-4">We'll get back to you within 24-48 hours.</p>
                      <button
                        onClick={closeCustomQuote}
                        className="px-6 py-2 border border-accent/30 text-accent rounded-lg hover:bg-accent/10 transition-colors"
                      >
                        Close
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={(e) => handleBookSubmit(e, true)} className="space-y-4">
                      
                      <div>
                        <input
                          type="text"
                          name="name"
                          placeholder="Your Name *"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          autoComplete="off"
                          className="w-full px-4 py-3 bg-bg-primary border border-accent/20 rounded-lg text-text-primary focus:outline-none focus:border-accent"
                        />
                      </div>
                      
                      <div>
                        <input
                          type="tel"
                          name="phone"
                          placeholder="Phone / WhatsApp *"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          autoComplete="off"
                          className="w-full px-4 py-3 bg-bg-primary border border-accent/20 rounded-lg text-text-primary focus:outline-none focus:border-accent"
                        />
                        {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
                      </div>
                      
                      <div>
                        <input
                          type="email"
                          name="email"
                          placeholder="Email (Optional)"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          autoComplete="off"
                          className="w-full px-4 py-3 bg-bg-primary border border-accent/20 rounded-lg text-text-primary focus:outline-none focus:border-accent"
                        />
                      </div>
                      
                      <div>
                        <textarea
                          name="customMessage"
                          placeholder="Tell us about your requirements..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          rows={3}
                          autoComplete="off"
                          className="w-full px-4 py-3 bg-bg-primary border border-accent/20 rounded-lg text-text-primary focus:outline-none focus:border-accent resize-none"
                        />
                      </div>
                      
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 bg-accent text-black font-medium rounded-lg hover:bg-accent/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader className="w-5 h-5 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Send Request
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm overflow-y-auto"
            onClick={closeService}
          >
            <div className="min-h-screen py-8 px-4 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="max-w-2xl w-full bg-bg-secondary rounded-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="relative p-8 border-b border-accent/10">
                  <button
                    onClick={closeService}
                    className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6 text-text-secondary" />
                  </button>
                  
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                      <selectedService.icon className="w-8 h-8 text-accent" />
                    </div>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-heading text-text-primary">{selectedService.title}</h2>
                      <p className="text-accent italic">{selectedService.tagline}</p>
                    </div>
                  </div>
                  
                  <p className="text-text-secondary font-body leading-relaxed mb-4">
                    {selectedService.description}
                  </p>
                  
                  <div className="flex items-center gap-6 text-text-secondary text-sm mb-4">
                    <span>⏱ Duration: {selectedService.duration}</span>
                    <span>📦 Delivery: {selectedService.delivery}</span>
                  </div>
                </div>

                {/* Price & Features */}
                <div className="p-8">
                  <div className="text-center mb-6">
                    <span className="text-accent text-sm uppercase tracking-wider">Package Price</span>
                    <div className="text-5xl font-heading text-text-primary mt-2">{selectedService.price}</div>
                  </div>
                  
                  <div className="bg-bg-primary rounded-xl p-6 mb-6">
                      <h4 className="text-lg font-heading text-text-primary mb-4 text-center">What's Included</h4>
                      <ul className="space-y-3">
                        {selectedService.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-3 text-text-secondary">
                            <Check className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {!showBookingForm ? (
                      <>
                        <button
                          onClick={() => setShowBookingForm(true)}
                          className="block w-full text-center py-4 bg-accent text-black font-body font-medium text-lg rounded-lg hover:bg-accent/90 transition-colors"
                        >
                          Book This Service
                        </button>
                        
                        <p className="text-center text-text-secondary/60 text-sm mt-4">
                          Need modifications? Contact me for custom packages.
                        </p>
                      </>
                    ) : isSubmitted ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-6"
                      >
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/20 flex items-center justify-center">
                          <Check className="w-8 h-8 text-accent" />
                        </div>
                        <h4 className="text-xl font-heading text-text-primary mb-2">Request Sent!</h4>
                        <p className="text-text-secondary mb-4">We'll get back to you within 24-48 hours.</p>
                        <button
                          onClick={closeService}
                          className="px-6 py-2 border border-accent/30 text-accent rounded-lg hover:bg-accent/10 transition-colors"
                        >
                          Close
                        </button>
                      </motion.div>
                    ) : (
                      <form onSubmit={(e) => handleBookSubmit(e, false)} className="space-y-4">
                        
                        <div>
                          <input
                            type="text"
                            name="name"
                            placeholder="Your Name *"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            autoComplete="off"
                            className="w-full px-4 py-3 bg-bg-primary border border-accent/20 rounded-lg text-text-primary focus:outline-none focus:border-accent"
                          />
                        </div>
                        
                        <div>
                          <input
                            type="tel"
                            name="phone"
                            placeholder="Phone / WhatsApp *"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            autoComplete="off"
                            className="w-full px-4 py-3 bg-bg-primary border border-accent/20 rounded-lg text-text-primary focus:outline-none focus:border-accent"
                          />
                          {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
                        </div>
                        
                        <div>
                          <input
                            type="email"
                            name="email"
                            placeholder="Email (Optional)"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            autoComplete="off"
                            className="w-full px-4 py-3 bg-bg-primary border border-accent/20 rounded-lg text-text-primary focus:outline-none focus:border-accent"
                          />
                        </div>
                        
                        <div className="flex gap-3 pt-2">
                          <button
                            type="button"
                            onClick={() => setShowBookingForm(false)}
                            className="flex-1 py-3 border border-accent/30 text-text-secondary rounded-lg hover:bg-white/5 transition-colors"
                          >
                            Back
                          </button>
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 py-3 bg-accent text-black font-medium rounded-lg hover:bg-accent/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                          >
                            {isSubmitting ? (
                              <>
                                <Loader className="w-5 h-5 animate-spin" />
                                Sending...
                              </>
                            ) : (
                              <>
                                <Send className="w-4 h-4" />
                                Send Request
                              </>
                            )}
                          </button>
                        </div>
                      </form>
                    )}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}