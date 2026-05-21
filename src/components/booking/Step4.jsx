// components/booking/Step4.jsx
// Step 4: Personal Details

import { StepHeading, Label, Input } from "../shared/BookingUI";

export default function Step4({ data, update }) {
  return (
    <div className="flex flex-col gap-6">
      <StepHeading 
        number="04" 
        title="Your Details" 
        subtitle="We'll use this information to confirm your reservation." 
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <Label>First Name</Label>
          <Input 
            placeholder="John" 
            value={data.firstName} 
            onChange={(e) => update({ firstName: e.target.value })} 
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label>Last Name</Label>
          <Input 
            placeholder="Doe" 
            value={data.lastName} 
            onChange={(e) => update({ lastName: e.target.value })} 
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label>Email Address</Label>
          <Input 
            type="email" 
            placeholder="john@example.com" 
            value={data.email} 
            onChange={(e) => update({ email: e.target.value })} 
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label>Phone Number</Label>
          <Input 
            type="tel" 
            placeholder="+1 (555) 000-0000" 
            value={data.phone} 
            onChange={(e) => update({ phone: e.target.value })} 
          />
        </div>
        <div className="flex flex-col gap-1 sm:col-span-2">
          <Label>Driver's Licence Number</Label>
          <Input 
            placeholder="DL-XXXXXXXX" 
            value={data.licence} 
            onChange={(e) => update({ licence: e.target.value })} 
          />
        </div>
      </div>

      <p className="text-white/25 text-[0.65rem] leading-relaxed tracking-wide">
        Your information is kept private and used solely to process your reservation.
        A team member will reach out to confirm your booking.
      </p>
    </div>
  );
}