// components/payment/OtherPaymentForms.jsx
// Bank, Apple Pay, PayPal, and Zelle payment forms

// ── Shared UI Components ──
export const FormHeading = ({ icon, title }) => (
  <div className="flex items-center gap-3">
    <span className="text-2xl">{icon}</span>
    <h3 className="text-white font-extrabold text-base uppercase tracking-wide">
      {title}
    </h3>
  </div>
);

// ── Bank Transfer Form ───────────────────────────────────────
export function BankForm({ total }) {
  return (
    <div className="flex flex-col gap-5">
      <FormHeading icon="🏦" title="ACH Bank Transfer" />
      <div className="flex flex-col gap-3">
        {[
          ["Bank Name", "Royal Exotics Financial LLC"],
          ["Routing Number", "021000021"],
          ["Account Number", "4520 8812 3390"],
          ["Reference", "RE-" + Math.random().toString(36).slice(2, 8).toUpperCase()],
          ["Amount", `$${total.toLocaleString()}`],
        ].map(([label, value]) => (
          <div
            key={label}
            className="flex items-center justify-between bg-[#141414] rounded-lg px-4 py-3 border border-white/6"
          >
            <span className="text-white/40 text-[0.65rem] uppercase tracking-[0.12em] font-bold">
              {label}
            </span>
            <span className="text-white text-sm font-mono font-semibold">{value}</span>
          </div>
        ))}
      </div>
      <p className="text-white/25 text-xs leading-relaxed">
        Transfers typically clear within 1–2 business days. Your reservation is held 
        for 48 hours pending payment.
      </p>
    </div>
  );
}



