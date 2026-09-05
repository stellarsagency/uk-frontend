import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';
import { BookingStepper } from '@/components/booking/BookingStepper';
import { ReviewSummary } from '@/components/booking/ReviewSummary';
import type { HolidayPackage, RoomType } from '@/types';

const steps = ['Review', 'Passengers', 'Extras', 'Payment', 'Confirmation'];

interface BookingState {
  holiday: HolidayPackage;
  room: RoomType;
  passengers: number;
  departureDate: string;
  returnDate: string;
}

export default function BookingReviewPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as BookingState | null;

  useEffect(() => {
    if (!state?.holiday || !state?.room) {
      navigate('/search');
    }
  }, [state, navigate]);

  if (!state?.holiday || !state?.room) return null;

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
            onClick={() => navigate('/search')}
            className="flex items-center gap-1.5 text-sm font-semibold text-[#555] hover:text-[#ff467c] transition-colors duration-200"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to search
          </button>
        </div>

        <div className="mb-10">
          <BookingStepper currentStep={0} steps={steps} />
        </div>

        <h1 className="mb-8 font-heading text-4xl font-bold text-[#002f17] tracking-tight">
          Review Your Booking
        </h1>

        <ReviewSummary
          holiday={state.holiday}
          room={state.room}
          passengers={state.passengers}
          departureDate={state.departureDate}
          returnDate={state.returnDate}
        />
      </div>
    </motion.div>
  );
}
