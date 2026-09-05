import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { popularDestinations } from '@/data/mockData';

export default function PopularDestinations() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#002f17] mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Where Will Your Next Adventure Take You?
          </h2>
          <div className="w-20 h-1 bg-[#ff467c] rounded-full mx-auto" />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {popularDestinations.map((dest, i) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <Link
                to={`/search?destination=${encodeURIComponent(dest.name)}`}
                className="group relative block aspect-[3/4] rounded-2xl overflow-hidden"
              >
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#002f17]/80 via-[#002f17]/20 to-transparent" />
                <div className="absolute inset-0 bg-[#ff467c]/0 group-hover:bg-[#ff467c]/10 transition-colors duration-500" />

                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-white/60 text-xs font-medium uppercase tracking-wider mb-1">
                        {dest.country}
                      </p>
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-1" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                        {dest.name}
                      </h3>
                      <p className="text-white/70 text-sm">
                        From {formatPrice(dest.startingPrice)} pp
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white group-hover:bg-[#ff467c] group-hover:text-white transition-all duration-300 group-hover:scale-110">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
