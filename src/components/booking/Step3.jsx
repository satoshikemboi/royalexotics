// components/booking/Step3.jsx
// Step 3: Add-ons & Extras

import { StepHeading } from "../shared/BookingUI";

export default function Step3({ data, update, extras }) {
  const toggle = (id) => {
    const current = data.extras;
    update({ 
      extras: current.includes(id) 
        ? current.filter((x) => x !== id) 
        : [...current, id] 
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <StepHeading 
        number="03" 
        title="Add-ons & Extras" 
        subtitle="Enhance your experience with optional upgrades." 
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {extras.map((extra) => {
          const active = data.extras.includes(extra.id);
          return (
            <button
              key={extra.id}
              onClick={() => toggle(extra.id)}
              className="flex items-center gap-4 px-5 py-4 rounded-xl border text-left transition-all duration-200 hover:scale-[1.01]"
              style={{
                borderColor: active ? "#C9A84C" : "rgba(255,255,255,0.08)",
                background: active ? "rgba(201,168,76,0.07)" : "#141414",
              }}
            >
              <span className="text-2xl">{extra.icon}</span>
              <div className="flex-1">
                <p className="text-white text-sm font-semibold">{extra.label}</p>
                <p className="text-[#C9A84C] text-[0.7rem] font-bold mt-0.5">
                  +${extra.price} / day
                </p>
              </div>
              <div
                className="w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-all duration-200"
                style={{
                  borderColor: active ? "#C9A84C" : "rgba(255,255,255,0.2)",
                  background: active ? "#C9A84C" : "transparent",
                }}
              >
                {active && <span className="text-black text-[0.6rem] font-black">✓</span>}
              </div>
            </button>
          );
        })}
      </div>

      {data.extras.length === 0 && (
        <p className="text-white/25 text-xs text-center tracking-wide">
          No add-ons selected — you can skip this step.
        </p>
      )}
    </div>
  );
}