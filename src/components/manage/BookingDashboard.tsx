import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Copy,
  CheckCircle,
  Plane,
  Building2,
  Users,
  Calendar,
  MapPin,
  Download,
  Phone,
  Edit3,
  XCircle,
  Clock,
  AlertTriangle,
  CreditCard,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { cn, formatPrice, formatDate } from '@/lib/utils';
import type { Booking } from '@/types';

interface BookingDashboardProps {
  booking: Booking;
  onAmend: () => void;
  onCancel: () => void;
}

const statusConfig: Record<Booking['status'], { label: string; variant: 'success' | 'warning' | 'destructive' | 'default'; dot: string }> = {
  confirmed: { label: 'Confirmed', variant: 'success', dot: 'bg-emerald-500' },
  amended: { label: 'Amended', variant: 'warning', dot: 'bg-amber-500' },
  cancelled: { label: 'Cancelled', variant: 'destructive', dot: 'bg-red-500' },
  pending: { label: 'Pending', variant: 'default', dot: 'bg-gray-400' },
};

const statusTimeline: { status: string; date: string; description: string }[] = [
  { status: 'Booked', date: '', description: 'Booking created and confirmed' },
  { status: 'Paid', date: '', description: 'Payment received in full' },
  { status: 'Confirmed', date: '', description: 'All documents sent to your email' },
];

export function BookingDashboard({ booking, onAmend, onCancel }: BookingDashboardProps) {
  const [copied, setCopied] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);

  const copyReference = async () => {
    await navigator.clipboard.writeText(booking.reference);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const status = statusConfig[booking.status];

  const timeline = statusTimeline.map((item, i) => {
    const baseDate = new Date(booking.bookedAt);
    baseDate.setDate(baseDate.getDate() + i);
    return { ...item, date: formatDate(baseDate.toISOString()) };
  });

  const extrasTotal = booking.extras.reduce((sum, e) => sum + e.price, 0);
  const packageTotal = booking.totalPrice - extrasTotal;

  const calculateAge = (dob: string) => {
    const birth = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <Card className="border-[#ff467c]/20 bg-[#ffd4e4] shadow-sm rounded-lg">
        <CardContent className="flex flex-col gap-5 p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-bold text-[#555] uppercase tracking-widest mb-2">Booking Reference</p>
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold tracking-wider text-[#ff467c]">
                {booking.reference}
              </span>
              <button
                type="button"
                onClick={copyReference}
                className="rounded-lg p-2 text-[#ff467c] hover:bg-white/60 transition-all duration-200"
                title="Copy reference"
              >
                {copied ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <Copy className="h-5 w-5" />
                )}
              </button>
              {copied && (
                <motion.span
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-xs text-green-600 font-bold"
                >
                  Copied!
                </motion.span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={cn('h-2.5 w-2.5 rounded-full', status.dot)} />
            <Badge variant={status.variant} className="text-sm font-semibold px-3 py-1">
              {status.label}
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card className="border-[#e9e3da] bg-white shadow-sm rounded-lg">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-3 text-base">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#ffd4e4]">
              <Clock className="h-5 w-5 text-[#ff467c]" />
            </div>
            Booking Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative space-y-5">
            <div className="absolute left-[19px] top-3 h-[calc(100%-24px)] w-0.5 bg-gradient-to-b from-[#ff467c] to-[#e9e3da]" />
            {timeline.map((item, i) => (
              <div key={i} className="relative flex items-start gap-5">
                <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ff467c] text-xs font-bold text-white shadow-md">
                  {i + 1}
                </div>
                <div className="flex-1 pt-1">
                  <div className="flex items-center gap-3">
                    <p className="font-bold text-[#002f17]">{item.status}</p>
                    <span className="text-xs text-[#818085] font-medium">{item.date}</span>
                  </div>
                  <p className="text-sm text-[#555] mt-0.5">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {booking.flightDetails && (
        <Card className="border-[#e9e3da] bg-white shadow-sm rounded-lg">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-3 text-base">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#ffd4e4]">
                <Plane className="h-5 w-5 text-[#ff467c]" />
              </div>
              Flight Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div>
              <Badge variant="outline" className="mb-3 text-xs font-semibold">Outbound</Badge>
              <div className="flex items-center justify-between">
                <div className="text-center">
                  <p className="text-xl font-bold text-[#002f17]">{booking.flightDetails.departure.time}</p>
                  <p className="text-sm text-[#555] mt-0.5">{booking.flightDetails.departure.airport}</p>
                  <p className="text-xs font-semibold text-[#818085] mt-0.5">{booking.flightDetails.departure.code}</p>
                </div>
                <div className="flex-1 px-5">
                  <div className="border-t-2 border-dashed border-[#e9e3da] relative">
                    <Plane className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4 text-[#ff467c] bg-white px-0.5" />
                  </div>
                  <p className="mt-1.5 text-center text-[11px] text-[#818085] font-medium">
                    {booking.flightDetails.duration} ·{' '}
                    {booking.flightDetails.stops === 0 ? 'Direct' : `${booking.flightDetails.stops} stop(s)`}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-[#002f17]">{booking.flightDetails.arrival.time}</p>
                  <p className="text-sm text-[#555] mt-0.5">{booking.flightDetails.arrival.airport}</p>
                  <p className="text-xs font-semibold text-[#818085] mt-0.5">{booking.flightDetails.arrival.code}</p>
                </div>
              </div>
              <p className="mt-2.5 text-center text-xs text-[#818085] font-medium">
                {booking.flightDetails.airline} · {booking.flightDetails.flightNumber}
              </p>
            </div>

            {booking.flightDetails.returnFlight && (
              <div className="border-t border-[#e9e3da] pt-5">
                <Badge variant="outline" className="mb-3 text-xs font-semibold">Return</Badge>
                <div className="flex items-center justify-between">
                  <div className="text-center">
                    <p className="text-xl font-bold text-[#002f17]">{booking.flightDetails.returnFlight.departure.time}</p>
                    <p className="text-sm text-[#555] mt-0.5">{booking.flightDetails.returnFlight.departure.airport}</p>
                    <p className="text-xs font-semibold text-[#818085] mt-0.5">{booking.flightDetails.returnFlight.departure.code}</p>
                  </div>
                  <div className="flex-1 px-5">
                    <div className="border-t-2 border-dashed border-[#e9e3da] relative">
                      <Plane className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4 text-[#ff467c] rotate-180 bg-white px-0.5" />
                    </div>
                    <p className="mt-1.5 text-center text-[11px] text-[#818085] font-medium">
                      {booking.flightDetails.returnFlight.duration} ·{' '}
                      {booking.flightDetails.returnFlight.stops === 0 ? 'Direct' : `${booking.flightDetails.returnFlight.stops} stop(s)`}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold text-[#002f17]">{booking.flightDetails.returnFlight.arrival.time}</p>
                    <p className="text-sm text-[#555] mt-0.5">{booking.flightDetails.returnFlight.arrival.airport}</p>
                    <p className="text-xs font-semibold text-[#818085] mt-0.5">{booking.flightDetails.returnFlight.arrival.code}</p>
                  </div>
                </div>
                <p className="mt-2.5 text-center text-xs text-[#818085] font-medium">
                  {booking.flightDetails.returnFlight.airline} · {booking.flightDetails.returnFlight.flightNumber}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <Card className="border-[#e9e3da] bg-white shadow-sm rounded-lg">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-3 text-base">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#ffd4e4]">
              <Building2 className="h-5 w-5 text-[#ff467c]" />
            </div>
            Hotel Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#ffd4e4]">
              <MapPin className="h-4 w-4 text-[#ff467c]" />
            </div>
            <div>
              <p className="font-bold text-[#002f17]">{booking.holidayPackage.name}</p>
              <p className="text-sm text-[#555] mt-0.5">{booking.holidayPackage.location.address}</p>
              <p className="text-sm text-[#555]">
                {booking.holidayPackage.location.city}, {booking.holidayPackage.location.postcode}
              </p>
            </div>
          </div>
          <div className="border-t border-[#e9e3da] pt-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#ffd4e4]">
                <Calendar className="h-4 w-4 text-[#ff467c]" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#555]">Check-in</span>
                  <span className="font-semibold">
                    {formatDate(booking.departureDate)} at {booking.holidayPackage.policies.checkIn}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#555]">Check-out</span>
                  <span className="font-semibold">
                    {formatDate(booking.returnDate)} at {booking.holidayPackage.policies.checkOut}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-[#e9e3da] pt-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#ffd4e4]">
                <Building2 className="h-4 w-4 text-[#ff467c]" />
              </div>
              <div>
                <p className="text-sm font-semibold">{booking.roomType.name}</p>
                <p className="text-xs text-[#555] mt-0.5">{booking.holidayPackage.boardType}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-[#e9e3da] bg-white shadow-sm rounded-lg">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-3 text-base">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#ffd4e4]">
              <Users className="h-5 w-5 text-[#ff467c]" />
            </div>
            Passengers ({booking.passengers.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-[#e9e3da]">
            {booking.passengers.map((passenger, index) => (
              <div key={index} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                <div>
                  <p className="font-bold text-[#002f17]">{passenger.fullName}</p>
                  <p className="text-xs text-[#555] mt-0.5">{passenger.email}</p>
                </div>
                <div className="flex items-center gap-2.5">
                  {passenger.isLead && (
                    <Badge variant="primary" className="text-[10px] font-semibold">Lead</Badge>
                  )}
                  <span className="text-sm text-[#555] font-medium">
                    {passenger.age !== undefined ? `Age ${passenger.age}` : `Age ${calculateAge(passenger.dateOfBirth)}`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-[#e9e3da] bg-white shadow-sm rounded-lg">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-3 text-base">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#ffd4e4]">
              <CreditCard className="h-5 w-5 text-[#ff467c]" />
            </div>
            Price Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-[#555]">Accommodation ({booking.roomType.name})</span>
            <span className="font-semibold text-[#002f17]">{formatPrice(packageTotal)}</span>
          </div>
          {booking.flightDetails && (
            <div className="flex justify-between text-sm">
              <span className="text-[#555]">Flights (included)</span>
              <span className="text-[#818085] font-medium">Included</span>
            </div>
          )}
          {booking.extras.length > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-[#555]">Extras ({booking.extras.length})</span>
              <span className="font-semibold text-[#002f17]">{formatPrice(extrasTotal)}</span>
            </div>
          )}
          <div className="flex justify-between text-sm">
            <span className="text-[#555]">Taxes &amp; fees</span>
            <span className="text-[#818085] font-medium">Included</span>
          </div>
          <div className="border-t border-[#e9e3da] pt-4">
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-[#002f17]">Total Paid</span>
              <span className="text-3xl font-bold text-[#ff467c]">{formatPrice(booking.totalPrice)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-[#e9e3da] bg-white shadow-sm rounded-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-bold text-[#002f17]">Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2">
            {booking.status !== 'cancelled' && (
              <>
                <button
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#ff467c] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#e63d6e] shadow-md hover:shadow-lg h-12"
                  onClick={onAmend}
                >
                  <Edit3 className="h-4 w-4" />
                  Amend Booking
                </button>
                <Button
                  variant="destructive"
                  className="w-full h-12 rounded-lg"
                  onClick={() => setCancelDialogOpen(true)}
                >
                  <XCircle className="mr-2 h-4 w-4" />
                  Cancel Booking
                </Button>
              </>
            )}
            <Button variant="outline" className="w-full h-12 rounded-lg border-2 border-[#e9e3da]">
              <Download className="mr-2 h-4 w-4" />
              Download Documents
            </Button>
            <Link to="/contact" className="w-full">
              <Button variant="ghost" className="w-full h-12 rounded-lg">
                <Phone className="mr-2 h-4 w-4" />
                Contact Support
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {cancelDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setCancelDialogOpen(false)}
          />
          <div className="relative z-50 mx-4 w-full max-w-md rounded-lg bg-white p-8 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <h3 className="font-heading text-xl font-bold text-[#002f17]">Cancel Booking?</h3>
            </div>
            <p className="text-sm text-[#555] leading-relaxed">
              Are you sure you want to cancel booking{' '}
              <span className="font-bold text-[#ff467c]">{booking.reference}</span>?
              This action cannot be undone. A cancellation fee may apply based on your package terms.
            </p>
            <div className="mt-8 flex justify-end gap-3">
              <Button variant="default" onClick={() => setCancelDialogOpen(false)} className="rounded-lg">
                Keep Booking
              </Button>
              <Button variant="destructive" onClick={onCancel} className="rounded-lg">
                Yes, Cancel Booking
              </Button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
