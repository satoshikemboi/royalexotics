// components/payment/MethodSelector.jsx
// Payment method grid selector

function getMethodIcon(iconType) {
  const iconMap = {
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
    ),
    apple: <span className="text-2xl">🍎</span>,
    paypal: <span className="text-2xl">🅿️</span>,
    zelle: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  };
  return iconMap[iconType] || iconMap.card;
}

export default function MethodSelector({ methods, selectedMethod, onSelectMethod }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {methods.map((m) => (
        <button
          key={m.id}
          onClick={() => onSelectMethod(m.id)}
          className="relative flex flex-col items-center gap-2 px-3 py-4 rounded-xl border transition-all duration-200 hover:scale-[1.02] text-center"
          style={{
            borderColor: selectedMethod === m.id ? "#C9A84C" : "rgba(255,255,255,0.07)",
            background: selectedMethod === m.id ? "rgba(201,168,76,0.07)" : "#0f0f0f",
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
          {selectedMethod === m.id && (
            <div className="absolute top-2 left-2 w-4 h-4 rounded-full bg-[#C9A84C] flex items-center justify-center">
              <span className="text-black text-[0.5rem] font-black">✓</span>
            </div>
          )}

          <div className="text-[#C9A84C] w-7 h-7">
            {getMethodIcon(m.icon)}
          </div>
          <span
            className="text-[0.65rem] font-bold tracking-[0.1em] uppercase leading-tight"
            style={{
              color: selectedMethod === m.id ? "#C9A84C" : "rgba(255,255,255,0.6)",
            }}
          >
            {m.label}
          </span>
        </button>
      ))}
    </div>
  );
}