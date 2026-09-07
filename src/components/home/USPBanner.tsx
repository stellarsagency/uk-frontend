import { TrendingUp, CheckCircle, CreditCard, Shield, Headphones } from 'lucide-react';

const usps = [
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: 'Insider Picks',
    description: 'Our Insiders are travelling our 180+ destinations to bring back the best local recs.',
  },
  {
    icon: <CheckCircle className="w-6 h-6" />,
    title: 'Not Your Average Package',
    description: 'Experiences, bags and transfers - you pick.',
  },
  {
    icon: <CreditCard className="w-6 h-6" />,
    title: 'Fee-Free £30pp Deposits',
    description: 'Spread the cost with low-deposit payment plans and absolutely no admin fees.*',
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Cancel for Free with Flex',
    description: 'Book with Flex to cancel for free* for whatever reason up to 14 days before you fly.',
  },
  {
    icon: <Headphones className="w-6 h-6" />,
    title: 'We Got You',
    description: 'For 30 years + 4.3 on Trustpilot + ABTA & ATOL protection + 24/7 on-trip chat.',
  },
];

export default function USPBanner() {
  return (
    <section className="bg-white py-10 border-t border-[#e9e3da]">
      <div className="max-w-[992px] mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
          {usps.map((usp) => (
            <div key={usp.title} className="text-center">
              <div className="w-14 h-14 rounded-full bg-[#faf5ed] flex items-center justify-center mx-auto mb-3 text-[#ff467c]">
                {usp.icon}
              </div>
              <h3 className="text-[11px] font-bold text-[#002f17] uppercase tracking-[0.1em] mb-1">
                {usp.title}
              </h3>
              <p className="text-[12px] text-[#002f17]/60 leading-[1.618]">
                {usp.description}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <a href="/#/why-us" className="text-[13px] font-bold text-[#ff467c] hover:underline">
            Find out more →
          </a>
        </div>
      </div>
    </section>
  );
}
