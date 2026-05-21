// components/booking/ProgressBar.jsx
// Progress bar with step indicators

export default function ProgressBar({ step, total }) {
  const labels = ["Delivery", "Vehicle", "Extras", "Details", "Review"];
  
  return (
    <div className="border-b border-white/8 px-6 sm:px-10 pt-8 pb-0">
      <div className="flex items-start justify-between relative">
        {/* Connector line */}
        <div className="absolute top-[14px] left-0 right-0 h-[1px] bg-white/8 mx-6" />
        <div
          className="absolute top-[14px] left-6 h-[1px] bg-[#C9A84C] transition-all duration-500"
          style={{ width: `${((step - 1) / (total - 1)) * (100 - 0)}%` }}
        />

        {labels.map((label, i) => {
          const num = i + 1;
          const done = num < step;
          const active = num === step;
          return (
            <div key={label} className="flex flex-col items-center gap-2 z-10">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-[0.65rem] font-black transition-all duration-300"
                style={{
                  background: done ? "#C9A84C" : active ? "#C9A84C" : "#1a1a1a",
                  border: done || active ? "none" : "1px solid rgba(255,255,255,0.15)",
                  color: done || active ? "#000" : "rgba(255,255,255,0.3)",
                }}
              >
                {done ? "✓" : num}
              </div>
              <span
                className="text-[0.58rem] font-bold tracking-[0.12em] uppercase pb-3 hidden sm:block"
                style={{
                  color: active
                    ? "#C9A84C"
                    : done
                    ? "rgba(201,168,76,0.5)"
                    : "rgba(255,255,255,0.2)",
                }}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}