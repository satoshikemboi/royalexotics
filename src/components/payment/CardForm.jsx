// components/payment/CardForm.jsx
// Credit/Debit Card Payment Form

import { useState } from "react";

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

const Input = ({ className = "", ...props }) => (
  <input
    {...props}
    className={`w-full bg-[#141414] border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#C9A84C]/50 focus:bg-[#1a1a1a] transition-all duration-200 ${className}`}
  />
);

export default function CardForm({ card, update }) {
  const fmt = (val) =>
    val
      .replace(/\D/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim()
      .slice(0, 19);

  const fmtExpiry = (val) => {
    const v = val.replace(/\D/g, "").slice(0, 4);
    return v.length >= 3 ? `${v.slice(0, 2)}/${v.slice(2)}` : v;
  };

  return (
    <div className="flex flex-col gap-5">
      <FormHeading icon="💳" title="Card Details" />
      
      <Field label="Cardholder Name">
        <Input
          placeholder="John Doe"
          value={card.name}
          onChange={(e) => update({ name: e.target.value })}
        />
      </Field>
      
      <Field label="Card Number">
        <Input
          placeholder="0000 0000 0000 0000"
          value={fmt(card.number)}
          onChange={(e) => update({ number: e.target.value.replace(/\s/g, "") })}
          maxLength={19}
        />
      </Field>
      
      <div className="grid grid-cols-2 gap-4">
        <Field label="Expiry Date">
          <Input
            placeholder="MM/YY"
            value={fmtExpiry(card.expiry)}
            onChange={(e) => update({ expiry: e.target.value })}
            maxLength={5}
          />
        </Field>
        <Field label="CVV">
          <Input
            placeholder="•••"
            type="password"
            value={card.cvv}
            onChange={(e) => update({ cvv: e.target.value })}
            maxLength={4}
          />
        </Field>
      </div>
    </div>
  );
}