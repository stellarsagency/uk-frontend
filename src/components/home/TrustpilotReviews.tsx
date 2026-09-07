import { Star } from 'lucide-react';

const reviews = [
  {
    name: 'Sarah M.',
    rating: 5,
    text: 'Absolutely amazing holiday! The hotel was exactly as described and the whole experience was seamless from start to finish.',
    date: '2 days ago',
  },
  {
    name: 'James T.',
    rating: 5,
    text: 'Great value for money. The all-inclusive package exceeded our expectations. Will definitely book again!',
    date: '1 week ago',
  },
  {
    name: 'Emma L.',
    rating: 5,
    text: 'Best family holiday we have ever had. The kids loved the pool and the staff were incredibly friendly.',
    date: '3 days ago',
  },
];

export default function TrustpilotReviews() {
  return (
    <section className="bg-white py-10 border-t border-[#e9e3da]">
      <div className="max-w-[992px] mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-xl md:text-2xl font-black text-[#002f17] mb-2" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Get a second opinion
          </h2>
          <p className="text-[13px] text-[#002f17]/60">
            Check out what some of our customers had to say about us...
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <div key={i} className="bg-[#faf5ed] rounded-xl p-6">
              <div className="flex items-center gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${star <= review.rating ? 'text-[#00b67a] fill-[#00b67a]' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <p className="text-[13px] text-[#002f17]/70 mb-4 leading-[1.618]">
                "{review.text}"
              </p>
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-bold text-[#002f17]">{review.name}</span>
                <span className="text-[11px] text-[#002f17]/40">{review.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
