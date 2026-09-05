import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { allHolidays } from '@/data/mockData';
import { FiltersSidebar } from '@/components/search/FiltersSidebar';
import { ResultGrid } from '@/components/search/ResultGrid';
import { SortOptions } from '@/components/search/SortOptions';
import { Pagination } from '@/components/search/Pagination';
import { Dialog, DialogClose } from '@/components/ui/Dialog';
import type { HolidayPackage, SearchFilters } from '@/types';

const ITEMS_PER_PAGE = 9;

const defaultFilters: SearchFilters = {
  priceRange: [0, 3000],
  starRating: [],
  boardType: [],
  airlines: [],
  duration: [],
  propertyType: [],
  customerRating: 0,
};

function matchesSearch(holiday: HolidayPackage, query: string): boolean {
  if (!query) return true;
  const q = query.toLowerCase();
  return (
    holiday.name.toLowerCase().includes(q) ||
    holiday.destination.toLowerCase().includes(q) ||
    holiday.country.toLowerCase().includes(q) ||
    holiday.region.toLowerCase().includes(q)
  );
}

function matchesFilters(holiday: HolidayPackage, filters: SearchFilters): boolean {
  if (holiday.price < filters.priceRange[0] || holiday.price > filters.priceRange[1]) return false;
  if (filters.starRating.length > 0 && !filters.starRating.includes(holiday.starRating)) return false;
  if (filters.boardType.length > 0 && !filters.boardType.includes(holiday.boardType)) return false;
  if (filters.airlines.length > 0 && holiday.flightDetails && !filters.airlines.includes(holiday.flightDetails.airline)) return false;
  if (filters.propertyType.length > 0 && !filters.propertyType.includes(holiday.propertyType)) return false;
  if (filters.customerRating > 0 && holiday.rating < filters.customerRating) return false;
  if (filters.duration.length > 0) {
    const match = filters.duration.some((d) => {
      if (d === '3-5') return holiday.duration >= 3 && holiday.duration <= 5;
      if (d === '6-8') return holiday.duration >= 6 && holiday.duration <= 8;
      if (d === '9-11') return holiday.duration >= 9 && holiday.duration <= 11;
      if (d === '12-14') return holiday.duration >= 12 && holiday.duration <= 14;
      if (d === '15+') return holiday.duration >= 15;
      return false;
    });
    if (!match) return false;
  }
  return true;
}

function sortHolidays(holidays: HolidayPackage[], sortBy: string): HolidayPackage[] {
  const sorted = [...holidays];
  switch (sortBy) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'duration':
      return sorted.sort((a, b) => a.duration - b.duration);
    case 'recommended':
    default:
      return sorted.sort((a, b) => b.rating * b.reviewCount - a.rating * a.reviewCount);
  }
}

export default function SearchResultsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<SearchFilters>(defaultFilters);
  const [sortBy, setSortBy] = useState('recommended');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const searchQuery = searchParams.get('destination') || '';
  const departureDate = searchParams.get('departure') || '';

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, [searchParams, filters, sortBy]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortBy, searchQuery]);

  const filteredHolidays = useMemo(() => {
    return allHolidays
      .filter((h) => matchesSearch(h, searchQuery))
      .filter((h) => matchesFilters(h, filters));
  }, [searchQuery, filters]);

  const sortedHolidays = useMemo(() => sortHolidays(filteredHolidays, sortBy), [filteredHolidays, sortBy]);

  const totalPages = Math.ceil(sortedHolidays.length / ITEMS_PER_PAGE);
  const paginatedHolidays = sortedHolidays.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-[#faf5ed]"
    >
      <div className="sticky top-0 z-30 border-b border-[#e9e3da] bg-white/90 shadow-md backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 py-4 md:px-6">
          <div className="flex items-center gap-4">
            <div className="flex flex-1 items-center gap-3 rounded border border-[#e9e3da] bg-white px-4 py-3 shadow-sm transition-all focus-within:border-[#ff467c] focus-within:ring-4 focus-within:ring-[#ff467c]/10">
              <Search className="h-5 w-5 text-[#818085]" />
              <span className="flex-1 text-sm font-medium text-[#555] truncate">
                {searchQuery || 'All holidays'}
                {departureDate && (
                  <span className="ml-2 inline-flex items-center rounded bg-[#faf5ed] px-2.5 py-0.5 text-xs font-medium text-[#002f17]">
                    {departureDate}
                  </span>
                )}
              </span>
              {searchQuery && (
                <button
                  onClick={() => {
                    const params = new URLSearchParams(searchParams);
                    params.delete('destination');
                    setSearchParams(params);
                  }}
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-[#faf5ed] text-[#818085] transition-colors hover:bg-[#e9e3da] hover:text-[#002f17]"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
        <SortOptions
          sortBy={sortBy}
          onSortChange={setSortBy}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          resultCount={filteredHolidays.length}
          onMobileFilterClick={() => setMobileFiltersOpen(true)}
          className="mb-6"
        />

        <div className="flex gap-8">
          <aside className="hidden w-72 shrink-0 lg:block">
            <div className="sticky top-24">
              <FiltersSidebar
                filters={filters}
                onFilterChange={setFilters}
                resultCount={filteredHolidays.length}
              />
            </div>
          </aside>

          <main className="min-w-0 flex-1">
            <ResultGrid
              holidays={paginatedHolidays}
              viewMode={viewMode}
              loading={loading}
            />

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              className="mt-10"
            />
          </main>
        </div>
      </div>

      <Dialog open={mobileFiltersOpen} onClose={() => setMobileFiltersOpen(false)} className="max-w-sm p-0">
        <div className="flex items-center justify-between border-b border-[#e9e3da] px-6 py-4">
          <h2 className="text-lg font-bold text-[#002f17]">Filters</h2>
          <DialogClose onClick={() => setMobileFiltersOpen(false)} />
        </div>
        <div className="max-h-[70vh] overflow-y-auto p-4">
          <FiltersSidebar
            filters={filters}
            onFilterChange={setFilters}
            resultCount={filteredHolidays.length}
          />
        </div>
        <div className="border-t border-[#e9e3da] px-6 py-4">
          <button
            className="flex w-full items-center justify-center gap-2 rounded bg-[#ff467c] px-8 py-3.5 text-base font-bold text-white transition-all duration-200 hover:bg-[#e63d6f]"
            onClick={() => setMobileFiltersOpen(false)}
          >
            Show {filteredHolidays.length} holidays
            <span className="inline-block w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[6px] border-l-white" />
          </button>
        </div>
      </Dialog>
    </motion.div>
  );
}
