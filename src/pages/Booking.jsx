// Booking.jsx
// Multi-step exotic car booking form
// Dependencies: Tailwind CSS, react-router-dom

import { useState } from "react";
import { useNavigate } from "react-router-dom";

// ── Data ────────────────────────────────────────────────────
const vehicles = [
  { id: 1,  name: "Lamborghini Huracán",  category: "Supercar",      price: 1800, img: "/cars/huracan.jpg",   specs: "610 HP · V10 · RWD" },
  { id: 2,  name: "Ferrari 488 Spider",   category: "Supercar",      price: 1600, img: "/cars/ferrari.jpg",   specs: "660 HP · V8 · RWD" },
  { id: 3,  name: "Rolls-Royce Cullinan", category: "Luxury SUV",    price: 2200, img: "/cars/cullinan.jpg",  specs: "563 HP · V12 · AWD" },
  { id: 4,  name: "Bentley Continental",  category: "Luxury GT",     price: 1400, img: "/cars/bentley.jpg",   specs: "542 HP · W12 · AWD" },
  { id: 5,  name: "McLaren 720S",         category: "Supercar",      price: 2000, img: "/cars/mclaren.jpg",   specs: "710 HP · V8 · RWD" },
  { id: 6,  name: "Porsche 911 Turbo S",  category: "Sports Car",    price: 1200, img: "/cars/porsche.jpg",   specs: "640 HP · Flat-6 · AWD" },
  { id: 7,  name: "Maybach S580",         category: "Luxury Sedan",  price: 1500, img: "/cars/maybach.jpg",   specs: "503 HP · V8 · AWD" },
  { id: 8,  name: "Aston Martin DB11",    category: "Luxury GT",     price: 1300, img: "/cars/aston.jpg",     specs: "503 HP · V8 · RWD" },
];

const extras = [
  { id: "chauffeur",  label: "Professional Chauffeur",    price: 400, icon: "🧑‍✈️" },
  { id: "insurance",  label: "Premium Insurance Upgrade", price: 200, icon: "🛡️" },
  { id: "airport",    label: "Airport Delivery",          price: 150, icon: "✈️" },
  { id: "detailing",  label: "Post-Rental Detailing",     price: 100, icon: "✨" },
  { id: "child_seat", label: "Child Safety Seat",         price: 50,  icon: "🪑" },
];

const TOTAL_STEPS = 5;
const SECURITY_DEPOSIT = 1000;

const defaultBooking = {
  address: "", city: "", state: "", zip: "",
  pickupDate: "", returnDate: "", pickupTime: "10:00",
  vehicleId: null,
  extras: [],
  firstName: "", lastName: "", email: "", phone: "", licence: "",
};

// ── Main Component ───────────────────────────────────────────
export default function Booking() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [data, setData] = useState(defaultBooking);

  const update = (fields) => setData((prev) => ({ ...prev, ...fields }));

  const next = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  const back = () => setStep((s) => Math.max(s - 1, 1));

  const selectedVehicle = vehicles.find((v) => v.id === data.vehicleId);

  const nights = (() => {
    if (!data.pickupDate || !data.returnDate) return 0;
    const diff = new Date(data.returnDate) - new Date(data.pickupDate);
    return Math.max(0, Math.round(diff / 86400000));
  })();

  const extrasTotal = data.extras.reduce((sum, id) => {
    const e = extras.find((x) => x.id === id);
    return sum + (e ? e.price : 0);
  }, 0);

  const vehicleTotal = selectedVehicle ? selectedVehicle.price * nights : 0;
  const subtotal = vehicleTotal + extrasTotal;
  const grandTotal = subtotal + SECURITY_DEPOSIT;

  // Step validation
  const canProceed = (() => {
    if (step === 1) return data.address && data.city && data.pickupDate && data.returnDate && nights > 0;
    if (step === 2) return data.vehicleId !== null;
    if (step === 4) return data.firstName && data.lastName && data.email && data.phone && data.licence;
    return true;
  })();

  const handleConfirmBooking = () => {
    navigate("/payment", {
      state: {
        booking: {
          vehicleName: selectedVehicle?.name,
          nights,
          vehicleTotal,
          extrasTotal,
          subtotal,
          securityDeposit: SECURITY_DEPOSIT,
          grandTotal,
          firstName: data.firstName,
          email: data.email,
          address: data.address,
          city: data.city,
          state: data.state,
          zip: data.zip,
          pickupDate: data.pickupDate,
          returnDate: data.returnDate,
          pickupTime: data.pickupTime,
          selectedExtras: data.extras,
        },
      },
    });
  };

  return (
    <section className="bg-[#080808] w-full py-20 px-4" id="booking">
      <div className="max-w-4xl mx-auto flex flex-col gap-10">

        {/* Section heading */}
        <div className="text-center">
          <p className="text-[#C9A84C] text-[0.7rem] font-bold tracking-[0.3em] uppercase mb-3">Reserve Your Ride</p>
          <h2
            className="text-white font-black uppercase text-3xl sm:text-5xl tracking-tight"
            style={{ fontFamily: "'Bebas Neue', 'Arial Black', sans-serif" }}
          >
            Book Your <span className="text-[#C9A84C]">Exotic Car</span>
          </h2>
        </div>

        {/* Card */}
        <div className="bg-[#0f0f0f] border border-white/8 rounded-2xl overflow-hidden">

          {/* Progress bar */}
          <ProgressBar step={step} total={TOTAL_STEPS} />

          {/* Step content */}
          <div className="p-6 sm:p-10">
            {step === 1 && <Step1 data={data} update={update} nights={nights} />}
            {step === 2 && <Step2 data={data} update={update} vehicles={vehicles} />}
            {step === 3 && <Step3 data={data} update={update} extras={extras} />}
            {step === 4 && <Step4 data={data} update={update} />}
            {step === 5 && (
              <Step5
                data={data}
                selectedVehicle={selectedVehicle}
                extras={extras}
                nights={nights}
                vehicleTotal={vehicleTotal}
                extrasTotal={extrasTotal}
                securityDeposit={SECURITY_DEPOSIT}
                subtotal={subtotal}
                grandTotal={grandTotal}
              />
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-10 pt-6 border-t border-white/8">
              <button
                onClick={back}
                disabled={step === 1}
                className="px-6 py-3 text-[0.72rem] font-bold tracking-[0.14em] uppercase text-white/50 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-colors duration-200"
              >
                ← Back
              </button>

              <div className="flex items-center gap-2">
                {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full transition-all duration-300"
                    style={{ background: i + 1 === step ? "#C9A84C" : i + 1 < step ? "rgba(201,168,76,0.4)" : "rgba(255,255,255,0.1)" }}
                  />
                ))}
              </div>

              {step < TOTAL_STEPS ? (
                <button
                  onClick={next}
                  disabled={!canProceed}
                  className="px-8 py-3 text-[0.72rem] font-bold tracking-[0.14em] uppercase text-black transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed hover:brightness-110 hover:scale-[1.02]"
                  style={{
                    background: canProceed ? "#C9A84C" : "#555",
                    clipPath: "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)",
                  }}
                >
                  Next →
                </button>
              ) : (
                <button
                  onClick={handleConfirmBooking}
                  className="px-8 py-3 text-[0.72rem] font-bold tracking-[0.14em] uppercase text-black hover:brightness-110 hover:scale-[1.02] transition-all duration-200"
                  style={{
                    background: "#C9A84C",
                    clipPath: "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)",
                  }}
                >
                  Proceed to Payment ✓
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Progress Bar ─────────────────────────────────────────────
function ProgressBar({ step, total }) {
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
                style={{ color: active ? "#C9A84C" : done ? "rgba(201,168,76,0.5)" : "rgba(255,255,255,0.2)" }}
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

// ── Step 1: Delivery Address & Dates ────────────────────────
function Step1({ data, update, nights }) {
  return (
    <div className="flex flex-col gap-8">
      <StepHeading number="01" title="Delivery Address & Dates" subtitle="We'll deliver the car directly to your location." />

      {/* Address */}
      <div className="flex flex-col gap-4">
        <Label>Delivery Address</Label>
        <Input
          placeholder="Street address"
          value={data.address}
          onChange={(e) => update({ address: e.target.value })}
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <Input placeholder="City" value={data.city} onChange={(e) => update({ city: e.target.value })} />
          <Input placeholder="State" value={data.state} onChange={(e) => update({ state: e.target.value })} />
          <Input placeholder="ZIP Code" value={data.zip} onChange={(e) => update({ zip: e.target.value })} className="col-span-2 sm:col-span-1" />
        </div>
      </div>

      {/* Dates */}
      <div className="flex flex-col gap-4">
        <Label>Rental Period</Label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="flex flex-col gap-1">
            <span className="text-white/40 text-[0.65rem] tracking-[0.12em] uppercase">Pick-up Date</span>
            <Input type="date" value={data.pickupDate} min={today()} onChange={(e) => update({ pickupDate: e.target.value, returnDate: "" })} />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-white/40 text-[0.65rem] tracking-[0.12em] uppercase">Return Date</span>
            <Input type="date" value={data.returnDate} min={data.pickupDate || today()} onChange={(e) => update({ returnDate: e.target.value })} />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-white/40 text-[0.65rem] tracking-[0.12em] uppercase">Pick-up Time</span>
            <Input type="time" value={data.pickupTime} onChange={(e) => update({ pickupTime: e.target.value })} />
          </div>
        </div>

        {nights > 0 && (
          <div className="flex items-center gap-3 bg-[#C9A84C]/8 border border-[#C9A84C]/20 rounded-lg px-4 py-3">
            <span className="text-[#C9A84C] text-lg">🗓</span>
            <span className="text-[#C9A84C] text-sm font-semibold">{nights} day{nights !== 1 ? "s" : ""} rental</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Step 2: Vehicle Selection ────────────────────────────────
function Step2({ data, update, vehicles }) {
  const [filter, setFilter] = useState("All");
  const categories = ["All", ...Array.from(new Set(vehicles.map((v) => v.category)))];
  const filtered = filter === "All" ? vehicles : vehicles.filter((v) => v.category === filter);

  return (
    <div className="flex flex-col gap-6">
      <StepHeading number="02" title="Select Your Vehicle" subtitle="Choose the car that best fits your style and occasion." />

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
                  <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-[#C9A84C] flex items-center justify-center text-black text-xs font-black">✓</div>
                )}
                <span className="absolute bottom-2 left-3 text-white/60 text-[0.6rem] tracking-[0.1em] uppercase font-semibold">{v.category}</span>
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

// ── Step 3: Extras ───────────────────────────────────────────
function Step3({ data, update, extras }) {
  const toggle = (id) => {
    const current = data.extras;
    update({ extras: current.includes(id) ? current.filter((x) => x !== id) : [...current, id] });
  };

  return (
    <div className="flex flex-col gap-6">
      <StepHeading number="03" title="Add-ons & Extras" subtitle="Enhance your experience with optional upgrades." />

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
                <p className="text-[#C9A84C] text-[0.7rem] font-bold mt-0.5">+${extra.price} / day</p>
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
        <p className="text-white/25 text-xs text-center tracking-wide">No add-ons selected — you can skip this step.</p>
      )}
    </div>
  );
}

// ── Step 4: Personal Details ─────────────────────────────────
function Step4({ data, update }) {
  return (
    <div className="flex flex-col gap-6">
      <StepHeading number="04" title="Your Details" subtitle="We'll use this information to confirm your reservation." />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <Label>First Name</Label>
          <Input placeholder="John" value={data.firstName} onChange={(e) => update({ firstName: e.target.value })} />
        </div>
        <div className="flex flex-col gap-1">
          <Label>Last Name</Label>
          <Input placeholder="Doe" value={data.lastName} onChange={(e) => update({ lastName: e.target.value })} />
        </div>
        <div className="flex flex-col gap-1">
          <Label>Email Address</Label>
          <Input type="email" placeholder="john@example.com" value={data.email} onChange={(e) => update({ email: e.target.value })} />
        </div>
        <div className="flex flex-col gap-1">
          <Label>Phone Number</Label>
          <Input type="tel" placeholder="+1 (555) 000-0000" value={data.phone} onChange={(e) => update({ phone: e.target.value })} />
        </div>
        <div className="flex flex-col gap-1 sm:col-span-2">
          <Label>Driver's Licence Number</Label>
          <Input placeholder="DL-XXXXXXXX" value={data.licence} onChange={(e) => update({ licence: e.target.value })} />
        </div>
      </div>

      <p className="text-white/25 text-[0.65rem] leading-relaxed tracking-wide">
        Your information is kept private and used solely to process your reservation.
        A team member will reach out to confirm your booking.
      </p>
    </div>
  );
}

// ── Step 5: Review & Confirm ─────────────────────────────────
function Step5({ data, selectedVehicle, extras, nights, vehicleTotal, extrasTotal, securityDeposit, subtotal, grandTotal }) {
  const selectedExtras = extras.filter((e) => data.extras.includes(e.id));

  return (
    <div className="flex flex-col gap-8">
      <StepHeading number="05" title="Review & Confirm" subtitle="Double-check your booking before confirming." />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

        {/* Delivery info */}
        <ReviewCard title="📍 Delivery Address">
          <p className="text-white/70 text-sm">{data.address}</p>
          <p className="text-white/70 text-sm">{data.city}{data.state ? `, ${data.state}` : ""} {data.zip}</p>
          <p className="text-white/40 text-xs mt-2">{data.pickupDate} at {data.pickupTime} → {data.returnDate}</p>
          <p className="text-[#C9A84C] text-xs font-semibold mt-1">{nights} day{nights !== 1 ? "s" : ""}</p>
        </ReviewCard>

        {/* Vehicle */}
        <ReviewCard title="🚗 Selected Vehicle">
          {selectedVehicle ? (
            <>
              <p className="text-white font-bold text-sm">{selectedVehicle.name}</p>
              <p className="text-white/40 text-xs mt-1">{selectedVehicle.specs}</p>
              <p className="text-[#C9A84C] text-sm font-bold mt-2">${selectedVehicle.price.toLocaleString()} × {nights} days = <span className="text-base">${vehicleTotal.toLocaleString()}</span></p>
            </>
          ) : <p className="text-white/40 text-sm">No vehicle selected</p>}
        </ReviewCard>

        {/* Extras */}
        <ReviewCard title="✨ Add-ons">
          {selectedExtras.length > 0 ? (
            <ul className="flex flex-col gap-2">
              {selectedExtras.map((e) => (
                <li key={e.id} className="flex items-center justify-between text-sm">
                  <span className="text-white/70">{e.icon} {e.label}</span>
                  <span className="text-[#C9A84C] font-semibold">+${(e.price * nights).toLocaleString()}</span>
                </li>
              ))}
            </ul>
          ) : <p className="text-white/40 text-sm">No add-ons selected</p>}
        </ReviewCard>

        {/* Contact */}
        <ReviewCard title="👤 Your Details">
          <p className="text-white text-sm font-semibold">{data.firstName} {data.lastName}</p>
          <p className="text-white/50 text-xs mt-1">{data.email}</p>
          <p className="text-white/50 text-xs">{data.phone}</p>
          <p className="text-white/50 text-xs">Licence: {data.licence}</p>
        </ReviewCard>
      </div>

      {/* Pricing breakdown */}
      <div className="bg-[#141414] border border-white/8 rounded-xl p-5 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-white/50 text-xs">Vehicle Rental</span>
          <span className="text-white text-sm font-semibold">${vehicleTotal.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-white/50 text-xs">Add-ons & Extras</span>
          <span className="text-white text-sm font-semibold">${extrasTotal.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-white/50 text-xs">Security Deposit</span>
          <span className="text-white text-sm font-semibold">${securityDeposit.toLocaleString()}</span>
        </div>
        <div className="border-t border-white/8 pt-3 flex items-center justify-between">
          <span className="text-white/50 text-[0.65rem] tracking-[0.15em] uppercase font-semibold">Total Amount Due</span>
          <span className="text-[#C9A84C] font-black text-2xl" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            ${grandTotal.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Security deposit note */}
      <div className="bg-[#C9A84C]/8 border border-[#C9A84C]/20 rounded-lg px-4 py-3 flex items-start gap-3">
        <span className="text-[#C9A84C] text-lg">ℹ️</span>
        <div>
          <p className="text-[#C9A84C] text-xs font-semibold">Security Deposit Included</p>
          <p className="text-[#C9A84C]/60 text-[0.65rem] mt-1">A ${securityDeposit.toLocaleString()} security deposit is required to secure your booking. This will be held during the rental and refunded upon return of the vehicle in agreed condition.</p>
        </div>
      </div>
    </div>
  );
}

// ── Shared UI Primitives ─────────────────────────────────────
function StepHeading({ number, title, subtitle }) {
  return (
    <div className="flex items-start gap-4">
      <span
        className="font-black text-5xl leading-none select-none shrink-0"
        style={{ fontFamily: "'Bebas Neue', sans-serif", color: "rgba(201,168,76,0.15)" }}
      >
        {number}
      </span>
      <div>
        <h3 className="text-white font-extrabold text-xl uppercase tracking-wide">{title}</h3>
        <p className="text-white/40 text-sm mt-1">{subtitle}</p>
      </div>
    </div>
  );
}

function Label({ children }) {
  return <span className="text-white/50 text-[0.65rem] font-bold tracking-[0.14em] uppercase">{children}</span>;
}

function Input({ className = "", ...props }) {
  return (
    <input
      {...props}
      className={`w-full bg-[#141414] border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#C9A84C]/50 focus:bg-[#1a1a1a] transition-all duration-200 ${className}`}
    />
  );
}

function ReviewCard({ title, children }) {
  return (
    <div className="bg-[#141414] border border-white/8 rounded-xl p-5 flex flex-col gap-3">
      <p className="text-white/60 text-[0.65rem] font-bold tracking-[0.16em] uppercase">{title}</p>
      {children}
    </div>
  );
}

function today() {
  return new Date().toISOString().split("T")[0];
}