import { useState } from "react";
import { Link } from "react-router-dom";

const navLinks = [
  { label: "Home", href: "/", active: true },
  { label: "About Us", href: "/about" },
  {
    label: "Our Fleet",
    dropdown: [
      { label: "Supercars",      href: "/fleet/supercars" },
      { label: "Luxury Sedans",  href: "/fleet/luxury-sedans" },
      { label: "SUVs",           href: "/fleet/suvs" },
      { label: "Convertibles",   href: "/fleet/convertibles" },
    ],
  },
  { label: "Memberships", href: "/memberships" },
  { label: "FAQ",         href: "/faq" },
  {
    label: "Locations",
    dropdown: [
      { label: "Miami",       href: "/locations/miami" },
      { label: "Los Angeles", href: "/locations/los-angeles" },
      { label: "New York",    href: "/locations/new-york" },
    ],
  },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  return (
    <nav className="bg-[#0d0d0d] border-b border-[#1e1e1e] font-[Barlow,sans-serif]">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex items-center justify-between h-[68px]">

          {/* ── Logo ── */}
          <Link to="/" className="flex items-baseline gap-1 select-none">
            <span
              className="text-white text-[1.75rem] leading-none"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em" }}
            >
              ROYAL
            </span>
            <span
              className="text-[#C9A84C] text-[1.75rem] leading-none"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em" }}
            >
              EXOTICS
            </span>
          </Link>

          {/* ── Desktop Nav ── */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div
                  key={link.label}
                  className="relative group"
                  onMouseEnter={() => setOpenDropdown(link.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <span className="flex items-center gap-1 text-[#ccc] group-hover:text-[#C9A84C] text-[0.78rem] font-semibold tracking-[0.12em] uppercase cursor-pointer transition-colors duration-200 pb-[2px] relative after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:bg-[#C9A84C] after:w-0 group-hover:after:w-full after:transition-all after:duration-250">
                    {link.label}
                    <svg
                      className="w-[8px] h-[8px] transition-transform duration-200 group-hover:rotate-180"
                      viewBox="0 0 10 6"
                      fill="none"
                    >
                      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>

                  {/* Dropdown */}
                  <div className="absolute top-[calc(100%+18px)] left-1/2 -translate-x-1/2 bg-[#111] border border-[#2a2a2a] border-t-2 border-t-[#C9A84C] min-w-[160px] py-2 rounded-[2px] opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-[-6px] group-hover:translate-y-0 transition-all duration-200 z-50">
                    {link.dropdown.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="block px-5 py-[9px] text-[#bbb] hover:text-[#C9A84C] hover:bg-[rgba(201,168,76,0.07)] text-[0.75rem] font-medium tracking-[0.1em] uppercase transition-all duration-150 whitespace-nowrap"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`relative text-[0.78rem] font-semibold tracking-[0.12em] uppercase pb-[2px] transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:bg-[#C9A84C] after:transition-all after:duration-250 hover:text-[#C9A84C] hover:after:w-full ${
                    link.active ? "text-[#C9A84C] after:w-full" : "text-[#ccc] after:w-0"
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* ── CTA + Hamburger ── */}
          <div className="flex items-center gap-4">
            {/* ✅ Fixed: Link wraps the button correctly */}
            <Link to="/booking">
              <button
                className="bg-[#C9A84C] hover:bg-[#e0be6a] text-black text-[0.72rem] font-bold tracking-[0.14em] uppercase px-5 py-[10px] border-none cursor-pointer transition-all duration-200 hover:scale-[1.03]"
                style={{ clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)" }}
              >
                Book Now
              </button>
            </Link>

            {/* Hamburger (mobile) */}
            <button
              className="lg:hidden flex flex-col gap-[5px] cursor-pointer bg-transparent border-none p-1"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <span
                className="block w-6 h-[2px] bg-[#C9A84C] transition-all duration-300"
                style={{ transform: mobileOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }}
              />
              <span
                className="block w-6 h-[2px] bg-[#C9A84C] transition-all duration-300"
                style={{ opacity: mobileOpen ? 0 : 1 }}
              />
              <span
                className="block w-6 h-[2px] bg-[#C9A84C] transition-all duration-300"
                style={{ transform: mobileOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Gold separator line */}
      <div
        className="h-[2px] opacity-50"
        style={{ background: "linear-gradient(90deg, transparent 0%, #C9A84C 20%, #C9A84C 80%, transparent 100%)" }}
      />

      {/* ── Mobile Menu ── */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#111] border-t border-[#222] px-6 pb-5 pt-3">
          {navLinks.map((link) => (
            <div key={link.label}>
              {link.dropdown ? (
                <div
                  className="text-[#ccc] text-[0.78rem] font-semibold tracking-[0.12em] uppercase py-[10px] cursor-pointer hover:text-[#C9A84C] transition-colors duration-150"
                  onClick={() =>
                    setOpenDropdown(openDropdown === link.label ? null : link.label)
                  }
                >
                  {link.label}
                  <svg
                    className={`inline-block ml-2 w-[8px] h-[8px] transition-transform duration-200 ${
                      openDropdown === link.label ? "rotate-180" : ""
                    }`}
                    viewBox="0 0 10 6"
                    fill="none"
                  >
                    <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              ) : (
                <Link
                  href={link.href}
                  className="block text-[#ccc] text-[0.78rem] font-semibold tracking-[0.12em] uppercase py-[10px] hover:text-[#C9A84C] transition-colors duration-150"
                >
                  {link.label}
                </Link>
              )}

              {link.dropdown && openDropdown === link.label &&
                link.dropdown.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="block pl-4 py-[6px] text-[#888] hover:text-[#C9A84C] text-[0.72rem] tracking-[0.1em] uppercase transition-colors duration-150"
                  >
                    {item.label}
                  </Link>
                ))}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
}