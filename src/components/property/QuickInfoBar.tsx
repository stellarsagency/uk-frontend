import { MapPin, Star } from 'lucide-react';
import { cn, formatPrice, getRatingLabel } from '@/lib/utils';
import type { HolidayPackage } from '@/types';

interface QuickInfoBarProps {
  holiday: HolidayPackage;
  onBook?: () => void;
}

export function QuickInfoBar({ holiday, onBook }: QuickInfoBarProps) {
  return (
    <div className="sticky top-0 z-30 border-b border-[#e9e3da] bg-white/90 shadow-md backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-4 px-4 py-4 md:gap-6 md:px-6">
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-lg font-bold text-[#002f17] md:text-xl">
            {holiday.name}
          </h1>
          <div className="mt-1 flex items-center gap-2 text-sm text-[#555]">
            <MapPin className="h-4 w-4 flex-shrink-0 text-[#818085]" />
            <span className="truncate">
              {holiday.destination}, {holiday.country}
            </span>
            <span className="text-[#e9e3da]">|</span>
            <div className="flex items-center gap-0.5">
              {Array.from({ length: holiday.starRating }).map((_, i) => (
                <Star
                  key={i}
                  className="h-3.5 w-3.5 fill-[#ff467c] text-[#ff467c]"
                />
              ))}
            </div>
            <span className="text-[#818085] text-xs font-medium">{holiday.starRating}-star</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          {holiday.reviewCount > 0 && (
            <div className="flex items-center gap-2">
              <span className="flex h-9 min-w-[36px] items-center justify-center rounded bg-[#ff467c] px-2.5 text-sm font-bold text-white">
                {holiday.rating}
              </span>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-[#ff467c] leading-tight">
                  {getRatingLabel(holiday.rating)}
                </p>
                <p className="text-[11px] text-[#818085]">
                  {holiday.reviewCount} reviews
                </p>
              </div>
            </div>
          )}

          <div className="hidden h-10 w-px bg-[#e9e3da] sm:block" />

          <div className="text-right">
            <p className="text-[11px] font-medium text-[#818085] leading-none uppercase tracking-wider">From</p>
            <p className="text-xl font-bold text-[#002f17] leading-tight">
              {formatPrice(holiday.price)}
              <span className="text-xs font-medium text-[#818085]"> pp</span>
            </p>
          </div>

          <button
            onClick={onBook}
            className="hidden items-center gap-2 rounded bg-[#ff467c] px-7 py-3 text-sm font-bold text-white transition-all duration-200 hover:bg-[#e63d6f] sm:inline-flex"
          >
            Book now
            <span className="inline-block w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[6px] border-l-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
