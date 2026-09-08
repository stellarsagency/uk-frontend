export default function OurPicks() {
  return (
    <section className="bg-white py-10 border-t border-[#e9e3da]">
      <div className="max-w-[992px] mx-auto px-4">
        <h2 className="text-xl md:text-2xl font-black text-[#002f17] mb-3" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
          Where's hot this winter?
        </h2>
        <p className="text-[13px] text-[#002f17]/60 mb-6 max-w-lg leading-[1.618]">
          If you're a serious sun lover, check out where temperatures are set to toasty over the winter months…
        </p>
        <a href="/#/search?deals=winter" className="btn-cta inline-flex">
          <span className="label">Lock in a Winter 2026 holiday</span>
          <span className="arrow" />
        </a>
      </div>
    </section>
  );
}
