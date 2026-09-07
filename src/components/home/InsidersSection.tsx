const insiders = [
  { handle: '@baileyturvey', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face' },
  { handle: '@lian_ireri', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face' },
  { handle: '@gracegrange', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face' },
  { handle: '@hadleyogarro', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face' },
  { handle: '@aleena_rzq', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face' },
  { handle: '@shot.byjose', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face' },
  { handle: '@owenwillis', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face' },
  { handle: '@usntheworld', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop&crop=face' },
];

export default function InsidersSection() {
  return (
    <section className="bg-[#faf5ed] py-10">
      <div className="max-w-[992px] mx-auto px-4">
        <h2 className="text-xl md:text-2xl font-black text-[#002f17] mb-2" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
          Introducing First Choice Insiders
        </h2>
        <p className="text-[13px] text-[#002f17]/60 mb-6 max-w-lg">
          We've partnered with an amazing group of travel creators to launch the First Choice Insiders programme.
        </p>
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-8 gap-4">
          {insiders.map((insider) => (
            <a
              key={insider.handle}
              href={`https://instagram.com/${insider.handle.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-2"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-3 border-white shadow-md group-hover:shadow-lg group-hover:border-[#ff467c] transition-all">
                <img
                  src={insider.image}
                  alt={insider.handle}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <span className="text-[11px] font-medium text-[#002f17]/70 group-hover:text-[#ff467c] transition-colors">
                {insider.handle}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
