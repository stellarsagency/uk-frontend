import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { BookingStepper } from '@/components/booking/BookingStepper';
import { ConfirmationScreen } from '@/components/booking/ConfirmationScreen';
import type { Booking } from '@/types';

const steps = ['Review', 'Passengers', 'Extras', 'Payment', 'Confirmation'];

interface LocationState {
  booking: Booking;
}

export default function BookingConfirmationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState | null;

  useEffect(() => {
    if (!state?.booking) {
      navigate('/search');
    }
  }, [state, navigate]);

  if (!state?.booking) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className="min-h-screen bg-[#faf5ed] py-8 md:py-12"
    >
      <div className="mx-auto max-w-3xl px-4">
        <div className="mb-8">
          <BookingStepper currentStep={4} steps={steps} />
        </div>

        <ConfirmationScreen booking={state.booking} />
      </div>
    </motion.div>
  );
}
