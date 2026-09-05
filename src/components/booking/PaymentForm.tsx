import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  CreditCard,
  Shield,
  Lock,
  ChevronLeft,
  ShieldCheck,
  BadgeCheck,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Checkbox } from '@/components/ui/Checkbox';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { cn, formatPrice } from '@/lib/utils';

const cardSchema = z.object({
  cardNumber: z.string().min(16, 'Card number must be 16 digits'),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Format: MM/YY'),
  cvv: z.string().min(3, 'CVV must be 3-4 digits').max(4),
  cardholderName: z.string().min(2, 'Name is required'),
  billingLine1: z.string().min(1, 'Address line 1 is required'),
  billingLine2: z.string().optional(),
  billingCity: z.string().min(1, 'City is required'),
  billingCounty: z.string().optional(),
  billingPostcode: z.string().min(1, 'Postcode is required'),
  termsAccepted: z.boolean().refine((val) => val === true, 'You must accept the terms'),
});

type CardFormData = z.infer<typeof cardSchema>;

interface PaymentFormProps {
  totalAmount: number;
  onPayment: () => void;
}

function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 16);
  return digits.replace(/(\d{4})(?=\d)/g, '$1 ');
}

function formatExpiry(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 4);
  if (digits.length >= 3) {
    return digits.slice(0, 2) + '/' + digits.slice(2);
  }
  return digits;
}

function getCardType(number: string): { name: string; color: string } | null {
  const cleaned = number.replace(/\D/g, '');
  if (cleaned.startsWith('4')) return { name: 'Visa', color: 'text-blue-600 bg-blue-50' };
  if (/^5[1-5]/.test(cleaned) || /^2[2-7]/.test(cleaned)) return { name: 'Mastercard', color: 'text-orange-600 bg-orange-50' };
  if (cleaned.startsWith('34') || cleaned.startsWith('37')) return { name: 'Amex', color: 'text-indigo-600 bg-indigo-50' };
  return null;
}

export function PaymentForm({ totalAmount, onPayment }: PaymentFormProps) {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('card');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CardFormData>({
    resolver: zodResolver(cardSchema),
    defaultValues: {
      termsAccepted: false,
    },
  });

  const termsAccepted = watch('termsAccepted');
  const cardNumber = watch('cardNumber');
  const cardType = getCardType(cardNumber || '');

  const onSubmit = () => {
    onPayment();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="rounded-lg bg-[#002f17] p-6 text-center text-white shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-[#ff467c]/30 blur-2xl" />
            <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
          </div>
          <div className="relative">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="h-4 w-4 text-white/60" />
              <p className="text-sm font-semibold text-white/70">Total Amount to Pay</p>
            </div>
            <p className="text-4xl font-bold tracking-tight">{formatPrice(totalAmount)}</p>
            <p className="text-xs text-white/50 mt-2 font-medium">Including all taxes and fees</p>
          </div>
        </div>

        <Tabs defaultValue="card" onValueChange={setPaymentMethod}>
          <TabsList className="w-full bg-[#faf5ed] p-1.5 rounded-lg border border-[#e9e3da]">
            <TabsTrigger value="card" className="flex-1 rounded-md font-semibold">
              <CreditCard className="mr-2 h-4 w-4" />
              Card
            </TabsTrigger>
            <TabsTrigger value="paypal" className="flex-1 rounded-md font-semibold">
              <span className="font-bold text-[#003087]">Pay</span>
              <span className="font-bold text-[#0070BA]">Pal</span>
            </TabsTrigger>
            <TabsTrigger value="klarna" className="flex-1 rounded-md font-semibold">
              <span className="font-bold text-[#FFB3C7]">Klarna.</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="card">
            <Card className="border-[#e9e3da] bg-white">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between text-base">
                  <span className="font-bold text-[#002f17]">Card Details</span>
                  {cardType && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={cn(
                        'text-xs font-bold px-3 py-1.5 rounded-md',
                        cardType.color
                      )}
                    >
                      {cardType.name}
                    </motion.span>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  label="Card Number"
                  placeholder="1234 5678 9012 3456"
                  error={errors.cardNumber?.message}
                  {...register('cardNumber', {
                    onChange: (e) => {
                      const formatted = formatCardNumber(e.target.value);
                      setValue('cardNumber', formatted, { shouldValidate: true });
                    },
                  })}
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Expiry Date"
                    placeholder="MM/YY"
                    error={errors.expiryDate?.message}
                    {...register('expiryDate', {
                      onChange: (e) => {
                        const formatted = formatExpiry(e.target.value);
                        setValue('expiryDate', formatted, { shouldValidate: true });
                      },
                    })}
                  />
                  <Input
                    label="CVV"
                    placeholder="123"
                    type="password"
                    maxLength={4}
                    error={errors.cvv?.message}
                    {...register('cvv')}
                  />
                </div>
                <Input
                  label="Cardholder Name"
                  placeholder="Name as shown on card"
                  error={errors.cardholderName?.message}
                  {...register('cardholderName')}
                />
              </CardContent>
            </Card>

            <Card className="mt-4 border-[#e9e3da] bg-white">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-bold text-[#002f17]">Billing Address</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  label="Address Line 1"
                  placeholder="House number and street"
                  error={errors.billingLine1?.message}
                  {...register('billingLine1')}
                />
                <Input
                  label="Address Line 2"
                  placeholder="Flat, suite, building (optional)"
                  {...register('billingLine2')}
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="City"
                    placeholder="London"
                    error={errors.billingCity?.message}
                    {...register('billingCity')}
                  />
                  <Input
                    label="County"
                    placeholder="Greater London"
                    {...register('billingCounty')}
                  />
                </div>
                <Input
                  label="Postcode"
                  placeholder="SW1A 1AA"
                  error={errors.billingPostcode?.message}
                  {...register('billingPostcode')}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="paypal">
            <Card className="border-[#e9e3da] bg-white">
              <CardContent className="flex flex-col items-center py-14 text-center">
                <div className="mb-5 rounded-lg bg-[#003087]/10 p-5">
                  <span className="text-4xl font-bold text-[#003087]">Pay</span>
                  <span className="text-4xl font-bold text-[#0070BA]">Pal</span>
                </div>
                <p className="text-[#555] max-w-sm leading-relaxed">
                  You will be redirected to PayPal to complete your payment securely.
                </p>
                <div className="mt-5 flex items-center gap-2 text-xs text-[#818085] bg-[#faf5ed] px-4 py-2 rounded-lg border border-[#e9e3da]">
                  <Shield className="h-3.5 w-3.5 text-green-600" />
                  <span className="font-medium">Secure redirect</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="klarna">
            <Card className="border-[#e9e3da] bg-white">
              <CardContent className="flex flex-col items-center py-14 text-center">
                <div className="mb-5 rounded-lg bg-[#FFB3C7]/20 p-5">
                  <span className="text-4xl font-bold text-[#FFB3C7]">Klarna.</span>
                </div>
                <p className="text-[#555] max-w-sm leading-relaxed">
                  Pay in 3 interest-free instalments. Split your purchase into 3 equal payments.
                </p>
                <div className="mt-5 rounded-lg bg-[#faf5ed] px-6 py-3 border border-[#e9e3da]">
                  <span className="text-xl font-bold text-[#002f17]">
                    {formatPrice(totalAmount / 3)}
                  </span>
                  <span className="text-sm text-[#555] ml-1.5">× 3 payments</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {paymentMethod === 'card' && (
          <div className="space-y-3">
            <div className="flex items-start gap-3 rounded-lg border border-[#e9e3da] p-4 bg-white">
              <Checkbox
                label=""
                checked={termsAccepted}
                onChange={(e) =>
                  setValue('termsAccepted', e.target.checked, { shouldValidate: true })
                }
                className="mt-0.5"
              />
              <p className="text-sm text-[#555] leading-relaxed">
                I agree to the{' '}
                <span className="font-semibold text-[#ff467c] cursor-pointer hover:underline">Terms &amp; Conditions</span>
                {' '}and{' '}
                <span className="font-semibold text-[#ff467c] cursor-pointer hover:underline">Privacy Policy</span>
              </p>
            </div>
            {errors.termsAccepted && (
              <p className="text-xs text-red-500 font-medium">{errors.termsAccepted.message}</p>
            )}
          </div>
        )}

        <div className="flex flex-wrap items-center justify-center gap-6 py-2">
          {[
            { icon: Lock, label: 'Secure Payment', color: 'text-green-600' },
            { icon: ShieldCheck, label: '256-bit SSL', color: 'text-green-600' },
            { icon: BadgeCheck, label: 'PCI DSS Compliant', color: 'text-green-600' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2 text-xs text-[#555]">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-green-50">
                <item.icon className={cn('h-3.5 w-3.5', item.color)} />
              </div>
              <span className="font-semibold">{item.label}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            type="button"
            variant="ghost"
            size="lg"
            className="sm:w-auto h-14 rounded-lg"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <button
            type="submit"
            className="group flex-1 flex items-center justify-center gap-2 rounded-lg bg-[#ff467c] px-6 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-[#e63d6e] shadow-md hover:shadow-lg h-14"
            disabled={paymentMethod === 'card' && !termsAccepted}
          >
            <Lock className="h-5 w-5" />
            Pay {formatPrice(totalAmount)} Now
          </button>
        </div>
      </form>
    </motion.div>
  );
}
