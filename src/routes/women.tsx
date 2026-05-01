import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ArrowRight } from "lucide-react";
import hero from "@/assets/hero-women.jpg";
import womanBlazer from "@/assets/brand-woman-blazer.jpg";
import womanHat from "@/assets/brand-woman-hat.jpg";
import womanRack from "@/assets/brand-woman-rack.jpg";
import shadesPair from "@/assets/brand-shades-pair.jpg";
import knits from "@/assets/brand-knits.jpg";
import racks from "@/assets/brand-rack.jpg";
import rackFolded from "@/assets/brand-rack-folded.jpg";
import modelsPair from "@/assets/brand-models-pair.jpg";

export const Route = createFileRoute("/women")({
  head: () => ({
    meta: [
      { title: "Women's Streetwear — Cargos, Co-ords, Denim | Caliroots" },
      {
        name: "description",
        content:
          "Caliroots women's collection: sculpted denims, effortless cargos, chic tops, co-ord sets and layering classics. Couture-inspired streetwear.",
      },
      { property: "og:title", content: "Caliroots Women — Sculpted Streetwear" },
      { property: "og:image", content: hero },
    ],
  }),
  component: Women,
});

const products = [
  { img: womanBlazer, name: "Power Blazer + Skirt", price: "₹5,899", tag: "NEW" },
  { img: womanHat, name: "Brimmed Bomber Co-ord", price: "₹4,299", tag: "BESTSELLER" },
  { img: shadesPair, name: "Cali Crew Tee Pack", price: "₹1,899" },
  { img: hero, name: "Cargo & Bomber Set", price: "₹4,999", tag: "NEW" },
  { img: womanRack, name: "Sculpted Wide Denim", price: "₹3,499" },
  { img: knits, name: "Cropped Heavy Knit", price: "₹2,299" },
  { img: rackFolded, name: "Loungewear Track Set", price: "₹3,799" },
  { img: modelsPair, name: "Cali Twin Co-ord", price: "₹4,499" },
  { img: racks, name: "Slouchy Carpenter Jean", price: "₹3,299" },
  { img: shadesPair, name: "Boxy Cropped Tee", price: "₹1,499" },
  { img: womanHat, name: "Cardigan Layering Set", price: "₹3,899" },
  { img: womanBlazer, name: "Tailored Trouser", price: "₹2,799" },
];

const subcats = ["All", "Co-ord Sets", "Denim", "Cargos", "Tops & Tees", "Outerwear", "Loungewear", "Tracksuits"];

function Women() {
  return (
    <SiteLayout>
      <section className="relative bg-ink text-bone">
        <div className="absolute inset-0">
          <img src={hero} alt="" className="w-full h-full object-cover opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/30 to-transparent" />
        </div>
        <div className="relative mx-auto max-w-[1500px] px-5 lg:px-10 py-24 lg:py-36">
          <p className="font-display text-xs tracking-[0.3em] text-neon">WOMEN — SS26</p>
          <h1 className="font-display text-7xl lg:text-[10rem] leading-[0.85] mt-3">
            THE WOMEN'S <br /> <span className="text-stroke-bone">EDIT.</span>
          </h1>
          <p className="mt-5 max-w-xl text-bone/80">
            An ode to elegance and individuality — sculpted denims, effortless cargos, chic tops and co-ord sets designed to blend comfort, confidence and couture-inspired detail.
          </p>
        </div>
      </section>

      <div className="border-b border-ink/10 sticky top-16 lg:top-20 bg-bone/95 backdrop-blur z-30">
        <div className="mx-auto max-w-[1500px] px-5 lg:px-10 flex items-center gap-2 lg:gap-3 overflow-x-auto py-4">
          {subcats.map((c, i) => (
            <button key={c} className={`whitespace-nowrap font-display text-sm tracking-[0.12em] px-4 py-2 border ${i === 0 ? "bg-ink text-bone border-ink" : "border-ink/20 hover:border-ink"}`}>
              {c}
            </button>
          ))}
        </div>
      </div>

      <section className="mx-auto max-w-[1500px] px-5 lg:px-10 py-12 lg:py-16">
        <div className="flex justify-between items-baseline mb-8">
          <p className="text-sm text-muted-foreground">{products.length} products</p>
          <button className="font-display text-sm tracking-[0.15em]">SORT: NEW IN ↓</button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5">
          {products.map((p) => (
            <article key={p.name} className="group">
              <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                <img src={p.img} alt={p.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                {p.tag && (<span className="absolute top-3 left-3 bg-ink text-bone font-display text-[10px] tracking-[0.2em] px-2 py-1">{p.tag}</span>)}
                <button className="absolute inset-x-3 bottom-3 bg-bone text-ink font-display tracking-[0.15em] text-sm py-3 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-neon">+ ADD TO BAG</button>
              </div>
              <div className="mt-3 flex justify-between items-baseline gap-3">
                <h3 className="text-sm font-medium">{p.name}</h3>
                <p className="font-display tracking-wider text-sm">{p.price}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link to="/" className="btn-ink">LOAD MORE <ArrowRight className="size-4" /></Link>
        </div>
      </section>
    </SiteLayout>
  );
}
