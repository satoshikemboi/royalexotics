// constants/bookingData.js
// Booking data and constants

export const VEHICLES = [
  { id: 1,  name: "Lamborghini Huracán",  category: "Supercar",      price: 1800, img: "/cars/huracan.jpg",   specs: "610 HP · V10 · RWD" },
  { id: 2,  name: "Ferrari 488 Spider",   category: "Supercar",      price: 1600, img: "/cars/ferrari.jpg",   specs: "660 HP · V8 · RWD" },
  { id: 3,  name: "Rolls-Royce Cullinan", category: "Luxury SUV",    price: 2200, img: "/cars/cullinan.jpg",  specs: "563 HP · V12 · AWD" },
  { id: 4,  name: "Bentley Continental",  category: "Luxury GT",     price: 1400, img: "/cars/bentley.jpg",   specs: "542 HP · W12 · AWD" },
  { id: 5,  name: "McLaren 720S",         category: "Supercar",      price: 2000, img: "/cars/mclaren.jpg",   specs: "710 HP · V8 · RWD" },
  { id: 6,  name: "Porsche 911 Turbo S",  category: "Sports Car",    price: 1200, img: "/cars/porsche.jpg",   specs: "640 HP · Flat-6 · AWD" },
  { id: 7,  name: "Maybach S580",         category: "Luxury Sedan",  price: 1500, img: "/cars/maybach.jpg",   specs: "503 HP · V8 · AWD" },
  { id: 8,  name: "Aston Martin DB11",    category: "Luxury GT",     price: 1300, img: "/cars/aston.jpg",     specs: "503 HP · V8 · RWD" },
];

export const EXTRAS = [
  { id: "chauffeur",  label: "Professional Chauffeur",    price: 400, icon: "🧑‍✈️" },
  { id: "insurance",  label: "Premium Insurance Upgrade", price: 200, icon: "🛡️" },
  { id: "airport",    label: "Airport Delivery",          price: 150, icon: "✈️" },
  { id: "detailing",  label: "Post-Rental Detailing",     price: 100, icon: "✨" },
  { id: "child_seat", label: "Child Safety Seat",         price: 50,  icon: "🪑" },
];

export const TOTAL_STEPS = 5;
export const SECURITY_DEPOSIT = 1000;

export const DEFAULT_BOOKING = {
  address: "", 
  city: "", 
  state: "", 
  zip: "",
  pickupDate: "", 
  returnDate: "", 
  pickupTime: "10:00",
  vehicleId: null,
  extras: [],
  firstName: "", 
  lastName: "", 
  email: "", 
  phone: "", 
  licence: "",
};