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

// ── Apple Pay Form ───────────────────────────────────────────
export function AppleForm({ total }) {
  return (
    <div className="flex flex-col items-center gap-6 py-4">
      <FormHeading icon="🍎" title="Apple Pay" />
      <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-white">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
        </svg>
      </div>
      <div className="text-center">
        <p className="text-white font-bold text-lg">${total.toLocaleString()}</p>
        <p className="text-white/40 text-sm mt-1">Confirm with Face ID or Touch ID</p>
      </div>
      <p className="text-white/25 text-xs text-center max-w-xs leading-relaxed">
        Click "Pay" below and your device will prompt for biometric confirmation. 
        Available on Safari and iOS devices.
      </p>
    </div>
  );
}

// ── PayPal Form ──────────────────────────────────────────────
export function PayPalForm({ total }) {
  return (
    <div className="flex flex-col items-center gap-6 py-4">
      <FormHeading icon="🅿️" title="PayPal" />
      <div className="w-24 h-24 rounded-full bg-[#003087]/20 border border-[#003087]/40 flex items-center justify-center">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-[#003087]">
          <path d="M7.076 21.337H2.47a.641.641 0 01-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 00-.607-.541c-.013.076-.026.175-.041.254-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 00-.556.479l-1.187 7.527h-.506l-.24 1.516a.56.56 0 00.554.647h3.882c.46 0 .85-.334.922-.788.06-.26.76-4.852.816-5.09a.932.932 0 01.923-.788h.58c3.76 0 6.705-1.528 7.565-5.946.36-1.847.174-3.388-.777-4.471z" />
        </svg>
      </div>
      <div className="text-center">
        <p className="text-white font-bold text-lg">${total.toLocaleString()}</p>
        <p className="text-white/40 text-sm mt-1">
          You'll be redirected to PayPal to complete payment
        </p>
      </div>
      <p className="text-white/25 text-xs text-center max-w-xs leading-relaxed">
        Pay using your PayPal balance, linked bank account, or any card saved in 
        your PayPal account.
      </p>
    </div>
  );
}

// ── Zelle Form ───────────────────────────────────────────────
export function ZelleForm({ total }) {
  return (
    <div className="flex flex-col gap-5">
      <FormHeading icon="⚡" title="Zelle" />
      <div className="flex flex-col gap-3">
        {[
          ["Send To (Email)", "payments@royalexotics.com"],
          ["Or Phone", "+1 (305) 555-0199"],
          ["Amount", `$${total.toLocaleString()}`],
          ["Memo", "RE-" + Math.random().toString(36).slice(2, 8).toUpperCase()],
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
        Open your bank's app and send via Zelle to the email or number above. 
        Include the memo so we can match your payment instantly.
      </p>
    </div>
  );
}