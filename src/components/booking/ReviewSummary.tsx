import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MapPin,
  Calendar,
  Users,
  Plane,
  Building2,
  ChevronRight,
  Star,
  Clock,
  Shield,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { formatPrice, formatDate } from '@/lib/utils';
import type { HolidayPackage, RoomType } from '@/types';

interface ReviewSummaryProps {
  holiday: HolidayPackage;
  room: RoomType;
  passengers: number;
  departureDate: string;
  returnDate: string;
}

export function ReviewSummary({
  holiday,
  room,
  passengers,
  departureDate,
  returnDate,
}: ReviewSummaryProps) {
  const navigate = useNavigate();
  const accommodationTotal = room.pricePerPerson * passengers;
  const taxes = Math.round(accommodationTotal * 0.1);
  const totalPerPerson = room.pricePerPerson + taxes / passengers;
  const totalPrice = accommodationTotal + taxes;
  const nights = Math.ceil(
    (new Date(returnDate).getTime() - new Date(departureDate).getTime()) / 86400000
  );

  const handleContinue = () => {
    navigate('/booking/passengers', {
      state: {
        holiday,
        room,
        passengers,
        departureDate,
        returnDate,
        totalPrice,
      },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="space-y-6"
    >
      <div className="relative overflow-hidden rounded-lg shadow-lg">
        <img
          src={holiday.image}
          alt={holiday.name}
          className="h-64 w-full object-cover sm:h-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="success" className="bg-emerald-500 text-white border-0 font-semibold">
              {holiday.starRating} Star {holiday.propertyType}
            </Badge>
            {holiday.flightIncluded && (
              <Badge className="bg-white/20 text-white border-0 backdrop-blur-md font-semibold">
                <Plane className="mr-1.5 h-3.5 w-3.5" /> Flights Included
              </Badge>
            )}
          </div>
          <h2 className="font-heading text-3xl font-bold text-white tracking-tight">
            {holiday.name}
          </h2>
          <div className="mt-2 flex items-center gap-4 text-sm text-white/80">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              {holiday.destination}, {holiday.country}
            </span>
            <span className="flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              {holiday.rating}
            </span>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {[
          { icon: MapPin, label: 'Destination', value: `${holiday.destination}, ${holiday.country}`, sub: null },
          { icon: Calendar, label: 'Dates', value: `${formatDate(departureDate)} – ${formatDate(returnDate)}`, sub: `${nights} nights` },
          { icon: Building2, label: 'Room & Board', value: room.name, sub: holiday.boardType },
          { icon: Users, label: 'Passengers', value: `${passengers} ${passengers === 1 ? 'person' : 'people'}`, sub: null },
        ].map((item) => (
          <Card key={item.label} className="border-[#e9e3da] rounded-lg bg-white">
            <CardContent className="flex items-center gap-4 p-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#ffd4e4]">
                <item.icon className="h-5 w-5 text-[#ff467c]" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#818085] uppercase tracking-widest">{item.label}</p>
                <p className="font-bold text-[#002f17] mt-0.5">{item.value}</p>
                {item.sub && <p className="text-xs text-[#555] mt-0.5">{item.sub}</p>}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {holiday.flightIncluded && holiday.flightDetails && (
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
            <div>
              <p className="text-xs font-bold text-[#818085] uppercase tracking-widest mb-3">Outbound</p>
              <div className="flex items-center justify-between">
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#002f17]">{holiday.flightDetails.departure.time}</p>
                  <p className="text-sm font-semibold text-[#555] mt-0.5">{holiday.flightDetails.departure.code}</p>
                  <p className="text-[11px] text-[#818085] mt-0.5">{holiday.flightDetails.departure.airport}</p>
                </div>
                <div className="flex-1 mx-5">
                  <div className="border-t-2 border-dashed border-[#e9e3da] relative">
                    <Plane className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-5 w-5 text-[#ff467c] bg-white px-1" />
                  </div>
                  <div className="flex items-center justify-center gap-1.5 mt-2">
                    <Clock className="h-3.5 w-3.5 text-[#818085]" />
                    <span className="text-xs font-medium text-[#555]">{holiday.flightDetails.duration}</span>
                    <span className="text-xs text-[#818085]">
                      · {holiday.flightDetails.stops === 0 ? 'Direct' : `${holiday.flightDetails.stops} stop(s)`}
                    </span>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#002f17]">{holiday.flightDetails.arrival.time}</p>
                  <p className="text-sm font-semibold text-[#555] mt-0.5">{holiday.flightDetails.arrival.code}</p>
                  <p className="text-[11px] text-[#818085] mt-0.5">{holiday.flightDetails.arrival.airport}</p>
                </div>
              </div>
              <p className="text-center text-xs text-[#818085] mt-3 font-medium">
                {holiday.flightDetails.airline} · {holiday.flightDetails.flightNumber}
              </p>
            </div>
            {holiday.flightDetails.returnFlight && (
              <div className="border-t border-[#e9e3da] pt-5">
                <p className="text-xs font-bold text-[#818085] uppercase tracking-widest mb-3">Return</p>
                <div className="flex items-center justify-between">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-[#002f17]">{holiday.flightDetails.returnFlight.departure.time}</p>
                    <p className="text-sm font-semibold text-[#555] mt-0.5">{holiday.flightDetails.returnFlight.departure.code}</p>
                  </div>
                  <div className="flex-1 mx-5">
                    <div className="border-t-2 border-dashed border-[#e9e3da] relative">
                      <Plane className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-5 w-5 text-[#ff467c] rotate-180 bg-white px-1" />
                    </div>
                    <p className="text-center text-xs text-[#555] mt-2 font-medium">{holiday.flightDetails.returnFlight.duration}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-[#002f17]">{holiday.flightDetails.returnFlight.arrival.time}</p>
                    <p className="text-sm font-semibold text-[#555] mt-0.5">{holiday.flightDetails.returnFlight.arrival.code}</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <Card className="border-[#e9e3da] bg-white">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-bold text-[#002f17]">Price Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-[#555]">
              Accommodation ({passengers} × {formatPrice(room.pricePerPerson)})
            </span>
            <span className="font-semibold text-[#002f17]">{formatPrice(accommodationTotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[#555]">Taxes & fees</span>
            <span className="font-semibold text-[#002f17]">{formatPrice(taxes)}</span>
          </div>
          <div className="border-t border-[#e9e3da] pt-4">
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-[#002f17]">Total Price</span>
              <div className="text-right">
                <p className="text-3xl font-bold text-[#ff467c]">{formatPrice(totalPrice)}</p>
                <p className="text-xs text-[#555] font-medium mt-0.5">
                  {formatPrice(totalPerPerson)} per person
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <button
        onClick={handleContinue}
        className="group flex w-full items-center justify-center gap-2 rounded-lg bg-[#ff467c] px-6 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-[#e63d6e] shadow-md hover:shadow-lg"
      >
        Continue to Passenger Details
        <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        <span className="ml-1 inline-block w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[8px] border-l-white" />
      </button>

      <div className="flex items-center justify-center gap-2 rounded-lg bg-[#faf5ed] border border-[#e9e3da] p-4">
        <Shield className="h-4 w-4 text-[#002f17] shrink-0" />
        <p className="text-xs text-[#555] font-medium">
          By continuing, you agree to our Terms &amp; Conditions and Privacy Policy.
        </p>
      </div>
    </motion.div>
  );
}
