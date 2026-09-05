import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Wifi,
  Car,
  UtensilsCrossed,
  Waves,
  Dumbbell,
  ShieldCheck,
  Coffee,
  Tv,
  Wind,
  PawPrint,
  Baby,
  Accessibility,
  ParkingSquare,
  ConciergeBell,
  Ship,
  TreePalm,
  Music,
  Sparkles,
  Dog,
  Droplets,
  Sailboat,
  Gamepad2,
  Shirt,
  Hotel,
  CircleDot,
  ChevronDown,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const iconMap: Record<string, LucideIcon> = {
  'wi-fi': Wifi,
  wifi: Wifi,
  car: Car,
  parking: ParkingSquare,
  restaurant: UtensilsCrossed,
  restaurants: UtensilsCrossed,
  bar: Coffee,
  bars: Coffee,
  pool: Waves,
  pools: Waves,
  gym: Dumbbell,
  spa: Sparkles,
  security: ShieldCheck,
  coffee: Coffee,
  tv: Tv,
  'air conditioning': Wind,
  'air-con': Wind,
  'kids club': Baby,
  playground: Baby,
  pets: PawPrint,
  dog: Dog,
  accessible: Accessibility,
  concierge: ConciergeBell,
  'water sports': Sailboat,
  waterpark: Ship,
  entertainment: Music,
  beach: TreePalm,
  garden: TreePalm,
  terrace: TreePalm,
  'rooftop terrace': TreePalm,
  tennis: CircleDot,
  sports: Gamepad2,
  laundry: Shirt,
  'room service': Hotel,
  'luggage storage': Hotel,
  kayaking: Droplets,
  diving: Droplets,
  'diving centre': Droplets,
  'bbq': UtensilsCrossed,
  'yoga studio': Dumbbell,
  'boat hire': Sailboat,
};

function getAmenityIcon(amenity: string): LucideIcon {
  const key = amenity.toLowerCase();
  return iconMap[key] || CircleDot;
}

interface AmenitiesGridProps {
  amenities: string[];
}

export function AmenitiesGrid({ amenities }: AmenitiesGridProps) {
  const [showAll, setShowAll] = useState(false);
  const visibleAmenities = showAll ? amenities : amenities.slice(0, 8);
  const hasMore = amenities.length > 8;

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        <AnimatePresence>
          {visibleAmenities.map((amenity, index) => {
            const Icon = getAmenityIcon(amenity);
            return (
              <motion.div
                key={amenity}
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2, delay: index * 0.03 }}
                className="group flex items-center gap-3 rounded-lg border border-[#e9e3da] bg-white px-4 py-3.5 transition-all duration-200 hover:border-[#ff467c]/20 hover:shadow-sm"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded bg-[#ff467c]/10 transition-colors group-hover:bg-[#ff467c]/20">
                  <Icon className="h-5 w-5 text-[#ff467c]" />
                </div>
                <span className="text-sm font-medium text-[#555]">{amenity}</span>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {hasMore && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-5 inline-flex items-center gap-2 rounded border border-[#e9e3da] bg-white px-5 py-2.5 text-sm font-semibold text-[#555] shadow-sm transition-all duration-200 hover:border-[#ff467c] hover:text-[#ff467c]"
        >
          {showAll ? 'Show less' : `Show all ${amenities.length} amenities`}
          <ChevronDown className={cn('h-4 w-4 transition-transform duration-200', showAll && 'rotate-180')} />
        </button>
      )}
    </div>
  );
}
