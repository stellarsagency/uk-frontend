import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  Search,
  User,
  Heart,
  ChevronDown,
  Sun,
  Moon,
  Home,
  Umbrella,
  Clock,
  MapPin,
  Building,
  Sparkles,
  Users,
  Palmtree,
  Mountain,
  HeartHandshake,
  Crown,
  UserCheck,
  Waves,
  Plane,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';
import { useWishlist } from '@/hooks/useWishlist';
import MobileMenu from './MobileMenu';

const navItems = [
  { label: 'HOLIDAYS', href: '/search' },
  { label: 'DEALS', href: '/search?tab=deals' },
  { label: 'DESTINATIONS', href: '/search?tab=destinations' },
  { label: 'CITY BREAKS', href: '/search?tab=city-breaks' },
  { label: 'EXTRAS', href: '/search?tab=extras' },
];

interface MegaMenuItem {
  label: string;
  icon: React.ReactNode;
  href: string;
}

const holidaysMegaMenu: MegaMenuItem[] = [
  { label: 'All Inclusive', icon: <Umbrella className="w-[18px] h-[18px]" />, href: '/search?filter=all-inclusive' },
  { label: 'Adults Only', icon: <UserCheck className="w-[18px] h-[18px]" />, href: '/search?filter=adults-only' },
  { label: 'Family', icon: <Users className="w-[18px] h-[18px]" />, href: '/search?filter=family' },
  { label: 'City Breaks', icon: <Building className="w-[18px] h-[18px]" />, href: '/search?filter=city-breaks' },
  { label: 'Beach', icon: <Palmtree className="w-[18px] h-[18px]" />, href: '/search?filter=beach' },
  { label: 'Cheap Holidays', icon: <Sparkles className="w-[18px] h-[18px]" />, href: '/search?filter=cheap' },
  { label: 'Last Minute', icon: <Clock className="w-[18px] h-[18px]" />, href: '/search?filter=last-minute' },
  { label: 'Swim-Up Room', icon: <Waves className="w-[18px] h-[18px]" />, href: '/search?filter=swim-up' },
  { label: 'Solo', icon: <User className="w-[18px] h-[18px]" />, href: '/search?filter=solo' },
  { label: 'Lakes & Mountains', icon: <Mountain className="w-[18px] h-[18px]" />, href: '/search?filter=lakes-mountains' },
  { label: 'Honeymoon', icon: <HeartHandshake className="w-[18px] h-[18px]" />, href: '/search?filter=honeymoon' },
  { label: 'Long Haul', icon: <Plane className="w-[18px] h-[18px]" />, href: '/search?filter=long-haul' },
  { label: 'Villa', icon: <Home className="w-[18px] h-[18px]" />, href: '/search?filter=villa' },
  { label: 'Luxury', icon: <Crown className="w-[18px] h-[18px]" />, href: '/search?filter=luxury' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const { theme, toggleTheme } = useTheme();
  const { wishlist } = useWishlist();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveMegaMenu(null);
  }, [location.pathname, location.search]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  let megaMenuTimeoutId: ReturnType<typeof setTimeout> | null = null;

  const handleMegaMenuEnter = (label: string) => {
    if (megaMenuTimeoutId) clearTimeout(megaMenuTimeoutId);
    setActiveMegaMenu(label);
  };

  const handleMegaMenuLeave = () => {
    megaMenuTimeoutId = setTimeout(() => {
      setActiveMegaMenu(null);
    }, 150);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full">
        {/* Top Info Bar */}
        <div
          className="relative overflow-hidden"
          style={{ background: 'linear-gradient(90deg, #ff467c 0%, #002f17 100%)' }}
        >
          <div className="flex items-center h-9">
            <motion.div
              className="whitespace-nowrap flex items-center text-white text-[11px] font-semibold tracking-wide"
              animate={{ x: ['0%', '-50%'] }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            >
              <span className="px-8">
                Summer 2026 Sale — Up to 40% off selected holidays | Book with confidence — ATOL & ABTA protected
              </span>
              <span className="px-8">
                Summer 2026 Sale — Up to 40% off selected holidays | Book with confidence — ATOL & ABTA protected
              </span>
              <span className="px-8">
                Summer 2026 Sale — Up to 40% off selected holidays | Book with confidence — ATOL & ABTA protected
              </span>
              <span className="px-8">
                Summer 2026 Sale — Up to 40% off selected holidays | Book with confidence — ATOL & ABTA protected
              </span>
            </motion.div>
          </div>
        </div>

        {/* Main Header */}
        <div
          className={cn(
            'transition-all duration-300 bg-[#ffffff]',
            scrolled && 'shadow-[0_2px_12px_rgba(0,47,23,0.08)]'
          )}
        >
          <div className="max-w-[1320px] mx-auto px-6 flex items-center justify-between h-[68px]">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 shrink-0 group">
              <span
                className="text-2xl font-bold tracking-tight text-[#ff467c] group-hover:opacity-90 transition-opacity"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                FirstChoice
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-0.5 ml-10">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.label === 'HOLIDAYS' && handleMegaMenuEnter(item.label)}
                  onMouseLeave={handleMegaMenuLeave}
                >
                  <Link
                    to={item.href}
                    className={cn(
                      'flex items-center gap-1 px-4 py-2 text-[11px] font-bold tracking-[0.15em] transition-all duration-200 rounded-full',
                      activeMegaMenu === item.label
                        ? 'text-[#ff467c] bg-[#ffd4e4]'
                        : 'text-[#002f17] hover:text-[#ff467c] hover:bg-[#ffd4e4]/50'
                    )}
                  >
                    {item.label}
                    {item.label === 'HOLIDAYS' && (
                      <ChevronDown className={cn(
                        'w-3 h-3 transition-transform duration-200',
                        activeMegaMenu === item.label && 'rotate-180'
                      )} />
                    )}
                  </Link>

                  {/* Mega Menu */}
                  {item.label === 'HOLIDAYS' && (
                    <AnimatePresence>
                      {activeMegaMenu === item.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.98 }}
                          transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                          className="absolute left-1/2 -translate-x-1/2 top-full pt-3"
                          onMouseEnter={() => handleMegaMenuEnter(item.label)}
                          onMouseLeave={handleMegaMenuLeave}
                        >
                          <div className="bg-white rounded-2xl border border-[#e9e3da] shadow-[0_20px_60px_-12px_rgba(0,47,23,0.15)] p-6 w-[720px]">
                            <div className="flex gap-8">
                              {/* Left Column - Holiday Types */}
                              <div className="flex-1">
                                <p className="text-[10px] font-bold text-[#002f17]/40 uppercase tracking-[0.2em] mb-4">
                                  Holiday Types
                                </p>
                                <div className="grid grid-cols-2 gap-0.5">
                                  {holidaysMegaMenu.map((menuItem) => (
                                    <Link
                                      key={menuItem.label}
                                      to={menuItem.href}
                                      className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] text-[#002f17]/70 hover:bg-[#ffd4e4]/40 hover:text-[#ff467c] transition-all duration-200 group/item"
                                    >
                                      <span className="text-[#002f17]/40 group-hover/item:text-[#ff467c] transition-colors">
                                        {menuItem.icon}
                                      </span>
                                      {menuItem.label}
                                    </Link>
                                  ))}
                                </div>
                              </div>

                              {/* Right Column - Banners */}
                              <div className="w-[280px] flex flex-col gap-3">
                                <Link
                                  to="/search?filter=last-minute"
                                  className="relative block rounded-2xl overflow-hidden h-[128px] p-5 text-white hover:shadow-lg transition-all duration-300 group/banner"
                                  style={{ background: 'linear-gradient(135deg, #ff467c 0%, #ff6b94 100%)' }}
                                >
                                  <div className="relative z-10">
                                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-70">Limited Time</p>
                                    <p className="text-xl font-bold mt-1" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Last Minute</p>
                                    <p className="text-xs mt-2 opacity-80">Deals from £199pp</p>
                                  </div>
                                  <Plane className="absolute bottom-3 right-3 w-14 h-14 opacity-15 group-hover/banner:opacity-25 group-hover/banner:translate-x-0.5 group-hover/banner:-translate-y-0.5 transition-all duration-300" />
                                </Link>

                                <Link
                                  to="/search?tab=summer-2026"
                                  className="relative block rounded-2xl overflow-hidden h-[128px] p-5 text-white hover:shadow-lg transition-all duration-300 group/banner"
                                  style={{ background: 'linear-gradient(135deg, #002f17 0%, #004d2a 100%)' }}
                                >
                                  <div className="relative z-10">
                                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-70">Book Now</p>
                                    <p className="text-xl font-bold mt-1" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Summer 2026</p>
                                    <p className="text-xs mt-2 opacity-80">Secure your getaway</p>
                                  </div>
                                  <Sparkles className="absolute bottom-3 right-3 w-14 h-14 opacity-15 group-hover/banner:opacity-25 group-hover/banner:translate-x-0.5 group-hover/banner:-translate-y-0.5 transition-all duration-300" />
                                </Link>

                                <Link
                                  to="/insiders"
                                  className="relative block rounded-2xl overflow-hidden h-[128px] p-5 text-white hover:shadow-lg transition-all duration-300 group/banner"
                                  style={{ background: 'linear-gradient(135deg, #ff467c 0%, #002f17 100%)' }}
                                >
                                  <div className="relative z-10">
                                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-70">Inspiration</p>
                                    <p className="text-xl font-bold mt-1" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Travel Tips</p>
                                    <p className="text-xs mt-2 opacity-80">Guides & insider access</p>
                                  </div>
                                  <MapPin className="absolute bottom-3 right-3 w-14 h-14 opacity-15 group-hover/banner:opacity-25 group-hover/banner:translate-x-0.5 group-hover/banner:-translate-y-0.5 transition-all duration-300" />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-1">
              <button
                className="hidden lg:flex p-2.5 rounded-full text-[#002f17]/60 hover:bg-[#ffd4e4]/40 hover:text-[#ff467c] transition-all duration-200"
                aria-label="Search"
              >
                <Search className="w-[18px] h-[18px]" />
              </button>

              <Link
                to="/account"
                className="hidden lg:flex p-2.5 rounded-full text-[#002f17]/60 hover:bg-[#ffd4e4]/40 hover:text-[#ff467c] transition-all duration-200"
                aria-label="Account"
              >
                <User className="w-[18px] h-[18px]" />
              </Link>

              <button
                onClick={toggleTheme}
                className="hidden lg:flex p-2.5 rounded-full text-[#002f17]/60 hover:bg-[#ffd4e4]/40 hover:text-[#ff467c] transition-all duration-200"
                aria-label="Toggle dark mode"
              >
                {theme === 'dark' ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
              </button>

              <Link
                to="/wishlist"
                className="hidden lg:flex relative p-2.5 rounded-full text-[#002f17]/60 hover:bg-[#ffd4e4]/40 hover:text-[#ff467c] transition-all duration-200"
                aria-label="Shortlist"
              >
                <Heart className="w-[18px] h-[18px]" />
                {wishlist.length > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold text-white rounded-full bg-[#ff467c]"
                  >
                    {wishlist.length}
                  </motion.span>
                )}
              </Link>

              {/* Mobile Controls */}
              <div className="flex lg:hidden items-center gap-1">
                <Link
                  to="/wishlist"
                  className="relative p-2 rounded-full text-[#002f17]/60"
                  aria-label="Shortlist"
                >
                  <Heart className="w-5 h-5" />
                  {wishlist.length > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white rounded-full bg-[#ff467c]">
                      {wishlist.length}
                    </span>
                  )}
                </Link>
                <button
                  onClick={() => setMobileOpen(true)}
                  className="p-2 rounded-full text-[#002f17]/60 hover:bg-[#ffd4e4]/40 transition-all duration-200"
                  aria-label="Open menu"
                >
                  <Menu className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
