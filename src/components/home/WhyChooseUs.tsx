import { motion } from 'framer-motion';
import { Calendar, Shield, Headphones, ShieldCheck, Smartphone, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

const features = [
  {
    icon: Calendar,
    title: 'Flexible Booking',
    description: 'Free amendments up to 14 days before departure',
  },
  {
    icon: Shield,
    title: 'Best Price Promise',
    description: "We'll match any competitor's price, guaranteed",
  },
  {
    icon: Headphones,
    title: '24/7 Concierge',
    description: 'Personal support whenever you need it',
  },
  {
    icon: ShieldCheck,
    title: 'ATOL Protected',
    description: 'Your money is 100% financially protected',
  },
  {
    icon: Smartphone,
    title: 'First Choice App',
    description: 'Manage your booking on the go',
  },
  {
    icon: Sparkles,
    title: 'First Choice Flex',
    description: 'Change dates with zero fees',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-[#faf5ed] py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#002f17] mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Why First Choice?
          </h2>
          <div className="w-20 h-1 bg-[#ff467c] rounded-full mx-auto mb-5" />
          <p className="text-[#002f17]/60 text-lg max-w-xl mx-auto" style={{ lineHeight: '1.618' }}>
            Every detail is designed to make your holiday perfect
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="group p-8 rounded-2xl border border-[#e9e3da] hover:border-[#ff467c]/20 hover:shadow-xl hover:shadow-[#ff467c]/5 transition-all duration-500 bg-white"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#ff467c] flex items-center justify-center mb-6 shadow-lg shadow-[#ff467c]/20 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-[#ff467c]/30 transition-all duration-300">
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-[#002f17] mb-2" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                {feature.title}
              </h3>
              <p className="text-[#002f17]/60" style={{ lineHeight: '1.618' }}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
