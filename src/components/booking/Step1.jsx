// components/booking/Step1.jsx
// Step 1: Delivery Address & Dates

import { StepHeading, Label, Input } from "../shared/BookingUI";

export default function Step1({ data, update, nights }) {
  return (
    <div className="flex flex-col gap-8">
      <StepHeading 
        number="01" 
        title="Delivery Address & Dates" 
        subtitle="We'll deliver the car directly to your location." 
      />

      {/* Address */}
      <div className="flex flex-col gap-4">
        <Label>Delivery Address</Label>
        <Input
          placeholder="Street address"
          value={data.address}
          onChange={(e) => update({ address: e.target.value })}
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <Input 
            placeholder="City" 
            value={data.city} 
            onChange={(e) => update({ city: e.target.value })} 
          />
          <Input 
            placeholder="State" 
            value={data.state} 
            onChange={(e) => update({ state: e.target.value })} 
          />
          <Input 
            placeholder="ZIP Code" 
            value={data.zip} 
            onChange={(e) => update({ zip: e.target.value })} 
            className="col-span-2 sm:col-span-1" 
          />
        </div>
      </div>

      {/* Dates */}
      <div className="flex flex-col gap-4">
        <Label>Rental Period</Label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="flex flex-col gap-1">
            <span className="text-white/40 text-[0.65rem] tracking-[0.12em] uppercase">
              Pick-up Date
            </span>
            <Input 
              type="date" 
              value={data.pickupDate} 
              min={today()} 
              onChange={(e) => update({ pickupDate: e.target.value, returnDate: "" })} 
            />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-white/40 text-[0.65rem] tracking-[0.12em] uppercase">
              Return Date
            </span>
            <Input 
              type="date" 
              value={data.returnDate} 
              min={data.pickupDate || today()} 
              onChange={(e) => update({ returnDate: e.target.value })} 
            />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-white/40 text-[0.65rem] tracking-[0.12em] uppercase">
              Pick-up Time
            </span>
            <Input 
              type="time" 
              value={data.pickupTime} 
              onChange={(e) => update({ pickupTime: e.target.value })} 
            />
          </div>
        </div>

        {nights > 0 && (
          <div className="flex items-center gap-3 bg-[#C9A84C]/8 border border-[#C9A84C]/20 rounded-lg px-4 py-3">
            <span className="text-[#C9A84C] text-lg">🗓</span>
            <span className="text-[#C9A84C] text-sm font-semibold">
              {nights} day{nights !== 1 ? "s" : ""} rental
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

function today() {
  return new Date().toISOString().split("T")[0];
}