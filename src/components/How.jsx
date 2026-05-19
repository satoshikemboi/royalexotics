// How.jsx
// Dependencies: Tailwind CSS

const requirements = [
  {
    title: "Minimum Age & Driver Requirements",
    body: "Driver eligibility requirements can vary depending on the vehicle. Certain models may have age restrictions or additional qualification standards based on the booking.",
  },
  {
    title: "Insurance & Security Deposit",
    body: "Proof of insurance and a security deposit are typically required as part of the rental process. This helps protect both the booking and the vehicle during the rental period.",
  },
  {
    title: "Required Documents",
    body: null,
    list: [
      "A valid driver's licence",
      "Government-issued identification",
      "A valid payment method",
    ],
    preamble: "To complete a booking, you will generally need:",
  },
];

const steps = [
  {
    number: "01",
    title: "Choose Your Vehicle",
    description:
      "Start by browsing the available fleet and selecting the model that best fits your plans, style, and rental needs.",
  },
  {
    number: "02",
    title: "Select Rental Dates",
    description:
      "Choose the dates and timing that work for your schedule. Availability may vary depending on the vehicle and the booking period.",
  },
  {
    number: "03",
    title: "Confirm Reservation Online",
    description:
      "Once details are finalized, you can complete the reservation and secure the booking. The process is designed to be straightforward, quick, and easy to complete.",
  },
];

export default function How() {
  return (
    <section className="bg-[#0a0a0a] w-full py-20 px-6">
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-16">

        {/* ── Main Heading ── */}
        <h2
          className="text-white font-black uppercase text-3xl sm:text-4xl lg:text-5xl tracking-tight text-center leading-tight"
          style={{ fontFamily: "'Bebas Neue', 'Arial Black', sans-serif" }}
        >
          How to Rent an{" "}
          <span className="text-[#C9A84C]">Exotic Car</span>
        </h2>

        {/* ── Requirements ── */}
        <div className="w-full flex flex-col items-center gap-8">
          <h3 className="text-white font-extrabold uppercase text-lg sm:text-xl tracking-[0.18em]">
            Requirements for Luxury Car Rental
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
            {requirements.map((req) => (
              <div
                key={req.title}
                className="relative rounded-2xl p-6 flex flex-col gap-4 overflow-hidden group"
                style={{
                  background: "linear-gradient(135deg, #1a1208 0%, #0f0d0a 100%)",
                  border: "1px solid rgba(201,168,76,0.25)",
                }}
              >
                {/* Gold top accent bar */}
                <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl bg-gradient-to-r from-[#C9A84C] to-[#e0be6a] opacity-80 group-hover:opacity-100 transition-opacity duration-300" />

                <h4 className="text-[#C9A84C] font-extrabold text-[0.72rem] tracking-[0.16em] uppercase leading-snug">
                  {req.title}
                </h4>

                {req.preamble && (
                  <p className="text-white/70 text-sm leading-relaxed">
                    {req.preamble}
                  </p>
                )}

                {req.body && (
                  <p className="text-white/70 text-sm leading-relaxed">
                    {req.body}
                  </p>
                )}

                {req.list && (
                  <ul className="flex flex-col gap-2">
                    {req.list.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-white/70 text-sm">
                        <span className="text-[#C9A84C] mt-[2px] shrink-0">›</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── Booking Process ── */}
        <div className="w-full flex flex-col items-center gap-10">
          <h3 className="text-white font-extrabold uppercase text-lg sm:text-xl tracking-[0.18em]">
            Simple{" "}
            <span className="text-[#C9A84C]">Booking Process</span>
          </h3>

          {/* Steps row */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-5 items-start gap-4">
            {steps.map((step, i) => (
              <>
                {/* Step card */}
                <div key={step.number} className="flex flex-col items-center text-center gap-3 col-span-1">
                  {/* Number */}
                  <span
                    className="font-black text-6xl leading-none select-none"
                    style={{
                      fontFamily: "'Bebas Neue', 'Arial Black', sans-serif",
                      color: "rgba(201,168,76,0.18)",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {step.number}
                  </span>

                  {/* Gold dot */}
                  <div className="w-3 h-3 rounded-full bg-[#C9A84C]" />

                  <h4 className="text-white font-extrabold text-[0.72rem] tracking-[0.15em] uppercase">
                    {step.title}
                  </h4>

                  <p className="text-white/50 text-sm leading-relaxed max-w-[220px]">
                    {step.description}
                  </p>
                </div>

                {/* Chevron connector (not after last) */}
                {i < steps.length - 1 && (
                  <div
                    key={`chevron-${i}`}
                    className="hidden sm:flex items-center justify-center col-span-1 pt-6"
                  >
                    <svg
                      className="w-6 h-6 text-[#C9A84C] opacity-60"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}