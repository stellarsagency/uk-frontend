import { motion } from 'framer-motion';
import { Camera, MapPin } from 'lucide-react';
import { insiders } from '@/data/mockData';

export default function InsidersSection() {
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
            First Choice Insiders
          </h2>
          <div className="w-20 h-1 bg-[#ff467c] rounded-full mx-auto mb-5" />
          <p className="text-[#002f17]/60 text-lg max-w-xl mx-auto" style={{ lineHeight: '1.618' }}>
            Follow our travel creators for daily inspiration
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {insiders.map((insider, i) => (
            <motion.div
              key={insider.handle}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <div className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer">
                <img
                  src={insider.image}
                  alt={insider.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#002f17]/80 via-[#002f17]/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-out">
                  <div className="flex items-center gap-1.5 text-white/70 text-xs mb-1">
                    <Camera className="w-3.5 h-3.5" />
                    {insider.handle}
                  </div>
                  <p className="font-semibold text-white text-sm" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                    {insider.name}
                  </p>
                  <div className="flex items-center gap-1 text-white/60 text-xs mt-1">
                    <MapPin className="w-3 h-3" />
                    {insider.destination}
                  </div>
                </div>

                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                  <Camera className="w-4 h-4 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
