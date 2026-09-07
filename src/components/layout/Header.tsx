import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Heart, ChevronDown, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'HOLIDAYS', href: '/#/holidays' },
  { label: 'DEALS', href: '/#/deals' },
  { label: 'DESTINATIONS', href: '/#/destinations' },
  { label: 'CITY BREAKS', href: '/#/city-breaks' },
  { label: 'EXTRAS', href: '/#/extras' },
];

const holidayTypes = [
  'All Inclusive', 'Adults Only', 'Family', 'Beach', 'Last Minute',
  'Cheap Holidays', 'Solo', 'City Breaks', 'Winter Sun', 'Long Haul',
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      {/* Info Bar */}
      <div className="bg-[#002f17] text-white">
        <div className="max-w-[992px] mx-auto px-4 flex items-center h-[56px]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#ff467c] flex items-center justify-center shrink-0">
              <span className="text-white text-xs font-bold">FC</span>
            </div>
            <div>
              <p className="text-[14px] font-bold leading-tight">Summer 2026 Sale</p>
              <p className="text-[12px] text-white/70 leading-[20px]">Up to 40% off selected holidays</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={cn(
          'sticky top-0 z-50 bg-white transition-shadow duration-300',
          scrolled && 'shadow-[0_2px_12px_rgba(0,47,23,0.08)]'
        )}
      >
        <div className="max-w-[992px] mx-auto px-4 flex items-center justify-between h-[68px]">
          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-2 -ml-2"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6 text-[#002f17]" />
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span
              className="text-2xl font-bold tracking-tight text-[#ff467c]"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              FirstChoice
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 ml-8">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.label === 'HOLIDAYS' && setMegaOpen(true)}
                onMouseLeave={() => item.label === 'HOLIDAYS' && setMegaOpen(false)}
              >
                <a
                  href={item.href}
                  className={cn(
                    'flex items-center gap-1 px-4 py-2 text-[11px] font-bold tracking-[0.15em] rounded-full transition-all',
                    megaOpen && item.label === 'HOLIDAYS'
                      ? 'text-[#ff467c] bg-[#ffd4e4]'
                      : 'text-[#002f17] hover:text-[#ff467c] hover:bg-[#ffd4e4]/50'
                  )}
                >
                  {item.label}
                  {item.label === 'HOLIDAYS' && (
                    <ChevronDown className={cn('w-3 h-3 transition-transform', megaOpen && 'rotate-180')} />
                  )}
                </a>
              </div>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <a href="/#/travel-info" className="hidden lg:flex text-[11px] font-bold tracking-[0.1em] text-[#002f17] hover:text-[#ff467c] px-3 py-2 transition-colors">
              Travel Information
            </a>
            <a href="/#/manage" className="hidden lg:flex text-[11px] font-bold tracking-[0.1em] text-[#002f17] hover:text-[#ff467c] px-3 py-2 transition-colors">
              Manage My Booking
            </a>
            <button className="p-2 rounded-full hover:bg-[#ffd4e4]/40 transition-colors" aria-label="Shortlist">
              <Heart className="w-5 h-5 text-[#002f17]" />
            </button>
          </div>
        </div>

        {/* Mega Menu */}
        {megaOpen && (
          <div
            className="hidden lg:block absolute left-0 right-0 top-full bg-white border-t border-[#e9e3da] shadow-lg"
            onMouseEnter={() => setMegaOpen(true)}
            onMouseLeave={() => setMegaOpen(false)}
          >
            <div className="max-w-[992px] mx-auto px-4 py-6">
              <p className="text-[10px] font-bold text-[#002f17]/40 uppercase tracking-[0.2em] mb-4">Holiday Types</p>
              <div className="grid grid-cols-5 gap-2">
                {holidayTypes.map((type) => (
                  <a
                    key={type}
                    href={`/#/search?filter=${type.toLowerCase().replace(/\s+/g, '-')}`}
                    className="px-4 py-3 rounded-xl text-[13px] text-[#002f17]/70 hover:bg-[#ffd4e4]/40 hover:text-[#ff467c] transition-all font-medium"
                  >
                    {type}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-[320px] bg-white shadow-xl overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-[#e9e3da]">
              <span className="text-sm font-bold text-[#002f17]">MENU</span>
              <button onClick={() => setMobileOpen(false)} className="p-1">
                <X className="w-6 h-6 text-[#002f17]" />
              </button>
            </div>
            <nav className="p-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block py-3 px-4 text-[13px] font-bold tracking-[0.1em] text-[#002f17] hover:text-[#ff467c] border-b border-[#e9e3da]/50"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="mt-6 pt-4 border-t border-[#e9e3da]">
                <a href="/#/travel-info" className="block py-2 px-4 text-[13px] text-[#002f17]/70">Travel Information</a>
                <a href="/#/manage" className="block py-2 px-4 text-[13px] text-[#002f17]/70">Manage My Booking</a>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
