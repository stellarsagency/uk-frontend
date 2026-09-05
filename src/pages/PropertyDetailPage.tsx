import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Star, Clock, Plane, Shield, Check, ChevronLeft } from 'lucide-react';
import { allHolidays } from '@/data/mockData';
import { cn, formatPrice, getRatingLabel } from '@/lib/utils';
import { HotelGallery } from '@/components/property/HotelGallery';
import { QuickInfoBar } from '@/components/property/QuickInfoBar';
import { AmenitiesGrid } from '@/components/property/AmenitiesGrid';
import { RoomTypeCard } from '@/components/property/RoomTypeCard';
import { ReviewsSection } from '@/components/property/ReviewsSection';
import { SimilarProperties } from '@/components/property/SimilarProperties';
import { StickyBookButton } from '@/components/property/StickyBookButton';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { Skeleton } from '@/components/ui/Skeleton';
import type { RoomType } from '@/types';

export default function PropertyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedRoom, setSelectedRoom] = useState<RoomType | null>(null);

  const holiday = allHolidays.find((h) => h.id === id);

  if (!holiday) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-[#faf5ed] py-20 text-center"
      >
        <div className="mx-auto max-w-md">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-lg bg-[#e9e3da]">
            <Skeleton className="h-10 w-10 rounded" />
          </div>
          <h1 className="text-2xl font-bold text-[#002f17]">Holiday not found</h1>
          <p className="mt-3 text-[#555] leading-relaxed">
            The holiday you are looking for does not exist or has been removed.
          </p>
          <button
            className="mt-8 inline-flex items-center gap-2 rounded bg-[#ff467c] px-8 py-3.5 text-base font-bold text-white transition-all duration-200 hover:bg-[#e63d6f]"
            onClick={() => navigate('/search')}
          >
            Browse holidays
            <span className="inline-block w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[6px] border-l-white" />
          </button>
        </div>
      </motion.div>
    );
  }

  const handleSelectRoom = (room: RoomType) => {
    setSelectedRoom(room);
  };

  const handleBookNow = () => {
    if (selectedRoom) {
      navigate('/booking/review', {
        state: {
          holiday,
          room: selectedRoom,
          passengers: 2,
          departureDate: new Date().toISOString().split('T')[0],
          returnDate: new Date(Date.now() + holiday.duration * 24 * 60 * 60 * 1000)
            .toISOString()
            .split('T')[0],
        },
      });
    }
  };

  const discount = holiday.originalPrice
    ? Math.round(((holiday.originalPrice - holiday.price) / holiday.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-[#faf5ed] pb-28 md:pb-10"
    >
      <div className="mx-auto max-w-7xl px-4 pt-5 md:px-6">
        <button
          onClick={() => navigate(-1)}
          className="group mb-4 inline-flex items-center gap-2 rounded border border-[#e9e3da] bg-white px-4 py-2.5 text-sm font-semibold text-[#555] shadow-sm transition-all duration-200 hover:border-[#ff467c] hover:text-[#ff467c]"
        >
          <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          Back to search
        </button>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-6 md:px-6">
        <HotelGallery images={holiday.images} mainImage={holiday.image} />
      </div>

      <QuickInfoBar holiday={holiday} onBook={handleBookNow} />

      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="mb-8 w-full justify-start rounded-lg bg-[#e9e3da]/50 p-1.5">
                <TabsTrigger value="overview" className="rounded px-6 py-2.5">Overview</TabsTrigger>
                <TabsTrigger value="rooms" className="rounded px-6 py-2.5">Rooms</TabsTrigger>
                <TabsTrigger value="location" className="rounded px-6 py-2.5">Location</TabsTrigger>
                <TabsTrigger value="reviews" className="rounded px-6 py-2.5">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <div className="space-y-10">
                  <div>
                    <h2 className="mb-4 text-2xl font-bold text-[#002f17]">About this property</h2>
                    <p className="text-[#555] leading-relaxed">{holiday.description}</p>
                  </div>

                  <div>
                    <h3 className="mb-4 text-xl font-bold text-[#002f17]">Highlights</h3>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {holiday.highlights.map((highlight) => (
                        <div
                          key={highlight}
                          className="group flex items-center gap-3.5 rounded-lg border border-[#e9e3da] bg-white p-4 transition-all duration-200 hover:border-[#ff467c]/20 hover:shadow-sm"
                        >
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded bg-[#ff467c]/10 transition-colors group-hover:bg-[#ff467c]/20">
                            <Check className="h-4.5 w-4.5 text-[#ff467c]" />
                          </div>
                          <span className="text-sm font-medium text-[#555]">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-4 text-xl font-bold text-[#002f17]">Amenities</h3>
                    <AmenitiesGrid amenities={holiday.amenities} />
                  </div>

                  <div>
                    <h3 className="mb-4 text-xl font-bold text-[#002f17]">Policies</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="rounded-lg border border-[#e9e3da] bg-white p-5 shadow-sm">
                        <div className="flex items-center gap-4">
                          <div className="flex h-11 w-11 items-center justify-center rounded bg-[#ff467c]/10">
                            <Clock className="h-5 w-5 text-[#ff467c]" />
                          </div>
                          <div>
                            <p className="text-xs font-medium text-[#818085] uppercase tracking-wider">Check-in / Check-out</p>
                            <p className="mt-0.5 font-bold text-[#002f17]">
                              {holiday.policies.checkIn} / {holiday.policies.checkOut}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-lg border border-[#e9e3da] bg-white p-5 shadow-sm">
                        <div className="flex items-center gap-4">
                          <div className="flex h-11 w-11 items-center justify-center rounded bg-[#002f17]/10">
                            <Shield className="h-5 w-5 text-[#002f17]" />
                          </div>
                          <div>
                            <p className="text-xs font-medium text-[#818085] uppercase tracking-wider">Cancellation</p>
                            <p className="mt-0.5 font-bold text-[#002f17]">{holiday.policies.cancellation}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-[#818085]">{holiday.policies.children}</p>
                  </div>

                  {holiday.flightIncluded && holiday.flightDetails && (
                    <div>
                      <h3 className="mb-4 text-xl font-bold text-[#002f17]">Flight details</h3>
                      <div className="rounded-lg border border-[#e9e3da] bg-white p-6 shadow-sm">
                        <div className="space-y-5">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-bold text-[#002f17]">{holiday.flightDetails.airline}</p>
                              <p className="text-sm text-[#818085]">{holiday.flightDetails.flightNumber}</p>
                            </div>
                            <span className="inline-flex items-center rounded bg-[#faf5ed] px-3.5 py-1.5 text-xs font-semibold text-[#002f17]">
                              {holiday.flightDetails.duration}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-sm">
                            <div className="text-center">
                              <p className="text-xl font-bold text-[#002f17]">{holiday.flightDetails.departure.time}</p>
                              <p className="text-sm font-medium text-[#818085]">{holiday.flightDetails.departure.code}</p>
                            </div>
                            <div className="flex flex-1 items-center">
                              <div className="h-px flex-1 border-t border-dashed border-[#e9e3da]" />
                              <Plane className="mx-3 h-5 w-5 text-[#818085]" />
                              <div className="h-px flex-1 border-t border-dashed border-[#e9e3da]" />
                            </div>
                            <div className="text-center">
                              <p className="text-xl font-bold text-[#002f17]">{holiday.flightDetails.arrival.time}</p>
                              <p className="text-sm font-medium text-[#818085]">{holiday.flightDetails.arrival.code}</p>
                            </div>
                          </div>
                          {holiday.flightDetails.returnFlight && (
                            <div className="border-t border-[#e9e3da] pt-5">
                              <p className="mb-3 text-xs font-semibold text-[#818085] uppercase tracking-wider">Return flight</p>
                              <div className="flex items-center gap-4 text-sm">
                                <div className="text-center">
                                  <p className="text-xl font-bold text-[#002f17]">{holiday.flightDetails.returnFlight.departure.time}</p>
                                  <p className="text-sm font-medium text-[#818085]">{holiday.flightDetails.returnFlight.departure.code}</p>
                                </div>
                                <div className="flex flex-1 items-center">
                                  <div className="h-px flex-1 border-t border-dashed border-[#e9e3da]" />
                                  <Plane className="mx-3 h-5 w-5 rotate-180 text-[#818085]" />
                                  <div className="h-px flex-1 border-t border-dashed border-[#e9e3da]" />
                                </div>
                                <div className="text-center">
                                  <p className="text-xl font-bold text-[#002f17]">{holiday.flightDetails.returnFlight.arrival.time}</p>
                                  <p className="text-sm font-medium text-[#818085]">{holiday.flightDetails.returnFlight.arrival.code}</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="rooms">
                <div className="space-y-5">
                  <h2 className="text-2xl font-bold text-[#002f17]">Available rooms</h2>
                  {holiday.roomTypes.map((room) => (
                    <RoomTypeCard
                      key={room.id}
                      room={room}
                      onSelect={handleSelectRoom}
                      selected={selectedRoom?.id === room.id}
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="location">
                <div className="space-y-5">
                  <h2 className="text-2xl font-bold text-[#002f17]">Location</h2>
                  <div className="rounded-lg border border-[#e9e3da] bg-white p-6 shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded bg-[#ff467c]/10">
                        <MapPin className="h-5 w-5 text-[#ff467c]" />
                      </div>
                      <div>
                        <p className="font-bold text-[#002f17]">{holiday.location.address}</p>
                        <p className="mt-1 text-sm text-[#818085]">
                          {holiday.location.city}, {holiday.location.postcode}
                        </p>
                        <p className="text-sm text-[#818085]">{holiday.country}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex h-72 items-center justify-center overflow-hidden rounded-lg border border-dashed border-[#e9e3da] bg-white">
                    <div className="text-center">
                      <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-lg bg-[#faf5ed]">
                        <MapPin className="h-7 w-7 text-[#818085]" />
                      </div>
                      <p className="text-sm font-semibold text-[#555]">Interactive map</p>
                      <p className="mt-1 text-xs text-[#818085]">
                        {holiday.location.lat.toFixed(4)}, {holiday.location.lng.toFixed(4)}
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="reviews">
                <ReviewsSection reviews={holiday.reviews} />
              </TabsContent>
            </Tabs>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-4">
              <div className="overflow-hidden rounded-lg border border-[#e9e3da] bg-white shadow-lg">
                <div className="p-6">
                  <div className="mb-4 flex items-center gap-1.5">
                    {Array.from({ length: holiday.starRating }).map((_, i) => (
                      <Star key={i} className="h-4.5 w-4.5 fill-[#ff467c] text-[#ff467c]" />
                    ))}
                    <span className="ml-1 text-sm font-semibold text-[#555]">
                      {holiday.starRating}-star {holiday.propertyType}
                    </span>
                  </div>

                  {holiday.reviewCount > 0 && (
                    <div className="mb-4 flex items-center gap-2.5">
                      <span className="flex h-9 min-w-[36px] items-center justify-center rounded bg-[#ff467c] px-2.5 text-sm font-bold text-white">
                        {holiday.rating}
                      </span>
                      <div>
                        <p className="text-sm font-bold text-[#ff467c]">
                          {getRatingLabel(holiday.rating)}
                        </p>
                        <p className="text-xs text-[#818085]">
                          {holiday.reviewCount} reviews
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="mb-4 flex flex-wrap items-center gap-2.5 text-sm text-[#555]">
                    <span className="flex items-center gap-1.5 rounded bg-[#faf5ed] px-3 py-1">
                      <Clock className="h-3.5 w-3.5 text-[#818085]" />
                      {holiday.duration} nights
                    </span>
                    <span className="rounded bg-[#faf5ed] px-3 py-1 text-xs font-medium">{holiday.boardType}</span>
                  </div>

                  {holiday.flightIncluded && (
                    <div className="mb-4 flex items-center gap-1.5 text-sm text-[#555]">
                      <Plane className="h-4 w-4 text-[#818085]" />
                      <span>Flights included</span>
                    </div>
                  )}

                  <div className="border-t border-[#e9e3da] pt-5">
                    {holiday.originalPrice && (
                      <p className="text-sm text-[#818085] line-through">
                        {formatPrice(holiday.originalPrice)} pp
                      </p>
                    )}
                    <div className="flex items-baseline gap-2.5">
                      <span className="text-4xl font-bold text-[#002f17]">
                        {formatPrice(holiday.price)}
                      </span>
                      {discount > 0 && (
                        <span className="rounded bg-[#ff467c] px-3 py-1 text-xs font-bold text-white">
                          Save {discount}%
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm font-medium text-[#818085]">per person</p>
                  </div>

                  {selectedRoom && (
                    <div className="mt-5 rounded-lg border border-[#ff467c]/10 bg-[#ff467c]/5 p-4">
                      <p className="text-sm font-bold text-[#002f17]">Selected: {selectedRoom.name}</p>
                      <p className="mt-1 text-sm text-[#555]">{formatPrice(selectedRoom.pricePerPerson)} pp</p>
                    </div>
                  )}

                  <button
                    className={cn(
                      'mt-5 flex w-full items-center justify-center gap-2 rounded py-4 text-base font-bold transition-all duration-200',
                      selectedRoom
                        ? 'bg-[#ff467c] text-white hover:bg-[#e63d6f]'
                        : 'bg-[#e9e3da] text-[#818085] cursor-not-allowed'
                    )}
                    onClick={handleBookNow}
                    disabled={!selectedRoom}
                  >
                    {selectedRoom ? (
                      <>
                        Book now
                        <span className="inline-block w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[6px] border-l-white" />
                      </>
                    ) : (
                      'Select a room'
                    )}
                  </button>

                  <p className="mt-4 text-center text-xs font-medium text-[#818085]">
                    Flexible payment options available
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>

        <section className="mt-14">
          <SimilarProperties propertyIds={holiday.similarProperties} />
        </section>
      </div>

      {selectedRoom && (
        <StickyBookButton price={selectedRoom.pricePerPerson} onBook={handleBookNow} />
      )}
    </motion.div>
  );
}
