
const brands = [
  { name: "Rolls-Royce",  font: "serif",         style: { fontStyle: "italic", fontWeight: 400, letterSpacing: "0.04em" } },
  { name: "CORVETTE",     font: "sans-serif",    style: { fontWeight: 800, letterSpacing: "0.18em" } },
  { name: "Cadillac",     font: "Georgia, serif",style: { fontStyle: "italic", fontWeight: 400, fontSize: "2rem" } },
  { name: "McLaren",      font: "sans-serif",    style: { fontWeight: 900, fontStyle: "italic", letterSpacing: "0.02em" } },
  { name: "Bentley",      font: "serif",         style: { fontWeight: 700, letterSpacing: "0.12em" } },
  { name: "Mercedes-Benz",font: "sans-serif",    style: { fontWeight: 300, letterSpacing: "0.08em" } },
  { name: "Lamborghini",  font: "sans-serif",    style: { fontWeight: 800, letterSpacing: "0.1em" } },
  { name: "Ferrari",      font: "serif",         style: { fontWeight: 700, fontStyle: "italic" } },
  { name: "Porsche",      font: "sans-serif",    style: { fontWeight: 600, letterSpacing: "0.14em" } },
  { name: "Aston Martin", font: "serif",         style: { fontWeight: 400, letterSpacing: "0.08em", fontStyle: "italic" } },{ name: "Maserati",     font: "serif",         style: { fontWeight: 600, fontStyle: "italic" } },
];

// Duplicate for seamless loop
const doubled = [...brands, ...brands];

export default function Brands() {
  return (
    <section className="relative w-full bg-[#0a0a0a] py-16 overflow-hidden border-y border-white/5">

      {/* Heading */}
      <h2
        className="text-center text-white font-black uppercase text-xl sm:text-2xl tracking-[0.2em] mb-10"
        style={{ fontFamily: "'Bebas Neue', 'Arial Black', sans-serif" }}
      >
        We Carry Top of the Line Car Brands
      </h2>

      {/* Fade edges */}
      <div className="absolute left-0 top-0 h-full w-28 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #0a0a0a, transparent)" }} />
      <div className="absolute right-0 top-0 h-full w-28 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #0a0a0a, transparent)" }} />

      {/* Scrolling track */}
      <div className="flex overflow-hidden">
        <div className="flex items-center gap-16 animate-marquee whitespace-nowrap will-change-transform">
          {doubled.map((brand, i) => (
            <BrandItem key={i} brand={brand} />
          ))}
        </div>
      </div>

      {/* Inline keyframe */}
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}

function BrandItem({ brand }) {
  return (
    <div className="flex items-center gap-16 shrink-0">
      <span
        className="text-white/80 hover:text-[#C9A84C] transition-colors duration-300 cursor-default select-none text-xl"
        style={{
          fontFamily: brand.font,
          ...brand.style,
        }}
      >
        {brand.name}
      </span>

      {/* Divider dot */}
      <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]/40 shrink-0" />
    </div>
  );
}