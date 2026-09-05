import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Calendar, Users, Sparkles, AlertCircle, Shield, Luggage, Armchair, Car, Plane } from 'lucide-react';
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { cn, formatPrice } from '@/lib/utils';
import type { Booking, Passenger, Extra } from '@/types';

interface AmendBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: Booking;
  onConfirm: (amendments: {
    departureDate?: string;
    returnDate?: string;
    passengers?: Passenger[];
    extras?: Extra[];
  }) => void;
}

const EXTRA_ICONS: Record<string, React.ElementType> = {
  insurance: Shield,
  baggage: Luggage,
  seat: Armchair,
  transfer: Car,
};

const EXTRA_COLORS: Record<string, string> = {
  insurance: 'from-blue-500 to-blue-600',
  baggage: 'from-purple-500 to-purple-600',
  seat: 'from-indigo-500 to-indigo-600',
  transfer: 'from-amber-500 to-amber-600',
};

const availableExtras: Omit<Extra, 'selected'>[] = [
  { id: 'extra-travel-insurance', name: 'Travel Insurance', description: 'Full cover for cancellation, medical & baggage', price: 49, type: 'insurance' },
  { id: 'extra-excess-waiver', name: 'Excess Waiver', description: 'Reduce your car hire excess to £0', price: 29, type: 'insurance' },
  { id: 'extra-seat-selection', name: 'Seat Selection', description: 'Choose your preferred seats on both flights', price: 25, type: 'seat' },
  { id: 'extra-20kg-bag', name: '20kg Checked Bag', description: 'Additional checked luggage allowance', price: 35, type: 'baggage' },
  { id: 'extra-airport-transfer', name: 'Airport Transfer', description: 'Return private transfer to your hotel', price: 59, type: 'transfer' },
];

export function AmendBookingModal({ isOpen, onClose, booking, onConfirm }: AmendBookingModalProps) {
  const [departureDate, setDepartureDate] = useState(booking.departureDate);
  const [returnDate, setReturnDate] = useState(booking.returnDate);
  const [passengers, setPassengers] = useState<Passenger[]>([...booking.passengers]);
  const [selectedExtras, setSelectedExtras] = useState<string[]>(
    booking.extras.filter((e) => e.selected).map((e) => e.id)
  );
  const [isLoading, setIsLoading] = useState(false);

  const dateChanged = departureDate !== booking.departureDate || returnDate !== booking.returnDate;
  const passengersChanged = passengers.length !== booking.passengers.length ||
    passengers.some((p, i) => p.fullName !== booking.passengers[i]?.fullName);

  const newExtrasTotal = availableExtras
    .filter((e) => selectedExtras.includes(e.id))
    .reduce((sum, e) => sum + e.price, 0);
  const oldExtrasTotal = booking.extras.reduce((sum, e) => sum + e.price, 0);
  const extrasDifference = newExtrasTotal - oldExtrasTotal;
  const priceDifference = extrasDifference;

  const canConfirm = dateChanged || passengersChanged || priceDifference !== 0;

  const toggleExtra = (extraId: string) => {
    setSelectedExtras((prev) =>
      prev.includes(extraId) ? prev.filter((id) => id !== extraId) : [...prev, extraId]
    );
  };

  const addPassenger = () => {
    setPassengers((prev) => [
      ...prev,
      {
        id: `temp-${Date.now()}`,
        fullName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        isLead: false,
      },
    ]);
  };

  const removePassenger = (index: number) => {
    if (passengers.length <= 1) return;
    setPassengers((prev) => prev.filter((_, i) => i !== index));
  };

  const updatePassenger = (index: number, field: keyof Passenger, value: string) => {
    setPassengers((prev) =>
      prev.map((p, i) => (i === index ? { ...p, [field]: value } : p))
    );
  };

  const handleConfirm = async () => {
    setIsLoading(true);
    const amendments: Record<string, unknown> = {};

    if (dateChanged) {
      amendments.departureDate = departureDate;
      amendments.returnDate = returnDate;
    }
    if (passengersChanged) {
      amendments.passengers = passengers;
    }
    if (priceDifference !== 0) {
      amendments.extras = availableExtras
        .filter((e) => selectedExtras.includes(e.id))
        .map((e) => ({ ...e, selected: true }));
    }

    await new Promise((resolve) => setTimeout(resolve, 1500));
    onConfirm(amendments);
    setIsLoading(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onClose={onClose} className="max-w-xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-lg">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#ff467c] shadow-sm">
                <Plane className="h-5 w-5 text-white" />
              </div>
              Amend Your Booking
            </DialogTitle>
            <DialogDescription>
              Make changes to booking <span className="font-bold text-[#ff467c]">{booking.reference}</span>
            </DialogDescription>
          </DialogHeader>

          <div className="max-h-[60vh] space-y-6 overflow-y-auto pr-1">
            <section>
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#ffd4e4]">
                  <Calendar className="h-4 w-4 text-[#ff467c]" />
                </div>
                <h3 className="font-bold text-[#002f17]">Change Dates</h3>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <Input
                  type="date"
                  label="New Departure Date"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
                <Input
                  type="date"
                  label="New Return Date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  min={departureDate}
                />
              </div>
            </section>

            <section>
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#ffd4e4]">
                    <Users className="h-4 w-4 text-[#ff467c]" />
                  </div>
                  <h3 className="font-bold text-[#002f17]">Passengers</h3>
                </div>
                <Button variant="ghost" size="sm" onClick={addPassenger} type="button" className="rounded-lg">
                  <Plus className="mr-1 h-4 w-4" />
                  Add
                </Button>
              </div>
              <div className="space-y-3">
                {passengers.map((passenger, index) => (
                  <motion.div
                    key={passenger.id || index}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="rounded-lg border border-[#e9e3da] p-4 bg-[#faf5ed]/50"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 space-y-3">
                        <Input
                          placeholder="Full name"
                          value={passenger.fullName}
                          onChange={(e) => updatePassenger(index, 'fullName', e.target.value)}
                        />
                        <Input
                          type="date"
                          placeholder="Date of birth"
                          value={passenger.dateOfBirth}
                          onChange={(e) => updatePassenger(index, 'dateOfBirth', e.target.value)}
                        />
                      </div>
                      {!passenger.isLead && (
                        <button
                          type="button"
                          onClick={() => removePassenger(index)}
                          className="ml-3 mt-1 rounded-lg p-2 text-[#818085] transition-all duration-200 hover:bg-red-50 hover:text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                    {passenger.isLead && (
                      <span className="mt-2 inline-block rounded-full bg-[#ff467c]/10 px-3 py-1 text-[10px] font-bold text-[#ff467c]">
                        Lead Passenger
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>
            </section>

            <section>
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#ffd4e4]">
                  <Sparkles className="h-4 w-4 text-[#ff467c]" />
                </div>
                <h3 className="font-bold text-[#002f17]">Add Extras</h3>
              </div>
              <div className="space-y-2.5">
                {availableExtras.map((extra) => {
                  const Icon = EXTRA_ICONS[extra.type] || Shield;
                  const gradient = EXTRA_COLORS[extra.type] || 'from-gray-500 to-gray-600';
                  const isSelected = selectedExtras.includes(extra.id);
                  return (
                    <label
                      key={extra.id}
                      className={cn(
                        'flex cursor-pointer items-start gap-4 rounded-lg border p-4 transition-all duration-200 hover:shadow-sm',
                        isSelected
                          ? 'border-[#ff467c]/30 bg-[#ffd4e4]/50 shadow-sm'
                          : 'border-[#e9e3da] bg-white hover:bg-[#faf5ed]'
                      )}
                    >
                      <div
                        className={cn(
                          'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-all duration-300',
                          isSelected
                            ? `bg-gradient-to-br ${gradient} text-white shadow-lg`
                            : 'bg-[#faf5ed] text-[#555]'
                        )}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-bold text-[#002f17]">{extra.name}</p>
                          <span className="text-sm font-bold text-[#ff467c]">{formatPrice(extra.price)}</span>
                        </div>
                        <p className="text-xs text-[#555] mt-0.5">{extra.description}</p>
                      </div>
                      <div className="shrink-0 mt-0.5">
                        <div
                          className={cn(
                            'flex h-5 w-5 items-center justify-center rounded-full transition-all duration-200',
                            isSelected
                              ? 'bg-[#ff467c] text-white shadow-md'
                              : 'border-2 border-[#e9e3da]'
                          )}
                        >
                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                            >
                              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </label>
                  );
                })}
              </div>
            </section>

            <AnimatePresence>
              {priceDifference !== 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={cn(
                    'flex items-center gap-3 rounded-lg p-4 text-sm',
                    priceDifference > 0
                      ? 'bg-amber-50 border border-amber-200 text-amber-800'
                      : 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                  )}
                >
                  <div className={cn(
                    'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg',
                    priceDifference > 0 ? 'bg-amber-100' : 'bg-emerald-100'
                  )}>
                    <AlertCircle className="h-4 w-4" />
                  </div>
                  <span className="font-bold">
                    {priceDifference > 0 ? 'Additional cost: ' : 'Refund amount: '}
                    {formatPrice(Math.abs(priceDifference))}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <DialogFooter className="mt-6">
            <Button variant="default" onClick={onClose} disabled={isLoading} className="rounded-lg">
              Cancel
            </Button>
            <button
              onClick={handleConfirm}
              disabled={isLoading || !canConfirm}
              className="flex items-center justify-center gap-2 rounded-lg bg-[#ff467c] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#e63d6e] shadow-md hover:shadow-lg disabled:opacity-50 disabled:pointer-events-none"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Processing...
                </span>
              ) : (
                <>
                  Confirm Amendment
                  {priceDifference !== 0 && (
                    <span className="ml-1">
                      ({priceDifference > 0 ? '+' : ''}{formatPrice(priceDifference)})
                    </span>
                  )}
                </>
              )}
            </button>
          </DialogFooter>

          <DialogClose onClick={onClose} />
        </Dialog>
      )}
    </AnimatePresence>
  );
}
