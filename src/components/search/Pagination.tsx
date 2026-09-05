import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

function getPageNumbers(current: number, total: number): (number | '...')[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | '...')[] = [1];

  if (current > 3) {
    pages.push('...');
  }

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (current < total - 2) {
    pages.push('...');
  }

  if (total > 1) {
    pages.push(total);
  }

  return pages;
}

export function Pagination({ currentPage, totalPages, onPageChange, className }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = getPageNumbers(currentPage, totalPages);
  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;

  return (
    <nav className={cn('flex items-center justify-center gap-2', className)} aria-label="Pagination">
      <button
        onClick={() => onPageChange(1)}
        disabled={isFirst}
        className="hidden h-10 w-10 items-center justify-center rounded border border-[#e9e3da] bg-white text-[#818085] transition-all duration-200 hover:border-[#ff467c] hover:text-[#ff467c] disabled:opacity-40 disabled:hover:border-[#e9e3da] disabled:hover:text-[#818085] sm:flex"
        aria-label="First page"
      >
        <ChevronsLeft className="h-4 w-4" />
      </button>

      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={isFirst}
        className="flex h-10 w-10 items-center justify-center rounded border border-[#e9e3da] bg-white text-[#818085] transition-all duration-200 hover:border-[#ff467c] hover:text-[#ff467c] disabled:opacity-40 disabled:hover:border-[#e9e3da] disabled:hover:text-[#818085]"
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      <div className="flex items-center gap-1.5">
        {pages.map((page, i) =>
          page === '...' ? (
            <span key={`ellipsis-${i}`} className="px-1.5 text-sm text-[#818085]">
              &hellip;
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={cn(
                'flex h-10 min-w-[40px] items-center justify-center rounded px-3 text-sm font-semibold transition-all duration-200',
                page === currentPage
                  ? 'bg-[#ff467c] text-white'
                  : 'text-[#555] hover:bg-[#faf5ed]'
              )}
              aria-label={`Page ${page}`}
              aria-current={page === currentPage ? 'page' : undefined}
            >
              {page}
            </button>
          )
        )}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={isLast}
        className="flex h-10 w-10 items-center justify-center rounded border border-[#e9e3da] bg-white text-[#818085] transition-all duration-200 hover:border-[#ff467c] hover:text-[#ff467c] disabled:opacity-40 disabled:hover:border-[#e9e3da] disabled:hover:text-[#818085]"
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </button>

      <button
        onClick={() => onPageChange(totalPages)}
        disabled={isLast}
        className="hidden h-10 w-10 items-center justify-center rounded border border-[#e9e3da] bg-white text-[#818085] transition-all duration-200 hover:border-[#ff467c] hover:text-[#ff467c] disabled:opacity-40 disabled:hover:border-[#e9e3da] disabled:hover:text-[#818085] sm:flex"
        aria-label="Last page"
      >
        <ChevronsRight className="h-4 w-4" />
      </button>
    </nav>
  );
}
