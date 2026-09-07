import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const categories = [
  { label: 'Last Minute', color: '#ff467c', emoji: '⏰' },
  { label: 'All Inc', color: '#002f17', emoji: '🍽️' },
  { label: 'Winter Sun', color: '#ff8a58', emoji: '☀️' },
  { label: 'Adults Only', color: '#002f17', emoji: '🔞' },
  { label: 'Deals', color: '#ff467c', emoji: '💰' },
  { label: 'Beach', color: '#4fc3f7', emoji: '🏖️' },
  { label: 'School Hols', color: '#ff467c', emoji: '📚' },
  { label: 'Solo', color: '#002f17', emoji: '🧳' },
  { label: 'Family', color: '#ff8a58', emoji: '👨‍👩‍👧‍👦' },
  { label: 'LGBTQ+', color: '#9c27b0', emoji: '🏳️‍🌈' },
  { label: 'City Break', color: '#002f17', emoji: '🏙️' },
  { label: 'Trending', color: '#ff467c', emoji: '🔥' },
  { label: 'Wonky', color: '#ff8a58', emoji: '🤪' },
  { label: 'Romantic', color: '#e91e63', emoji: '❤️' },
  { label: 'Mountains', color: '#002f17', emoji: '⛰️' },
  { label: 'Group', color: '#ff467c', emoji: '👥' },
  { label: 'Fan Faves', color: '#ff8a58', emoji: '⭐' },
  { label: 'Golf', color: '#002f17', emoji: '⛳' },
  { label: 'Nightlife', color: '#9c27b0', emoji: ' nightlife' },
  { label: 'Gym', color: '#002f17', emoji: '💪' },
  { label: 'Student', color: '#ff467c', emoji: '🎓' },
  { label: 'Active', color: '#ff8a58', emoji: '🏃' },
  { label: 'Wellness', color: '#4caf50', emoji: '🧘' },
  { label: 'Foodie', color: '#ff467c', emoji: '🍕' },
  { label: 'Quirky', color: '#9c27b0', emoji: '🎪' },
  { label: 'Green Flags', color: '#4caf50', emoji: '🚩' },
  { label: "Boys Trips", color: '#002f17', emoji: '🍻' },
];

export default function CategoryIcons() {
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
    scrollRef.current?.scrollBy({ left: dir === 'left' ? -200 : 200, behavior: 'smooth' });
  };

  return (
    <section className="bg-white py-6">
      <div className="max-w-[992px] mx-auto px-4 relative">
        {showLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center border border-[#e9e3da]"
          >
            <ChevronLeft className="w-4 h-4 text-[#002f17]" />
          </button>
        )}
        {showRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center border border-[#e9e3da]"
          >
            <ChevronRight className="w-4 h-4 text-[#002f17]" />
          </button>
        )}

        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto scrollbar-hide pb-2"
        >
          {categories.map((cat) => (
            <a
              key={cat.label}
              href={`/#/search?filter=${cat.label.toLowerCase().replace(/\s+/g, '-')}`}
              className="flex flex-col items-center gap-2 flex-shrink-0 group"
            >
              <div
                className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-2xl md:text-3xl transition-transform group-hover:scale-110 border-2 border-[#e9e3da] group-hover:border-[#ff467c]"
                style={{ backgroundColor: cat.color + '15' }}
              >
                {cat.emoji}
              </div>
              <span className="text-[11px] font-bold text-[#002f17] whitespace-nowrap group-hover:text-[#ff467c] transition-colors">
                {cat.label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
