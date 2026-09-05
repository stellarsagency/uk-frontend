import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ResultCard } from './ResultCard';
import { Skeleton } from '@/components/ui/Skeleton';
import type { HolidayPackage } from '@/types';
import { PackageSearch } from 'lucide-react';

interface ResultGridProps {
  holidays: HolidayPackage[];
  viewMode: 'grid' | 'list';
  loading: boolean;
  className?: string;
}

function SkeletonCard({ viewMode }: { viewMode: 'grid' | 'list' }) {
  if (viewMode === 'list') {
    return (
      <div className="flex flex-col overflow-hidden rounded-lg border border-[#e9e3da] bg-white sm:flex-row">
        <Skeleton className="h-56 w-full shrink-0 sm:h-auto sm:w-80" />
        <div className="flex-1 space-y-4 p-6">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <div className="flex gap-2">
            <Skeleton className="h-6 w-16 rounded" />
            <Skeleton className="h-6 w-24 rounded" />
          </div>
          <Skeleton className="h-4 w-1/3" />
          <div className="flex items-end justify-between pt-5">
            <Skeleton className="h-10 w-28" />
            <Skeleton className="h-12 w-32 rounded" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-[#e9e3da] bg-white">
      <Skeleton className="h-52 w-full" />
      <div className="space-y-4 p-4">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex gap-2">
          <Skeleton className="h-5 w-12 rounded" />
          <Skeleton className="h-5 w-20 rounded" />
        </div>
        <div className="flex items-end justify-between pt-3">
          <Skeleton className="h-7 w-24" />
          <Skeleton className="h-9 w-24 rounded" />
        </div>
      </div>
    </div>
  );
}

export function ResultGrid({ holidays, viewMode, loading, className }: ResultGridProps) {
  if (loading) {
    return (
      <div
        className={cn(
          viewMode === 'grid'
            ? 'grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3'
            : 'flex flex-col gap-5',
          className
        )}
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} viewMode={viewMode} />
        ))}
      </div>
    );
  }

  if (holidays.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center justify-center rounded-lg border border-dashed border-[#e9e3da] bg-white py-24 text-center"
      >
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-lg bg-[#faf5ed]">
          <PackageSearch className="h-8 w-8 text-[#818085]" />
        </div>
        <h3 className="mb-2 text-xl font-bold text-[#002f17]">No holidays found</h3>
        <p className="max-w-sm text-sm text-[#555] leading-relaxed">
          Try adjusting your filters or search for a different destination to discover amazing deals.
        </p>
      </motion.div>
    );
  }

  return (
    <div
      className={cn(
        viewMode === 'grid'
          ? 'grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3'
          : 'flex flex-col gap-5',
        className
      )}
    >
      <AnimatePresence mode="popLayout">
        {holidays.map((holiday, index) => (
          <motion.div
            key={holiday.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <ResultCard holiday={holiday} viewMode={viewMode} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
