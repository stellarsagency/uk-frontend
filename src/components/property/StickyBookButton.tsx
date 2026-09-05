import { formatPrice } from '@/lib/utils';

interface StickyBookButtonProps {
  price: number;
  onBook: () => void;
}

export function StickyBookButton({ price, onBook }: StickyBookButtonProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#e9e3da] bg-white/90 px-5 py-4 shadow-2xl backdrop-blur-xl md:hidden">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[11px] font-medium text-[#818085] leading-none uppercase tracking-wider">From</p>
          <p className="text-2xl font-bold text-[#002f17]">{formatPrice(price)}</p>
          <p className="text-[11px] font-medium text-[#818085] leading-none">per person</p>
        </div>
        <button
          onClick={onBook}
          className="flex flex-1 items-center justify-center gap-2 rounded bg-[#ff467c] px-8 py-3.5 text-base font-bold text-white transition-all duration-200 hover:bg-[#e63d6f] active:scale-[0.98]"
        >
          Book now
          <span className="inline-block w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[6px] border-l-white" />
        </button>
      </div>
    </div>
  );
}
