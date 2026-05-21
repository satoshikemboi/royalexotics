// components/payment/SuccessScreen.jsx
// Post-payment success screen

export default function SuccessScreen({ booking, method, total, navigate }) {
  return (
    <section className="min-h-screen bg-[#080808] flex items-center justify-center px-4 py-20">
      <div className="max-w-lg w-full text-center flex flex-col items-center gap-7">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/30 flex items-center justify-center text-5xl">
            🏎️
          </div>
          <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-sm font-black">
            ✓
          </div>
        </div>

        <div>
          <h2
            className="text-white font-black uppercase text-5xl"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Payment <span className="text-[#C9A84C]">Confirmed!</span>
          </h2>
          <p className="text-white/50 text-sm mt-3 leading-relaxed">
            Your payment of{" "}
            <span className="text-[#C9A84C] font-bold">${total.toLocaleString()}</span>{" "}
            via <span className="text-white font-semibold">{method.label}</span> was
            received. A confirmation has been sent to{" "}
            <span className="text-white">{booking.email}</span>.
          </p>
        </div>

        <div className="w-full bg-[#0f0f0f] border border-white/8 rounded-2xl p-6 flex flex-col gap-3 text-left">
          <p className="text-white/30 text-[0.6rem] uppercase tracking-widest font-bold">
            Receipt
          </p>
          {[
            ["Vehicle", booking.vehicleName],
            ["Duration", `${booking.nights} day${booking.nights !== 1 ? "s" : ""}`],
            ["Payment Method", method.label],
            ["Amount Paid", `$${total.toLocaleString()}`],
            [
              "Reference",
              "RE-" + Math.random().toString(36).slice(2, 8).toUpperCase(),
            ],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between items-center">
              <span className="text-white/40 text-xs">{k}</span>
              <span className="text-white text-sm font-semibold">{v}</span>
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate("/")}
          className="text-[#C9A84C] text-[0.7rem] font-bold tracking-[0.2em] uppercase hover:underline mt-2"
        >
          ← Back to Home
        </button>
      </div>
    </section>
  );
}