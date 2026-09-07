import { Link } from 'react-router-dom';

const picks = [
  { month: 'October', image: 'https://images.unsplash.com/photo-1578469550956-0e16b69c6a3d?w=600&h=400&fit=crop' },
  { month: 'November', image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600&h=400&fit=crop' },
  { month: 'December', image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&h=400&fit=crop' },
  { month: 'January', image: 'https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?w=600&h=400&fit=crop' },
  { month: 'February', image: 'https://images.unsplash.com/photo-1583946099379-f9c4d0a43d8e?w=600&h=400&fit=crop' },
  { month: 'March', image: 'https://images.unsplash.com/photo-1504512485720-7d83a16ee930?w=600&h=400&fit=crop' },
];

export default function OurPicks() {
  return (
    <section className="bg-white py-10">
      <div className="max-w-[992px] mx-auto px-4">
        <h2 className="text-xl md:text-2xl font-black text-[#002f17] mb-6" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
          Our Picks
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {picks.map((pick) => (
            <Link
              key={pick.month}
              to={`/search?destination=hot-in-${pick.month.toLowerCase()}`}
              className="group relative aspect-[3/2] rounded-xl overflow-hidden"
            >
              <img
                src={pick.image}
                alt={`Where's hot in ${pick.month}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <p className="text-white text-[13px] font-bold">Where's hot in {pick.month}?</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
