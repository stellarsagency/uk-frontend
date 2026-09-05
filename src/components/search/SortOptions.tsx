import { cn } from '@/lib/utils';
import { Select } from '@/components/ui/Select';
import { LayoutGrid, List, SlidersHorizontal } from 'lucide-react';

interface SortOptionsProps {
  sortBy: string;
  onSortChange: (sort: string) => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  resultCount: number;
  onMobileFilterClick?: () => void;
  className?: string;
}

const sortOptions = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'price-asc', label: 'Price (low to high)' },
  { value: 'price-desc', label: 'Price (high to low)' },
  { value: 'rating', label: 'Customer rating' },
  { value: 'duration', label: 'Duration' },
  { value: 'departure', label: 'Departure date' },
];

export function SortOptions({
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  resultCount,
  onMobileFilterClick,
  className,
}: SortOptionsProps) {
  return (
    <div className={cn('flex flex-wrap items-center justify-between gap-4 rounded-lg border border-[#e9e3da] bg-white px-5 py-3 shadow-sm', className)}>
      <div className="flex items-center gap-3">
        <p className="text-sm text-[#818085]">
          <span className="font-bold text-[#002f17]">{resultCount}</span>{' '}
          holiday{resultCount !== 1 ? 's' : ''}
        </p>
        {onMobileFilterClick && (
          <button
            className="flex items-center gap-2 rounded border border-[#e9e3da] bg-[#faf5ed] px-4 py-2 text-sm font-semibold text-[#002f17] transition-all hover:border-[#ff467c] hover:bg-[#ff467c]/5 hover:text-[#ff467c] lg:hidden"
            onClick={onMobileFilterClick}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </button>
        )}
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-[#818085] hidden sm:inline">Sort by</span>
          <div className="w-52">
            <Select
              options={sortOptions}
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="h-10 text-sm border-[#e9e3da] rounded bg-[#faf5ed] font-medium"
            />
          </div>
        </div>

        <div className="hidden items-center rounded border border-[#e9e3da] bg-[#faf5ed] p-1 sm:flex">
          <button
            onClick={() => onViewModeChange('list')}
            className={cn(
              'flex h-8 w-8 items-center justify-center rounded transition-all duration-200',
              viewMode === 'list'
                ? 'bg-[#ff467c] text-white'
                : 'text-[#818085] hover:bg-white hover:text-[#002f17]'
            )}
            aria-label="List view"
          >
            <List className="h-4 w-4" />
          </button>
          <button
            onClick={() => onViewModeChange('grid')}
            className={cn(
              'flex h-8 w-8 items-center justify-center rounded transition-all duration-200',
              viewMode === 'grid'
                ? 'bg-[#ff467c] text-white'
                : 'text-[#818085] hover:bg-white hover:text-[#002f17]'
            )}
            aria-label="Grid view"
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
