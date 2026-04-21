import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { Mail, Phone, MapPin, Send, CheckCircle, Loader } from 'lucide-react';

const EMAILJS_SERVICE_ID = 'service_xq0doz7';
const EMAILJS_TEMPLATE_ID = 'template_0ns3lu7';
const EMAILJS_PUBLIC_KEY = 'TYoxZZIV1GhozKcDX';

const locationData = {
  'Andhra Pradesh': ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Tirupati', 'Nellore', 'Kurnool', 'Kadapa', 'Rajahmundry', 'Anantapur', 'Eluru'],
  'Arunachal Pradesh': ['Itanagar', 'Naharlagun', 'Pasighat', 'Roing', 'Tezpur', 'Ziro', 'Bomdila', ' Daporijo'],
  'Assam': ['Guwahati', 'Silchar', 'Dibrugarh', 'Jorhat', 'Nagaon', 'Tezpur', 'Bongaigaon', 'Dhubri', 'Tinsukia'],
  'Bihar': ['Patna', 'Gaya', 'Muzaffarpur', 'Bhagalpur', 'Darbhanga', 'Purnia', 'Biharsharif', 'Katihar', 'Buxar', 'Arrah'],
  'Chhattisgarh': ['Raipur', 'Bhilai', 'Durg', 'Bilaspur', 'Korba', 'Rajnandgaon', 'Ambikapur', 'Jagdalpur', 'Raigarh'],
  'Goa': ['Panaji', 'Margao', 'Vasco da Gama', 'Mapusa', 'Ponda', 'Bicholim', 'Curchorem', 'Canacona'],
  'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar', 'Jamnagar', 'Junagadh', 'Gandhinagar', 'Anand', 'Morbi', 'Nadiad', 'Patan'],
  'Haryana': ['Gurugram', 'Faridabad', 'Panipat', 'Ambala', 'Karnal', 'Rohtak', 'Hisar', 'Sonipat', 'Yamunanagar', 'Kurukshetra'],
  'Himachal Pradesh': ['Shimla', 'Mandi', 'Dharamshala', 'Kullu', 'Manali', 'Solan', 'Bilaspur', 'Chamba', 'Una', 'Nahan'],
  'Jharkhand': ['Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro', 'Hazaribagh', 'Deoghar', 'Ramgarh', 'Giridih', 'Saraikela'],
  'Karnataka': ['Bengaluru', 'Mysuru', 'Mangaluru', 'Hubli', 'Belagavi', 'Dharwad', 'Shimoga', 'Tumkur', 'Davangere', 'Udupi', 'Bellary', 'Hassan'],
  'Kerala': ['Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Thrissur', 'Kollam', 'Palakkad', 'Kannur', 'Alappuzha', 'Kottayam', 'Malappuram', 'Ernakulam'],
  'Madhya Pradesh': ['Bhopal', 'Indore', 'Jabalpur', 'Gwalior', 'Ujjain', 'Sagar', 'Dewas', 'Satna', 'Ratlam', 'Burhanpur', 'Katni', 'Mandsaur'],
  'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad', 'Solapur', 'Kolhapur', 'Thane', 'Sangli', 'Amravati', 'Navi Mumbai', 'Panvel'],
  'Manipur': ['Imphal', 'Thoubal', 'Bishnupur', 'Churachandpur', 'Ukhrul', 'Jiribam', 'Kakching', 'Nongpok'],
  'Meghalaya': ['Shillong', 'Tura', 'Jowai', 'Nongpoh', 'Williamnagar', 'Baghmara', 'Mawsynram', 'Cherrapunji'],
  'Mizoram': ['Aizawl', 'Lunglei', 'Saiha', 'Champhai', 'Kolasib', 'Serchhip', ' Lawngtlai', ' Hnahthial'],
  'Nagaland': ['Kohima', 'Dimapur', 'Mokokchung', 'Tuensang', 'Wokha', 'Zunheboto', 'Phek', 'Mon'],
  'Odisha': ['Bhubaneswar', 'Cuttack', 'Rourkela', 'Berhampur', 'Sambalpur', 'Balasore', 'Bhadrak', 'Angul', 'Puri', 'Balangir'],
  'Punjab': ['Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Bathinda', 'Mohali', 'Hoshiarpur', 'Firozpur', 'Kapurthala', 'Moga'],
  'Rajasthan': ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Bikaner', 'Ajmer', 'Pilani', 'Alwar', 'Bhilwara', 'Bharatpur', 'Sikar'],
  'Sikkim': ['Gangtok', 'Namchi', 'Gyalshing', 'Mangan', 'Jorethang', 'Ravong', 'Soreng', 'Pakyong'],
  'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Tirupur', 'Vellore', 'Erode', 'Tirunelveli', 'Thanjavur', 'Dindigul', 'Kanchipuram', 'Nagercoil', 'Karur', 'Cuddalore', 'Nagapattinam', 'Ramanathapuram', 'Sivaganga', 'Virudhunagar', 'Thoothukudi', 'Krishnagiri', 'Dharmapuri', 'Namakkal', 'Perambalur', 'Pudukkottai', 'Tiruvallur', 'Tenkasi', 'Vellore', 'Viluppuram', 'Ariyalur', 'Kallakurichi', 'Ranipet', 'Tirupattur'],
  'Telangana': ['Hyderabad', 'Warangal', 'Karimnagar', 'Nizamabad', 'Khammam', 'Ramagundam', 'Mahbubnagar', 'Nalgonda', 'Medak', 'Siddipet'],
  'Tripura': ['Agartala', 'Udaipur', 'Dharmanagar', 'Kailashahar', 'Belonia', 'Santirbazar', 'Amarpur', 'Bishramganj'],
  'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Agra', 'Varanasi', 'Prayagraj', 'Meerut', 'Aligarh', 'Bareilly', 'Moradabad', 'Gorakhpur', 'Noida', 'Ghaziabad'],
  'Uttarakhand': ['Dehradun', 'Haridwar', 'Roorkee', 'Haldwani', 'Rishikesh', 'Kashipur', 'Rudrapur', 'Kotdwar', 'Nainital', 'Mussoorie'],
  'West Bengal': ['Kolkata', 'Siliguri', 'Durgapur', 'Asansol', 'Murshidabad', 'Howrah', 'Darjeeling', 'Malda', 'Kharagpur', 'Baharampur', 'Bardhaman'],
  'Andaman and Nicobar Islands': ['Port Blair', 'Car Nicobar', 'Havelock Island', 'Diglipur', 'Mayabunder', 'Little Andaman', 'Rangat'],
  'Chandigarh': ['Chandigarh'],
  'Dadra and Nagar Haveli and Daman and Diu': ['Daman', 'Silvassa', 'Diu', 'Dadra'],
  'Delhi': ['New Delhi', 'Narela', 'Sultanpuri', 'Karawal Nagar', 'Shahdara', 'Dwarka', 'Rohini', 'Saket'],
  'Jammu and Kashmir': ['Srinagar', 'Jammu', 'Anantnag', 'Kathua', 'Baramulla', 'Pahalgam', 'Gulmarg', 'Leh', 'Kargil'],
  'Ladakh': ['Leh', 'Kargil', 'Nubra', 'Zanskar'],
  'Puducherry': ['Puducherry', 'Karaikal', 'Mahe', 'Yanam'],
};

export default function Contact() {
  const formRef = useRef(null);
  const serviceRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    otherService: '',
    state: '',
    city: '',
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
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone / WhatsApp number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Enter valid 10-digit phone number';
    }
    
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    
    if (!formData.service) {
      newErrors.service = 'Please select a service';
    }
    
    if (formData.service === 'Other' && !formData.otherService.trim()) {
      newErrors.otherService = 'Please specify your service';
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

  const handleStateChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, state: value, city: '' }));
    if (errors.state) {
      setErrors((prev) => ({ ...prev, state: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    setIsSubmitting(true);
    
    if (formData.service === 'Other' && formData.otherService && serviceRef.current) {
      serviceRef.current.value = formData.otherService;
    }
    
    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      );
      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', service: '', otherService: '', state: '', city: '', message: '' });
    } catch (error) {
      console.error('EmailJS Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'nsframehouse@gmail.com' },
    { icon: Phone, label: 'Phone', value: '81441 14053' },
    { icon: MapPin, label: 'Location', value: 'Bengaluru, India' },
  ];

  if (isSubmitted) {
    return (
      <section className="min-h-screen py-20 flex items-center">
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
                setFormData({ name: '', email: '', phone: '', service: '', otherService: '', state: '', city: '', message: '' });
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
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5" autoComplete="off">
              <div>
                <label className="block text-text-secondary text-sm mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="off"
                  className={`w-full px-4 py-3 bg-bg-secondary border ${
                    errors.name ? 'border-red-500' : 'border-accent/20'
                  } rounded-lg text-text-primary focus:outline-none focus:border-accent transition-colors`}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-text-secondary text-sm mb-2">Phone / WhatsApp Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  autoComplete="off"
                  className={`w-full px-4 py-3 bg-bg-secondary border ${
                    errors.phone ? 'border-red-500' : 'border-accent/20'
                  } rounded-lg text-text-primary focus:outline-none focus:border-accent transition-colors`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-text-secondary text-sm mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="off"
                  className={`w-full px-4 py-3 bg-bg-secondary border ${
                    errors.email ? 'border-red-500' : 'border-accent/20'
                  } rounded-lg text-text-primary focus:outline-none focus:border-accent transition-colors`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-text-secondary text-sm mb-4">Location</label>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={(e) => setFormData((prev) => ({ ...prev, state: e.target.value, city: '' }))}
                      className="w-full px-4 py-3 bg-bg-secondary border border-accent/20 rounded-lg text-text-primary focus:outline-none focus:border-accent transition-colors appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-bg-secondary">Select State</option>
                      {Object.keys(locationData).map((state) => (
                        <option key={state} value={state} className="bg-bg-secondary">
                          {state}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <select
                      name="city"
                      value={formData.city}
                      onChange={(e) => setFormData((prev) => ({ ...prev, city: e.target.value }))}
                      disabled={!formData.state}
                      className={`w-full px-4 py-3 bg-bg-secondary border border-accent/20 rounded-lg text-text-primary focus:outline-none focus:border-accent transition-colors appearance-none cursor-pointer ${!formData.state ? 'opacity-50' : ''}`}
                    >
                      <option value="" className="bg-bg-secondary">
                        {formData.state ? 'Select City' : 'Select State First'}
                      </option>
                      {formData.state && locationData[formData.state]?.map((city) => (
                        <option key={city} value={city} className="bg-bg-secondary">
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-text-secondary text-sm mb-2">Select a service *</label>
                <select
                  ref={serviceRef}
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  autoComplete="off"
                  className={`w-full px-4 py-3 bg-bg-secondary border ${
                    errors.service ? 'border-red-500' : 'border-accent/20'
                  } rounded-lg text-text-primary focus:outline-none focus:border-accent transition-colors appearance-none cursor-pointer`}
                >
                  <option value="" className="bg-bg-secondary">Choose a service</option>
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

              {formData.service === 'Other' && (
                <div>
                  <label className="block text-text-secondary text-sm mb-2">Please specify *</label>
                  <input
                    type="text"
                    name="otherService"
                    value={formData.otherService}
                    onChange={handleChange}
                    autoComplete="off"
                    placeholder="Enter your service"
                    className={`w-full px-4 py-3 bg-bg-secondary border ${
                      errors.otherService ? 'border-red-500' : 'border-accent/20'
                    } rounded-lg text-text-primary focus:outline-none focus:border-accent transition-colors`}
                  />
                  {errors.otherService && (
                    <p className="text-red-500 text-xs mt-1">{errors.otherService}</p>
                  )}
                </div>
              )}

              <div>
                <label className="block text-text-secondary text-sm mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  autoComplete="off"
                  className="w-full px-4 py-3 bg-bg-secondary border border-accent/20 rounded-lg text-text-primary focus:outline-none focus:border-accent transition-colors resize-none"
                />
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