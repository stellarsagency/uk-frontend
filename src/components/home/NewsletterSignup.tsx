import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Sparkles, Gift, Bell } from 'lucide-react';

const benefits = [
  { icon: Sparkles, text: 'Exclusive deals & early access' },
  { icon: Gift, text: 'Up to £500 off your first booking' },
  { icon: Bell, text: 'Price drop alerts' },
];

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <section className="relative py-20 md:py-28 overflow-hidden" style={{ background: 'linear-gradient(135deg, #ff467c 0%, #e63d6f 50%, #ff467c 100%)' }}>
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-white rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#ffd4e4] rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Don't Miss Out
          </h2>
          <p className="text-white/80 text-lg md:text-xl mb-10" style={{ lineHeight: '1.618' }}>
            Join 500,000+ travellers getting exclusive deals
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            {benefits.map((benefit, i) => (
              <motion.div
                key={benefit.text}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/15 backdrop-blur-sm text-white text-sm font-medium"
              >
                <benefit.icon className="w-4 h-4" />
                {benefit.text}
              </motion.div>
            ))}
          </div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 px-6 py-4 rounded-xl bg-white text-[#002f17] placeholder:text-[#002f17]/40 font-medium outline-none focus:ring-4 focus:ring-white/30 transition-all"
            />
            <button
              type="submit"
              className="px-8 py-4 rounded-xl bg-[#002f17] text-white font-bold text-sm hover:bg-[#001a0d] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 shadow-xl shadow-black/20"
            >
              {submitted ? (
                'Subscribed!'
              ) : (
                <>
                  Subscribe
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </motion.form>

          <p className="text-white/50 text-xs mt-6">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
