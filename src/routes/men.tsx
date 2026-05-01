import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ArrowRight } from "lucide-react";
import hero from "@/assets/hero-men.jpg";
import knits from "@/assets/brand-knits.jpg";
import hoodieDuo from "@/assets/brand-hoodie-duo.jpg";
import racks from "@/assets/brand-rack.jpg";
import suitBw from "@/assets/brand-suit-bw.jpg";
import manShades from "@/assets/brand-man-shades.jpg";
import manHat from "@/assets/brand-man-hat.jpg";
import manGreen from "@/assets/brand-man-green.jpg";
import redHoodie from "@/assets/brand-red-hoodie.jpg";

export const Route = createFileRoute("/men")({
  head: () => ({
    meta: [
      { title: "Men's Streetwear — Hoodies, Denim, Tees | Caliroots" },
      {
        name: "description",
        content:
          "Shop the Caliroots men's collection: oversized hoodies, sculpted denim, graphic tees, bombers, shackets and tailored streetwear made for India.",
      },
      { property: "og:title", content: "Caliroots Men — Streetwear Essentials" },
      { property: "og:image", content: hero },
    ],
  }),
  component: Men,
});

const products = [
  { img: hoodieDuo, name: "Caliroots Crew Hoodie", price: "₹2,799", tag: "NEW" },
  { img: manShades, name: "Linen Co-ord Set", price: "₹3,499" },
  { img: manHat, name: "Wide-Brim Vest Set", price: "₹3,199", tag: "BESTSELLER" },
  { img: redHoodie, name: "Caliroots Logo Hoodie — Red", price: "₹2,899", tag: "ICON" },
  { img: knits, name: "Heavyweight Knit", price: "₹2,499" },
  { img: racks, name: "Loose Carpenter Denim", price: "₹3,299" },
  { img: suitBw, name: "Tailored Two-Piece", price: "₹6,499" },
  { img: manGreen, name: "Boxy Polo + Trouser", price: "₹3,899" },
];

const subcats = ["All", "Hoodies", "T-Shirts", "Denim", "Trousers", "Outerwear", "Co-ords", "Accessories"];

function Men() {
  return (
    <SiteLayout>
      <section className="relative bg-ink text-bone">
        <div className="absolute inset-0">
          <img src={hero} alt="" className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/40 to-transparent" />
        </div>
        <div className="relative mx-auto max-w-[1500px] px-5 lg:px-10 py-24 lg:py-36">
          <p className="font-display text-xs tracking-[0.3em] text-neon">MEN — SS26</p>
          <h1 className="font-display text-7xl lg:text-[10rem] leading-[0.85] mt-3">
            THE MEN'S <br /> <span className="text-stroke-bone">EDIT.</span>
          </h1>
          <p className="mt-5 max-w-xl text-bone/80">
            Crisp shirts, statement tees, tailored denim, sophisticated trousers, relaxed lowers and outerwear that moves day to night.
          </p>
        </div>
      </section>

      {/* Filter strip */}
      <div className="border-b border-ink/10 sticky top-16 lg:top-20 bg-bone/95 backdrop-blur z-30">
        <div className="mx-auto max-w-[1500px] px-5 lg:px-10 flex items-center gap-2 lg:gap-3 overflow-x-auto py-4">
          {subcats.map((c, i) => (
            <button
              key={c}
              className={`whitespace-nowrap font-display text-sm tracking-[0.12em] px-4 py-2 border ${
                i === 0 ? "bg-ink text-bone border-ink" : "border-ink/20 hover:border-ink"
              }`}
            >
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
                {p.tag && (
                  <span className="absolute top-3 left-3 bg-ink text-bone font-display text-[10px] tracking-[0.2em] px-2 py-1">{p.tag}</span>
                )}
                <button className="absolute inset-x-3 bottom-3 bg-bone text-ink font-display tracking-[0.15em] text-sm py-3 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-neon">
                  + ADD TO BAG
                </button>
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
