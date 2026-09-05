import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { BookingStepper } from '@/components/booking/BookingStepper';
import { PaymentForm } from '@/components/booking/PaymentForm';
import { generateBookingReference } from '@/lib/utils';
import type { HolidayPackage, RoomType, Passenger, Extra, Booking } from '@/types';

const steps = ['Review', 'Passengers', 'Extras', 'Payment', 'Confirmation'];

interface BookingState {
  holiday: HolidayPackage;
  room: RoomType;
  passengers: number;
  departureDate: string;
  returnDate: string;
  passengerDetails: Passenger[];
  extras: Extra[];
  totalPrice: number;
}

export default function BookingPaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as BookingState | null;

  useEffect(() => {
    if (!state?.holiday || !state?.room) {
      navigate('/search');
    }
  }, [state, navigate]);

  if (!state?.holiday || !state?.room) return null;

  const handlePayment = () => {
    const booking: Booking = {
      id: `booking-${Date.now()}`,
      reference: generateBookingReference(),
      leadPassenger: state.passengerDetails[0],
      passengers: state.passengerDetails,
      holidayPackage: state.holiday,
      roomType: state.room,
      extras: state.extras,
      totalPrice: state.totalPrice,
      currency: 'GBP',
      status: 'confirmed',
      paymentStatus: 'paid',
      bookedAt: new Date().toISOString(),
      departureDate: state.departureDate,
      returnDate: state.returnDate,
      flightDetails: state.holiday.flightDetails,
    };

    navigate('/booking/confirmation', {
      state: { booking },
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
        <div className="mb-10">
          <BookingStepper currentStep={3} steps={steps} />
        </div>

        <h1 className="mb-8 font-heading text-4xl font-bold text-[#002f17] tracking-tight">
          Secure Payment
        </h1>

        <PaymentForm
          totalAmount={state.totalPrice}
          onPayment={handlePayment}
        />
      </div>
    </motion.div>
  );
}
