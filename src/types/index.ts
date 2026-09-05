export interface HolidayPackage {
  id: string;
  name: string;
  destination: string;
  country: string;
  region: string;
  price: number;
  originalPrice?: number;
  currency: string;
  rating: number;
  reviewCount: number;
  starRating: number;
  image: string;
  images: string[];
  description: string;
  highlights: string[];
  duration: number;
  boardType: 'Self-catering' | 'B&B' | 'Half-board' | 'Full-board' | 'All-inclusive';
  propertyType: 'Hotel' | 'Apartment' | 'Villa' | 'Resort';
  amenities: string[];
  roomTypes: RoomType[];
  flightIncluded: boolean;
  flightDetails?: FlightDetails;
  location: {
    lat: number;
    lng: number;
    address: string;
    city: string;
    postcode: string;
  };
  policies: {
    checkIn: string;
    checkOut: string;
    cancellation: string;
    children: string;
  };
  reviews: Review[];
  similarProperties: string[];
}

export interface RoomType {
  id: string;
  name: string;
  occupancy: number;
  maxOccupancy: number;
  image: string;
  features: string[];
  bedType: string;
  pricePerNight: number;
  pricePerPerson: number;
  available: boolean;
}

export interface FlightDetails {
  airline: string;
  flightNumber: string;
  departure: {
    airport: string;
    code: string;
    time: string;
  };
  arrival: {
    airport: string;
    code: string;
    time: string;
  };
  duration: string;
  stops: number;
  returnFlight?: {
    airline: string;
    flightNumber: string;
    departure: {
      airport: string;
      code: string;
      time: string;
    };
    arrival: {
      airport: string;
      code: string;
      time: string;
    };
    duration: string;
    stops: number;
  };
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  date: string;
  comment: string;
  helpful: number;
}

export interface Booking {
  id: string;
  reference: string;
  leadPassenger: Passenger;
  passengers: Passenger[];
  holidayPackage: HolidayPackage;
  roomType: RoomType;
  extras: Extra[];
  totalPrice: number;
  currency: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'amended';
  paymentStatus: 'paid' | 'unpaid' | 'refunded';
  bookedAt: string;
  departureDate: string;
  returnDate: string;
  flightDetails?: FlightDetails;
}

export interface Passenger {
  id?: string;
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  passportNumber?: string;
  specialRequirements?: string;
  isLead: boolean;
  isInfant?: boolean;
  age?: number;
}

export interface Extra {
  id: string;
  name: string;
  description: string;
  price: number;
  type: 'insurance' | 'baggage' | 'seat' | 'transfer' | 'meal' | 'other';
  selected: boolean;
}

export interface SearchFilters {
  priceRange: [number, number];
  starRating: number[];
  boardType: string[];
  airlines: string[];
  duration: string[];
  propertyType: string[];
  customerRating: number;
}

export interface SearchResult {
  holidays: HolidayPackage[];
  total: number;
  page: number;
  perPage: number;
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  image: string;
  startingPrice: number;
  description: string;
}

export interface FAQ {
  id: string;
  category: string;
  question: string;
  answer: string;
}
