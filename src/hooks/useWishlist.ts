import { useLocalStorage } from './useLocalStorage';
import type { HolidayPackage } from '@/types';

export function useWishlist() {
  const [wishlist, setWishlist] = useLocalStorage<HolidayPackage[]>('wishlist', []);

  const addToWishlist = (holiday: HolidayPackage) => {
    setWishlist((prev) => {
      if (prev.some((h) => h.id === holiday.id)) return prev;
      return [...prev, holiday];
    });
  };

  const removeFromWishlist = (holidayId: string) => {
    setWishlist((prev) => prev.filter((h) => h.id !== holidayId));
  };

  const isInWishlist = (holidayId: string) => {
    return wishlist.some((h) => h.id === holidayId);
  };

  const toggleWishlist = (holiday: HolidayPackage) => {
    if (isInWishlist(holiday.id)) {
      removeFromWishlist(holiday.id);
    } else {
      addToWishlist(holiday);
    }
  };

  return { wishlist, addToWishlist, removeFromWishlist, isInWishlist, toggleWishlist };
}
