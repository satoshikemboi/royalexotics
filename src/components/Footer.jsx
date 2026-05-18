

const quickLinks = [
  "Home", "About Us", "Our Fleet", "FAQ",
  "Memberships", "Blog", "Terms of Service",
  "Privacy Policy", "Contact Us",
];

const miamiLinks = [
  "Royal Exotics Miami", "Miami Fleet", "Miami Weddings",
  "Miami Chauffeur Services", "Miami Corporate Events",
  "Downtown Miami", "Miami Beach", "Brickell",
  "South Beach", "Wynwood",
  "Miami International Airport (MIA)",
  "Fort Lauderdale Airport (FLL)",
];

const laLinks = [
  "Royal Exotics Los Angeles", "LA Fleet", "LA Weddings",
  "LA Chauffeur Services", "LA Corporate Events",
  "Downtown Los Angeles", "Beverly Hills", "West Hollywood",
  "Santa Monica", "Malibu",
  "LAX Airport",
  "Burbank Airport (BUR)",
];

const nyLinks = [
  "Royal Exotics New York", "NY Fleet", "NY Weddings",
  "NY Chauffeur Services", "NY Corporate Events",
  "Manhattan", "Brooklyn", "The Hamptons",
  "Jersey City", "White Plains",
  "JFK Airport",
  "Newark Airport (EWR)",
];

const brandLinks = [
  "Lamborghini Rentals", "Ferrari Rentals", "Rolls-Royce Rentals",
  "Aston Martin Rentals", "Bentley Rentals",
  "McLaren Rentals", "Porsche Rentals", "Maybach Rentals",
];

export default function Footer() {
  return (
    <footer className="bg-[#080808] border-t border-white/5 font-[Barlow,sans-serif]">

      {/* Main footer grid */}
      <div className="max-w-[1360px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">

          {/* Brand column — spans 1 col */}
          <div className="lg:col-span-1 flex flex-col gap-5">
            {/* Logo */}
            <div className="flex items-baseline gap-1 select-none pr-4">
              <span
                className="text-white text-2xl leading-none font-black"
                style={{ fontFamily: "'Bebas Neue', 'Arial Black', sans-serif", letterSpacing: "0.05em" }}
              >
                ROYAL
              </span>
              <span
                className="text-[#C9A84C] text-2xl leading-none font-black"
                style={{ fontFamily: "'Bebas Neue', 'Arial Black', sans-serif", letterSpacing: "0.05em" }}
              >
                EXOTICS
              </span>
            </div>

            {/* Description */}
            <p className="text-white/45 text-xs leading-relaxed">
              Royal Exotics provides high-end exotic luxury car rental services
              for any occasion in Miami, Los Angeles & New York. Our commitment
              to quality and exceptional customer service sets us apart. Thank
              you for choosing us for your luxury car rental needs.
            </p>

            {/* Social */}
            <div className="flex flex-col gap-3 mt-1">
              <p className="text-white text-[0.65rem] font-bold tracking-[0.2em] uppercase">
                Follow Us
              </p>
              <div className="flex gap-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 border border-white/20 flex items-center justify-center text-white/70 hover:text-[#C9A84C] hover:border-[#C9A84C]/50 transition-all duration-200"
                  aria-label="Facebook"
                >
                  <FacebookIcon />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 border border-white/20 flex items-center justify-center text-white/70 hover:text-[#C9A84C] hover:border-[#C9A84C]/50 transition-all duration-200"
                  aria-label="Instagram"
                >
                  <InstagramIcon />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <FooterColumn title="Quick Links" links={quickLinks} />

          {/* Miami */}
          <FooterColumn title="Miami" links={miamiLinks} />

          {/* Los Angeles */}
          <FooterColumn title="Los Angeles" links={laLinks} />

          {/* New York */}
          <FooterColumn title="New York" links={nyLinks} />

          {/* Brand Rentals */}
          <FooterColumn title="Royal Exotics" links={brandLinks} />
        </div>
      </div>

      {/* Gold divider */}
      <div
        className="h-[1px] opacity-20"
        style={{ background: "linear-gradient(90deg, transparent, #C9A84C 30%, #C9A84C 70%, transparent)" }}
      />

      {/* Bottom bar */}
      <div className="max-w-[1360px] mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-center gap-2">
        <p className="text-white/30 text-[0.65rem] tracking-[0.12em] uppercase text-center">
          Royal Exotics | Exotic Car Rentals in Miami, LA &amp; New York — © 2026 All Rights Reserved |{" "}
          <a href="#" className="text-[#C9A84C] hover:underline">Sitemap</a>
        </p>
      </div>
    </footer>
  );
}

/* ── Reusable column ─────────────────────────────────────── */
function FooterColumn({ title, links }) {
  return (
    <div className="flex flex-col gap-3">
      <h4 className="text-white text-[0.7rem] font-extrabold tracking-[0.18em] uppercase mb-1">
        {title}
      </h4>
      <ul className="flex flex-col gap-[10px]">
        {links.map((link) => (
          <li key={link}>
            <a
              href="#"
              className="text-white/50 hover:text-[#C9A84C] text-[0.7rem] font-medium tracking-[0.08em] uppercase transition-colors duration-150 leading-snug"
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── Inline SVG Icons ────────────────────────────────────── */
function FacebookIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987H7.898V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.975.975 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.975.975-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.975-.975-1.246-2.242-1.308-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608C4.516 2.497 5.783 2.225 7.15 2.163 8.416 2.105 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}