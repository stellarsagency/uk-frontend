import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CheckCircle,
  Copy,
  Download,
  Share2,
  Plane,
  Building2,
  Users,
  Calendar,
  MapPin,
  ExternalLink,
  Mail,
  Clock,
  PartyPopper,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { formatPrice, formatDate } from '@/lib/utils';
import type { Booking } from '@/types';

interface ConfirmationScreenProps {
  booking: Booking;
}

export function ConfirmationScreen({ booking }: ConfirmationScreenProps) {
  const [copied, setCopied] = useState(false);

  const copyReference = async () => {
    await navigator.clipboard.writeText(booking.reference);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
        className="flex flex-col items-center py-12 text-center"
      >
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.5 }}
          className="mb-6 relative"
        >
          <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-green-600 shadow-2xl shadow-green-300/50">
            <CheckCircle className="h-16 w-16 text-white" />
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            className="absolute -top-2 -right-2"
          >
            <PartyPopper className="h-8 w-8 text-[#ff467c]" />
          </motion.div>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="font-heading text-4xl font-bold text-[#002f17] tracking-tight"
        >
          Booking Confirmed!
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-3 text-[#555] max-w-md leading-relaxed"
        >
          <Mail className="mr-1.5 inline h-4 w-4" />
          A confirmation email has been sent to{' '}
          <span className="font-semibold text-[#002f17]">{booking.leadPassenger.email}</span>
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="mt-1.5 text-xs text-[#818085]"
        >
          Please check your spam/junk folder if you haven&apos;t received it.
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
      >
        <Card className="border-[#ff467c]/20 bg-[#ffd4e4] shadow-sm">
          <CardContent className="flex flex-col items-center gap-4 p-8">
            <p className="text-xs font-bold text-[#555] uppercase tracking-widest">Booking Reference</p>
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold tracking-wider text-[#ff467c]">
                {booking.reference}
              </span>
              <button
                type="button"
                onClick={copyReference}
                className="rounded-lg p-2.5 text-[#ff467c] hover:bg-white/60 transition-all duration-200"
                title="Copy reference"
              >
                {copied ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <Copy className="h-5 w-5" />
                )}
              </button>
            </div>
            {copied && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-green-600 font-bold"
              >
                Copied to clipboard!
              </motion.p>
            )}
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
        className="grid gap-5 md:grid-cols-2"
      >
        <Card className="border-[#e9e3da] bg-white">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-3 text-base">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#ffd4e4]">
                <Plane className="h-5 w-5 text-[#ff467c]" />
              </div>
              Flight Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {booking.flightDetails && (
              <>
                <div>
                  <Badge variant="outline" className="mb-3 text-xs font-semibold">Outbound</Badge>
                  <div className="flex items-center justify-between">
                    <div className="text-center">
                      <p className="text-xl font-bold text-[#002f17]">{booking.flightDetails.departure.time}</p>
                      <p className="text-sm font-semibold text-[#555] mt-0.5">{booking.flightDetails.departure.code}</p>
                      <p className="text-[11px] text-[#818085] mt-0.5">{booking.flightDetails.departure.airport}</p>
                    </div>
                    <div className="flex-1 px-4">
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
                      <p className="text-sm font-semibold text-[#555] mt-0.5">{booking.flightDetails.arrival.code}</p>
                      <p className="text-[11px] text-[#818085] mt-0.5">{booking.flightDetails.arrival.airport}</p>
                    </div>
                  </div>
                  <p className="mt-2.5 text-center text-xs text-[#818085] font-medium">
                    {booking.flightDetails.airline} · {booking.flightDetails.flightNumber}
                  </p>
                </div>
                {booking.flightDetails.returnFlight && (
                  <div className="border-t border-[#e9e3da] pt-4">
                    <Badge variant="outline" className="mb-3 text-xs font-semibold">Return</Badge>
                    <div className="flex items-center justify-between">
                      <div className="text-center">
                        <p className="text-xl font-bold text-[#002f17]">{booking.flightDetails.returnFlight.departure.time}</p>
                        <p className="text-sm font-semibold text-[#555] mt-0.5">{booking.flightDetails.returnFlight.departure.code}</p>
                      </div>
                      <div className="flex-1 px-4">
                        <div className="border-t-2 border-dashed border-[#e9e3da] relative">
                          <Plane className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4 text-[#ff467c] rotate-180 bg-white px-0.5" />
                        </div>
                        <p className="mt-1.5 text-center text-[11px] text-[#818085] font-medium">
                          {booking.flightDetails.returnFlight.duration}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-xl font-bold text-[#002f17]">{booking.flightDetails.returnFlight.arrival.time}</p>
                        <p className="text-sm font-semibold text-[#555] mt-0.5">{booking.flightDetails.returnFlight.arrival.code}</p>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>

        <Card className="border-[#e9e3da] bg-white">
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
                    <span className="font-semibold">{booking.holidayPackage.policies.checkIn}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#555]">Check-out</span>
                    <span className="font-semibold">{booking.holidayPackage.policies.checkOut}</span>
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
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <Card className="border-[#e9e3da] bg-white">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-3 text-base">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#ffd4e4]">
                <Users className="h-5 w-5 text-[#ff467c]" />
              </div>
              Passengers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="divide-y divide-[#e9e3da]">
              {booking.passengers.map((passenger, index) => (
                <div key={index} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                  <div>
                    <p className="font-bold text-[#002f17]">{passenger.fullName}</p>
                    {passenger.isLead && (
                      <Badge variant="primary" className="mt-1.5 text-[10px]">Lead Passenger</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3 }}
      >
        <Card className="border-[#e9e3da] bg-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold text-[#002f17]">Price Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-[#555]">Holiday Package</span>
              <span className="font-semibold text-[#002f17]">
                {formatPrice(booking.totalPrice - booking.extras.reduce((s, e) => s + e.price, 0))}
              </span>
            </div>
            {booking.extras.length > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-[#555]">Extras ({booking.extras.length})</span>
                <span className="font-semibold text-[#002f17]">
                  {formatPrice(booking.extras.reduce((s, e) => s + e.price, 0))}
                </span>
              </div>
            )}
            <div className="border-t border-[#e9e3da] pt-4">
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-[#002f17]">Total Paid</span>
                <span className="text-3xl font-bold text-[#ff467c]">{formatPrice(booking.totalPrice)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
      >
        <Card className="border-[#e9e3da] bg-[#faf5ed]">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#e9e3da]">
                <Clock className="h-5 w-5 text-[#002f17]" />
              </div>
              <div>
                <p className="text-base font-bold text-[#002f17]">What happens next?</p>
                <ul className="mt-3 space-y-2 text-sm text-[#555]">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff467c]" />
                    You&apos;ll receive your e-tickets and travel documents by email within 24 hours
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff467c]" />
                    Check-in details will be sent 7 days before departure
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff467c]" />
                    Download the FirstChoice app for real-time updates
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="flex flex-col gap-3 sm:flex-row"
      >
        <button
          className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-[#ff467c] px-6 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-[#e63d6e] shadow-md hover:shadow-lg h-14"
        >
          <Download className="h-5 w-5" />
          Download PDF Invoice
        </button>
        <Link to="/manage" className="flex-1">
          <Button variant="outline" size="lg" className="w-full h-14 rounded-lg border-2 border-[#e9e3da] hover:bg-[#faf5ed] font-semibold">
            <ExternalLink className="mr-2 h-5 w-5" />
            Manage My Booking
          </Button>
        </Link>
        <Button variant="ghost" size="lg" className="h-14 rounded-lg">
          <Share2 className="mr-2 h-5 w-5" />
          Share
        </Button>
      </motion.div>

      <div className="text-center text-sm text-[#555] pb-4">
        <p>
          Need help? Call us on{' '}
          <a href="tel:08001234567" className="text-[#ff467c] font-bold hover:underline">
            0800 123 4567
          </a>
        </p>
      </div>
    </motion.div>
  );
}
