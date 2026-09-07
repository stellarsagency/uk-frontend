import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';

const destinations = [
  { name: 'Cape Verde', image: 'https://images.unsplash.com/photo-1578469550956-0e16b69c6a3d?w=400&h=400&fit=crop' },
  { name: 'Turkey', image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=400&h=400&fit=crop' },
  { name: 'Rhodes', image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&h=400&fit=crop' },
  { name: 'Tenerife', image: 'https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?w=400&h=400&fit=crop' },
  { name: 'Kos', image: 'https://images.unsplash.com/photo-1583946099379-f9c4d0a43d8e?w=400&h=400&fit=crop' },
  { name: 'Majorca', image: 'https://images.unsplash.com/photo-1504512485720-7d83a16ee930?w=400&h=400&fit=crop' },
];

export default function TrendingDestinations() {
  return (
    <section className="bg-[#faf5ed] py-10">
      <div className="max-w-[992px] mx-auto px-4">
        <h2 className="text-xl md:text-2xl font-black text-[#002f17] mb-6" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
          Trending Last Minute Destinations
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
          {destinations.map((dest) => (
            <Link
              key={dest.name}
              to={`/search?destination=${dest.name}`}
              className="group flex flex-col items-center gap-3"
            >
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-3 border-white shadow-md group-hover:shadow-lg group-hover:border-[#ff467c] transition-all">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <span className="text-[12px] font-bold text-[#002f17] group-hover:text-[#ff467c] transition-colors">
                {dest.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
