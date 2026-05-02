import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { priceLabel, type Product } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

const PAGE_SIZE = 8;

export function ProductGrid({
  products,
  categories,
}: {
  products: Product[];
  categories: string[];
}) {
  const [active, setActive] = useState("All");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const { add, setOpen: setCartOpen } = useCart();

  const filtered = useMemo(() => {
    const list = active === "All" ? products : products.filter((p) => p.category === active);
    return list;
  }, [products, active]);

  const shown = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;

  const onFilter = (c: string) => {
    setActive(c);
    setVisible(PAGE_SIZE);
  };

  const quickAdd = (p: Product) => {
    add(p.id, p.sizes[2] ?? "M", 1);
    toast.success(`Added ${p.name} to bag`, {
      action: { label: "View bag", onClick: () => setCartOpen(true) },
    });
  };

  return (
    <>
      {/* Filter strip */}
      <div className="border-b border-ink/10 sticky top-16 lg:top-20 bg-bone/95 backdrop-blur z-30">
        <div className="mx-auto max-w-[1500px] px-5 lg:px-10 flex items-center gap-2 lg:gap-3 overflow-x-auto py-4">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => onFilter(c)}
              className={`whitespace-nowrap font-display text-sm tracking-[0.12em] px-4 py-2 border transition ${
                active === c ? "bg-ink text-bone border-ink" : "border-ink/20 hover:border-ink"
              }`}
            >
              {c.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <section className="mx-auto max-w-[1500px] px-5 lg:px-10 py-12 lg:py-16">
        <div className="flex justify-between items-baseline mb-8">
          <p className="text-sm text-muted-foreground">{filtered.length} product{filtered.length === 1 ? "" : "s"}</p>
          <button className="font-display text-sm tracking-[0.15em]">SORT: NEW IN ↓</button>
        </div>

        {filtered.length === 0 ? (
          <p className="py-20 text-center text-muted-foreground">No products in this category yet.</p>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5">
            {shown.map((p) => (
              <article key={p.id} className="group">
                <Link to="/product/$id" params={{ id: p.id }} className="block">
                  <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                    <img src={p.img} alt={p.name} loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    {p.tag && (
                      <span className="absolute top-3 left-3 bg-ink text-bone font-display text-[10px] tracking-[0.2em] px-2 py-1">{p.tag}</span>
                    )}
                  </div>
                </Link>
                <button
                  onClick={(e) => { e.preventDefault(); quickAdd(p); }}
                  className="block w-full mt-2 bg-bone border border-ink/30 text-ink font-display tracking-[0.15em] text-xs py-2.5 hover:bg-ink hover:text-bone transition"
                >
                  + QUICK ADD
                </button>
                <Link to="/product/$id" params={{ id: p.id }}
                  className="mt-2 flex justify-between items-baseline gap-3">
                  <h3 className="text-sm font-medium">{p.name}</h3>
                  <p className="font-display tracking-wider text-sm">{priceLabel(p.price)}</p>
                </Link>
              </article>
            ))}
          </div>
        )}

        {hasMore && (
          <div className="mt-14 text-center">
            <button onClick={() => setVisible((v) => v + PAGE_SIZE)} className="btn-ink">
              LOAD MORE
            </button>
          </div>
        )}
      </section>
    </>
  );
}
