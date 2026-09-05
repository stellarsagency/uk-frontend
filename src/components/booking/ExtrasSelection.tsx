import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  Luggage,
  Armchair,
  Car,
  Coffee,
  Zap,
  ChevronRight,
  Check,
  Sparkles,
  Info,
  Plane,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { cn, formatPrice } from '@/lib/utils';
import type { Extra } from '@/types';

const AVAILABLE_EXTRAS: Extra[] = [
  { id: 'insurance', name: 'Travel Insurance', description: 'Comprehensive cover for cancellation, medical expenses, and lost luggage.', price: 29.99, type: 'insurance', selected: false },
  { id: 'baggage', name: 'Extra Baggage (23kg)', description: 'Add an additional 23kg checked baggage allowance to your booking.', price: 35.0, type: 'baggage', selected: false },
  { id: 'seat', name: 'Seat Selection', description: 'Choose your preferred seat on outbound and return flights.', price: 12.0, type: 'seat', selected: false },
  { id: 'transfer', name: 'Airport Transfer', description: 'Return private transfer between the airport and your hotel.', price: 45.0, type: 'transfer', selected: false },
  { id: 'lounge', name: 'Lounge Access', description: 'Access to the departure lounge with complimentary food and drinks.', price: 30.0, type: 'other', selected: false },
  { id: 'fasttrack', name: 'Fast Track Security', description: 'Skip the queues with fast track security clearance at the airport.', price: 8.0, type: 'other', selected: false },
];

const EXTRA_ICONS: Record<string, React.ElementType> = {
  insurance: Shield,
  baggage: Luggage,
  seat: Armchair,
  transfer: Car,
  lounge: Coffee,
  fasttrack: Zap,
};

const EXTRA_COLORS: Record<string, { bg: string; icon: string; selectedBg: string }> = {
  insurance: { bg: 'bg-blue-50', icon: 'text-blue-600', selectedBg: 'from-blue-500 to-blue-600' },
  baggage: { bg: 'bg-purple-50', icon: 'text-purple-600', selectedBg: 'from-purple-500 to-purple-600' },
  seat: { bg: 'bg-indigo-50', icon: 'text-indigo-600', selectedBg: 'from-indigo-500 to-indigo-600' },
  transfer: { bg: 'bg-amber-50', icon: 'text-amber-600', selectedBg: 'from-amber-500 to-amber-600' },
  lounge: { bg: 'bg-rose-50', icon: 'text-rose-600', selectedBg: 'from-rose-500 to-rose-600' },
  fasttrack: { bg: 'bg-emerald-50', icon: 'text-emerald-600', selectedBg: 'from-emerald-500 to-emerald-600' },
};

interface ExtrasSelectionProps {
  onSelect: (extras: Extra[]) => void;
  selectedExtras: Extra[];
  passengerCount?: number;
}

export function ExtrasSelection({ onSelect, selectedExtras, passengerCount = 1 }: ExtrasSelectionProps) {
  const navigate = useNavigate();
  const [extras, setExtras] = useState<Extra[]>(
    AVAILABLE_EXTRAS.map((extra) => ({
      ...extra,
      selected: selectedExtras.some((s) => s.id === extra.id),
    }))
  );

  const toggleExtra = (id: string) => {
    setExtras((prev) =>
      prev.map((e) => (e.id === id ? { ...e, selected: !e.selected } : e))
    );
  };

  const selectedCount = extras.filter((e) => e.selected).length;
  const extrasTotal = extras
    .filter((e) => e.selected)
    .reduce((sum, e) => sum + e.price * passengerCount, 0);

  const handleContinue = () => {
    onSelect(extras.filter((e) => e.selected));
  };

  const handleSkip = () => {
    onSelect([]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="space-y-6"
    >
      <div className="rounded-lg bg-[#ffd4e4] border border-[#ff467c]/15 p-5">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#ff467c] shadow-sm">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="font-heading text-xl font-bold text-[#002f17]">Enhance Your Trip</h2>
            <p className="text-sm text-[#555] mt-1 leading-relaxed">
              Add extras to make your holiday even more enjoyable. All prices are per person.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <AnimatePresence>
          {extras.map((extra, index) => {
            const Icon = EXTRA_ICONS[extra.id] || Shield;
            const colors = EXTRA_COLORS[extra.id] || { bg: 'bg-gray-50', icon: 'text-gray-600', selectedBg: 'from-gray-500 to-gray-600' };
            return (
              <motion.div
                key={extra.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card
                  className={cn(
                    'cursor-pointer transition-all duration-300 hover:shadow-md border rounded-lg bg-white',
                    extra.selected
                      ? 'ring-2 ring-[#ff467c] shadow-md border-[#ff467c]/30'
                      : 'border-[#e9e3da] hover:border-[#ff467c]/30'
                  )}
                  onClick={() => toggleExtra(extra.id)}
                >
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <div
                        className={cn(
                          'flex h-12 w-12 shrink-0 items-center justify-center rounded-lg transition-all duration-300',
                          extra.selected
                            ? `bg-gradient-to-br ${colors.selectedBg} text-white shadow-lg`
                            : `${colors.bg} ${colors.icon}`
                        )}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <h3 className="font-bold text-[#002f17] text-sm">{extra.name}</h3>
                            <p className="mt-1.5 text-xs text-[#555] leading-relaxed">
                              {extra.description}
                            </p>
                          </div>
                          <div className="shrink-0">
                            <div
                              className={cn(
                                'flex h-6 w-6 items-center justify-center rounded-full transition-all duration-200',
                                extra.selected
                                  ? 'bg-[#ff467c] text-white shadow-md'
                                  : 'border-2 border-[#e9e3da]'
                              )}
                            >
                              {extra.selected && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                                >
                                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                                </motion.div>
                              )}
                            </div>
                          </div>
                        </div>
                        <p className="mt-3 text-lg font-bold text-[#ff467c]">
                          {formatPrice(extra.price)}
                          <span className="text-[10px] font-normal text-[#818085] ml-1">per person</span>
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selectedCount > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="rounded-lg bg-[#ffd4e4] border border-[#ff467c]/15 p-5"
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-bold text-[#002f17]">
                  {selectedCount} {selectedCount === 1 ? 'extra' : 'extras'} selected
                </span>
                <p className="text-xs text-[#555] mt-0.5">
                  Total for {passengerCount} {passengerCount === 1 ? 'passenger' : 'passengers'}
                </p>
              </div>
              <span className="text-2xl font-bold text-[#ff467c]">{formatPrice(extrasTotal)}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-start gap-3 rounded-lg bg-[#faf5ed] border border-[#e9e3da] p-4">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#e9e3da]">
          <Info className="h-4 w-4 text-[#002f17]" />
        </div>
        <p className="text-xs text-[#555] leading-relaxed font-medium">
          Extras can be added or removed up to 48 hours before departure. Travel insurance is highly recommended.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          type="button"
          variant="ghost"
          size="lg"
          className="sm:w-auto h-14 rounded-lg"
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
        <button
          type="button"
          className="group flex-1 flex items-center justify-center gap-2 rounded-lg bg-[#ff467c] px-6 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-[#e63d6e] shadow-md hover:shadow-lg h-14"
          onClick={handleContinue}
        >
          <Plane className="h-5 w-5" />
          Continue to Payment
          <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          <span className="ml-1 inline-block w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[8px] border-l-white" />
        </button>
        <Button
          type="button"
          variant="ghost"
          size="lg"
          onClick={handleSkip}
          className="text-[#555] h-14 rounded-lg"
        >
          Skip for now
        </Button>
      </div>
    </motion.div>
  );
}
