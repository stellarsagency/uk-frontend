import { motion } from 'framer-motion';
import { Bed, Users, Check, Wifi, Wind, Coffee, Bath, Eye, Armchair, CookingPot } from 'lucide-react';
import { cn, formatPrice } from '@/lib/utils';
import type { RoomType } from '@/types';

interface RoomTypeCardProps {
  room: RoomType;
  onSelect: (room: RoomType) => void;
  selected?: boolean;
}

const featureIcons: Record<string, React.ElementType> = {
  'en-suite bathroom': Bath,
  'air conditioning': Wind,
  tv: Coffee,
  'sea view': Eye,
  balcony: Eye,
  minibar: Coffee,
  'coffee machine': Coffee,
  'jacuzzi bath': Bath,
  'separate living area': Armchair,
  'premium toiletries': Bath,
  'king-size bed': Bed,
  'two bedrooms': Bed,
  kitchenette: CookingPot,
  'sofa bed': Armchair,
  'highchair available': Users,
  'wi-fi': Wifi,
  wifi: Wifi,
};

export function RoomTypeCard({ room, onSelect, selected }: RoomTypeCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'overflow-hidden rounded-lg border-2 bg-white transition-all duration-300',
        selected
          ? 'border-[#ff467c] shadow-lg ring-1 ring-[#ff467c]/20'
          : 'border-[#e9e3da] hover:border-[#e9e3da] hover:shadow-md'
      )}
    >
      <div className="flex flex-col sm:flex-row">
        <div className="relative h-52 w-full flex-shrink-0 overflow-hidden sm:h-auto sm:w-60">
          <img
            src={room.image}
            alt={room.name}
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          {!room.available && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
              <span className="rounded bg-white/95 px-5 py-2 text-sm font-bold text-[#002f17] shadow-lg">
                Sold out
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-bold text-[#002f17]">{room.name}</h3>
              <div className="mt-2 flex items-center gap-4 text-sm text-[#555]">
                <span className="flex items-center gap-1.5 rounded bg-[#faf5ed] px-3 py-1">
                  <Bed className="h-4 w-4 text-[#818085]" />
                  {room.bedType}
                </span>
                <span className="flex items-center gap-1.5 rounded bg-[#faf5ed] px-3 py-1">
                  <Users className="h-4 w-4 text-[#818085]" />
                  {room.occupancy} guests
                  {room.maxOccupancy > room.occupancy ? ` (max ${room.maxOccupancy})` : ''}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {room.features.map((feature) => {
              const Icon = featureIcons[feature.toLowerCase()];
              return (
                <span
                  key={feature}
                  className="inline-flex items-center gap-1.5 rounded bg-[#faf5ed] px-3 py-1.5 text-xs font-medium text-[#555]"
                >
                  {Icon && <Icon className="h-3.5 w-3.5 text-[#818085]" />}
                  {feature}
                </span>
              );
            })}
          </div>

          <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-5">
            <div>
              <p className="text-[11px] font-medium text-[#818085] leading-none uppercase tracking-wider">From</p>
              <p className="mt-1 text-2xl font-bold text-[#002f17]">
                {formatPrice(room.pricePerPerson)}
                <span className="text-sm font-medium text-[#818085]"> pp</span>
              </p>
            </div>
            <button
              onClick={() => room.available && onSelect(room)}
              disabled={!room.available}
              className={cn(
                'inline-flex items-center justify-center gap-2 rounded px-7 py-3 text-sm font-bold transition-all duration-200',
                selected
                  ? 'bg-[#002f17] text-white'
                  : room.available
                    ? 'bg-[#ff467c] text-white hover:bg-[#e63d6f]'
                    : 'bg-[#e9e3da] text-[#818085] cursor-not-allowed'
              )}
            >
              {selected ? (
                <>
                  <Check className="h-4 w-4" />
                  Selected
                </>
              ) : (
                'Select room'
              )}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
