// pages/Booking.jsx
// Main booking page with split steps

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ProgressBar from "../components/booking/ProgressBar";
import Step1 from "../components/booking/Step1";
import Step2 from "../components/booking/Step2";
import Step3 from "../components/booking/Step3";
import Step4 from "../components/booking/Step4";
import Step5 from "../components/booking/Step5";

import { VEHICLES, EXTRAS, TOTAL_STEPS, SECURITY_DEPOSIT, DEFAULT_BOOKING } from "../constants/bookingData";

export default function Booking() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [data, setData] = useState(DEFAULT_BOOKING);

  const update = (fields) => setData((prev) => ({ ...prev, ...fields }));

  const next = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  const back = () => setStep((s) => Math.max(s - 1, 1));

  const selectedVehicle = VEHICLES.find((v) => v.id === data.vehicleId);

  // Calculate rental nights
  const nights = (() => {
    if (!data.pickupDate || !data.returnDate) return 0;
    const diff = new Date(data.returnDate) - new Date(data.pickupDate);
    return Math.max(0, Math.round(diff / 86400000));
  })();

  // Calculate extras total
  const extrasTotal = data.extras.reduce((sum, id) => {
    const e = EXTRAS.find((x) => x.id === id);
    return sum + (e ? e.price * nights : 0);
  }, 0);

  // Calculate totals
  const vehicleTotal = selectedVehicle ? selectedVehicle.price * nights : 0;
  const subtotal = vehicleTotal + extrasTotal;
  const grandTotal = subtotal + SECURITY_DEPOSIT;

  // Step validation
  const canProceed = (() => {
    if (step === 1) {
      return data.address && data.city && data.pickupDate && data.returnDate && nights > 0;
    }
    if (step === 2) {
      return data.vehicleId !== null;
    }
    if (step === 4) {
      return data.firstName && data.lastName && data.email && data.phone && data.licence;
    }
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
          <p className="text-[#C9A84C] text-[0.7rem] font-bold tracking-[0.3em] uppercase mb-3">
            Reserve Your Ride
          </p>
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
            {step === 2 && <Step2 data={data} update={update} vehicles={VEHICLES} />}
            {step === 3 && <Step3 data={data} update={update} extras={EXTRAS} />}
            {step === 4 && <Step4 data={data} update={update} />}
            {step === 5 && (
              <Step5
                data={data}
                selectedVehicle={selectedVehicle}
                extras={EXTRAS}
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
                    style={{
                      background:
                        i + 1 === step
                          ? "#C9A84C"
                          : i + 1 < step
                          ? "rgba(201,168,76,0.4)"
                          : "rgba(255,255,255,0.1)",
                    }}
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