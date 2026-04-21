import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Send, Loader, X, Check } from 'lucide-react';
import emailjs from '@emailjs/browser';

const feedbacks = [
  { name: 'Priya', text: 'Amazing experience! The photos turned out beautiful.', rating: 4.2 },
  { name: 'Surya', text: 'Very professional and patient. Highly recommend!', rating: 5 },
  { name: 'Aravind', text: 'The photos are looks great!!', rating: 5 },
  { name: 'Vikram', text: 'Great creativity and attention to detail.', rating: 4 },
];

export default function Feedback() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', rating: 5, message: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formRef = useRef(null);

  const validate = () => {
    const newErrors = {};
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Enter valid 10-digit number';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    setIsSubmitting(true);
    try {
      await emailjs.send(
        'service_xq0doz7',
        'template_0ns3lu7',
        {
          name: formData.name,
          phone: formData.phone,
          service: 'Service Interested',
          rating: formData.rating,
          message: formData.message || 'Feedback submitted',
        },
        'TYoxZZIV1GhozKcDX'
      );
      setIsSubmitted(true);
      setFormData({ name: '', phone: '', rating: 5, message: '' });
    } catch (error) {
      console.error('EmailJS Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const StarRating = ({ rating, onRate, interactive = false }) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => interactive && onRate(star)}
          disabled={!interactive}
          className={`${interactive ? 'cursor-pointer' : ''} transition-transform ${interactive ? 'hover:scale-110' : ''}`}
        >
          <Star
            className={`w-5 h-5 ${
              star <= rating
                ? 'fill-accent text-accent'
                : 'text-text-secondary'
            }`}
          />
        </button>
      ))}
    </div>
  );

  return (
    <section id="feedback" className="min-h-screen py-24">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-accent text-sm tracking-[0.3em] uppercase block mb-4">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-heading text-text-primary mb-6">
            Client <span className="text-gradient">Feedback</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-xl mx-auto">
            What my clients say about their experience working with me.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {feedbacks.map((feedback, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass p-6 rounded-xl"
            >
              <StarRating rating={feedback.rating} />
              <p className="text-text-secondary mt-3 mb-4 font-body text-sm leading-relaxed">
                "{feedback.text}"
              </p>
              <p className="text-accent font-heading text-sm">- {feedback.name}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <button
            onClick={() => setShowForm(true)}
            className="px-8 py-3 bg-accent text-black font-body font-medium rounded-full hover:bg-accent/90 transition-colors"
          >
            Share Your Feedback
          </button>
        </motion.div>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowForm(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="max-w-md w-full bg-bg-secondary rounded-2xl p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowForm(false)}
                className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-text-secondary" />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <Star className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-heading text-text-primary">Your Feedback</h3>
                  <p className="text-text-secondary text-sm">Share your experience</p>
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
                  <h4 className="text-xl font-heading text-text-primary mb-2">Thank You!</h4>
                  <p className="text-text-secondary mb-4">Your feedback has been received.</p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setShowForm(false);
                    }}
                    className="px-6 py-2 border border-accent/30 text-accent rounded-lg hover:bg-accent/10 transition-colors"
                  >
                    Close
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-text-secondary text-sm mb-2">Your Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter your name"
                      className="w-full px-4 py-3 bg-bg-primary border border-accent/20 rounded-lg text-text-primary focus:outline-none focus:border-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-text-secondary text-sm mb-2">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Enter phone number"
                      className="w-full px-4 py-3 bg-bg-primary border border-accent/20 rounded-lg text-text-primary focus:outline-none focus:border-accent"
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-text-secondary text-sm mb-2">Rating</label>
                    <StarRating
                      rating={formData.rating}
                      onRate={(r) => setFormData({ ...formData, rating: r })}
                      interactive
                    />
                  </div>

                  <div>
                    <label className="block text-text-secondary text-sm mb-2">Your Feedback (Optional)</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share your experience..."
                      rows={3}
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
                        Submit Feedback
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
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