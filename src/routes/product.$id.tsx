import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { useProducts, useProduct, priceLabel } from "@/lib/products";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { Minus, Plus, Truck, RotateCcw, ShieldCheck, ChevronRight } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/product/$id")({
  head: () => ({
    meta: [
      { title: "Product | Caliroots" },
      { name: "description", content: "Caliroots premium streetwear product details." },
    ],
  }),
  component: PDP,
});

function PDP() {
  const { id } = Route.useParams();
  const { product, loading } = useProduct(id);
  const { products } = useProducts();
  const [size, setSize] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const { add, setOpen } = useCart();

  if (loading && !product) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-2xl px-5 py-32 text-center">
          <p className="font-display tracking-widest text-sm text-muted-foreground">LOADING…</p>
        </div>
      </SiteLayout>
    );
  }

  if (!product) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-2xl px-5 py-32 text-center">
          <h1 className="font-display text-5xl">PRODUCT NOT FOUND</h1>
          <Link to="/men" className="btn-ink mt-6 inline-block">BACK TO SHOP</Link>
        </div>
      </SiteLayout>
    );
  }

  const related = products.filter((p) => p.gender === product.gender && p.id !== product.id).slice(0, 4);

  const onAdd = (openCart: boolean) => {
    if (!size) {
      toast.error("Please select a size");
      return;
    }
    add(product.id, size, qty);
    toast.success(`Added ${product.name} (size ${size}) to bag`);
    if (openCart) setOpen(true);
  };

  return (
    <SiteLayout>
      <div className="mx-auto max-w-[1500px] px-5 lg:px-10 py-6">
        <nav className="text-xs text-muted-foreground flex items-center gap-1 font-display tracking-wider">
          <Link to="/" className="hover:text-ink">HOME</Link>
          <ChevronRight className="size-3" />
          <Link to={product.gender === "men" ? "/men" : "/women"} className="hover:text-ink uppercase">{product.gender}</Link>
          <ChevronRight className="size-3" />
          <span className="text-ink truncate">{product.name}</span>
        </nav>
      </div>

      <section className="mx-auto max-w-[1500px] px-5 lg:px-10 grid lg:grid-cols-2 gap-8 lg:gap-16 pb-16">
        <div className="bg-muted aspect-[4/5] lg:aspect-[3/4] overflow-hidden">
          <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
        </div>

        <div className="lg:sticky lg:top-28 self-start space-y-6">
          {product.tag && (
            <span className="inline-block bg-ink text-bone font-display text-[10px] tracking-[0.25em] px-2 py-1">{product.tag}</span>
          )}
          <div>
            <p className="font-display text-xs tracking-[0.3em] text-hot uppercase">{product.category}</p>
            <h1 className="font-display text-4xl lg:text-6xl leading-[0.9] mt-2">{product.name}</h1>
            <p className="mt-3 font-display text-2xl tracking-wider">{priceLabel(product.price)}</p>
            <p className="text-xs text-muted-foreground mt-1">Inclusive of all taxes</p>
          </div>

          <p className="text-foreground/80 leading-relaxed">{product.description}</p>

          <div>
            <div className="flex justify-between items-baseline mb-2">
              <p className="font-display tracking-wider text-sm">SELECT SIZE</p>
              <button className="text-xs underline text-muted-foreground">Size guide</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s: string) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`size-12 border font-display tracking-wider transition ${
                    size === s ? "bg-ink text-bone border-ink" : "border-ink/20 hover:border-ink"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="font-display tracking-wider text-sm mb-2">QUANTITY</p>
            <div className="inline-flex items-center border border-ink/20">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-3 py-2" aria-label="Decrease"><Minus className="size-4" /></button>
              <span className="px-5 font-display tracking-wider">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="px-3 py-2" aria-label="Increase"><Plus className="size-4" /></button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button onClick={() => onAdd(false)} className="btn-ink justify-center">+ ADD TO BAG</button>
            <button onClick={() => onAdd(true)} className="border-2 border-ink py-3.5 font-display tracking-[0.15em] text-sm hover:bg-neon transition">
              BUY IT NOW
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-ink/10 text-xs">
            <div className="flex flex-col items-center gap-1 text-center">
              <Truck className="size-5" /><span>Free shipping</span>
            </div>
            <div className="flex flex-col items-center gap-1 text-center">
              <RotateCcw className="size-5" /><span>7-day returns</span>
            </div>
            <div className="flex flex-col items-center gap-1 text-center">
              <ShieldCheck className="size-5" /><span>Secure checkout</span>
            </div>
          </div>

          <Accordion type="single" collapsible className="border-t border-ink/10">
            <AccordionItem value="details">
              <AccordionTrigger className="font-display tracking-wider text-sm">PRODUCT DETAILS</AccordionTrigger>
              <AccordionContent className="text-foreground/80 text-sm leading-relaxed">
                {product.description} Premium fabric, garment-washed, made to last. Care: machine wash cold inside-out.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="ship">
              <AccordionTrigger className="font-display tracking-wider text-sm">SHIPPING & RETURNS</AccordionTrigger>
              <AccordionContent className="text-foreground/80 text-sm leading-relaxed">
                Free shipping pan-India. Orders ship within 24 hours. Easy 7-day returns on unworn, tagged items.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="size">
              <AccordionTrigger className="font-display tracking-wider text-sm">SIZE & FIT</AccordionTrigger>
              <AccordionContent className="text-foreground/80 text-sm leading-relaxed">
                Boxy oversized fit. Model is 6'0" wearing size M. If between sizes, size down for a relaxed fit, up for an oversized fit.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {related.length > 0 && (
        <section className="mx-auto max-w-[1500px] px-5 lg:px-10 pb-20">
          <h2 className="font-display text-3xl lg:text-5xl mb-6">YOU MAY ALSO LIKE</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5">
            {related.map((p) => (
              <Link to="/product/$id" params={{ id: p.id }} key={p.id} className="group">
                <div className="aspect-[4/5] overflow-hidden bg-muted">
                  <img src={p.img} alt={p.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="mt-3 flex justify-between gap-3">
                  <h3 className="text-sm">{p.name}</h3>
                  <p className="font-display tracking-wider text-sm">{priceLabel(p.price)}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </SiteLayout>
  );
}
