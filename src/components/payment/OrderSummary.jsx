// components/payment/OrderSummary.jsx
// Booking summary sidebar

function LineItem({ label, value, muted, green }) {
  return (
    <div className="flex items-center justify-between">
      <span className={`text-xs ${muted ? "text-white/25" : "text-white/50"}`}>
        {label}
      </span>
      <span
        className={`text-xs font-semibold ${green ? "text-green-400" : "text-white/70"}`}
      >
        {value}
      </span>
    </div>
  );
}

export default function OrderSummary({
  booking,
  method,
  cryptoTotal,
  cryptoSavings,
}) {
  const isCrypto = method === "crypto";
  const total = isCrypto ? cryptoTotal : booking.grandTotal;

  return (
    <div
      className="rounded-2xl border p-6 flex flex-col gap-5 sticky top-6"
      style={{ background: "#0f0f0f", borderColor: "rgba(255,255,255,0.07)" }}
    >
      <h3 className="text-white font-extrabold text-[0.7rem] tracking-[0.18em] uppercase">
        Order Summary
      </h3>

      {/* Car thumbnail placeholder */}
      <div
        className="w-full h-28 rounded-xl bg-[#141414] border border-white/6 flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: "url(/cars/huracan.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="w-full h-full bg-gradient-to-t from-black/80 to-transparent flex items-end p-3">
          <p className="text-white font-bold text-sm">{booking.vehicleName}</p>
        </div>
      </div>

      {/* Line items */}
      <div className="flex flex-col gap-3">
        <LineItem
          label="Vehicle rental"
          value={`$${booking.vehicleTotal.toLocaleString()}`}
        />
        <LineItem
          label={`${booking.nights} day${booking.nights !== 1 ? "s" : ""}`}
          value=""
          muted
        />
        {booking.extrasTotal > 0 && (
          <LineItem
            label="Add-ons & Extras"
            value={`$${booking.extrasTotal.toLocaleString()}`}
          />
        )}
        <LineItem
          label="Security Deposit"
          value={`$${booking.securityDeposit.toLocaleString()}`}
        />
        {isCrypto && (
          <LineItem
            label="Crypto discount (25%)"
            value={`-$${cryptoSavings.toLocaleString()}`}
            accent
            green
          />
        )}
        <div className="border-t border-white/8 pt-3 flex items-center justify-between">
          <span className="text-white/60 text-xs uppercase tracking-widest font-bold">
            Total
          </span>
          <span
            className="text-[#C9A84C] font-black text-2xl"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            ${total.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Customer */}
      <div className="border-t border-white/8 pt-4 flex flex-col gap-1">
        <p className="text-white/30 text-[0.6rem] uppercase tracking-widest">
          Booking for
        </p>
        <p className="text-white text-sm font-semibold">{booking.firstName}</p>
        <p className="text-white/40 text-xs">{booking.email}</p>
      </div>

      {/* Trust badges */}
      <div className="flex flex-wrap gap-2 pt-1">
        {["🔒 SSL Secure", "✅ Verified", "💯 Money-Back"].map((b) => (
          <span
            key={b}
            className="text-white/25 text-[0.58rem] font-bold tracking-wide uppercase border border-white/8 rounded px-2 py-1"
          >
            {b}
          </span>
        ))}
      </div>
    </div>
  );
}