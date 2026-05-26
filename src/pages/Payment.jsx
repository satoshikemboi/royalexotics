// pages/Payment.jsx
// Standalone payment page - refactored to use split components

import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import CardForm from "../components/payment/CardForm";
import CryptoForm from "../components/payment/CryptoForm";
import { BankForm } from "../components/payment/OtherPaymentForms";
import OrderSummary from "../components/payment/OrderSummary";
import SuccessScreen from "../components/payment/SuccessScreen";
import MethodSelector from "../components/payment/MethodSelector";

const METHODS = [
  {
    id: "card",
    label: "Credit / Debit Card",
    badge: null,
    icon: "card",
    brands: ["Visa", "Mastercard", "Amex", "Discover"],
    description: "Pay securely with any major card. Charged at confirmation.",
  },
  {
    id: "crypto",
    label: "Cryptocurrency",
    badge: "20% Discount",
    badgeColor: "#22c55e",
    icon: "crypto",
    brands: ["Bitcoin", "Ethereum", "USDC", "USDT"],
    description: "Pay with crypto and save 20% instantly on your total.",
  },
  {
    id: "bank",
    label: "Bank Transfer",
    badge: null,
    icon: "bank",
    brands: ["Chase", "Bank of America", "Wells Fargo", "Any US Bank"],
    description: "Direct Bank transfer.",
  }
];

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();

  // Booking data from router state
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

  const cryptoTotal = Math.round(booking.grandTotal * 0.75);
  const cryptoSavings = booking.grandTotal - cryptoTotal;

  const [method, setMethod] = useState("card");
  const [coin, setCoin] = useState("btc");
  const [walletGenerated, setWalletGenerated] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [paid, setPaid] = useState(false);
  const [loading, setLoading] = useState(false);

  // Card fields
  const [card, setCard] = useState({ name: "", number: "", expiry: "", cvv: "" });
  const updateCard = (f) => setCard((p) => ({ ...p, ...f }));

  const activeMethod = METHODS.find((m) => m.id === method);
  const displayTotal = method === "crypto" ? cryptoTotal : booking.grandTotal;

  const handleGenerateAddress = () => {
    const chars = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
    let address = "bc1q";
    for (let i = 0; i < 56; i++) {
      address += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setWalletAddress(address);
    setWalletGenerated(true);
  };

  const handlePay = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setPaid(true);
    }, 2200);
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

  if (paid) {
    return <SuccessScreen booking={booking} method={activeMethod} total={displayTotal} navigate={navigate} />;
  }

  return (
    <section className="min-h-screen bg-[#080808] py-16 px-4">
      <div className="max-w-5xl mx-auto flex flex-col gap-10">
        {/* Header */}
        <div className="text-center">
          <p className="text-[#C9A84C] text-[0.7rem] font-bold tracking-[0.3em] uppercase mb-3">
            Step 6 of 6
          </p>
          <h1
            className="text-white font-black uppercase text-4xl sm:text-6xl tracking-tight"
            style={{ fontFamily: "'Bebas Neue', 'Arial Black', sans-serif" }}
          >
            Secure <span className="text-[#C9A84C]">Payment</span>
          </h1>
          <p className="text-white/40 text-sm mt-3">
            Choose how you'd like to pay for your reservation
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ── Left: Method selector + form ── */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {/* Method selector */}
            <MethodSelector
              methods={METHODS}
              selectedMethod={method}
              onSelectMethod={(m) => {
                setMethod(m);
                setWalletGenerated(false);
              }}
            />

            {/* Method description */}
            <MethodDescription method={activeMethod} />

            {/* ── Dynamic Form ── */}
            <div
              className="rounded-2xl border p-6 sm:p-8 flex flex-col gap-6"
              style={{ background: "#0f0f0f", borderColor: "rgba(255,255,255,0.07)" }}
            >
              {method === "card" && <CardForm card={card} update={updateCard} />}
              {method === "crypto" && (
                <CryptoForm
                  coin={coin}
                  setCoin={setCoin}
                  total={cryptoTotal}
                  savings={cryptoSavings}
                  walletGenerated={walletGenerated}
                  walletAddress={walletAddress}
                  onGenerateAddress={handleGenerateAddress}
                />
              )}
              {method === "bank" && <BankForm total={booking.grandTotal} />}

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
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
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
            <OrderSummary
              booking={booking}
              method={method}
              cryptoTotal={cryptoTotal}
              cryptoSavings={cryptoSavings}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Method Description ────────────────────────────────────────
function MethodDescription({ method }) {
  return (
    <div
      className="rounded-xl px-5 py-4 border flex items-start gap-3"
      style={{ background: "#0f0f0f", borderColor: "rgba(255,255,255,0.07)" }}
    >
      <div className="text-[#C9A84C] w-5 h-5 shrink-0 mt-0.5">
        <MethodIcon icon={method.icon} />
      </div>
      <div>
        <p className="text-white text-sm font-semibold">{method.label}</p>
        <p className="text-white/40 text-xs mt-1 leading-relaxed">{method.description}</p>
        {method.brands.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {method.brands.map((b) => (
              <span
                key={b}
                className="text-white/30 text-[0.6rem] font-bold tracking-[0.1em] uppercase border border-white/10 rounded px-2 py-[2px]"
              >
                {b}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Icons ────────────────────────────────────────────────────
function MethodIcon({ icon }) {
  const icons = {
    card: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
    crypto: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    bank: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    )
  };
  return icons[icon] || icons.card;
}