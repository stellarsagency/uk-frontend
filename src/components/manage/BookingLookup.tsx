import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Info } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Card, CardContent } from '@/components/ui/Card';

interface BookingLookupProps {
  onFind: (reference: string, surname: string, departureDate: string) => void;
}

export function BookingLookup({ onFind }: BookingLookupProps) {
  const [reference, setReference] = useState('');
  const [surname, setSurname] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [errors, setErrors] = useState<{ reference?: string; surname?: string; departureDate?: string }>({});

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!reference.trim()) newErrors.reference = 'Booking reference is required';
    if (!surname.trim()) newErrors.surname = 'Surname is required';
    if (!departureDate) newErrors.departureDate = 'Departure date is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onFind(reference.trim(), surname.trim(), departureDate);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="mx-auto max-w-xl"
    >
      <Card className="shadow-lg border-[#e9e3da] rounded-lg bg-white">
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Booking Reference"
              placeholder="FC-2026-XXXXX"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              error={errors.reference}
            />
            <Input
              label="Lead Passenger Surname"
              placeholder="e.g. Smith"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              error={errors.surname}
            />
            <Input
              type="date"
              label="Departure Date"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              error={errors.departureDate}
            />
            <button
              type="submit"
              className="group flex w-full items-center justify-center gap-2 rounded-lg bg-[#ff467c] px-6 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-[#e63d6e] shadow-md hover:shadow-lg h-14"
            >
              <Search className="h-5 w-5" />
              Find My Booking
              <span className="ml-1 inline-block w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[8px] border-l-white" />
            </button>
          </form>

          <div className="mt-6 flex items-start gap-3 rounded-lg bg-[#faf5ed] border border-[#e9e3da] p-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#e9e3da]">
              <Info className="h-4 w-4 text-[#002f17]" />
            </div>
            <p className="text-xs text-[#555] leading-relaxed font-medium">
              You can find your booking reference in your confirmation email sent after booking.
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
