// components/booking/Step5.jsx
// Step 5: Review & Confirm

import { StepHeading, ReviewCard } from "../shared/BookingUI";

export default function Step5({ 
  data, 
  selectedVehicle, 
  extras, 
  nights, 
  vehicleTotal, 
  extrasTotal, 
  securityDeposit, 
  subtotal, 
  grandTotal 
}) {
  const selectedExtras = extras.filter((e) => data.extras.includes(e.id));

  return (
    <div className="flex flex-col gap-8">
      <StepHeading 
        number="05" 
        title="Review & Confirm" 
        subtitle="Double-check your booking before confirming." 
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Delivery info */}
        <ReviewCard title="📍 Delivery Address">
          <p className="text-white/70 text-sm">{data.address}</p>
          <p className="text-white/70 text-sm">
            {data.city}
            {data.state ? `, ${data.state}` : ""} {data.zip}
          </p>
          <p className="text-white/40 text-xs mt-2">
            {data.pickupDate} at {data.pickupTime} → {data.returnDate}
          </p>
          <p className="text-[#C9A84C] text-xs font-semibold mt-1">
            {nights} day{nights !== 1 ? "s" : ""}
          </p>
        </ReviewCard>

        {/* Vehicle */}
        <ReviewCard title="🚗 Selected Vehicle">
          {selectedVehicle ? (
            <>
              <p className="text-white font-bold text-sm">{selectedVehicle.name}</p>
              <p className="text-white/40 text-xs mt-1">{selectedVehicle.specs}</p>
              <p className="text-[#C9A84C] text-sm font-bold mt-2">
                ${selectedVehicle.price.toLocaleString()} × {nights} days = 
                <span className="text-base"> ${vehicleTotal.toLocaleString()}</span>
              </p>
            </>
          ) : (
            <p className="text-white/40 text-sm">No vehicle selected</p>
          )}
        </ReviewCard>

        {/* Extras */}
        <ReviewCard title="✨ Add-ons">
          {selectedExtras.length > 0 ? (
            <ul className="flex flex-col gap-2">
              {selectedExtras.map((e) => (
                <li key={e.id} className="flex items-center justify-between text-sm">
                  <span className="text-white/70">
                    {e.icon} {e.label}
                  </span>
                  <span className="text-[#C9A84C] font-semibold">
                    +${(e.price * nights).toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-white/40 text-sm">No add-ons selected</p>
          )}
        </ReviewCard>

        {/* Contact */}
        <ReviewCard title="👤 Your Details">
          <p className="text-white text-sm font-semibold">
            {data.firstName} {data.lastName}
          </p>
          <p className="text-white/50 text-xs mt-1">{data.email}</p>
          <p className="text-white/50 text-xs">{data.phone}</p>
          <p className="text-white/50 text-xs">Licence: {data.licence}</p>
        </ReviewCard>
      </div>

      {/* Pricing breakdown */}
      <div className="bg-[#141414] border border-white/8 rounded-xl p-5 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-white/50 text-xs">Vehicle Rental</span>
          <span className="text-white text-sm font-semibold">
            ${vehicleTotal.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-white/50 text-xs">Add-ons & Extras</span>
          <span className="text-white text-sm font-semibold">
            ${extrasTotal.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-white/50 text-xs">Security Deposit</span>
          <span className="text-white text-sm font-semibold">
            ${securityDeposit.toLocaleString()}
          </span>
        </div>
        <div className="border-t border-white/8 pt-3 flex items-center justify-between">
          <span className="text-white/50 text-[0.65rem] tracking-[0.15em] uppercase font-semibold">
            Total Amount Due
          </span>
          <span 
            className="text-[#C9A84C] font-black text-2xl" 
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            ${grandTotal.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Security deposit note */}
      <div className="bg-[#C9A84C]/8 border border-[#C9A84C]/20 rounded-lg px-4 py-3 flex items-start gap-3">
        <span className="text-[#C9A84C] text-lg">ℹ️</span>
        <div>
          <p className="text-[#C9A84C] text-xs font-semibold">
            Security Deposit Included
          </p>
          <p className="text-[#C9A84C]/60 text-[0.65rem] mt-1">
            A ${securityDeposit.toLocaleString()} security deposit is required to secure 
            your booking. This will be held during the rental and refunded upon return 
            of the vehicle in agreed condition.
          </p>
        </div>
      </div>
    </div>
  );
}