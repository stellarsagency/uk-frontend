import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Search,
  Plane,
  Building2,
  Users,
  CreditCard,
  Download,
  Phone,
  AlertTriangle,
  CheckCircle,
  Clock,
  XCircle,
  HelpCircle,
  MapPin,
  Edit3,
} from 'lucide-react';
import { formatPrice, formatDate } from '@/lib/utils';
import { allHolidays } from '@/data/mockData';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Dialog, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/Dialog';
import type { Booking } from '@/types';

const lookupSchema = z.object({
  bookingReference: z.string().min(1, 'Booking reference is required'),
  surname: z.string().min(2, 'Surname is required'),
  departureDate: z.string().min(1, 'Departure date is required'),
});

type LookupFormData = z.infer<typeof lookupSchema>;

function createMockBooking(data: LookupFormData): Booking {
  const holiday = allHolidays[0];
  return {
    id: `booking-${Date.now()}`,
    reference: data.bookingReference.toUpperCase(),
    leadPassenger: {
      fullName: `${data.surname}, John`,
      email: 'john.example@email.com',
      phone: '07700 900000',
      dateOfBirth: '1985-06-15',
      isLead: true,
    },
    passengers: [
      {
        fullName: `${data.surname}, John`,
        email: 'john.example@email.com',
        phone: '07700 900000',
        dateOfBirth: '1985-06-15',
        isLead: true,
      },
      {
        fullName: `${data.surname}, Jane`,
        email: '',
        phone: '',
        dateOfBirth: '1987-03-22',
        isLead: false,
      },
    ],
    holidayPackage: holiday,
    roomType: holiday.roomTypes[0],
    extras: [
      { id: 'insurance', name: 'Travel Insurance', description: '', price: 29.99, type: 'insurance', selected: true },
    ],
    totalPrice: holiday.roomTypes[0].pricePerPerson * 2 + 29.99 * 2,
    currency: 'GBP',
    status: 'confirmed',
    paymentStatus: 'paid',
    bookedAt: '2026-08-01T10:30:00Z',
    departureDate: data.departureDate,
    returnDate: new Date(new Date(data.departureDate).getTime() + holiday.duration * 86400000).toISOString().split('T')[0],
    flightDetails: holiday.flightDetails,
  };
}

const statusConfig: Record<string, { color: string; icon: React.ElementType; label: string }> = {
  confirmed: { color: 'success', icon: CheckCircle, label: 'Confirmed' },
  pending: { color: 'warning', icon: Clock, label: 'Pending' },
  cancelled: { color: 'destructive', icon: XCircle, label: 'Cancelled' },
  amended: { color: 'secondary', icon: AlertTriangle, label: 'Amended' },
};

export default function ManageBookingPage() {
  const [view, setView] = useState<'lookup' | 'dashboard'>('lookup');
  const [booking, setBooking] = useState<Booking | null>(null);
  const [amendOpen, setAmendOpen] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LookupFormData>({
    resolver: zodResolver(lookupSchema),
  });

  const onSubmit = (data: LookupFormData) => {
    const mockBooking = createMockBooking(data);
    setBooking(mockBooking);
    setView('dashboard');
  };

  const handleCancelBooking = () => {
    if (booking) {
      setBooking({ ...booking, status: 'cancelled' });
    }
    setCancelOpen(false);
  };

  if (view === 'dashboard' && booking) {
    const statusInfo = statusConfig[booking.status] || statusConfig.confirmed;
    const StatusIcon = statusInfo.icon;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className="min-h-screen bg-[#faf5ed] py-8 md:py-12"
      >
        <div className="mx-auto max-w-4xl px-4">
          <button
            onClick={() => setView('lookup')}
            className="mb-6 flex items-center gap-1 text-sm font-semibold text-[#555] hover:text-[#ff467c] transition-colors"
          >
            <span className="text-lg">←</span>
            Back to lookup
          </button>

          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="font-heading text-3xl font-bold text-[#002f17]">My Booking</h1>
              <p className="text-sm text-[#555] mt-0.5">
                Reference: <span className="font-semibold text-[#002f17]">{booking.reference}</span>
              </p>
            </div>
            <Badge variant={statusInfo.color as 'success' | 'warning' | 'destructive' | 'secondary'}>
              <StatusIcon className="mr-1 h-3.5 w-3.5" />
              {statusInfo.label}
            </Badge>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <Card className="transition-all duration-300 rounded-lg bg-white border-[#e9e3da] shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#ffd4e4]">
                    <Plane className="h-4 w-4 text-[#ff467c]" />
                  </div>
                  Flight Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {booking.flightDetails && (
                  <>
                    <div>
                      <p className="text-xs font-bold text-[#818085] uppercase tracking-widest">Outbound</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="text-center">
                          <p className="font-bold text-[#002f17]">{booking.flightDetails.departure.time}</p>
                          <p className="text-xs text-[#555]">{booking.flightDetails.departure.code}</p>
                        </div>
                        <div className="flex-1 mx-3">
                          <div className="border-t-2 border-dashed border-[#e9e3da] relative">
                            <Plane className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-3 w-3 text-[#ff467c] bg-white px-0.5" />
                          </div>
                          <p className="text-center text-[10px] text-[#818085] mt-1">{booking.flightDetails.duration}</p>
                        </div>
                        <div className="text-center">
                          <p className="font-bold text-[#002f17]">{booking.flightDetails.arrival.time}</p>
                          <p className="text-xs text-[#555]">{booking.flightDetails.arrival.code}</p>
                        </div>
                      </div>
                      <p className="text-center text-[10px] text-[#818085] mt-1">
                        {booking.flightDetails.airline} · {booking.flightDetails.flightNumber}
                      </p>
                    </div>
                    {booking.flightDetails.returnFlight && (
                      <div className="border-t border-[#e9e3da] pt-3">
                        <p className="text-xs font-bold text-[#818085] uppercase tracking-widest">Return</p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="text-center">
                            <p className="font-bold text-[#002f17]">{booking.flightDetails.returnFlight.departure.time}</p>
                            <p className="text-xs text-[#555]">{booking.flightDetails.returnFlight.departure.code}</p>
                          </div>
                          <div className="flex-1 mx-3">
                            <div className="border-t-2 border-dashed border-[#e9e3da]" />
                          </div>
                          <div className="text-center">
                            <p className="font-bold text-[#002f17]">{booking.flightDetails.returnFlight.arrival.time}</p>
                            <p className="text-xs text-[#555]">{booking.flightDetails.returnFlight.arrival.code}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </CardContent>
            </Card>

            <Card className="transition-all duration-300 rounded-lg bg-white border-[#e9e3da] shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#ffd4e4]">
                    <Building2 className="h-4 w-4 text-[#ff467c]" />
                  </div>
                  Hotel Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#ff467c]" />
                  <div>
                    <p className="font-semibold text-[#002f17]">{booking.holidayPackage.name}</p>
                    <p className="text-sm text-[#555]">{booking.holidayPackage.location.address}</p>
                    <p className="text-sm text-[#555]">{booking.holidayPackage.location.city}</p>
                  </div>
                </div>
                <div className="border-t border-[#e9e3da] pt-3 grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-[#818085] text-xs">Check-in</p>
                    <p className="font-medium">{booking.holidayPackage.policies.checkIn}</p>
                  </div>
                  <div>
                    <p className="text-[#818085] text-xs">Check-out</p>
                    <p className="font-medium">{booking.holidayPackage.policies.checkOut}</p>
                  </div>
                </div>
                <div className="border-t border-[#e9e3da] pt-3">
                  <p className="text-[#818085] text-xs">Room</p>
                  <p className="font-medium">{booking.roomType.name}</p>
                  <p className="text-xs text-[#555]">{booking.holidayPackage.boardType}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="transition-all duration-300 rounded-lg bg-white border-[#e9e3da] shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#ffd4e4]">
                    <Users className="h-4 w-4 text-[#ff467c]" />
                  </div>
                  Passengers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="divide-y divide-[#e9e3da]">
                  {booking.passengers.map((p, i) => (
                    <div key={i} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                      <div>
                        <p className="font-medium text-[#002f17]">{p.fullName}</p>
                        {p.isLead && <Badge variant="primary" className="mt-1 text-[10px]">Lead</Badge>}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="transition-all duration-300 rounded-lg bg-white border-[#e9e3da] shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#ffd4e4]">
                    <CreditCard className="h-4 w-4 text-[#ff467c]" />
                  </div>
                  Price Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[#555]">Departure</span>
                  <span className="font-medium">{formatDate(booking.departureDate)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#555]">Return</span>
                  <span className="font-medium">{formatDate(booking.returnDate)}</span>
                </div>
                {booking.extras.length > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-[#555]">Extras</span>
                    <span className="font-medium">{booking.extras.map((e) => e.name).join(', ')}</span>
                  </div>
                )}
                <div className="border-t border-[#e9e3da] pt-2 flex justify-between">
                  <span className="font-bold text-[#002f17]">Total Paid</span>
                  <span className="text-lg font-bold text-[#ff467c]">{formatPrice(booking.totalPrice)}</span>
                </div>
                <Badge variant="success" className="mt-1">
                  <CheckCircle className="mr-1 h-3 w-3" />
                  Payment confirmed
                </Badge>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="outline" onClick={() => setAmendOpen(true)} className="rounded-lg border-2 border-[#e9e3da] font-semibold">
              <Edit3 className="mr-2 h-4 w-4" />
              Amend Booking
            </Button>
            <Button variant="destructive" onClick={() => setCancelOpen(true)} className="rounded-lg font-semibold">
              <XCircle className="mr-2 h-4 w-4" />
              Cancel Booking
            </Button>
            <Button variant="outline" className="rounded-lg border-2 border-[#e9e3da] font-semibold">
              <Download className="mr-2 h-4 w-4" />
              Download Documents
            </Button>
            <Button variant="outline" className="rounded-lg border-2 border-[#e9e3da] font-semibold">
              <Phone className="mr-2 h-4 w-4" />
              Contact Support
            </Button>
          </div>

          <Dialog open={amendOpen} onClose={() => setAmendOpen(false)}>
            <DialogHeader>
              <DialogTitle>Amend Booking</DialogTitle>
              <DialogClose onClick={() => setAmendOpen(false)} />
            </DialogHeader>
            <p className="text-sm text-[#555]">
              To amend your booking, please contact our support team on{' '}
              <span className="font-semibold">0800 123 4567</span> or email{' '}
              <span className="font-semibold">support@firstchoice.co.uk</span>.
              Amendments may be subject to a small fee depending on the changes requested.
            </p>
            <DialogFooter>
              <Button variant="outline" onClick={() => setAmendOpen(false)} className="rounded-lg">
                Close
              </Button>
            </DialogFooter>
          </Dialog>

          <Dialog open={cancelOpen} onClose={() => setCancelOpen(false)}>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-red-600">
                <AlertTriangle className="h-5 w-5" />
                Cancel Booking
              </DialogTitle>
              <DialogClose onClick={() => setCancelOpen(false)} />
            </DialogHeader>
            <p className="text-sm text-[#555]">
              Are you sure you want to cancel booking <strong>{booking.reference}</strong>?
              {booking.holidayPackage.policies.cancellation}
            </p>
            <DialogFooter>
              <Button variant="outline" onClick={() => setCancelOpen(false)} className="rounded-lg">
                Keep Booking
              </Button>
              <Button variant="destructive" onClick={handleCancelBooking} className="rounded-lg">
                Confirm Cancellation
              </Button>
            </DialogFooter>
          </Dialog>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className="min-h-screen bg-[#faf5ed] py-16 md:py-24"
    >
      <div className="mx-auto max-w-md px-4">
        <div className="mb-10 text-center">
          <div className="mx-auto mb-5 flex h-18 w-18 items-center justify-center rounded-lg bg-[#ff467c] shadow-lg">
            <Search className="h-8 w-8 text-white" />
          </div>
          <h1 className="font-heading text-3xl font-bold text-[#002f17]">Manage Your Booking</h1>
          <p className="mt-3 text-[#555] text-sm">
            Enter your booking details to view and manage your holiday.
          </p>
        </div>

        <Card className="shadow-lg rounded-lg bg-white border-[#e9e3da]">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <Input
                label="Booking Reference"
                placeholder="FC-2026-XXXXX"
                error={errors.bookingReference?.message}
                {...register('bookingReference')}
              />
              <Input
                label="Lead Passenger Surname"
                placeholder="Smith"
                error={errors.surname?.message}
                {...register('surname')}
              />
              <Input
                label="Departure Date"
                type="date"
                error={errors.departureDate?.message}
                {...register('departureDate')}
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

            <div className="mt-6 flex items-start gap-2 rounded-lg bg-[#faf5ed] border border-[#e9e3da] p-4 text-sm text-[#555]">
              <HelpCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#002f17]" />
              <p className="text-xs font-medium">You can find your booking reference in your confirmation email.</p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-10 text-center">
          <p className="text-sm text-[#555]">
            Need help? Call us on{' '}
            <a href="tel:08001234567" className="font-semibold text-[#ff467c] hover:underline">
              0800 123 4567
            </a>
          </p>
          <p className="text-xs text-[#818085] mt-1">Mon-Sun, 8am-10pm</p>
        </div>
      </div>
    </motion.div>
  );
}
