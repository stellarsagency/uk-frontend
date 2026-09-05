import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn, formatPrice, getRatingLabel } from '@/lib/utils';
import { useWishlist } from '@/hooks/useWishlist';
import type { HolidayPackage } from '@/types';
import { Heart, Star, Plane, MapPin, Clock, ChevronRight } from 'lucide-react';

interface ResultCardProps {
  holiday: HolidayPackage;
  viewMode: 'grid' | 'list';
}

export function ResultCard({ holiday, viewMode }: ResultCardProps) {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const wishlisted = isInWishlist(holiday.id);
  const discount = holiday.originalPrice
    ? Math.round(((holiday.originalPrice - holiday.price) / holiday.originalPrice) * 100)
    : null;

  if (viewMode === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <Link
          to={`/property/${holiday.id}`}
          className="group flex flex-col overflow-hidden rounded-lg border border-[#e9e3da] bg-white transition-all duration-300 hover:shadow-lg sm:flex-row"
        >
          <div className="relative h-56 w-full shrink-0 overflow-hidden sm:h-auto sm:w-80">
            <img
              src={holiday.image}
              alt={holiday.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleWishlist(holiday);
              }}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition-all duration-200 hover:scale-110 hover:bg-white"
              aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart
                className={cn(
                  'h-5 w-5 transition-colors',
                  wishlisted ? 'fill-[#ff467c] text-[#ff467c]' : 'text-[#818085]'
                )}
              />
            </button>

            <div className="absolute left-4 top-4 flex flex-col gap-2">
              {discount && (
                <div className="rounded bg-[#ff467c] px-3 py-1 text-xs font-bold text-white">
                  Save {discount}%
                </div>
              )}
            </div>

            <div className="absolute bottom-4 left-4 rounded bg-white px-3 py-1.5 text-xs font-bold text-[#002f17] shadow-sm">
              {holiday.boardType}
            </div>
          </div>

          <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
            <div>
              <h3 className="text-lg font-bold text-[#002f17] transition-colors group-hover:text-[#ff467c]">
                {holiday.name}
              </h3>
              <div className="mt-1.5 flex items-center gap-1.5 text-sm text-[#555]">
                <MapPin className="h-4 w-4 text-[#818085]" />
                {holiday.destination}, {holiday.country}
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-2.5">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: holiday.starRating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[#ff467c] text-[#ff467c]" />
                  ))}
                </div>
                {holiday.reviewCount > 0 && (
                  <div className="flex items-center gap-1.5">
                    <span className="flex h-7 min-w-[28px] items-center justify-center rounded bg-[#ff467c] px-2 text-xs font-bold text-white">
                      {holiday.rating}
                    </span>
                    <span className="text-sm font-semibold text-[#ff467c]">
                      {getRatingLabel(holiday.rating)}
                    </span>
                    <span className="text-sm text-[#818085]">
                      ({holiday.reviewCount})
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-[#555]">
                {holiday.flightIncluded && holiday.flightDetails && (
                  <span className="flex items-center gap-1.5 rounded bg-[#faf5ed] px-3 py-1 text-xs font-medium">
                    <Plane className="h-3.5 w-3.5 text-[#818085]" />
                    {holiday.flightDetails.airline} · {holiday.flightDetails.departure.code} → {holiday.flightDetails.arrival.code}
                  </span>
                )}
                <span className="flex items-center gap-1.5 rounded bg-[#faf5ed] px-3 py-1 text-xs font-medium">
                  <Clock className="h-3.5 w-3.5 text-[#818085]" />
                  {holiday.duration} nights
                </span>
              </div>
            </div>

            <div className="mt-5 flex items-end justify-between border-t border-[#e9e3da] pt-5">
              <div>
                {holiday.originalPrice && (
                  <p className="text-sm text-[#818085] line-through">
                    {formatPrice(holiday.originalPrice)} pp
                  </p>
                )}
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-bold text-[#002f17]">
                    {formatPrice(holiday.price)}
                  </span>
                  <span className="text-sm font-medium text-[#818085]">pp</span>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded bg-[#ff467c] px-6 py-3 text-sm font-bold text-white transition-all duration-200 group-hover:bg-[#e63d6f]">
                View Deal
                <span className="inline-block w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[6px] border-l-white" />
              </span>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Link
        to={`/property/${holiday.id}`}
        className="group flex h-full flex-col overflow-hidden rounded-lg border border-[#e9e3da] bg-white transition-all duration-300 hover:shadow-lg"
      >
        <div className="relative h-52 w-full overflow-hidden">
          <img
            src={holiday.image}
            alt={holiday.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(holiday);
            }}
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md transition-all duration-200 hover:scale-110 hover:bg-white"
            aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart
              className={cn(
                'h-4 w-4 transition-colors',
                wishlisted ? 'fill-[#ff467c] text-[#ff467c]' : 'text-[#818085]'
              )}
            />
          </button>

          {discount && (
            <div className="absolute left-3 top-3 rounded bg-[#ff467c] px-3 py-1 text-xs font-bold text-white">
              Save {discount}%
            </div>
          )}

          <div className="absolute bottom-3 left-3 rounded bg-white px-3 py-1 text-xs font-bold text-[#002f17] shadow-sm">
            {holiday.boardType}
          </div>
        </div>

        <div className="flex flex-1 flex-col p-4">
          <h3 className="text-base font-bold text-[#002f17] line-clamp-1 transition-colors group-hover:text-[#ff467c]">
            {holiday.name}
          </h3>
          <div className="mt-1.5 flex items-center gap-1.5 text-sm text-[#555]">
            <MapPin className="h-3.5 w-3.5 text-[#818085]" />
            {holiday.destination}, {holiday.country}
          </div>

          <div className="mt-2.5 flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: holiday.starRating }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-[#ff467c] text-[#ff467c]" />
              ))}
            </div>
            {holiday.reviewCount > 0 && (
              <div className="flex items-center gap-1">
                <span className="flex h-6 min-w-[24px] items-center justify-center rounded bg-[#ff467c] px-1.5 text-xs font-bold text-white">
                  {holiday.rating}
                </span>
                <span className="text-xs text-[#818085]">
                  ({holiday.reviewCount})
                </span>
              </div>
            )}
          </div>

          {holiday.flightIncluded && holiday.flightDetails && (
            <p className="mt-2.5 flex items-center gap-1.5 text-xs text-[#555]">
              <Plane className="h-3.5 w-3.5 text-[#818085]" />
              {holiday.flightDetails.airline} · {holiday.flightDetails.departure.code} → {holiday.flightDetails.arrival.code}
            </p>
          )}

          <div className="mt-auto flex items-end justify-between border-t border-[#e9e3da] pt-3.5">
            <div>
              {holiday.originalPrice && (
                <p className="text-xs text-[#818085] line-through">
                  {formatPrice(holiday.originalPrice)} pp
                </p>
              )}
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold text-[#002f17]">
                  {formatPrice(holiday.price)}
                </span>
                <span className="text-xs text-[#818085]">pp</span>
              </div>
            </div>
            <span className="inline-flex items-center gap-1 rounded bg-[#ff467c] px-4 py-2 text-xs font-bold text-white transition-all duration-200 group-hover:bg-[#e63d6f]">
              View Deal
              <ChevronRight className="h-3 w-3" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
