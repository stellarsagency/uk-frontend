import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Users,
  ChevronRight,
  AlertCircle,
  Shield,
  Star,
  Info,
  Crown,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { cn } from '@/lib/utils';
import type { Passenger, HolidayPackage, RoomType } from '@/types';

const passengerSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Phone must be at least 10 digits'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
});

type PassengerFormData = z.infer<typeof passengerSchema>;

interface PassengerFormProps {
  onSubmit: (passengers: Passenger[]) => void;
  passengerCount: number;
  holiday?: HolidayPackage;
  room?: RoomType;
}

export function PassengerForm({ onSubmit, passengerCount, holiday, room }: PassengerFormProps) {
  const navigate = useNavigate();
  const [specialRequirements, setSpecialRequirements] = useState('');
  const [additionalPassengers, setAdditionalPassengers] = useState<
    { fullName: string; dateOfBirth: string }[]
  >(
    Array.from({ length: Math.max(0, passengerCount - 1) }, () => ({
      fullName: '',
      dateOfBirth: '',
    }))
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PassengerFormData>({
    resolver: zodResolver(passengerSchema),
  });

  const additionalCount = Math.max(0, passengerCount - 1);

  const updateAdditionalPassenger = (
    index: number,
    field: 'fullName' | 'dateOfBirth',
    value: string
  ) => {
    setAdditionalPassengers((prev) =>
      prev.map((p, i) => (i === index ? { ...p, [field]: value } : p))
    );
  };

  const onFormSubmit = (data: PassengerFormData) => {
    const passengers: Passenger[] = [
      {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        dateOfBirth: data.dateOfBirth,
        isLead: true,
        specialRequirements: specialRequirements || undefined,
      },
      ...additionalPassengers.map((ap, i) => ({
        fullName: ap.fullName || `Passenger ${i + 2}`,
        email: '',
        phone: '',
        dateOfBirth: ap.dateOfBirth,
        isLead: false,
        specialRequirements: undefined,
      })),
    ];

    onSubmit(passengers);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
    >
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
        <Card className="border-[#ff467c]/20 bg-white">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-3 text-base">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#ff467c] shadow-sm">
                <Crown className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="font-bold text-[#002f17]">Lead Passenger Details</span>
                <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-[#ff467c]/10 px-2.5 py-0.5 text-[10px] font-bold text-[#ff467c]">
                  <Star className="h-3 w-3 fill-[#ff467c]" /> Lead
                </span>
              </div>
            </CardTitle>
            <div className="flex items-start gap-3 rounded-lg bg-[#faf5ed] border border-[#e9e3da] p-4 mt-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#e9e3da]">
                <Info className="h-4 w-4 text-[#002f17]" />
              </div>
              <p className="text-xs text-[#555] leading-relaxed">
                Must be 18 or over. This person receives all booking confirmations and travel documents.
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-5 pt-2">
            <Input
              label="Full Name (as shown on passport/ID)"
              placeholder="e.g. John Smith"
              error={errors.fullName?.message}
              {...register('fullName')}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label="Email Address"
                type="email"
                placeholder="john.smith@email.com"
                error={errors.email?.message}
                {...register('email')}
              />
              <Input
                label="Phone Number"
                type="tel"
                placeholder="07700 900000"
                error={errors.phone?.message}
                {...register('phone')}
              />
            </div>
            <Input
              label="Date of Birth"
              type="date"
              error={errors.dateOfBirth?.message}
              {...register('dateOfBirth')}
            />
          </CardContent>
        </Card>

        {additionalCount > 0 && (
          <Card className="border-[#e9e3da] bg-white">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-3 text-base">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#002f17]">
                  <Users className="h-5 w-5 text-white" />
                </div>
                Additional Passengers
              </CardTitle>
              <p className="text-sm text-[#555] mt-1">
                {additionalCount} additional {additionalCount === 1 ? 'passenger' : 'passengers'}
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <AnimatePresence>
                {Array.from({ length: additionalCount }).map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="rounded-lg border border-[#e9e3da] p-4 bg-[#faf5ed]/50"
                  >
                    <p className="mb-3 flex items-center gap-2.5 text-sm font-bold text-[#002f17]">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#002f17] text-[11px] font-bold text-white">
                        {index + 2}
                      </span>
                      Passenger {index + 2}
                    </p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <Input
                        label="Full Name"
                        placeholder="As shown on passport/ID"
                        value={additionalPassengers[index]?.fullName || ''}
                        onChange={(e) =>
                          updateAdditionalPassenger(index, 'fullName', e.target.value)
                        }
                      />
                      <Input
                        label="Date of Birth"
                        type="date"
                        value={additionalPassengers[index]?.dateOfBirth || ''}
                        onChange={(e) =>
                          updateAdditionalPassenger(index, 'dateOfBirth', e.target.value)
                        }
                      />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </CardContent>
          </Card>
        )}

        <Card className="border-[#e9e3da] bg-white">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-3 text-base">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#ffd4e4]">
                <AlertCircle className="h-5 w-5 text-[#ff467c]" />
              </div>
              Special Requirements
            </CardTitle>
            <p className="text-xs text-[#555] mt-1 ml-[52px]">
              Let us know about any accessibility needs, dietary requirements, or celebrations.
            </p>
          </CardHeader>
          <CardContent>
            <textarea
              value={specialRequirements}
              onChange={(e) => setSpecialRequirements(e.target.value)}
              placeholder="e.g., wheelchair access, dietary requirements, celebrating a birthday..."
              rows={3}
              className={cn(
                'flex w-full rounded-lg border border-[#e9e3da] bg-[#faf5ed] px-4 py-3 text-sm transition-all',
                'placeholder:text-[#818085] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff467c] focus-visible:ring-offset-2'
              )}
            />
          </CardContent>
        </Card>

        <div className="flex items-center gap-3 rounded-lg bg-[#faf5ed] border border-[#e9e3da] p-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#e9e3da]">
            <Shield className="h-4 w-4 text-[#002f17]" />
          </div>
          <p className="text-xs text-[#555] font-medium leading-relaxed">
            Your personal data is protected under UK GDPR. We never share your information with third parties.
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
            type="submit"
            className="group flex-1 flex items-center justify-center gap-2 rounded-lg bg-[#ff467c] px-6 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-[#e63d6e] shadow-md hover:shadow-lg h-14"
          >
            Continue to Extras
            <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            <span className="ml-1 inline-block w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[8px] border-l-white" />
          </button>
        </div>
      </form>
    </motion.div>
  );
}
