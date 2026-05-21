// components/booking/Step2.jsx
// Step 2: Vehicle Selection

import { useState } from "react";
import { StepHeading } from "../shared/BookingUI";

export default function Step2({ data, update, vehicles }) {
  const [filter, setFilter] = useState("All");
  const categories = ["All", ...Array.from(new Set(vehicles.map((v) => v.category)))];
  const filtered = filter === "All" ? vehicles : vehicles.filter((v) => v.category === filter);

  return (
    <div className="flex flex-col gap-6">
      <StepHeading 
        number="02" 
        title="Select Your Vehicle" 
        subtitle="Choose the car that best fits your style and occasion." 
      />

      {/* Category filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className="px-4 py-1.5 text-[0.65rem] font-bold tracking-[0.12em] uppercase rounded-full border transition-all duration-200"
            style={{
              background: filter === cat ? "#C9A84C" : "transparent",
              borderColor: filter === cat ? "#C9A84C" : "rgba(255,255,255,0.15)",
              color: filter === cat ? "#000" : "rgba(255,255,255,0.5)",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Vehicle grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filtered.map((v) => {
          const selected = data.vehicleId === v.id;
          return (
            <button
              key={v.id}
              onClick={() => update({ vehicleId: v.id })}
              className="text-left rounded-xl border overflow-hidden transition-all duration-200 hover:scale-[1.01]"
              style={{
                borderColor: selected ? "#C9A84C" : "rgba(255,255,255,0.08)",
                background: selected ? "rgba(201,168,76,0.06)" : "#141414",
              }}
            >
              {/* Car image placeholder */}
              <div
                className="w-full h-36 bg-cover bg-center relative"
                style={{ backgroundImage: `url(${v.img})`, backgroundColor: "#1a1a1a" }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                {selected && (
                  <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-[#C9A84C] flex items-center justify-center text-black text-xs font-black">
                    ✓
                  </div>
                )}
                <span className="absolute bottom-2 left-3 text-white/60 text-[0.6rem] tracking-[0.1em] uppercase font-semibold">
                  {v.category}
                </span>
              </div>

              <div className="p-4 flex items-start justify-between gap-2">
                <div>
                  <p className="text-white font-bold text-sm">{v.name}</p>
                  <p className="text-white/40 text-[0.65rem] mt-1 tracking-wide">{v.specs}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[#C9A84C] font-black text-base">${v.price.toLocaleString()}</p>
                  <p className="text-white/30 text-[0.6rem]">/ day</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}