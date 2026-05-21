// Payment.jsx
// Standalone payment page with crypto address generation
// Dependencies: Tailwind CSS, react-router-dom

import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// ── Payment Methods ──────────────────────────────────────────
const METHODS = [
  {
    id: "card",
    label: "Credit / Debit Card",
    badge: null,
    icon: <CardIcon />,
    brands: ["Visa", "Mastercard", "Amex", "Discover"],
    description: "Pay securely with any major card. Charged at confirmation.",
  },
  {
    id: "crypto",
    label: "Cryptocurrency",
    badge: "25% OFF",
    badgeColor: "#22c55e",
    icon: <CryptoIcon />,
    brands: ["Bitcoin", "Ethereum", "USDC", "USDT"],
    description: "Pay with crypto and save 25% instantly on your total.",
  },
  {
    id: "bank",
    label: "Bank Transfer (ACH)",
    badge: null,
    icon: <BankIcon />,
    brands: ["Chase", "Bank of America", "Wells Fargo", "Any US Bank"],
    description: "Direct ACH transfer. Allow 1–2 business days to clear.",
  },
  {
    id: "apple",
    label: "Apple Pay",
    badge: "Instant",
    badgeColor: "#C9A84C",
    icon: <AppleIcon />,
    brands: [],
    description: "One-tap payment using Face ID or Touch ID on your device.",
  },
  {
    id: "paypal",
    label: "PayPal",
    badge: null,
    icon: <PayPalIcon />,
    brands: [],
    description: "Pay via your PayPal balance, bank, or linked card.",
  },
  {
    id: "zelle",
    label: "Zelle",
    badge: null,
    icon: <ZelleIcon />,
    brands: [],
    description: "Send payment directly from your US bank account via Zelle.",
  },
];

// ── Crypto coins ─────────────────────────────────────────────
const COINS = [
  { id: "btc",  label: "Bitcoin",  symbol: "BTC", color: "#F7931A" },
  { id: "eth",  label: "Ethereum", symbol: "ETH", color: "#627EEA" },
  { id: "usdc", label: "USDC",     symbol: "USDC",color: "#2775CA" },
  { id: "usdt", label: "Tether",   symbol: "USDT",color: "#26A17B" },
];

// Mock crypto address generator
const generateWalletAddress = () => {
  const chars = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
  let address = "bc1q";
  for (let i = 0; i < 56; i++) {
    address += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return address;
};

export default function Payment() {
  const location  = useLocation();
  const navigate  = useNavigate();

  // Booking data passed via router state from Booking.jsx
  // Fallback demo data if navigated directly
  const booking = location.state?.booking || {
    vehicleName: "Lamborghini Huracán",
    nights: 3,
    vehicleTotal: 5400,
    extrasTotal: 400,
    subtotal: 5800,
    securityDeposit: 1000,
    grandTotal: 6800,
    firstName: "Guest",
    email: "guest@royalexotics.com",
  };

  const cryptoTotal    = Math.round(booking.grandTotal * 0.75);
  const cryptoSavings  = booking.grandTotal - cryptoTotal;

  const [method,          setMethod]          = useState("card");
  const [coin,            setCoin]            = useState("btc");
  const [walletGenerated, setWalletGenerated] = useState(false);
  const [walletAddress,   setWalletAddress]   = useState("");
  const [paid,            setPaid]            = useState(false);
  const [loading,         setLoading]         = useState(false);

  // Card fields
  const [card, setCard] = useState({ name: "", number: "", expiry: "", cvv: "" });
  const updateCard = (f) => setCard((p) => ({ ...p, ...f }));

  const activeMethod = METHODS.find((m) => m.id === method);
  const displayTotal = method === "crypto" ? cryptoTotal : booking.grandTotal;

  const handleGenerateAddress = () => {
    const address = generateWalletAddress();
    setWalletAddress(address);
    setWalletGenerated(true);
  };

  const handlePay = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setPaid(true); }, 2200);
  };

  const canPay = () => {
    if (method === "card") {
      return card.name && card.number.length >= 16 && card.expiry && card.cvv.length >= 3;
    }
    if (method === "crypto") {
      return walletGenerated;
    }
    return true;
  };

  if (paid) return <SuccessScreen booking={booking} method={activeMethod} total={displayTotal} navigate={navigate} />;

  return (
    <section className="min-h-screen bg-[#080808] py-16 px-4">
      <div className="max-w-5xl mx-auto flex flex-col gap-10">

        {/* Header */}
        <div className="text-center">
          <p className="text-[#C9A84C] text-[0.7rem] font-bold tracking-[0.3em] uppercase mb-3">Step 6 of 6</p>
          <h1
            className="text-white font-black uppercase text-4xl sm:text-6xl tracking-tight"
            style={{ fontFamily: "'Bebas Neue', 'Arial Black', sans-serif" }}
          >
            Secure <span className="text-[#C9A84C]">Payment</span>
          </h1>
          <p className="text-white/40 text-sm mt-3">Choose how you'd like to pay for your reservation</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ── Left: Method selector + form ── */}
          <div className="lg:col-span-2 flex flex-col gap-5">

            {/* Method grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {METHODS.map((m) => (
                <button
                  key={m.id}
                  onClick={() => {
                    setMethod(m.id);
                    setWalletGenerated(false);
                  }}
                  className="relative flex flex-col items-center gap-2 px-3 py-4 rounded-xl border transition-all duration-200 hover:scale-[1.02] text-center"
                  style={{
                    borderColor: method === m.id ? "#C9A84C" : "rgba(255,255,255,0.07)",
                    background:  method === m.id ? "rgba(201,168,76,0.07)" : "#0f0f0f",
                  }}
                >
                  {/* Badge */}
                  {m.badge && (
                    <span
                      className="absolute -top-2 -right-2 text-[0.55rem] font-black tracking-[0.1em] uppercase px-2 py-[2px] rounded-full text-black"
                      style={{ background: m.badgeColor || "#C9A84C" }}
                    >
                      {m.badge}
                    </span>
                  )}

                  {/* Selected indicator */}
                  {method === m.id && (
                    <div className="absolute top-2 left-2 w-4 h-4 rounded-full bg-[#C9A84C] flex items-center justify-center">
                      <span className="text-black text-[0.5rem] font-black">✓</span>
                    </div>
                  )}

                  <div className="text-[#C9A84C] w-7 h-7">{m.icon}</div>
                  <span
                    className="text-[0.65rem] font-bold tracking-[0.1em] uppercase leading-tight"
                    style={{ color: method === m.id ? "#C9A84C" : "rgba(255,255,255,0.6)" }}
                  >
                    {m.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Method description */}
            <div
              className="rounded-xl px-5 py-4 border flex items-start gap-3"
              style={{ background: "#0f0f0f", borderColor: "rgba(255,255,255,0.07)" }}
            >
              <div className="text-[#C9A84C] w-5 h-5 shrink-0 mt-0.5">{activeMethod.icon}</div>
              <div>
                <p className="text-white text-sm font-semibold">{activeMethod.label}</p>
                <p className="text-white/40 text-xs mt-1 leading-relaxed">{activeMethod.description}</p>
                {activeMethod.brands.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {activeMethod.brands.map((b) => (
                      <span key={b} className="text-white/30 text-[0.6rem] font-bold tracking-[0.1em] uppercase border border-white/10 rounded px-2 py-[2px]">{b}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* ── Dynamic Form ── */}
            <div
              className="rounded-2xl border p-6 sm:p-8 flex flex-col gap-6"
              style={{ background: "#0f0f0f", borderColor: "rgba(255,255,255,0.07)" }}
            >
              {method === "card"   && <CardForm   card={card} update={updateCard} />}
              {method === "crypto" && <CryptoForm coin={coin} setCoin={setCoin} total={cryptoTotal} savings={cryptoSavings} walletGenerated={walletGenerated} walletAddress={walletAddress} onGenerateAddress={handleGenerateAddress} />}
              {method === "bank"   && <BankForm   total={booking.grandTotal} />}
              {method === "apple"  && <AppleForm  total={booking.grandTotal} />}
              {method === "paypal" && <PayPalForm total={booking.grandTotal} />}
              {method === "zelle"  && <ZelleForm  total={booking.grandTotal} />}

              {/* Pay button */}
              <button
                onClick={handlePay}
                disabled={!canPay() || loading}
                className="w-full py-4 text-[0.78rem] font-black tracking-[0.2em] uppercase transition-all duration-200 rounded-xl disabled:opacity-30 disabled:cursor-not-allowed hover:brightness-110 hover:scale-[1.01] relative overflow-hidden"
                style={{ background: canPay() && !loading ? "#C9A84C" : "#333", color: "#000" }}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-3">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                    Processing…
                  </span>
                ) : (
                  `Pay $${displayTotal.toLocaleString()} ${method === "crypto" ? "→ Crypto" : ""}`
                )}
              </button>

              <p className="text-white/20 text-[0.6rem] text-center tracking-wide">
                🔒 256-bit SSL encrypted · Your payment info is never stored
              </p>
            </div>
          </div>

          {/* ── Right: Order summary ── */}
          <div className="flex flex-col gap-4">
            <OrderSummary booking={booking} method={method} cryptoTotal={cryptoTotal} cryptoSavings={cryptoSavings} />
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Card Form ────────────────────────────────────────────────
function CardForm({ card, update }) {
  const fmt = (val) => val.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim().slice(0, 19);
  const fmtExpiry = (val) => {
    const v = val.replace(/\D/g, "").slice(0, 4);
    return v.length >= 3 ? `${v.slice(0, 2)}/${v.slice(2)}` : v;
  };

  return (
    <div className="flex flex-col gap-5">
      <FormHeading icon="💳" title="Card Details" />
      <Field label="Cardholder Name">
        <Input placeholder="John Doe" value={card.name} onChange={(e) => update({ name: e.target.value })} />
      </Field>
      <Field label="Card Number">
        <Input placeholder="0000 0000 0000 0000" value={fmt(card.number)} onChange={(e) => update({ number: e.target.value.replace(/\s/g, "") })} maxLength={19} />
      </Field>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Expiry Date">
          <Input placeholder="MM/YY" value={fmtExpiry(card.expiry)} onChange={(e) => update({ expiry: e.target.value })} maxLength={5} />
        </Field>
        <Field label="CVV">
          <Input placeholder="•••" type="password" value={card.cvv} onChange={(e) => update({ cvv: e.target.value })} maxLength={4} />
        </Field>
      </div>
    </div>
  );
}

// ── Crypto Form ──────────────────────────────────────────────
function CryptoForm({ coin, setCoin, total, savings, walletGenerated, walletAddress, onGenerateAddress }) {
  const selected = COINS.find((c) => c.id === coin);
  return (
    <div className="flex flex-col gap-5">
      <FormHeading icon="₿" title="Pay with Crypto" />

      {/* Savings banner */}
      <div className="rounded-xl px-4 py-3 flex items-center gap-3 border border-green-500/20 bg-green-500/5">
        <span className="text-green-400 text-xl">🎉</span>
        <div>
          <p className="text-green-400 text-sm font-bold">You save ${savings.toLocaleString()}!</p>
          <p className="text-green-400/60 text-xs">25% discount applied automatically when paying with crypto.</p>
        </div>
      </div>

      {/* Coin selector */}
      <Field label="Select Coin">
        <div className="grid grid-cols-2 gap-2">
          {COINS.map((c) => (
            <button
              key={c.id}
              onClick={() => setCoin(c.id)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-150"
              style={{
                borderColor: coin === c.id ? c.color : "rgba(255,255,255,0.08)",
                background:  coin === c.id ? `${c.color}15` : "#141414",
              }}
            >
              <div className="w-2 h-2 rounded-full shrink-0" style={{ background: c.color }} />
              <div className="text-left">
                <p className="text-white text-xs font-bold">{c.label}</p>
                <p className="text-white/30 text-[0.6rem]">{c.symbol}</p>
              </div>
            </button>
          ))}
        </div>
      </Field>

      {/* Amount to send */}
      <div className="rounded-xl bg-[#141414] border border-white/8 p-4 flex flex-col gap-3">
        <p className="text-white/50 text-[0.65rem] uppercase tracking-[0.14em] font-bold">Send exactly</p>
        <p className="text-[#C9A84C] font-black text-2xl" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
          ${total.toLocaleString()} <span className="text-base text-white/30">USD in {selected.symbol}</span>
        </p>
      </div>

      {/* Generate address button */}
      <button
        onClick={onGenerateAddress}
        className="w-full py-3 rounded-xl border transition-all duration-200 text-sm font-bold tracking-[0.1em] uppercase"
        style={{
          borderColor: walletGenerated ? "#C9A84C" : "rgba(255,255,255,0.15)",
          background: walletGenerated ? "rgba(201,168,76,0.1)" : "#141414",
          color: walletGenerated ? "#C9A84C" : "rgba(255,255,255,0.6)",
        }}
      >
        {walletGenerated ? "✓ Address Generated" : "Generate Payment Address"}
      </button>

      {/* Wallet address display (conditional) */}
      {walletGenerated && (
        <div className="rounded-xl bg-[#0a0a0a] border border-[#C9A84C]/30 p-4 flex flex-col gap-3 animate-in fade-in">
          <p className="text-white/50 text-[0.65rem] uppercase tracking-[0.14em] font-bold">Send to wallet address</p>
          <div className="bg-[#141414] rounded-lg p-3 font-mono text-[0.7rem] text-[#C9A84C] break-all border border-white/5 select-all">
            {walletAddress}
          </div>
          <p className="text-white/25 text-[0.6rem] leading-relaxed">Payment confirmed after 1 network confirmation. Do not send from exchange — use your personal wallet.</p>
        </div>
      )}
    </div>
  );
}

// ── Bank Transfer Form ───────────────────────────────────────
function BankForm({ total }) {
  return (
    <div className="flex flex-col gap-5">
      <FormHeading icon="🏦" title="ACH Bank Transfer" />
      <div className="flex flex-col gap-3">
        {[
          ["Bank Name",       "Royal Exotics Financial LLC"],
          ["Routing Number",  "021000021"],
          ["Account Number",  "4520 8812 3390"],
          ["Reference",       "RE-" + Math.random().toString(36).slice(2, 8).toUpperCase()],
          ["Amount",          `$${total.toLocaleString()}`],
        ].map(([label, value]) => (
          <div key={label} className="flex items-center justify-between bg-[#141414] rounded-lg px-4 py-3 border border-white/6">
            <span className="text-white/40 text-[0.65rem] uppercase tracking-[0.12em] font-bold">{label}</span>
            <span className="text-white text-sm font-mono font-semibold">{value}</span>
          </div>
        ))}
      </div>
      <p className="text-white/25 text-xs leading-relaxed">Transfers typically clear within 1–2 business days. Your reservation is held for 48 hours pending payment.</p>
    </div>
  );
}

// ── Apple Pay Form ───────────────────────────────────────────
function AppleForm({ total }) {
  return (
    <div className="flex flex-col items-center gap-6 py-4">
      <FormHeading icon="🍎" title="Apple Pay" />
      <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
        <AppleIcon className="w-10 h-10 text-white" />
      </div>
      <div className="text-center">
        <p className="text-white font-bold text-lg">${total.toLocaleString()}</p>
        <p className="text-white/40 text-sm mt-1">Confirm with Face ID or Touch ID</p>
      </div>
      <p className="text-white/25 text-xs text-center max-w-xs leading-relaxed">
        Click "Pay" below and your device will prompt for biometric confirmation. Available on Safari and iOS devices.
      </p>
    </div>
  );
}

// ── PayPal Form ──────────────────────────────────────────────
function PayPalForm({ total }) {
  return (
    <div className="flex flex-col items-center gap-6 py-4">
      <FormHeading icon="🅿️" title="PayPal" />
      <div className="w-24 h-24 rounded-full bg-[#003087]/20 border border-[#003087]/40 flex items-center justify-center">
        <PayPalIcon className="w-10 h-10" />
      </div>
      <div className="text-center">
        <p className="text-white font-bold text-lg">${total.toLocaleString()}</p>
        <p className="text-white/40 text-sm mt-1">You'll be redirected to PayPal to complete payment</p>
      </div>
      <p className="text-white/25 text-xs text-center max-w-xs leading-relaxed">
        Pay using your PayPal balance, linked bank account, or any card saved in your PayPal account.
      </p>
    </div>
  );
}

// ── Zelle Form ───────────────────────────────────────────────
function ZelleForm({ total }) {
  return (
    <div className="flex flex-col gap-5">
      <FormHeading icon="⚡" title="Zelle" />
      <div className="flex flex-col gap-3">
        {[
          ["Send To (Email)", "payments@royalexotics.com"],
          ["Or Phone",        "+1 (305) 555-0199"],
          ["Amount",          `$${total.toLocaleString()}`],
          ["Memo",            "RE-" + Math.random().toString(36).slice(2, 8).toUpperCase()],
        ].map(([label, value]) => (
          <div key={label} className="flex items-center justify-between bg-[#141414] rounded-lg px-4 py-3 border border-white/6">
            <span className="text-white/40 text-[0.65rem] uppercase tracking-[0.12em] font-bold">{label}</span>
            <span className="text-white text-sm font-mono font-semibold">{value}</span>
          </div>
        ))}
      </div>
      <p className="text-white/25 text-xs leading-relaxed">Open your bank's app and send via Zelle to the email or number above. Include the memo so we can match your payment instantly.</p>
    </div>
  );
}

// ── Order Summary ────────────────────────────────────────────
function OrderSummary({ booking, method, cryptoTotal, cryptoSavings }) {
  const isCrypto = method === "crypto";
  const total    = isCrypto ? cryptoTotal : booking.grandTotal;

  return (
    <div
      className="rounded-2xl border p-6 flex flex-col gap-5 sticky top-6"
      style={{ background: "#0f0f0f", borderColor: "rgba(255,255,255,0.07)" }}
    >
      <h3 className="text-white font-extrabold text-[0.7rem] tracking-[0.18em] uppercase">Order Summary</h3>

      {/* Car thumbnail placeholder */}
      <div
        className="w-full h-28 rounded-xl bg-[#141414] border border-white/6 flex items-center justify-center overflow-hidden"
        style={{ backgroundImage: "url(/cars/huracan.jpg)", backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="w-full h-full bg-gradient-to-t from-black/80 to-transparent flex items-end p-3">
          <p className="text-white font-bold text-sm">{booking.vehicleName}</p>
        </div>
      </div>

      {/* Line items */}
      <div className="flex flex-col gap-3">
        <LineItem label="Vehicle rental" value={`$${booking.vehicleTotal.toLocaleString()}`} />
        <LineItem label={`${booking.nights} day${booking.nights !== 1 ? "s" : ""}`} value="" muted />
        {booking.extrasTotal > 0 && (
          <LineItem label="Add-ons & Extras" value={`$${booking.extrasTotal.toLocaleString()}`} />
        )}
        <LineItem label="Security Deposit" value={`$${booking.securityDeposit.toLocaleString()}`} />
        {isCrypto && (
          <LineItem label="Crypto discount (25%)" value={`-$${cryptoSavings.toLocaleString()}`} accent green />
        )}
        <div className="border-t border-white/8 pt-3 flex items-center justify-between">
          <span className="text-white/60 text-xs uppercase tracking-widest font-bold">Total</span>
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
        <p className="text-white/30 text-[0.6rem] uppercase tracking-widest">Booking for</p>
        <p className="text-white text-sm font-semibold">{booking.firstName}</p>
        <p className="text-white/40 text-xs">{booking.email}</p>
      </div>

      {/* Trust badges */}
      <div className="flex flex-wrap gap-2 pt-1">
        {["🔒 SSL Secure", "✅ Verified", "💯 Money-Back"].map((b) => (
          <span key={b} className="text-white/25 text-[0.58rem] font-bold tracking-wide uppercase border border-white/8 rounded px-2 py-1">{b}</span>
        ))}
      </div>
    </div>
  );
}

// ── Success Screen ───────────────────────────────────────────
function SuccessScreen({ booking, method, total, navigate }) {
  return (
    <section className="min-h-screen bg-[#080808] flex items-center justify-center px-4 py-20">
      <div className="max-w-lg w-full text-center flex flex-col items-center gap-7">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/30 flex items-center justify-center text-5xl">
            🏎️
          </div>
          <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-sm font-black">✓</div>
        </div>

        <div>
          <h2
            className="text-white font-black uppercase text-5xl"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Payment <span className="text-[#C9A84C]">Confirmed!</span>
          </h2>
          <p className="text-white/50 text-sm mt-3 leading-relaxed">
            Your payment of <span className="text-[#C9A84C] font-bold">${total.toLocaleString()}</span> via <span className="text-white font-semibold">{method.label}</span> was received.
            A confirmation has been sent to <span className="text-white">{booking.email}</span>.
          </p>
        </div>

        <div className="w-full bg-[#0f0f0f] border border-white/8 rounded-2xl p-6 flex flex-col gap-3 text-left">
          <p className="text-white/30 text-[0.6rem] uppercase tracking-widest font-bold">Receipt</p>
          {[
            ["Vehicle",        booking.vehicleName],
            ["Duration",       `${booking.nights} day${booking.nights !== 1 ? "s" : ""}`],
            ["Payment Method", method.label],
            ["Amount Paid",    `$${total.toLocaleString()}`],
            ["Reference",      "RE-" + Math.random().toString(36).slice(2, 8).toUpperCase()],
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

// ── Shared UI ────────────────────────────────────────────────
function FormHeading({ icon, title }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-2xl">{icon}</span>
      <h3 className="text-white font-extrabold text-base uppercase tracking-wide">{title}</h3>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-white/40 text-[0.65rem] font-bold tracking-[0.14em] uppercase">{label}</label>
      {children}
    </div>
  );
}

function Input({ className = "", ...props }) {
  return (
    <input
      {...props}
      className={`w-full bg-[#141414] border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#C9A84C]/50 focus:bg-[#1a1a1a] transition-all duration-200 ${className}`}
    />
  );
}

function LineItem({ label, value, muted, green }) {
  return (
    <div className="flex items-center justify-between">
      <span className={`text-xs ${muted ? "text-white/25" : "text-white/50"}`}>{label}</span>
      <span className={`text-xs font-semibold ${green ? "text-green-400" : "text-white/70"}`}>{value}</span>
    </div>
  );
}

// ── SVG Icons ────────────────────────────────────────────────
function CardIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/>
    </svg>
  );
}
function CryptoIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
    </svg>
  );
}
function BankIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  );
}
function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
    </svg>
  );
}
function PayPalIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-[#003087]">
      <path d="M7.076 21.337H2.47a.641.641 0 01-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 00-.607-.541c-.013.076-.026.175-.041.254-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 00-.556.479l-1.187 7.527h-.506l-.24 1.516a.56.56 0 00.554.647h3.882c.46 0 .85-.334.922-.788.06-.26.76-4.852.816-5.09a.932.932 0 01.923-.788h.58c3.76 0 6.705-1.528 7.565-5.946.36-1.847.174-3.388-.777-4.471z"/>
    </svg>
  );
}
function ZelleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  );
}