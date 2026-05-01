import { Link } from "@tanstack/react-router";
import { Search, ShoppingBag, User, Menu, X } from "lucide-react";
import { useState } from "react";

const nav = [
  { label: "Men", to: "/men" as const },
  { label: "Women", to: "/women" as const },
  { label: "New Drop", to: "/men" as const },
  { label: "Stores", to: "/stores" as const },
  { label: "About", to: "/about" as const },
  { label: "Contact", to: "/contact" as const },
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-bone/90 backdrop-blur border-b border-ink/15">
      <div className="mx-auto max-w-[1500px] px-5 lg:px-10 h-16 lg:h-20 flex items-center justify-between gap-6">
        <button
          className="lg:hidden p-2 -ml-2"
          aria-label="Open menu"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>

        <Link to="/" className="flex flex-col items-center lg:items-start leading-none">
          <span className="font-display text-2xl lg:text-3xl tracking-tight">CALIROOTS</span>
          <span className="hidden lg:block font-display text-[10px] tracking-[0.4em] text-muted-foreground -mt-1">
            CALIFORNIA
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-9">
          {nav.map((n) => (
            <Link
              key={n.label}
              to={n.to}
              className="font-display text-[15px] tracking-[0.12em] hover:text-hot transition-colors relative group"
              activeProps={{ className: "text-hot" }}
            >
              {n.label}
              <span className="absolute left-0 -bottom-1 h-[2px] bg-ink w-0 group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 lg:gap-3">
          <button aria-label="Search" className="p-2 hover:text-hot transition">
            <Search className="size-5" />
          </button>
          <button aria-label="Account" className="p-2 hover:text-hot transition hidden sm:inline-flex">
            <User className="size-5" />
          </button>
          <button aria-label="Bag" className="p-2 hover:text-hot transition relative">
            <ShoppingBag className="size-5" />
            <span className="absolute -top-0.5 -right-0.5 bg-hot text-bone text-[10px] font-bold rounded-full size-4 flex items-center justify-center">
              0
            </span>
          </button>
        </div>
      </div>

      {open && (
        <nav className="lg:hidden border-t border-ink/15 bg-bone">
          <ul className="flex flex-col p-5 gap-4">
            {nav.map((n) => (
              <li key={n.label}>
                <Link
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="font-display text-2xl tracking-wide block"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
