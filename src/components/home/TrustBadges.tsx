import { motion } from 'framer-motion';
import { Shield, Award, Lock, Star } from 'lucide-react';
import { trustpilotStats } from '@/data/mockData';
import { cn } from '@/lib/utils';

const badges = [
  {
    icon: Shield,
    title: 'ATOL Protected',
    subtitle: 'Financially secured',
    color: 'text-[#ff467c]',
    bg: 'bg-[#ffd4e4]/40',
  },
  {
    icon: Award,
    title: 'ABTA Member',
    subtitle: 'Trusted since 1950',
    color: 'text-[#ff467c]',
    bg: 'bg-[#ffd4e4]/40',
  },
  {
    icon: Lock,
    title: 'Digicert Secure',
    subtitle: '256-bit encryption',
    color: 'text-[#ff467c]',
    bg: 'bg-[#ffd4e4]/40',
  },
  {
    icon: Star,
    title: `Trustpilot ${trustpilotStats.rating}/5`,
    subtitle: `${trustpilotStats.reviews.toLocaleString()}+ reviews`,
    color: 'text-[#ff467c]',
    bg: 'bg-[#ffd4e4]/40',
  },
];

export default function TrustBadges() {
  return (
    <section className="bg-[#faf5ed] py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-xs font-bold uppercase tracking-[0.25em] text-[#002f17]/40 mb-10"
        >
          Book with Confidence
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {badges.map((badge, i) => (
            <motion.div
              key={badge.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
              className="group flex flex-col items-center text-center p-6 rounded-2xl border border-[#e9e3da] hover:border-[#ff467c]/20 hover:shadow-xl hover:shadow-[#ff467c]/5 transition-all duration-300 bg-white"
            >
              <div className={cn('w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110', badge.bg)}>
                <badge.icon className={cn('w-7 h-7', badge.color)} />
              </div>
              <h3 className="font-semibold text-[#002f17] text-sm mb-1" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{badge.title}</h3>
              <p className="text-xs text-[#002f17]/50" style={{ lineHeight: '1.618' }}>{badge.subtitle}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
