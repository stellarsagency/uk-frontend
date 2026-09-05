import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Sun,
  Moon,
  ChevronDown,
  ChevronRight,
  Home,
  Umbrella,
  Clock,
  MapPin,
  Building,
  Sparkles,
  Info,
  Briefcase,
  LogIn,
  UserPlus,
  Heart,
  Shield,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const mainNavItems = [
  { label: 'HOME', href: '/', icon: <Home className="w-5 h-5" /> },
  {
    label: 'HOLIDAYS',
    href: '/search',
    icon: <Umbrella className="w-5 h-5" />,
    children: [
      { label: 'All Inclusive', href: '/search?filter=all-inclusive' },
      { label: 'Adults Only', href: '/search?filter=adults-only' },
      { label: 'Family Holidays', href: '/search?filter=family' },
      { label: 'Beach Holidays', href: '/search?filter=beach' },
      { label: 'Cheap Holidays', href: '/search?filter=cheap' },
      { label: 'Last Minute', href: '/search?filter=last-minute' },
      { label: 'Luxury', href: '/search?filter=luxury' },
      { label: 'Villa Holidays', href: '/search?filter=villa' },
      { label: 'Long Haul', href: '/search?filter=long-haul' },
      { label: 'Honeymoon', href: '/search?filter=honeymoon' },
    ],
  },
  { label: 'DEALS', href: '/search?tab=deals', icon: <Sparkles className="w-5 h-5" /> },
  {
    label: 'DESTINATIONS',
    href: '/search?tab=destinations',
    icon: <MapPin className="w-5 h-5" />,
    children: [
      { label: 'Spain', href: '/search?destination=spain' },
      { label: 'Greece', href: '/search?destination=greece' },
      { label: 'Turkey', href: '/search?destination=turkey' },
      { label: 'Portugal', href: '/search?destination=portugal' },
      { label: 'Italy', href: '/search?destination=italy' },
      { label: 'France', href: '/search?destination=france' },
      { label: 'Canary Islands', href: '/search?destination=canary-islands' },
      { label: 'Egypt', href: '/search?destination=egypt' },
      { label: 'Morocco', href: '/search?destination=morocco' },
      { label: 'UAE', href: '/search?destination=uae' },
    ],
  },
  { label: 'CITY BREAKS', href: '/search?tab=city-breaks', icon: <Building className="w-5 h-5" /> },
  { label: 'EXTRAS', href: '/search?tab=extras', icon: <Clock className="w-5 h-5" /> },
];

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const toggleExpand = (label: string) => {
    setExpandedItem(expandedItem === label ? null : label);
  };

  const isActive = (href: string) => {
    const path = href.split('?')[0];
    return location.pathname === path;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 32, stiffness: 300 }}
            className="fixed inset-y-0 right-0 z-[70] w-[340px] max-w-[85vw] bg-[#ffffff] shadow-[-8px_0_30px_rgba(0,47,23,0.12)] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 h-[68px] border-b border-[#e9e3da]">
              <span
                className="text-xl font-bold tracking-tight text-[#ff467c]"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                FirstChoice
              </span>
              <motion.button
                onClick={onClose}
                whileHover={{ rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="p-2 rounded-full text-[#002f17]/40 hover:bg-[#ffd4e4]/40 hover:text-[#ff467c] transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-4 px-4">
              <div className="space-y-1">
                {mainNavItems.map((item, index) => {
                  const hasChildren = item.children && item.children.length > 0;
                  const isExpanded = expandedItem === item.label;

                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                    >
                      {hasChildren ? (
                        <>
                          <button
                            onClick={() => toggleExpand(item.label)}
                            className={cn(
                              'flex items-center justify-between w-full px-4 py-3.5 rounded-xl text-sm font-semibold tracking-wide transition-all duration-200',
                              isActive(item.href)
                                ? 'bg-[#ffd4e4]/50 text-[#ff467c]'
                                : 'text-[#002f17] hover:bg-[#ffd4e4]/30'
                            )}
                          >
                            <span className="flex items-center gap-3.5">
                              <span className="text-[#002f17]/40">{item.icon}</span>
                              {item.label}
                            </span>
                            <ChevronDown className={cn(
                              'w-4 h-4 text-[#002f17]/40 transition-transform duration-300',
                              isExpanded && 'rotate-180'
                            )} />
                          </button>
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                                className="overflow-hidden"
                              >
                                <div className="pl-10 pr-3 py-1.5 space-y-0.5">
                                  {item.children?.map((child) => (
                                    <Link
                                      key={child.href}
                                      to={child.href}
                                      onClick={onClose}
                                      className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13px] text-[#002f17]/60 hover:bg-[#ffd4e4]/30 hover:text-[#ff467c] transition-all duration-200"
                                    >
                                      <ChevronRight className="w-3 h-3 opacity-50" />
                                      {child.label}
                                    </Link>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <Link
                          to={item.href}
                          onClick={onClose}
                          className={cn(
                            'flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-sm font-semibold tracking-wide transition-all duration-200',
                            isActive(item.href)
                              ? 'bg-[#ffd4e4]/50 text-[#ff467c]'
                              : 'text-[#002f17] hover:bg-[#ffd4e4]/30'
                          )}
                        >
                          <span className="text-[#002f17]/40">{item.icon}</span>
                          {item.label}
                        </Link>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              <div className="my-4 mx-2 border-t border-[#e9e3da]" />

              <div className="space-y-0.5">
                <Link
                  to="/wishlist"
                  onClick={onClose}
                  className="flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-sm font-medium text-[#002f17] hover:bg-[#ffd4e4]/30 transition-all duration-200"
                >
                  <Heart className="w-5 h-5 text-[#002f17]/40" />
                  Shortlist
                </Link>

                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-3.5 w-full px-4 py-3.5 rounded-xl text-sm font-medium text-[#002f17] hover:bg-[#ffd4e4]/30 transition-all duration-200"
                >
                  {theme === 'dark' ? (
                    <Sun className="w-5 h-5 text-[#002f17]/40" />
                  ) : (
                    <Moon className="w-5 h-5 text-[#002f17]/40" />
                  )}
                  {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                </button>
              </div>

              <div className="my-4 mx-2 border-t border-[#e9e3da]" />

              <div className="space-y-0.5">
                <Link
                  to="/travel-information"
                  onClick={onClose}
                  className="flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-sm font-medium text-[#002f17] hover:bg-[#ffd4e4]/30 transition-all duration-200"
                >
                  <Info className="w-5 h-5 text-[#002f17]/40" />
                  Travel Information
                </Link>
                <Link
                  to="/manage-booking"
                  onClick={onClose}
                  className="flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-sm font-medium text-[#002f17] hover:bg-[#ffd4e4]/30 transition-all duration-200"
                >
                  <Briefcase className="w-5 h-5 text-[#002f17]/40" />
                  Manage My Booking
                </Link>
              </div>
            </nav>

            {/* Bottom Actions */}
            <div className="p-5 border-t border-[#e9e3da] space-y-3">
              <Link
                to="/account"
                onClick={onClose}
                className="flex items-center justify-center gap-2 w-full py-3.5 text-sm font-bold rounded-xl text-white transition-all duration-200 hover:shadow-lg bg-[#ff467c] hover:bg-[#e63d6f]"
              >
                <LogIn className="w-4 h-4" />
                Log In
              </Link>
              <Link
                to="/account"
                onClick={onClose}
                className="flex items-center justify-center gap-2 w-full py-3.5 text-sm font-bold rounded-xl border border-[#e9e3da] text-[#002f17] hover:bg-[#ffd4e4]/30 transition-all duration-200"
              >
                <UserPlus className="w-4 h-4" />
                Sign Up
              </Link>

              <div className="flex items-center justify-center gap-1.5 pt-2 text-[10px] text-[#002f17]/40">
                <Shield className="w-3 h-3" />
                <span>ATOL & ABTA Protected</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
