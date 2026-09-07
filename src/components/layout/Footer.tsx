import { Link } from 'react-router-dom';

const destinations = [
  { name: 'Tenerife', image: 'https://images.unsplash.com/photo-1578469550956-0e16b69c6a3d?w=400&h=500&fit=crop' },
  { name: 'Turkey', image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=400&h=500&fit=crop' },
  { name: 'Rhodes', image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&h=500&fit=crop' },
  { name: 'Crete', image: 'https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?w=400&h=500&fit=crop' },
  { name: 'Majorca', image: 'https://images.unsplash.com/photo-1583946099379-f9c4d0a43d8e?w=400&h=500&fit=crop' },
  { name: 'Zante', image: 'https://images.unsplash.com/photo-1504512485720-7d83a16ee930?w=400&h=500&fit=crop' },
];

const holidayTypes = [
  { name: 'Beach', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=500&fit=crop' },
  { name: 'All Inclusive', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=500&fit=crop' },
  { name: 'Family', image: 'https://images.unsplash.com/photo-1494783367193-149034c05e8f?w=400&h=500&fit=crop' },
  { name: 'Luxury', image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=500&fit=crop' },
];

const footerLinks = {
  'Holidays': ['All Inclusive', 'Beach Holidays', 'Family Holidays', 'Adults Only', 'Last Minute', 'Summer 2026'],
  'Destinations': ['Turkey', 'Spain', 'Greece', 'Portugal', 'Tenerife', 'Cyprus'],
  'Help & Support': ['Contact Us', 'FAQs', 'Travel Insurance', 'Manage Booking', 'ABTA', 'ATOL Protection'],
  'About Us': ['About First Choice', 'Careers', 'Press', 'Sustainability', 'Accessibility'],
};

const socialLinks = [
  { name: 'Facebook', url: 'https://facebook.com/Firstchoiceholidays' },
  { name: 'Twitter', url: 'https://twitter.com/Firstchoiceuk' },
  { name: 'Instagram', url: 'https://instagram.com/firstchoiceholidays' },
  { name: 'YouTube', url: 'https://youtube.com/FirstChoiceHolidays' },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#e9e3da]">
      {/* Trust Bar */}
      <div className="border-b border-[#e9e3da]">
        <div className="max-w-[1215px] mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-[#002f17] flex items-center justify-center">
                <span className="text-white text-[10px] font-bold">ATOL</span>
              </div>
              <span className="text-[12px] text-[#002f17]/60">ATOL Protected</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-[#002f17] flex items-center justify-center">
                <span className="text-white text-[10px] font-bold">ABTA</span>
              </div>
              <span className="text-[12px] text-[#002f17]/60">ABTA Member</span>
            </div>
          </div>
          <p className="text-[12px] text-[#002f17]/60">
            Fee-free £30pp deposits. T&Cs apply.
          </p>
        </div>
      </div>

      {/* Destination Images */}
      <div className="border-b border-[#e9e3da]">
        <div className="max-w-[1215px] mx-auto px-6 py-6">
          <p className="text-[10px] font-bold text-[#002f17]/40 uppercase tracking-[0.2em] mb-4">Popular Destinations</p>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {destinations.map((dest) => (
              <Link
                key={dest.name}
                to={`/search?destination=${dest.name}`}
                className="group relative aspect-[4/5] rounded-xl overflow-hidden"
              >
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute bottom-3 left-3 text-white text-[13px] font-bold">{dest.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Holiday Types */}
      <div className="border-b border-[#e9e3da]">
        <div className="max-w-[1215px] mx-auto px-6 py-6">
          <p className="text-[10px] font-bold text-[#002f17]/40 uppercase tracking-[0.2em] mb-4">Holiday Types</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {holidayTypes.map((type) => (
              <Link
                key={type.name}
                to={`/search?filter=${type.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="group relative aspect-[4/3] rounded-xl overflow-hidden"
              >
                <img
                  src={type.image}
                  alt={type.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute bottom-3 left-3 text-white text-[14px] font-bold">{type.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="max-w-[1215px] mx-auto px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-[11px] font-bold text-[#002f17] uppercase tracking-[0.15em] mb-4">{category}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-[13px] text-[#002f17]/60 hover:text-[#ff467c] transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Methods */}
      <div className="border-t border-[#e9e3da]">
        <div className="max-w-[1215px] mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {['Visa', 'Mastercard', 'Amex', 'PayPal'].map((method) => (
              <div key={method} className="px-3 py-1.5 bg-[#faf5ed] rounded text-[11px] font-bold text-[#002f17]/60">
                {method}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] text-[#002f17]/60 hover:text-[#ff467c] transition-colors"
              >
                {social.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-[#e9e3da]">
        <div className="max-w-[1215px] mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-[12px] text-[#002f17]/40">
            © 2026 First Choice Holidays. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-[12px] text-[#002f17]/40 hover:text-[#ff467c]">Privacy Policy</a>
            <a href="#" className="text-[12px] text-[#002f17]/40 hover:text-[#ff467c]">Cookie Policy</a>
            <a href="#" className="text-[12px] text-[#002f17]/40 hover:text-[#ff467c]">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
