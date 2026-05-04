import { useState, useEffect, useMemo } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Search, X } from "lucide-react";
import { useProducts, priceLabel } from "@/lib/products";
import { Link } from "@tanstack/react-router";

export function SearchOverlay({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [q, setQ] = useState("");
  const { products } = useProducts();

  useEffect(() => { if (!open) setQ(""); }, [open]);

  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return [];
    return products.filter(
      (p) => p.name.toLowerCase().includes(s) || p.category.toLowerCase().includes(s) || p.gender.includes(s)
    ).slice(0, 8);
  }, [q, products]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 bg-bone border-ink/20 top-[10%] translate-y-0">
        <div className="flex items-center gap-3 border-b border-ink/15 px-5 py-4">
          <Search className="size-5 text-muted-foreground" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search hoodies, denim, co-ords…"
            className="flex-1 bg-transparent outline-none text-base placeholder:text-muted-foreground"
          />
          <button onClick={() => onOpenChange(false)} aria-label="Close"><X className="size-5" /></button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-2">
          {!q && (
            <div className="p-6 text-center text-sm text-muted-foreground">
              Try <span className="font-display tracking-widest text-ink">HOODIES</span>, <span className="font-display tracking-widest text-ink">DENIM</span>, or <span className="font-display tracking-widest text-ink">CO-ORD</span>.
            </div>
          )}
          {q && results.length === 0 && (
            <div className="p-6 text-center text-sm text-muted-foreground">No results for "{q}".</div>
          )}
          <ul>
            {results.map((p) => (
              <li key={p.id}>
                <Link
                  to="/product/$id"
                  params={{ id: p.id }}
                  onClick={() => onOpenChange(false)}
                  className="flex items-center gap-3 p-2 hover:bg-muted transition"
                >
                  <img src={p.img} alt="" className="size-14 object-cover" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{p.name}</p>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">{p.gender} · {p.category}</p>
                  </div>
                  <p className="font-display tracking-wider text-sm">{priceLabel(p.price)}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
}
