// components/payment/CryptoForm.jsx
// Cryptocurrency Payment Form with Address Generation

const COINS = [
  { id: "btc",  label: "Bitcoin",  symbol: "BTC", color: "#F7931A" },
  { id: "eth",  label: "Ethereum", symbol: "ETH", color: "#627EEA" },
  { id: "usdc", label: "USDC",     symbol: "USDC",color: "#2775CA" },
  { id: "usdt", label: "Tether",   symbol: "USDT",color: "#26A17B" },
];

const FormHeading = ({ icon, title }) => (
  <div className="flex items-center gap-3">
    <span className="text-2xl">{icon}</span>
    <h3 className="text-white font-extrabold text-base uppercase tracking-wide">
      {title}
    </h3>
  </div>
);

const Field = ({ label, children }) => (
  <div className="flex flex-col gap-2">
    <label className="text-white/40 text-[0.65rem] font-bold tracking-[0.14em] uppercase">
      {label}
    </label>
    {children}
  </div>
);

const generateWalletAddress = () => {
  const chars = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
  let address = "bc1q";
  for (let i = 0; i < 56; i++) {
    address += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return address;
};

export default function CryptoForm({
  coin,
  setCoin,
  total,
  savings,
  walletGenerated,
  walletAddress,
  onGenerateAddress,
}) {
  const selected = COINS.find((c) => c.id === coin);

  return (
    <div className="flex flex-col gap-5">
      <FormHeading icon="₿" title="Pay with Crypto" />

      {/* Savings banner */}
      <div className="rounded-xl px-4 py-3 flex items-center gap-3 border border-green-500/20 bg-green-500/5">
        <span className="text-green-400 text-xl">🎉</span>
        <div>
          <p className="text-green-400 text-sm font-bold">You save ${savings.toLocaleString()}!</p>
          <p className="text-green-400/60 text-xs">
            25% discount applied automatically when paying with crypto.
          </p>
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
                background: coin === c.id ? `${c.color}15` : "#141414",
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
        <p className="text-white/50 text-[0.65rem] uppercase tracking-[0.14em] font-bold">
          Send exactly
        </p>
        <p
          className="text-[#C9A84C] font-black text-2xl"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          ${total.toLocaleString()}{" "}
          <span className="text-base text-white/30">USD in {selected.symbol}</span>
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
          <p className="text-white/50 text-[0.65rem] uppercase tracking-[0.14em] font-bold">
            Send to wallet address
          </p>
          <div className="bg-[#141414] rounded-lg p-3 font-mono text-[0.7rem] text-[#C9A84C] break-all border border-white/5 select-all cursor-pointer hover:border-[#C9A84C]/50 transition-colors">
            {walletAddress}
          </div>
          <p className="text-white/25 text-[0.6rem] leading-relaxed">
            Payment confirmed after 1 network confirmation. Do not send from exchange — 
            use your personal wallet.
          </p>
        </div>
      )}
    </div>
  );
}