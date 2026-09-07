import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Users, Plane, ChevronDown } from 'lucide-react';

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1920&h=625&fit=crop',
    imageMobile: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=650&h=458&fit=crop',
    title: 'Up to 100% Off Summer Hits',
    subtitle: 'Incredible savings on your dream holiday',
    link: '/search?deals=summer',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1920&h=625&fit=crop',
    imageMobile: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=650&h=458&fit=crop',
    title: 'Save £200 Off Long Haul',
    subtitle: 'Exclusive deals on faraway escapes',
    link: '/search?deals=long-haul',
  },
];

const airports = [
  'London Gatwick', 'London Heathrow', 'Manchester', 'Birmingham',
  'Bristol', 'Edinburgh', 'Glasgow', 'Leeds Bradford', 'Newcastle',
];

export default function HeroSearch() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [duration, setDuration] = useState('7');
  const [airport, setAirport] = useState('');
  const [guests, setGuests] = useState('2');
  const [activeTab, setActiveTab] = useState<'holidays' | 'hotels'>('holidays');
  const navigate = useNavigate();

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (destination) params.set('destination', destination);
    if (date) params.set('date', date);
    if (duration) params.set('duration', duration);
    if (airport) params.set('airport', airport);
    if (guests) params.set('guests', guests);
    params.set('type', activeTab);
    navigate({ pathname: '/search', search: params.toString() });
  };

  return (
    <section className="relative h-[545px] md:h-[602px] bg-white">
      {/* Carousel */}
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <a href={slide.link} className="block w-full h-full">
            <picture>
              <source media="(min-width: 650px)" srcSet={slide.image} />
              <img
                src={slide.imageMobile}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
            </picture>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute bottom-20 md:bottom-28 left-6 md:left-10 max-w-md">
              <h2
                className="text-3xl md:text-5xl font-black text-white mb-2 drop-shadow-lg"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {slide.title}
              </h2>
              <p className="text-white/80 text-sm md:text-base">{slide.subtitle}</p>
            </div>
          </a>
        </div>
      ))}

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`h-2 rounded-full transition-all ${
              i === currentSlide ? 'w-8 bg-[#ff467c]' : 'w-2 bg-white/60'
            }`}
          />
        ))}
      </div>

      {/* Search Form */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="max-w-[992px] mx-auto px-4 pb-4">
          {/* Tabs */}
          <div className="flex gap-1 mb-2">
            <button
              onClick={() => setActiveTab('holidays')}
              className={`px-5 py-2.5 rounded-t-lg text-[12px] font-bold tracking-[0.1em] transition-all ${
                activeTab === 'holidays'
                  ? 'bg-white text-[#002f17]'
                  : 'bg-white/70 text-[#002f17]/60 hover:bg-white/90'
              }`}
            >
              <Plane className="w-4 h-4 inline mr-2" />
              HOLIDAYS
            </button>
            <button
              onClick={() => setActiveTab('hotels')}
              className={`px-5 py-2.5 rounded-t-lg text-[12px] font-bold tracking-[0.1em] transition-all ${
                activeTab === 'hotels'
                  ? 'bg-white text-[#002f17]'
                  : 'bg-white/70 text-[#002f17]/60 hover:bg-white/90'
              }`}
            >
              <MapPin className="w-4 h-4 inline mr-2" />
              HOTELS
            </button>
          </div>

          {/* Search Card */}
          <form onSubmit={handleSearch} className="bg-white rounded-b-xl rounded-tr-xl shadow-2xl shadow-black/15 p-2.5">
            <div className="hidden md:flex items-stretch gap-2">
              {/* Destination */}
              <div className="flex-[2]">
                <div className="bg-[#faf5ed] rounded-xl px-4 py-3 h-full border-2 border-transparent focus-within:border-[#ff467c] focus-within:bg-white transition-all">
                  <label className="block text-[10px] font-bold text-[#002f17]/40 uppercase tracking-[0.15em] mb-1">Destination</label>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#002f17]/30 shrink-0" />
                    <input
                      type="text"
                      placeholder="Where to?"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="w-full bg-transparent outline-none text-[#002f17] text-sm placeholder:text-[#818085] font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* When */}
              <div className="flex-[1.2]">
                <div className="bg-[#faf5ed] rounded-xl px-4 py-3 h-full border-2 border-transparent focus-within:border-[#ff467c] focus-within:bg-white transition-all">
                  <label className="block text-[10px] font-bold text-[#002f17]/40 uppercase tracking-[0.15em] mb-1">When</label>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#002f17]/30 shrink-0" />
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-transparent outline-none text-[#002f17] text-sm font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Duration */}
              <div className="w-[100px]">
                <div className="bg-[#faf5ed] rounded-xl px-4 py-3 h-full border-2 border-transparent focus-within:border-[#ff467c] focus-within:bg-white transition-all">
                  <label className="block text-[10px] font-bold text-[#002f17]/40 uppercase tracking-[0.15em] mb-1">Nights</label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full bg-transparent outline-none text-[#002f17] text-sm font-medium appearance-none cursor-pointer"
                  >
                    {[3, 5, 7, 10, 14, 21].map((n) => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Airport */}
              <div className="flex-[1.2]">
                <div className="bg-[#faf5ed] rounded-xl px-4 py-3 h-full border-2 border-transparent focus-within:border-[#ff467c] focus-within:bg-white transition-all">
                  <label className="block text-[10px] font-bold text-[#002f17]/40 uppercase tracking-[0.15em] mb-1">From</label>
                  <div className="flex items-center gap-2">
                    <Plane className="w-4 h-4 text-[#002f17]/30 shrink-0" />
                    <select
                      value={airport}
                      onChange={(e) => setAirport(e.target.value)}
                      className="w-full bg-transparent outline-none text-[#002f17] text-sm font-medium appearance-none cursor-pointer"
                    >
                      <option value="">Any airport</option>
                      {airports.map((a) => (
                        <option key={a} value={a}>{a}</option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-[#002f17]/30 shrink-0" />
                  </div>
                </div>
              </div>

              {/* Guests */}
              <div className="flex-1">
                <div className="bg-[#faf5ed] rounded-xl px-4 py-3 h-full border-2 border-transparent focus-within:border-[#ff467c] focus-within:bg-white transition-all">
                  <label className="block text-[10px] font-bold text-[#002f17]/40 uppercase tracking-[0.15em] mb-1">Guests</label>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#002f17]/30 shrink-0" />
                    <select
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="w-full bg-transparent outline-none text-[#002f17] text-sm font-medium appearance-none cursor-pointer"
                    >
                      {[1, 2, 3, 4, 5, 6].map((n) => (
                        <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Search Button */}
              <div className="flex-shrink-0">
                <button
                  type="submit"
                  className="h-full px-8 rounded-xl bg-[#ff467c] text-white font-bold text-sm hover:bg-[#e63d6f] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#ff467c]/25"
                >
                  Search
                </button>
              </div>
            </div>

            {/* Mobile Search */}
            <div className="md:hidden space-y-2">
              <div className="bg-[#faf5ed] rounded-xl px-4 py-3 border-2 border-transparent focus-within:border-[#ff467c] focus-within:bg-white transition-all">
                <label className="block text-[10px] font-bold text-[#002f17]/40 uppercase tracking-[0.15em] mb-1">Destination</label>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#002f17]/30 shrink-0" />
                  <input
                    type="text"
                    placeholder="Where to?"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full bg-transparent outline-none text-[#002f17] text-sm placeholder:text-[#818085] font-medium"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <div className="flex-1 bg-[#faf5ed] rounded-xl px-4 py-3 border-2 border-transparent focus-within:border-[#ff467c] focus-within:bg-white transition-all">
                  <label className="block text-[10px] font-bold text-[#002f17]/40 uppercase tracking-[0.15em] mb-1">When</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-transparent outline-none text-[#002f17] text-sm font-medium"
                  />
                </div>
                <div className="w-[100px] bg-[#faf5ed] rounded-xl px-4 py-3 border-2 border-transparent focus-within:border-[#ff467c] focus-within:bg-white transition-all">
                  <label className="block text-[10px] font-bold text-[#002f17]/40 uppercase tracking-[0.15em] mb-1">Guests</label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full bg-transparent outline-none text-[#002f17] text-sm font-medium appearance-none cursor-pointer"
                  >
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#ff467c] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#ff467c]/25"
              >
                Search Holidays
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
