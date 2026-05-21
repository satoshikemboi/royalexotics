// components/shared/BookingUI.jsx
// Shared UI components for booking steps

export function StepHeading({ number, title, subtitle }) {
  return (
    <div className="flex items-start gap-4">
      <span
        className="font-black text-5xl leading-none select-none shrink-0"
        style={{ fontFamily: "'Bebas Neue', sans-serif", color: "rgba(201,168,76,0.15)" }}
      >
        {number}
      </span>
      <div>
        <h3 className="text-white font-extrabold text-xl uppercase tracking-wide">
          {title}
        </h3>
        <p className="text-white/40 text-sm mt-1">{subtitle}</p>
      </div>
    </div>
  );
}

export function Label({ children }) {
  return (
    <span className="text-white/50 text-[0.65rem] font-bold tracking-[0.14em] uppercase">
      {children}
    </span>
  );
}

export function Input({ className = "", ...props }) {
  return (
    <input
      {...props}
      className={`w-full bg-[#141414] border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#C9A84C]/50 focus:bg-[#1a1a1a] transition-all duration-200 ${className}`}
    />
  );
}

export function ReviewCard({ title, children }) {
  return (
    <div className="bg-[#141414] border border-white/8 rounded-xl p-5 flex flex-col gap-3">
      <p className="text-white/60 text-[0.65rem] font-bold tracking-[0.16em] uppercase">
        {title}
      </p>
      {children}
    </div>
  );
}