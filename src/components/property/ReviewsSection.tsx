import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Star, ThumbsUp, ChevronDown, Quote } from 'lucide-react';
import { cn, formatDate } from '@/lib/utils';
import type { Review } from '@/types';

interface ReviewsSectionProps {
  reviews: Review[];
}

type SortOption = 'recent' | 'highest' | 'lowest';

function RatingBar({ stars, count, total }: { stars: number; count: number; total: number }) {
  const pct = total > 0 ? (count / total) * 100 : 0;
  return (
    <div className="flex items-center gap-3">
      <span className="w-4 text-right text-sm font-semibold text-[#555]">{stars}</span>
      <Star className="h-4 w-4 fill-[#ff467c] text-[#ff467c]" />
      <div className="h-3 flex-1 overflow-hidden rounded-full bg-[#faf5ed]">
        <motion.div
          className="h-full rounded-full bg-[#ff467c]"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </div>
      <span className="w-8 text-right text-sm text-[#818085]">{count}</span>
    </div>
  );
}

function CircularProgress({ rating, maxRating = 5 }: { rating: number; maxRating?: number }) {
  const percentage = (rating / maxRating) * 100;
  const circumference = 2 * Math.PI * 36;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex h-24 w-24 items-center justify-center">
      <svg className="absolute h-24 w-24 -rotate-90" viewBox="0 0 80 80">
        <circle
          cx="40"
          cy="40"
          r="36"
          fill="none"
          stroke="#e9e3da"
          strokeWidth="6"
        />
        <motion.circle
          cx="40"
          cy="40"
          r="36"
          fill="none"
          stroke="#ff467c"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </svg>
      <div className="text-center">
        <span className="text-2xl font-bold text-[#002f17]">{rating.toFixed(1)}</span>
      </div>
    </div>
  );
}

export function ReviewsSection({ reviews }: ReviewsSectionProps) {
  const [sort, setSort] = useState<SortOption>('recent');
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const overallRating = useMemo(() => {
    if (reviews.length === 0) return 0;
    return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  }, [reviews]);

  const ratingBreakdown = useMemo(() => {
    const counts = [0, 0, 0, 0, 0];
    reviews.forEach((r) => {
      if (r.rating >= 1 && r.rating <= 5) counts[r.rating - 1]++;
    });
    return counts;
  }, [reviews]);

  const sorted = useMemo(() => {
    const copy = [...reviews];
    switch (sort) {
      case 'highest':
        return copy.sort((a, b) => b.rating - a.rating);
      case 'lowest':
        return copy.sort((a, b) => a.rating - b.rating);
      case 'recent':
      default:
        return copy.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
  }, [reviews, sort]);

  const sortLabels: Record<SortOption, string> = {
    recent: 'Most recent',
    highest: 'Highest rating',
    lowest: 'Lowest rating',
  };

  if (reviews.length === 0) return null;

  const getRatingBg = (rating: number) => {
    if (rating >= 4) return 'bg-[#ff467c]';
    if (rating >= 3) return 'bg-[#ff467c]/80';
    return 'bg-[#818085]';
  };

  const getAvatarColor = (name: string) => {
    const colors = [
      'bg-[#ff467c]',
      'bg-[#002f17]',
      'bg-[#ff467c]/80',
      'bg-[#002f17]/80',
      'bg-[#818085]',
      'bg-[#ff467c]/60',
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <div>
      <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
        <div className="flex flex-col items-center gap-3 lg:items-start">
          <CircularProgress rating={overallRating} />
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  'h-5 w-5',
                  i < Math.round(overallRating)
                    ? 'fill-[#ff467c] text-[#ff467c]'
                    : 'fill-[#e9e3da] text-[#e9e3da]'
                )}
              />
            ))}
          </div>
          <span className="text-sm font-bold text-[#002f17]">
            {overallRating >= 4.5 ? 'Excellent' : overallRating >= 4 ? 'Very Good' : overallRating >= 3.5 ? 'Good' : 'Average'}
          </span>
          <span className="text-sm text-[#818085]">{reviews.length} reviews</span>
        </div>

        <div className="flex-1 space-y-3">
          {[5, 4, 3, 2, 1].map((stars) => (
            <RatingBar key={stars} stars={stars} count={ratingBreakdown[stars - 1]} total={reviews.length} />
          ))}
        </div>
      </div>

      <div className="mt-10">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-[#002f17]">Guest reviews</h3>
          <div className="relative">
            <button
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              className="flex items-center gap-2 rounded border border-[#e9e3da] bg-white px-4 py-2.5 text-sm font-semibold text-[#555] shadow-sm transition-all duration-200 hover:border-[#e9e3da]"
            >
              {sortLabels[sort]}
              <ChevronDown className={cn('h-4 w-4 transition-transform duration-200', showSortDropdown && 'rotate-180')} />
            </button>
            {showSortDropdown && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowSortDropdown(false)} />
                <div className="absolute right-0 top-full z-20 mt-2 w-48 overflow-hidden rounded-lg border border-[#e9e3da] bg-white py-1.5 shadow-lg">
                  {(Object.entries(sortLabels) as [SortOption, string][]).map(([value, label]) => (
                    <button
                      key={value}
                      onClick={() => {
                        setSort(value);
                        setShowSortDropdown(false);
                      }}
                      className={cn(
                        'w-full px-4 py-2.5 text-left text-sm transition-colors hover:bg-[#faf5ed]',
                        sort === value ? 'font-semibold text-[#ff467c]' : 'text-[#555]'
                      )}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="mt-5 space-y-4">
          {sorted.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.3 }}
              className="group rounded-lg border border-[#e9e3da] bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className={cn('flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold text-white', getAvatarColor(review.name))}>
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-[#002f17]">{review.name}</p>
                    <div className="mt-1.5 flex items-center gap-2.5">
                      <span className={cn('flex items-center gap-1 rounded px-2 py-0.5 text-xs font-bold text-white', getRatingBg(review.rating))}>
                        {review.rating}
                      </span>
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              'h-3.5 w-3.5',
                              i < review.rating
                                ? 'fill-[#ff467c] text-[#ff467c]'
                                : 'fill-[#e9e3da] text-[#e9e3da]'
                            )}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-[#818085]">{formatDate(review.date)}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative mt-4 ml-16">
                <Quote className="absolute -left-1 -top-1 h-5 w-5 text-[#e9e3da]" />
                <p className="pl-4 text-sm leading-relaxed text-[#555]">{review.comment}</p>
              </div>
              <div className="mt-4 ml-16 flex items-center gap-1.5 text-xs text-[#818085]">
                <ThumbsUp className="h-3.5 w-3.5" />
                <span>{review.helpful} found this helpful</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
