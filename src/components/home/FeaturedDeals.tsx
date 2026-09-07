import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, MapPin, Plane, Star, Clock } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

const deals = [
  { id: 1, hotel: 'Hotel Frixos', location: 'Malia, Crete', airport: 'Birmingham', nights: 2, board: 'Self Catering', price: 192, pp: 96, rating: 4.2, image: 'https://images.unsplash.com/photo-1578469550956-0e16b69c6a3d?w=400&h=300&fit=crop', lowAvailability: true },
  { id: 2, hotel: 'Club Evin', location: 'Marmaris, Turkey', airport: 'Manchester', nights: 2, board: 'Self Catering', price: 194, pp: 97, rating: 4.0, image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=400&h=300&fit=crop', lowAvailability: true },
  { id: 3, hotel: 'Club Candan', location: 'Marmaris, Turkey', airport: 'Manchester', nights: 2, board: 'Self Catering', price: 212, pp: 106, rating: 4.1, image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&h=300&fit=crop' },
  { id: 4, hotel: 'Planet Studios', location: 'Tsilivi, Zante', airport: 'Bristol', nights: 2, board: 'Self Catering', price: 218, pp: 109, rating: 4.3, image: 'https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?w=400&h=300&fit=crop', lowAvailability: true },
  { id: 5, hotel: 'Pericles Hotel', location: 'Sami, Kefalonia', airport: 'London Gatwick', nights: 3, board: 'B&B', price: 218, pp: 109, rating: 4.5, image: 'https://images.unsplash.com/photo-1583946099379-f9c4d0a43d8e?w=400&h=300&fit=crop' },
  { id: 6, hotel: 'Zante Dreams', location: 'Laganas, Zante', airport: 'Birmingham', nights: 3, board: 'Room Only', price: 218, pp: 109, rating: 3.9, image: 'https://images.unsplash.com/photo-1504512485720-7d83a16ee930?w=400&h=300&fit=crop' },
  { id: 7, hotel: 'Lygies Studios', location: 'Trapezaki, Kefalonia', airport: 'London Gatwick', nights: 2, board: 'Self Catering', price: 220, pp: 110, rating: 4.4, image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400&h=300&fit=crop' },
  { id: 8, hotel: 'Angela Hotel', location: 'Laganas, Zante', airport: 'Glasgow', nights: 4, board: 'Room Only', price: 248, pp: 124, rating: 4.0, image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=300&fit=crop' },
  { id: 9, hotel: 'Sunny Day Club', location: 'Sunny Beach, Bulgaria', airport: 'Birmingham', nights: 3, board: 'B&B', price: 276, pp: 138, rating: 4.1, image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop', lowAvailability: true },
  { id: 10, hotel: 'Protur Floriana', location: 'Cala Bona, Majorca', airport: 'Bristol', nights: 2, board: 'Self Catering', price: 300, pp: 150, rating: 4.6, image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop' },
];

export default function FeaturedDeals() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const check = () => {
      setShowLeft(el.scrollLeft > 10);
      setShowRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
    };
    el.addEventListener('scroll', check, { passive: true });
    check();
    return () => el.removeEventListener('scroll', check);
  }, []);

  const scroll = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: dir === 'left' ? -380 : 380, behavior: 'smooth' });
  };

  return (
    <section className="bg-white py-10 border-t border-[#e9e3da]">
      <div className="max-w-[992px] mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-black text-[#002f17]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Last-Minute Steals
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => scroll('left')}
              disabled={!showLeft}
              className="w-8 h-8 rounded-full border border-[#e9e3da] flex items-center justify-center hover:bg-[#ffd4e4]/40 disabled:opacity-30 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!showRight}
              className="w-8 h-8 rounded-full border border-[#e9e3da] flex items-center justify-center hover:bg-[#ffd4e4]/40 disabled:opacity-30 transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-7 overflow-x-auto scrollbar-hide pb-4"
          >
            {deals.map((deal) => (
              <Link
                key={deal.id}
                to={`/search?hotel=${deal.hotel}`}
                className="flex-shrink-0 w-[300px] md:w-[340px] group"
              >
                <div className="relative rounded-xl overflow-hidden mb-3">
                  <img
                    src={deal.image}
                    alt={deal.hotel}
                    className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {deal.lowAvailability && (
                    <div className="absolute top-3 left-3 flex items-center gap-1 bg-[#ff467c] text-white text-[10px] font-bold px-2 py-1 rounded">
                      <Clock className="w-3 h-3" />
                      Low availability
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-[14px] font-bold text-[#002f17] mb-1 group-hover:text-[#ff467c] transition-colors">
                    {deal.hotel}
                  </h3>
                  <div className="flex items-center gap-1 text-[12px] text-[#002f17]/60 mb-2">
                    <MapPin className="w-3 h-3" />
                    {deal.location}
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-[#002f17]/50 mb-3">
                    <span className="flex items-center gap-1">
                      <Plane className="w-3 h-3" />
                      {deal.airport}
                    </span>
                    <span>{deal.nights} nights</span>
                    <span>{deal.board}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[12px] text-[#002f17]/50">From </span>
                      <span className="text-[18px] font-black text-[#002f17]">{formatPrice(deal.pp)}</span>
                      <span className="text-[12px] text-[#002f17]/50"> pp</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-[#ff467c] fill-[#ff467c]" />
                      <span className="text-[12px] font-bold text-[#002f17]">{deal.rating}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center border-t border-[#e9e3da] pt-6">
          <a href="/#/search?deals=last-minute" className="btn-cta inline-flex">
            <span className="label">Last-Min Steals</span>
            <span className="arrow" />
          </a>
        </div>
      </div>
    </section>
  );
}
