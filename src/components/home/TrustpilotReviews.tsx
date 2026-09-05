import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { trustpilotStats } from '@/data/mockData';
import { cn } from '@/lib/utils';

const reviews = [
  {
    name: 'Sarah Mitchell',
    location: 'Manchester',
    destination: 'Tenerife',
    rating: 5,
    text: 'Absolutely incredible experience from start to finish. The hotel was exactly as described and the whole booking process was seamless. Will definitely be booking again!',
    date: 'August 2026',
  },
  {
    name: 'James Thompson',
    location: 'London',
    destination: 'Antalya',
    rating: 5,
    text: "Best family holiday we've ever had. The resort was stunning, the kids club was brilliant, and the all-inclusive was fantastic value. Thank you First Choice!",
    date: 'July 2026',
  },
  {
    name: 'Priya Patel',
    location: 'Birmingham',
    destination: 'Rhodes',
    rating: 5,
    text: "We've used First Choice three times now and they never disappoint. The price match guarantee saved us over 200 pounds on our last booking. Highly recommend!",
    date: 'June 2026',
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            'w-5 h-5',
            i < rating ? 'text-[#00b67a] fill-[#00b67a]' : 'text-[#e9e3da] fill-[#e9e3da]'
          )}
        />
      ))}
    </div>
  );
}

export default function TrustpilotReviews() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#002f17] mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            What Our Guests Say
          </h2>
          <div className="w-20 h-1 bg-[#00b67a] rounded-full mx-auto mb-8" />

          <div className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl bg-[#00b67a]/5 border border-[#00b67a]/20">
            <div className="text-left">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-3xl font-bold text-[#002f17]">{trustpilotStats.rating}</span>
                <span className="text-[#002f17]/40">/5</span>
              </div>
              <StarRating rating={Math.round(trustpilotStats.rating)} />
            </div>
            <div className="w-px h-12 bg-[#00b67a]/20" />
            <p className="text-sm text-[#002f17]/60">
              Based on{' '}
              <span className="font-bold text-[#002f17]">
                {trustpilotStats.reviews.toLocaleString()}+
              </span>{' '}
              reviews
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
              className="relative p-7 rounded-2xl border border-[#e9e3da] hover:border-[#00b67a]/20 hover:shadow-xl hover:shadow-[#00b67a]/5 transition-all duration-500 bg-white"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-[#e9e3da]" />

              <StarRating rating={review.rating} />

              <p className="mt-5 text-[#002f17]/70 mb-6" style={{ lineHeight: '1.618' }}>
                "{review.text}"
              </p>

              <div className="flex items-center gap-3 pt-5 border-t border-[#e9e3da]">
                <div className="w-11 h-11 rounded-full bg-[#ff467c] flex items-center justify-center text-white font-bold text-sm">
                  {review.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <p className="font-semibold text-[#002f17] text-sm">{review.name}</p>
                  <p className="text-xs text-[#002f17]/50">
                    {review.location} · {review.destination}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
