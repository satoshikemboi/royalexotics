// Why.jsx
// Dependencies: Tailwind CSS

const features = [
  {
    icon: <StarIcon />,
    title: "Selective Fleet",
    description: "A selective fleet, not a bloated inventory.",
  },
  {
    icon: <CarIcon />,
    title: "Demand-Relevant",
    description: "Vehicles chosen for demand and relevance.",
  },
  {
    icon: <CalendarIcon />,
    title: "Easy Booking",
    description: "Booking that does not feel like paperwork torture.",
  },
  {
    icon: <HeadsetIcon />,
    title: "Responsive Service",
    description: "Service that actually responds when you need it.",
  },
];

export default function Why() {
  return (
    <section className="bg-[#0d0d0d] w-full py-24 px-6">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-10">

        {/* Heading */}
        <div className="text-center">
          <h2
            className="text-white font-black uppercase text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight"
            style={{ fontFamily: "'Bebas Neue', 'Arial Black', sans-serif" }}
          >
            Why Choose{" "}
            <span className="text-[#C9A84C]">Royal Exotics</span>{" "}
            for Luxury Car Rentals
          </h2>
          <p className="text-white/50 text-sm mt-4 tracking-wide">
            We keep things focused:
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full mt-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-[#141414] border border-white/10 rounded-xl p-6 flex flex-col gap-4 hover:border-[#C9A84C]/40 hover:bg-[#1a1a1a] transition-all duration-300 group"
            >
              {/* Icon */}
              <div className="text-[#C9A84C] w-8 h-8 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-white font-extrabold text-sm tracking-[0.12em] uppercase">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-white/50 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ── Inline SVG Icons ─────────────────────────────────────── */

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function CarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M5 17H3v-5l2.5-6h11L19 12v5h-2" />
      <circle cx="7.5" cy="17.5" r="1.5" />
      <circle cx="16.5" cy="17.5" r="1.5" />
      <path d="M5 12h14" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <polyline points="9 16 11 18 15 14" />
    </svg>
  );
}

function HeadsetIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M3 18v-6a9 9 0 0118 0v6" />
      <path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3z" />
      <path d="M3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z" />
    </svg>
  );
}