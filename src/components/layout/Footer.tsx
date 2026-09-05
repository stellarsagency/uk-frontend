import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Globe,
  MessageCircle,
  Camera,
  Shield,
  Send,
  MapPin,
  ArrowRight,
  Phone,
  Headphones,
  Award,
  Plane,
  Sun,
  Palmtree,
  Anchor,
  Mountain,
  Building2,
} from 'lucide-react';

const destinationImages = [
  { label: 'Tenerife', image: 'https://images.unsplash.com/photo-1578469550956-0e16b69c6a3d?w=400&h=500&fit=crop', href: '/search?destination=tenerife' },
  { label: 'Costa del Sol', image: 'https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=400&h=500&fit=crop', href: '/search?destination=costa-del-sol' },
  { label: 'Lanzarote', image: 'https://images.unsplash.com/photo-1580239591895-4268bfc24a26?w=400&h=500&fit=crop', href: '/search?destination=lanzarote' },
  { label: 'Ibiza', image: 'https://images.unsplash.com/photo-1563501991-5b0c81b1aab2?w=400&h=500&fit=crop', href: '/search?destination=ibiza' },
  { label: 'Crete', image: 'https://images.unsplash.com/photo-1555990793-da11153a5364?w=400&h=500&fit=crop', href: '/search?destination=crete' },
  { label: 'Rhodes', image: 'https://images.unsplash.com/photo-1504512485720-7d83a16ee930?w=400&h=500&fit=crop', href: '/search?destination=rhodes' },
  { label: 'Corfu', image: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=400&h=500&fit=crop', href: '/search?destination=corfu' },
  { label: 'Majorca', image: 'https://images.unsplash.com/photo-1583946099379-f9c4c8b1aec0?w=400&h=500&fit=crop', href: '/search?destination=majorca' },
  { label: 'Barcelona', image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400&h=500&fit=crop', href: '/search?destination=barcelona' },
  { label: 'Antalya', image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&h=500&fit=crop', href: '/search?destination=antalya' },
  { label: 'Dubai', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=500&fit=crop', href: '/search?destination=dubai' },
  { label: 'Mexico', image: 'https://images.unsplash.com/photo-1518638150340-f706e86654de?w=400&h=500&fit=crop', href: '/search?destination=mexico' },
];

const holidayTypeImages = [
  { label: 'All Inclusive', image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400&h=260&fit=crop', href: '/search?filter=all-inclusive' },
  { label: 'Beach', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=260&fit=crop', href: '/search?filter=beach' },
  { label: 'Luxury', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=260&fit=crop', href: '/search?filter=luxury' },
  { label: 'Family', image: 'https://images.unsplash.com/photo-1540479859555-17af45c78602?w=400&h=260&fit=crop', href: '/search?filter=family' },
];

const holidayTypes = [
  { label: 'All Inclusive Holidays', href: '/search?filter=all-inclusive' },
  { label: 'Last Minute Holidays', href: '/search?filter=last-minute' },
  { label: 'Summer Holidays', href: '/search?tab=summer' },
  { label: 'Family Holidays', href: '/search?filter=family' },
  { label: 'Adults Only Holidays', href: '/search?filter=adults-only' },
  { label: 'Beach Holidays', href: '/search?filter=beach' },
  { label: 'Cheap Holidays', href: '/search?filter=cheap' },
  { label: 'Luxury Holidays', href: '/search?filter=luxury' },
  { label: 'Villa Holidays', href: '/search?filter=villa' },
  { label: 'Long Haul Holidays', href: '/search?filter=long-haul' },
  { label: 'Honeymoon Holidays', href: '/search?filter=honeymoon' },
  { label: 'Solo Holidays', href: '/search?filter=solo' },
  { label: 'City Breaks', href: '/search?tab=city-breaks' },
];

const popularDestinations = [
  { label: 'Tenerife Holidays', href: '/search?destination=tenerife' },
  { label: 'Costa del Sol Holidays', href: '/search?destination=costa-del-sol' },
  { label: 'Lanzarote Holidays', href: '/search?destination=lanzarote' },
  { label: 'Ibiza Holidays', href: '/search?destination=ibiza' },
  { label: 'Crete Holidays', href: '/search?destination=crete' },
  { label: 'Rhodes Holidays', href: '/search?destination=rhodes' },
  { label: 'Corfu Holidays', href: '/search?destination=corfu' },
  { label: 'Majorca Holidays', href: '/search?destination=majorca' },
  { label: 'Barcelona Holidays', href: '/search?destination=barcelona' },
  { label: 'Antalya Holidays', href: '/search?destination=antalya' },
  { label: 'Dalaman Holidays', href: '/search?destination=dalaman' },
  { label: 'Dubai Holidays', href: '/search?destination=dubai' },
];

const shortHaul = [
  { label: 'Spain Holidays', href: '/search?destination=spain' },
  { label: 'Portugal Holidays', href: '/search?destination=portugal' },
  { label: 'Greece Holidays', href: '/search?destination=greece' },
  { label: 'Turkey Holidays', href: '/search?destination=turkey' },
  { label: 'Italy Holidays', href: '/search?destination=italy' },
  { label: 'France Holidays', href: '/search?destination=france' },
  { label: 'Croatia Holidays', href: '/search?destination=croatia' },
  { label: 'Cyprus Holidays', href: '/search?destination=cyprus' },
  { label: 'Malta Holidays', href: '/search?destination=malta' },
  { label: 'Morocco Holidays', href: '/search?destination=morocco' },
];

const longHaul = [
  { label: 'Mexico Holidays', href: '/search?destination=mexico' },
  { label: 'Dominican Republic Holidays', href: '/search?destination=dominican-republic' },
  { label: 'Jamaica Holidays', href: '/search?destination=jamaica' },
  { label: 'Thailand Holidays', href: '/search?destination=thailand' },
  { label: 'Sri Lanka Holidays', href: '/search?destination=sri-lanka' },
  { label: 'Maldives Holidays', href: '/search?destination=maldives' },
  { label: 'Zanzibar Holidays', href: '/search?destination=zanzibar' },
  { label: 'Egypt Holidays', href: '/search?destination=egypt' },
  { label: 'Cape Verde Holidays', href: '/search?destination=cape-verde' },
  { label: 'Bali Holidays', href: '/search?destination=bali' },
];

const footerColumns = [
  { title: 'Holiday Types', links: holidayTypes },
  { title: 'Popular Destinations', links: popularDestinations },
  { title: 'Short Haul', links: shortHaul },
  { title: 'Long Haul', links: longHaul },
];

const legalLinks = [
  { label: 'Terms & Conditions', href: '/terms' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Cookie Policy', href: '/cookie-policy' },
  { label: 'Cancellation Policy', href: '/cancellation-policy' },
  { label: 'Accessibility', href: '/accessibility' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [lgrOpen, setLgrOpen] = useState(false);

  return (
    <footer className="relative">
      {/* Destination Image Cards */}
      <div className="bg-[#faf5ed] py-10">
        <div className="max-w-[1215px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-6">
            <div>
              <h3
                className="text-xl font-bold text-[#002f17] mb-1"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Explore our most popular destinations
              </h3>
              <p className="text-[13px] text-[#555]" style={{ lineHeight: '1.618' }}>
                Sun-soaked beaches, vibrant cities, and unforgettable escapes
              </p>
            </div>
            <Link
              to="/search"
              className="hidden md:flex items-center gap-1.5 text-[12px] font-semibold text-[#ff467c] hover:text-[#e63d6f] transition-colors"
            >
              View all destinations
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {destinationImages.map((dest) => (
              <Link
                key={dest.label}
                to={dest.href}
                className="group relative overflow-hidden rounded-xl aspect-[3/4] block"
              >
                <img
                  src={dest.image}
                  alt={`${dest.label} holidays`}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <span
                    className="text-white text-sm font-bold block"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {dest.label}
                  </span>
                  <span className="text-white/60 text-[11px]">
                    View holidays →
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <Link
            to="/search"
            className="md:hidden flex items-center justify-center gap-1.5 mt-4 text-[12px] font-semibold text-[#ff467c] hover:text-[#e63d6f] transition-colors"
          >
            View all destinations
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Holiday Type Cards */}
      <div className="bg-white py-10 border-t border-[#e9e3da]">
        <div className="max-w-[1215px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-6">
            <div>
              <h3
                className="text-xl font-bold text-[#002f17] mb-1"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Browse by holiday type
              </h3>
              <p className="text-[13px] text-[#555]" style={{ lineHeight: '1.618' }}>
                Find your perfect getaway, whatever your style
              </p>
            </div>
            <Link
              to="/search"
              className="hidden md:flex items-center gap-1.5 text-[12px] font-semibold text-[#ff467c] hover:text-[#e63d6f] transition-colors"
            >
              View all types
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {holidayTypeImages.map((type) => (
              <Link
                key={type.label}
                to={type.href}
                className="group relative overflow-hidden rounded-xl aspect-[3/2] block"
              >
                <img
                  src={type.image}
                  alt={`${type.label} holidays`}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span
                    className="text-white text-base font-bold block"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {type.label}
                  </span>
                  <span className="text-white/60 text-[12px]">
                    Explore →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer — Dark Green */}
      <div style={{ background: '#002f17' }}>
        <div className="max-w-[1215px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
          {/* Logo + Newsletter Row */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-12 pb-10 border-b border-white/10">
            <div>
              <Link to="/" className="inline-flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-[#ff467c] flex items-center justify-center">
                  <Plane className="w-4 h-4 text-white" />
                </div>
                <span
                  className="text-2xl font-bold text-white"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  FirstChoice
                </span>
              </Link>
              <p className="text-[13px] text-white/50 max-w-md" style={{ lineHeight: '1.618' }}>
                Your perfect holiday starts here. ATOL & ABTA protected holidays to over 100 destinations worldwide.
              </p>
            </div>

            <div className="w-full lg:w-auto">
              <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-2.5">
                Stay in the loop
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 lg:w-[300px] px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-[13px] text-white placeholder:text-white/30 focus:outline-none focus:border-[#ff467c] transition-all"
                />
                <button className="px-5 py-3 rounded-lg bg-[#ff467c] text-white text-[13px] font-bold flex items-center gap-2 hover:bg-[#e63d6f] transition-all">
                  <Send className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Subscribe</span>
                </button>
              </div>
            </div>
          </div>

          {/* 4 Columns */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10 mb-12">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h3 className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-4">
                  {column.title}
                </h3>
                <ul className="space-y-2">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        to={link.href}
                        className="text-[13px] text-white/50 hover:text-white transition-colors duration-200 inline-flex items-center gap-1 group/link"
                        style={{ lineHeight: '1.618' }}
                      >
                        {link.label}
                        <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-200" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Trust Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 pb-10 border-b border-white/10">
            {[
              { icon: <Shield className="w-5 h-5" />, title: 'ATOL Protected', text: 'Book with confidence' },
              { icon: <Award className="w-5 h-5" />, title: 'ABTA Member', text: 'Financially protected' },
              { icon: <Headphones className="w-5 h-5" />, title: '24/7 Support', text: 'We\'re always here' },
              { icon: <Phone className="w-5 h-5" />, title: 'Free Calls', text: '0203 451 2690' },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]"
              >
                <div className="w-10 h-10 rounded-lg bg-[#ff467c]/10 flex items-center justify-center text-[#ff467c] shrink-0">
                  {item.icon}
                </div>
                <div>
                  <span className="block text-[12px] font-bold text-white/70">{item.title}</span>
                  <span className="block text-[11px] text-white/35">{item.text}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Know Before You Go — Expandable */}
          <div className="border-b border-white/10 pb-6 mb-6">
            <button
              onClick={() => setLgrOpen(!lgrOpen)}
              className="flex items-center justify-between w-full text-left group"
            >
              <h4 className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] group-hover:text-white/50 transition-colors">
                Know Before You Go
              </h4>
              <svg
                className={`w-4 h-4 text-white/30 transition-transform duration-300 ${lgrOpen ? 'rotate-180' : 'rotate-0'}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${lgrOpen ? 'max-h-40 mt-3' : 'max-h-0'}`}
            >
              <p className="text-[13px] text-white/40" style={{ lineHeight: '1.618' }}>
                We strongly recommend that you check the latest travel advice from the FCDO (Foreign, Commonwealth & Development Office) for your destination before you travel. Visit{' '}
                <a
                  href="https://www.gov.uk/foreign-travel-advice"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#ff467c] hover:underline"
                >
                  www.gov.uk/foreign-travel-advice
                </a>{' '}
                for the most up-to-date information.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar — Darkest Green */}
      <div style={{ background: '#001a0d' }}>
        <div className="max-w-[1215px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-6 pb-6 border-b border-white/5">
            {/* Payment Methods */}
            <div className="flex flex-col gap-2">
              <p className="text-[10px] font-bold text-white/25 uppercase tracking-[0.2em]">
                Payment methods
              </p>
              <div className="flex items-center gap-1.5">
                <div className="px-2.5 py-1.5 bg-white/5 border border-white/8 rounded">
                  <svg className="w-8 h-5" viewBox="0 0 48 32" fill="none">
                    <rect width="48" height="32" rx="3" fill="#1A1F71" />
                    <text x="24" y="20" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold" fontFamily="Arial">VISA</text>
                  </svg>
                </div>
                <div className="px-2.5 py-1.5 bg-white/5 border border-white/8 rounded">
                  <svg className="w-8 h-5" viewBox="0 0 48 32" fill="none">
                    <rect width="48" height="32" rx="3" fill="#252525" />
                    <circle cx="19" cy="16" r="8" fill="#EB001B" />
                    <circle cx="29" cy="16" r="8" fill="#F79E1B" />
                    <path d="M24 10.5a8 8 0 010 11" fill="#FF5F00" />
                  </svg>
                </div>
                <div className="px-2.5 py-1.5 bg-white/5 border border-white/8 rounded">
                  <svg className="w-8 h-5" viewBox="0 0 48 32" fill="none">
                    <rect width="48" height="32" rx="3" fill="#003087" />
                    <text x="24" y="20" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold" fontFamily="Arial">PayPal</text>
                  </svg>
                </div>
                <div className="px-2.5 py-1.5 bg-white/5 border border-white/8 rounded">
                  <svg className="w-8 h-5" viewBox="0 0 48 32" fill="none">
                    <rect width="48" height="32" rx="3" fill="#006FCF" />
                    <text x="24" y="20" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold" fontFamily="Arial">AMEX</text>
                  </svg>
                </div>
              </div>
            </div>

            {/* ATOL & ABTA */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/8 rounded">
                <Shield className="w-3 h-3 text-[#ff467c]" />
                <span className="text-[11px] font-bold text-white/60">ATOL</span>
                <span className="text-[10px] text-white/30">2524</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/8 rounded">
                <Shield className="w-3 h-3 text-[#ff467c]" />
                <span className="text-[11px] font-bold text-white/60">ABTA</span>
                <span className="text-[10px] text-white/30">V5126</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/8 rounded">
                <MapPin className="w-3 h-3 text-white/40" />
                <span className="text-[11px] font-bold text-white/60">Travel Aware</span>
              </div>
            </div>

            {/* Social */}
            <div className="flex flex-col gap-2">
              <p className="text-[10px] font-bold text-white/25 uppercase tracking-[0.2em]">
                Follow us
              </p>
              <div className="flex items-center gap-1.5">
                {[
                  { icon: <Globe className="w-3.5 h-3.5" />, label: 'Website', href: 'https://www.tui.co.uk' },
                  { icon: <MessageCircle className="w-3.5 h-3.5" />, label: 'Facebook', href: 'https://www.facebook.com/Firstchoiceholidays' },
                  { icon: <Camera className="w-3.5 h-3.5" />, label: 'Instagram', href: 'https://www.instagram.com/firstchoiceholidays' },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 border border-white/8 text-white/40 hover:bg-[#ff467c] hover:text-white hover:border-transparent transition-all duration-200"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-center sm:text-left">
              <p className="text-[11px] text-white/25 mb-0.5" style={{ lineHeight: '1.618' }}>
                We're part of TUI group — registered address: Wigmore House, Wigmore Lane, Luton, Bedfordshire, United Kingdom, LU2 9TN.
              </p>
              <p className="text-[11px] text-white/15">
                &copy; {new Date().getFullYear()} First Choice. All rights reserved. ATOL 2524, ABTA V5126.
              </p>
            </div>
            <div className="flex items-center gap-3 flex-wrap justify-center">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-[10px] text-white/20 hover:text-white/40 transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
