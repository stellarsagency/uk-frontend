import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';
import { BookingStepper } from '@/components/booking/BookingStepper';
import { ExtrasSelection } from '@/components/booking/ExtrasSelection';
import { formatPrice } from '@/lib/utils';
import type { HolidayPackage, RoomType, Passenger, Extra } from '@/types';

const steps = ['Review', 'Passengers', 'Extras', 'Payment', 'Confirmation'];

interface BookingState {
  holiday: HolidayPackage;
  room: RoomType;
  passengers: number;
  departureDate: string;
  returnDate: string;
  passengerDetails: Passenger[];
  totalPrice: number;
}

export default function BookingExtrasPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as BookingState | null;

  useEffect(() => {
    if (!state?.holiday || !state?.room) {
      navigate('/search');
    }
  }, [state, navigate]);

  if (!state?.holiday || !state?.room) return null;

  const baseTotal = state.room.pricePerPerson * state.passengers;

  const handleSelectExtras = (extras: Extra[]) => {
    const extrasTotal = extras.reduce((sum, e) => sum + e.price * state.passengers, 0);
    navigate('/booking/payment', {
      state: {
        ...state,
        extras,
        totalPrice: baseTotal + extrasTotal + Math.round(baseTotal * 0.1),
      },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className="min-h-screen bg-[#faf5ed] py-12 md:py-20"
    >
      <div className="mx-auto max-w-3xl px-4">
        <div className="mb-4">
          <button
            onClick={() => navigate('/booking/passengers', { state })}
            className="flex items-center gap-1.5 text-sm font-semibold text-[#555] hover:text-[#ff467c] transition-colors duration-200"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to passengers
          </button>
        </div>

        <div className="mb-10">
          <BookingStepper currentStep={2} steps={steps} />
        </div>

        <div className="mb-8 flex items-center justify-between">
          <h1 className="font-heading text-4xl font-bold text-[#002f17] tracking-tight">
            Enhance Your Trip
          </h1>
          <div className="text-right">
            <p className="text-xs font-bold text-[#818085] uppercase tracking-widest">Base total</p>
            <p className="text-xl font-bold text-[#ff467c]">{formatPrice(baseTotal)}</p>
          </div>
        </div>

        <ExtrasSelection
          onSelect={handleSelectExtras}
          selectedExtras={[]}
          passengerCount={state.passengers}
        />
      </div>
    </motion.div>
  );
}
