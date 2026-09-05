import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Calendar, Users, Shield, Headphones, Award, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  ClockIcon, AllInclusiveIcon, WinterSunIcon, AdultsOnlyIcon,
  DealsIcon, BeachIcon, SchoolHolsIcon, SoloIcon, FamilyIcon,
  LgbtqIcon, CityBreakIcon, TrendingIcon, RomanticIcon, MountainIcon,
  GroupIcon, FanFavesIcon, GolfIcon, NightlifeIcon, GymIcon,
  StudentIcon, ActiveIcon, WellnessIcon, FoodieIcon, GreenFlagsIcon,
  BoysTripsIcon
} from './CategoryIcons';

const searchTabs = ['Packages', 'Accommodation'];

const categories = [
  { id: 'last-minute', label: 'Last Minute', Icon: ClockIcon, color: '#ff467c' },
  { id: 'all-inc', label: 'All Inc', Icon: AllInclusiveIcon, color: '#ff467c' },
  { id: 'winter-sun', label: 'Winter Sun', Icon: WinterSunIcon, color: '#ff8a58' },
  { id: 'adults-only', label: 'Adults Only', Icon: AdultsOnlyIcon, color: '#9c1981' },
  { id: 'deals', label: 'Deals', Icon: DealsIcon, color: '#ff467c' },
  { id: 'beach', label: 'Beach', Icon: BeachIcon, color: '#00acc8' },
  { id: 'school-hols', label: 'School Hols', Icon: SchoolHolsIcon, color: '#81bc3c' },
  { id: 'solo', label: 'Solo', Icon: SoloIcon, color: '#550f9d' },
  { id: 'family', label: 'Family', Icon: FamilyIcon, color: '#42c074' },
  { id: 'lgbtq', label: 'LGBTQ+', Icon: LgbtqIcon, color: '#9c1981' },
  { id: 'city-break', label: 'City Break', Icon: CityBreakIcon, color: '#002841' },
  { id: 'trending', label: 'Trending', Icon: TrendingIcon, color: '#ff467c' },
  { id: 'romantic', label: 'Romantic', Icon: RomanticIcon, color: '#ff467c' },
  { id: 'mountains', label: 'Mountains', Icon: MountainIcon, color: '#006bb5' },
  { id: 'group', label: 'Group', Icon: GroupIcon, color: '#550f9d' },
  { id: 'fan-faves', label: 'Fan Faves', Icon: FanFavesIcon, color: '#ff467c' },
  { id: 'golf', label: 'Golf', Icon: GolfIcon, color: '#42c074' },
  { id: 'nightlife', label: 'Nightlife', Icon: NightlifeIcon, color: '#550f9d' },
  { id: 'gym', label: 'Gym', Icon: GymIcon, color: '#002841' },
  { id: 'student', label: 'Student', Icon: StudentIcon, color: '#00acc8' },
  { id: 'active', label: 'Active', Icon: ActiveIcon, color: '#ff8a58' },
  { id: 'wellness', label: 'Wellness', Icon: WellnessIcon, color: '#42c074' },
  { id: 'foodie', label: 'Foodie', Icon: FoodieIcon, color: '#ff8a58' },
  { id: 'green-flags', label: 'Green Flags', Icon: GreenFlagsIcon, color: '#42c074' },
  { id: 'boys-trips', label: 'Boys Trips', Icon: BoysTripsIcon, color: '#002841' },
];

export default function HeroSearch() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Packages');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [guests, setGuests] = useState('2');
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftFade, setShowLeftFade] = useState(false);
  const [showRightFade, setShowRightFade] = useState(true);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const checkScroll = () => {
      setShowLeftFade(el.scrollLeft > 10);
      setShowRightFade(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
    };
    el.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();
    return () => el.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollCategories = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === 'left' ? -300 : 300, behavior: 'smooth' });
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (destination) params.set('destination', destination);
    if (date) params.set('date', date);
    if (guests) params.set('guests', guests);
    navigate(`/search?${params.toString()}`);
  };

  return (
    <section className="relative">
      {/* Hero */}
      <div className="relative min-h-[75vh] md:min-h-[80vh] flex flex-col">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&h=1080&fit=crop"
            alt="Tropical beach paradise"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
        </div>

        <div className="relative flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 pb-12">
          <div className="max-w-5xl mx-auto w-full text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-4"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-xs font-semibold tracking-wider uppercase">
                <Award className="w-3.5 h-3.5 text-[#ffd4e4]" />
                Award-Winning Holiday Experiences
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.05] mb-4"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Pick your next trip
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/70 text-base md:text-lg max-w-xl mx-auto mb-8"
              style={{ lineHeight: '1.618' }}
            >
              Handpicked holidays to the world's most stunning destinations.
              Your dream getaway awaits.
            </motion.p>

            {/* Premium Search Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
            >
              <div className="max-w-[820px] mx-auto">
                {/* Tabs */}
                <div className="flex justify-center mb-4">
                  <div className="inline-flex bg-white/10 backdrop-blur-md rounded-full p-1 border border-white/15">
                    {searchTabs.map((tab) => (
                      <button
                        key={tab}
                        type="button"
                        onClick={() => setActiveTab(tab)}
                        className={cn(
                          'relative px-8 py-2.5 rounded-full text-sm font-semibold transition-all duration-300',
                          activeTab === tab
                            ? 'text-white'
                            : 'text-white/60 hover:text-white/80'
                        )}
                      >
                        {activeTab === tab && (
                          <motion.div
                            layoutId="activeTabBg"
                            className="absolute inset-0 bg-[#ff467c] rounded-full"
                            transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                          />
                        )}
                        <span className="relative z-10">{tab}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Search Card */}
                <form
                  onSubmit={handleSearch}
                  className="bg-white rounded-2xl shadow-2xl shadow-black/15 overflow-hidden"
                >
                  <div className="p-2.5">
                    <div className="flex items-stretch gap-2">
                      {/* Destination */}
                      <div className="flex-[2] group">
                        <div className="bg-[#faf5ed] hover:bg-[#f5efe5] rounded-xl px-4 py-3 transition-all duration-300 border-2 border-transparent focus-within:border-[#ff467c] focus-within:bg-white h-full">
                          <label className="block text-[10px] font-bold text-[#002f17]/35 uppercase tracking-[0.15em] mb-1">
                            Destination
                          </label>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-[#002f17]/25 group-focus-within:text-[#ff467c] transition-colors shrink-0" />
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
                      <div className="flex-[1.2] group">
                        <div className="bg-[#faf5ed] hover:bg-[#f5efe5] rounded-xl px-4 py-3 transition-all duration-300 border-2 border-transparent focus-within:border-[#ff467c] focus-within:bg-white h-full">
                          <label className="block text-[10px] font-bold text-[#002f17]/35 uppercase tracking-[0.15em] mb-1">
                            When
                          </label>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-[#002f17]/25 group-focus-within:text-[#ff467c] transition-colors shrink-0" />
                            <input
                              type="date"
                              value={date}
                              onChange={(e) => setDate(e.target.value)}
                              className="w-full bg-transparent outline-none text-[#002f17] text-sm font-medium"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Guests */}
                      <div className="flex-1 group">
                        <div className="bg-[#faf5ed] hover:bg-[#f5efe5] rounded-xl px-4 py-3 transition-all duration-300 border-2 border-transparent focus-within:border-[#ff467c] focus-within:bg-white h-full">
                          <label className="block text-[10px] font-bold text-[#002f17]/35 uppercase tracking-[0.15em] mb-1">
                            Guests
                          </label>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-[#002f17]/25 group-focus-within:text-[#ff467c] transition-colors shrink-0" />
                            <select
                              value={guests}
                              onChange={(e) => setGuests(e.target.value)}
                              className="w-full bg-transparent outline-none text-[#002f17] text-sm font-medium appearance-none cursor-pointer"
                            >
                              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                                <option key={n} value={n}>
                                  {n} {n === 1 ? 'Guest' : 'Guests'}
                                </option>
                              ))}
                            </select>
                            <ChevronDown className="w-4 h-4 text-[#002f17]/25 shrink-0" />
                          </div>
                        </div>
                      </div>

                      {/* Search Button */}
                      <div className="flex-shrink-0">
                        <button
                          type="submit"
                          className="h-full px-8 rounded-xl bg-[#ff467c] text-white font-bold text-sm hover:bg-[#e63d6f] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-[#ff467c]/25 hover:shadow-xl hover:shadow-[#ff467c]/35 min-w-[140px]"
                        >
                          <Search className="w-4 h-4" />
                          Search
                        </button>
                      </div>
                    </div>
                  </div>
                </form>

                {/* Trust Badges */}
                <div className="flex flex-wrap items-center justify-center gap-4 mt-5 text-white/40 text-[11px] font-medium tracking-wide">
                  <span className="flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-[#42c074]" />
                    ATOL Protected
                  </span>
                  <span className="w-[3px] h-[3px] rounded-full bg-white/15" />
                  <span className="flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-[#ff467c]" />
                    ABTA Member
                  </span>
                  <span className="w-[3px] h-[3px] rounded-full bg-white/15" />
                  <span className="flex items-center gap-1.5">
                    <Headphones className="w-3.5 h-3.5 text-white/50" />
                    24/7 Support
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Category Pills — Exact FirstChoice Style */}
      <div className="relative bg-white border-t border-[#e9e3da]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="relative">
            {/* Left fade */}
            {showLeftFade && (
              <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none flex items-center">
                <button
                  onClick={() => scrollCategories('left')}
                  className="w-8 h-8 rounded-full bg-white border border-[#e9e3da] shadow-sm flex items-center justify-center -ml-2 hover:border-[#ff467c] hover:text-[#ff467c] transition-colors"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M7.5 2.5L4 6L7.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>
            )}

            {/* Scrollable pills */}
            <div
              ref={scrollRef}
              className="flex gap-2.5 overflow-x-auto scrollbar-hide py-1"
            >
              {categories.map((cat, i) => (
                <motion.a
                  key={cat.id}
                  href={`/search?category=${cat.id}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.02 * i }}
                  className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white border border-[#e9e3da] text-[#002f17] hover:border-[#ff467c]/40 hover:bg-[#ff467c]/5 hover:text-[#ff467c] font-medium text-[13px] whitespace-nowrap transition-all duration-200 cursor-pointer"
                >
                  <cat.Icon size={18} color={cat.color} className="shrink-0 transition-transform duration-200 group-hover:scale-110" />
                  <span>{cat.label}</span>
                </motion.a>
              ))}
            </div>

            {/* Right fade */}
            {showRightFade && (
              <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none flex items-center justify-end">
                <button
                  onClick={() => scrollCategories('right')}
                  className="w-8 h-8 rounded-full bg-white border border-[#e9e3da] shadow-sm flex items-center justify-center -mr-2 hover:border-[#ff467c] hover:text-[#ff467c] transition-colors"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4.5 2.5L8 6L4.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
