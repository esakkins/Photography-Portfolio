import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, Loader } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const services = [
    'Portrait Photography',
    'Event Photography',
    'Landscape Photography',
    'Brand Photography',
    'Couple Session',
    'Fine Art Photography',
    'Other',
  ];

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    
    if (!formData.service) {
      newErrors.service = 'Please select a service';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    setIsSubmitting(true);
    
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    console.log('Form submitted:', formData);
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'hello@lensandlight.com' },
    { icon: Phone, label: 'Phone', value: '+91 98765 43210' },
    { icon: MapPin, label: 'Location', value: 'Tamil Nadu, India' },
  ];

  if (isSubmitted) {
    return (
      <section id="contact" className="min-h-screen py-20 flex items-center">
        <div className="max-w-6xl mx-auto px-6 w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center glass py-16 rounded-lg max-w-xl mx-auto"
          >
            <CheckCircle className="w-20 h-20 text-accent mx-auto mb-6" />
            <h2 className="text-3xl font-heading text-text-primary mb-4">
              Thank You!
            </h2>
            <p className="text-text-secondary font-body mb-8">
              Your message has been sent successfully. I'll get back to you within 24-48 hours.
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setFormData({ name: '', email: '', phone: '', service: '', message: '' });
              }}
              className="px-8 py-3 border border-accent/30 text-accent font-body tracking-wide hover:bg-accent/10 transition-all duration-300"
            >
              Send Another Message
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent text-sm tracking-[0.3em] uppercase block mb-4">
            Get In Touch
          </span>
          <h2 className="text-4xl md:text-5xl font-heading text-text-primary">
            Let's Work <span className="text-accent">Together</span>
          </h2>
          <p className="text-text-secondary mt-4 max-w-xl mx-auto font-body">
            Have a project in mind? Let's discuss how I can bring your vision to life.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-heading text-text-primary">
              Contact Information
            </h3>
            <p className="text-text-secondary font-body leading-relaxed">
              I'm always open to discussing new projects, creative ideas, or opportunities 
              to be part of your vision. Feel free to reach out through any of the channels below.
            </p>
            
            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-text-secondary text-sm">{item.label}</p>
                    <p className="text-text-primary font-body">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass p-8 rounded-lg"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder=" "
                    className={`w-full px-4 py-3 bg-bg-secondary border ${
                      errors.name ? 'border-red-500' : 'border-accent/20'
                    } rounded-lg text-text-primary placeholder-transparent focus:outline-none focus:border-accent transition-colors peer`}
                  />
                  <label className="absolute left-4 top-3 text-text-secondary text-sm transition-all -top-2.5 left-3 text-xs bg-bg-secondary px-1 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-text-secondary peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-accent">
                    Name *
                  </label>
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                <div className="relative">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder=" "
                    className="w-full px-4 py-3 bg-bg-secondary border border-accent/20 rounded-lg text-text-primary placeholder-transparent focus:outline-none focus:border-accent transition-colors peer"
                  />
                  <label className="absolute left-4 top-3 text-text-secondary text-sm transition-all -top-2.5 left-3 text-xs bg-bg-secondary px-1 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-text-secondary peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-accent">
                    Phone
                  </label>
                </div>
              </div>

              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder=" "
                  className={`w-full px-4 py-3 bg-bg-secondary border ${
                    errors.email ? 'border-red-500' : 'border-accent/20'
                  } rounded-lg text-text-primary placeholder-transparent focus:outline-none focus:border-accent transition-colors peer`}
                />
                <label className="absolute left-4 top-3 text-text-secondary text-sm transition-all -top-2.5 left-3 text-xs bg-bg-secondary px-1 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-text-secondary peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-accent">
                  Email *
                </label>
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <div className="relative">
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-bg-secondary border ${
                    errors.service ? 'border-red-500' : 'border-accent/20'
                  } rounded-lg text-text-primary focus:outline-none focus:border-accent transition-colors appearance-none cursor-pointer`}
                >
                  <option value="" className="bg-bg-secondary">Select a service *</option>
                  {services.map((service) => (
                    <option key={service} value={service} className="bg-bg-secondary">
                      {service}
                    </option>
                  ))}
                </select>
                {errors.service && (
                  <p className="text-red-500 text-xs mt-1">{errors.service}</p>
                )}
              </div>

              <div className="relative">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder=" "
                  rows={4}
                  className={`w-full px-4 py-3 bg-bg-secondary border ${
                    errors.message ? 'border-red-500' : 'border-accent/20'
                  } rounded-lg text-text-primary placeholder-transparent focus:outline-none focus:border-accent transition-colors peer resize-none`}
                />
                <label className="absolute left-4 top-3 text-text-secondary text-sm transition-all -top-2.5 left-3 text-xs bg-bg-secondary px-1 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-text-secondary peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-accent">
                  Message *
                </label>
                {errors.message && (
                  <p className="text-red-500 text-xs mt-1">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-accent text-bg-primary font-body font-medium tracking-wide hover:glow-accent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}