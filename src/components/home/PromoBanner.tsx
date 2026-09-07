import { Link } from 'react-router-dom';

export default function PromoBanner() {
  return (
    <section className="bg-white py-10">
      <div className="max-w-[992px] mx-auto px-4">
        <div className="relative rounded-2xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&h=500&fit=crop"
            alt="Dominican Republic"
            className="w-full h-[300px] md:h-[400px] object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#002f17]/80 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="p-8 md:p-12 max-w-md">
              <p className="text-[10px] font-bold text-[#ff467c] uppercase tracking-[0.2em] mb-2">Your Next Pick</p>
              <h2
                className="text-2xl md:text-4xl font-black text-white mb-3"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Dominican Republic
              </h2>
              <p className="text-white/70 text-[13px] mb-6 leading-[1.618]">
                Beat the winter blues before they've even started and get your island fix on the Dominican Republic's dreamy white sands.
              </p>
              <Link to="/search?destination=dominican-republic" className="btn-cta inline-flex">
                <span className="label">Book Now</span>
                <span className="arrow" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
