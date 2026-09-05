import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { formatPrice } from '@/lib/utils';
import { Slider } from '@/components/ui/Slider';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/Accordion';
import { airlines, boardTypes, propertyTypes } from '@/data/mockData';
import type { SearchFilters } from '@/types';
import { Star, RotateCcw, X } from 'lucide-react';

interface FiltersSidebarProps {
  filters: SearchFilters;
  onFilterChange: (filters: SearchFilters) => void;
  resultCount: number;
  className?: string;
}

const defaultFilters: SearchFilters = {
  priceRange: [0, 3000],
  starRating: [],
  boardType: [],
  airlines: [],
  duration: [],
  propertyType: [],
  customerRating: 0,
};

const durationOptions = [
  { value: '3-5', label: '3-5 nights' },
  { value: '6-8', label: '6-8 nights' },
  { value: '9-11', label: '9-11 nights' },
  { value: '12-14', label: '12-14 nights' },
  { value: '15+', label: '15+ nights' },
];

const customerRatingOptions = [
  { value: 4, label: '4+ Very Good & above' },
  { value: 3, label: '3+ Average & above' },
  { value: 2, label: '2+ Poor & above' },
];

function CustomCheckbox({
  checked,
  onChange,
  id,
}: {
  checked: boolean;
  onChange: () => void;
  id: string;
}) {
  return (
    <button
      id={id}
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={onChange}
      className={cn(
        'relative flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-all duration-200',
        checked
          ? 'border-[#ff467c] bg-[#ff467c]'
          : 'border-[#e9e3da] bg-white hover:border-[#ff467c]/50'
      )}
    >
      {checked && (
        <svg className="h-3 w-3 text-white" viewBox="0 0 12 12" fill="none">
          <path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
}

function CustomRadio({
  checked,
  onChange,
  id,
}: {
  checked: boolean;
  onChange: () => void;
  id: string;
}) {
  return (
    <button
      id={id}
      type="button"
      role="radio"
      aria-checked={checked}
      onClick={onChange}
      className={cn(
        'relative flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200',
        checked
          ? 'border-[#ff467c] bg-[#ff467c]'
          : 'border-[#e9e3da] bg-white hover:border-[#ff467c]/50'
      )}
    >
      {checked && <div className="h-2 w-2 rounded-full bg-white" />}
    </button>
  );
}

export function FiltersSidebar({ filters, onFilterChange, resultCount, className }: FiltersSidebarProps) {
  const [localFilters, setLocalFilters] = useState<SearchFilters>(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const updateFilters = (patch: Partial<SearchFilters>) => {
    const next = { ...localFilters, ...patch };
    setLocalFilters(next);
    onFilterChange(next);
  };

  const toggleArrayItem = <T extends string | number>(arr: T[], item: T): T[] =>
    arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item];

  const handleClearAll = () => {
    setLocalFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  const hasActiveFilters =
    localFilters.starRating.length > 0 ||
    localFilters.boardType.length > 0 ||
    localFilters.airlines.length > 0 ||
    localFilters.duration.length > 0 ||
    localFilters.propertyType.length > 0 ||
    localFilters.customerRating > 0 ||
    localFilters.priceRange[0] > 0 ||
    localFilters.priceRange[1] < 3000;

  return (
    <aside className={cn('w-full', className)}>
      <div className="rounded-lg border border-[#e9e3da] bg-white shadow-sm">
        <div className="border-b border-[#e9e3da] px-5 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#002f17]">Filters</h2>
              <div className="mt-1">
                <span className="inline-flex items-center rounded bg-[#ff467c] px-2.5 py-0.5 text-xs font-semibold text-white">
                  {resultCount} holiday{resultCount !== 1 ? 's' : ''}
                </span>
              </div>
            </div>
            {hasActiveFilters && (
              <button
                onClick={handleClearAll}
                className="group flex items-center gap-1.5 rounded border border-[#e9e3da] px-3 py-1.5 text-xs font-medium text-[#818085] transition-all hover:border-[#ff467c] hover:text-[#ff467c]"
              >
                <RotateCcw className="h-3 w-3 transition-transform group-hover:-rotate-45" />
                Clear all
              </button>
            )}
          </div>
        </div>

        <Accordion type="multiple" defaultValue={['price', 'stars', 'board', 'airlines', 'duration', 'property', 'rating']}>
          <AccordionItem value="price">
            <AccordionTrigger value="price" className="px-5">
              <span className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-[#ff467c]" />
                Price per person
              </span>
            </AccordionTrigger>
            <AccordionContent value="price" className="px-5">
              <Slider
                min={0}
                max={3000}
                step={50}
                value={localFilters.priceRange}
                onChange={(val) => updateFilters({ priceRange: val })}
                formatValue={(v) => formatPrice(v)}
              />
              <div className="mt-3 flex justify-between">
                <span className="inline-flex items-center rounded bg-[#faf5ed] px-3 py-1 text-xs font-semibold text-[#002f17]">
                  {formatPrice(localFilters.priceRange[0])}
                </span>
                <span className="inline-flex items-center rounded bg-[#faf5ed] px-3 py-1 text-xs font-semibold text-[#002f17]">
                  {formatPrice(localFilters.priceRange[1])}
                </span>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="stars">
            <AccordionTrigger value="stars" className="px-5">
              <span className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-[#ff467c]" />
                Star rating
              </span>
            </AccordionTrigger>
            <AccordionContent value="stars" className="px-5">
              <div className="space-y-1">
                {[5, 4, 3, 2, 1].map((star) => (
                  <label
                    key={star}
                    htmlFor={`star-${star}`}
                    className="flex cursor-pointer items-center gap-3 rounded px-3 py-2 transition-all hover:bg-[#faf5ed]"
                  >
                    <CustomCheckbox
                      id={`star-${star}`}
                      checked={localFilters.starRating.includes(star)}
                      onChange={() =>
                        updateFilters({ starRating: toggleArrayItem(localFilters.starRating, star) })
                      }
                    />
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: star }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-[#ff467c] text-[#ff467c]" />
                      ))}
                    </div>
                    <span className="text-sm text-[#555]">
                      {star} {star === 1 ? 'star' : 'stars'}
                    </span>
                  </label>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="board">
            <AccordionTrigger value="board" className="px-5">
              <span className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-[#ff467c]" />
                Board type
              </span>
            </AccordionTrigger>
            <AccordionContent value="board" className="px-5">
              <div className="space-y-1">
                {boardTypes.map((type) => (
                  <label
                    key={type}
                    htmlFor={`board-${type}`}
                    className="flex cursor-pointer items-center gap-3 rounded px-3 py-2 transition-all hover:bg-[#faf5ed]"
                  >
                    <CustomCheckbox
                      id={`board-${type}`}
                      checked={localFilters.boardType.includes(type)}
                      onChange={() =>
                        updateFilters({ boardType: toggleArrayItem(localFilters.boardType, type) })
                      }
                    />
                    <span className="text-sm text-[#555]">{type}</span>
                  </label>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="airlines">
            <AccordionTrigger value="airlines" className="px-5">
              <span className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-[#ff467c]" />
                Airline
              </span>
            </AccordionTrigger>
            <AccordionContent value="airlines" className="px-5">
              <div className="max-h-52 space-y-1 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-[#e9e3da] scrollbar-track-transparent">
                {airlines.map((airline) => (
                  <label
                    key={airline}
                    htmlFor={`airline-${airline}`}
                    className="flex cursor-pointer items-center gap-3 rounded px-3 py-2 transition-all hover:bg-[#faf5ed]"
                  >
                    <CustomCheckbox
                      id={`airline-${airline}`}
                      checked={localFilters.airlines.includes(airline)}
                      onChange={() =>
                        updateFilters({ airlines: toggleArrayItem(localFilters.airlines, airline) })
                      }
                    />
                    <span className="text-sm text-[#555]">{airline}</span>
                  </label>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="duration">
            <AccordionTrigger value="duration" className="px-5">
              <span className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-[#ff467c]" />
                Duration
              </span>
            </AccordionTrigger>
            <AccordionContent value="duration" className="px-5">
              <div className="space-y-1">
                {durationOptions.map((opt) => (
                  <label
                    key={opt.value}
                    htmlFor={`duration-${opt.value}`}
                    className="flex cursor-pointer items-center gap-3 rounded px-3 py-2 transition-all hover:bg-[#faf5ed]"
                  >
                    <CustomCheckbox
                      id={`duration-${opt.value}`}
                      checked={localFilters.duration.includes(opt.value)}
                      onChange={() =>
                        updateFilters({ duration: toggleArrayItem(localFilters.duration, opt.value) })
                      }
                    />
                    <span className="text-sm text-[#555]">{opt.label}</span>
                  </label>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="property">
            <AccordionTrigger value="property" className="px-5">
              <span className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-[#ff467c]" />
                Property type
              </span>
            </AccordionTrigger>
            <AccordionContent value="property" className="px-5">
              <div className="space-y-1">
                {propertyTypes.map((type) => (
                  <label
                    key={type}
                    htmlFor={`property-${type}`}
                    className="flex cursor-pointer items-center gap-3 rounded px-3 py-2 transition-all hover:bg-[#faf5ed]"
                  >
                    <CustomCheckbox
                      id={`property-${type}`}
                      checked={localFilters.propertyType.includes(type)}
                      onChange={() =>
                        updateFilters({ propertyType: toggleArrayItem(localFilters.propertyType, type) })
                      }
                    />
                    <span className="text-sm text-[#555]">{type}</span>
                  </label>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="rating" className="border-b-0">
            <AccordionTrigger value="rating" className="px-5">
              <span className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-[#ff467c]" />
                Customer rating
              </span>
            </AccordionTrigger>
            <AccordionContent value="rating" className="px-5">
              <div className="space-y-1">
                {customerRatingOptions.map((opt) => (
                  <label
                    key={opt.value}
                    htmlFor={`rating-${opt.value}`}
                    className="flex cursor-pointer items-center gap-3 rounded px-3 py-2 transition-all hover:bg-[#faf5ed]"
                  >
                    <CustomRadio
                      id={`rating-${opt.value}`}
                      checked={localFilters.customerRating === opt.value}
                      onChange={() => updateFilters({ customerRating: opt.value })}
                    />
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: opt.value }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-[#ff467c] text-[#ff467c]" />
                      ))}
                    </div>
                    <span className="text-sm text-[#555]">{opt.label}</span>
                  </label>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {hasActiveFilters && (
          <div className="border-t border-[#e9e3da] px-5 py-4">
            <button
              onClick={handleClearAll}
              className="flex w-full items-center justify-center gap-2 rounded border border-dashed border-[#e9e3da] bg-[#faf5ed] py-3 text-sm font-semibold text-[#818085] transition-all hover:border-[#ff467c] hover:bg-[#ff467c]/5 hover:text-[#ff467c]"
            >
              <X className="h-4 w-4" />
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
