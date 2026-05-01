import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-ink text-bone">
      <div className="mx-auto max-w-[1500px] px-5 lg:px-10 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <h2 className="font-display text-5xl lg:text-7xl leading-[0.9]">
              JOIN THE <br />
              <span className="text-stroke-bone">CALI</span> CREW.
            </h2>
            <p className="mt-6 max-w-md text-bone/70">
              Drop your email for first dibs on new collections, secret sales and culture from the West Coast to India.
            </p>
            <form className="mt-6 flex max-w-md border border-bone/30">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-transparent px-4 py-3 text-bone placeholder:text-bone/40 outline-none"
              />
              <button className="bg-neon text-ink font-display tracking-[0.12em] px-6 hover:bg-bone transition">
                JOIN
              </button>
            </form>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-display text-sm tracking-[0.2em] text-bone/60">SHOP</h3>
            <ul className="mt-5 space-y-2.5 text-sm">
              <li><Link to="/men" className="hover:text-neon">Men</Link></li>
              <li><Link to="/women" className="hover:text-neon">Women</Link></li>
              <li><Link to="/men" className="hover:text-neon">New Arrivals</Link></li>
              <li><Link to="/men" className="hover:text-neon">Hoodies</Link></li>
              <li><Link to="/women" className="hover:text-neon">Co-ord Sets</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-display text-sm tracking-[0.2em] text-bone/60">BRAND</h3>
            <ul className="mt-5 space-y-2.5 text-sm">
              <li><Link to="/about" className="hover:text-neon">Our Story</Link></li>
              <li><Link to="/about" className="hover:text-neon">Sustainability</Link></li>
              <li><Link to="/stores" className="hover:text-neon">Stores</Link></li>
              <li><Link to="/contact" className="hover:text-neon">Contact</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="font-display text-sm tracking-[0.2em] text-bone/60">CONTACT</h3>
            <ul className="mt-5 space-y-3 text-sm">
              <li className="flex items-start gap-2.5"><MapPin className="size-4 mt-0.5 shrink-0 text-neon" /> Rajpura, Punjab, 140401</li>
              <li className="flex items-start gap-2.5"><Phone className="size-4 mt-0.5 shrink-0 text-neon" /> +91 95925 89797</li>
              <li className="flex items-start gap-2.5"><Mail className="size-4 mt-0.5 shrink-0 text-neon" /> info@thecaliroots.com</li>
            </ul>
            <div className="mt-6 flex gap-3">
              <a href="#" aria-label="Instagram" className="border border-bone/30 p-2.5 hover:bg-neon hover:text-ink hover:border-neon transition">
                <Instagram className="size-4" />
              </a>
              <a href="#" aria-label="Facebook" className="border border-bone/30 p-2.5 hover:bg-neon hover:text-ink hover:border-neon transition">
                <Facebook className="size-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-bone/15 flex flex-col md:flex-row justify-between gap-4 text-xs text-bone/50">
          <p>© {new Date().getFullYear()} The Caliroots. Where comfort meets culture.</p>
          <p className="font-display tracking-[0.2em]">EST. 2018 · MADE IN INDIA</p>
        </div>
      </div>
    </footer>
  );
}
