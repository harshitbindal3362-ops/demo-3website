import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ProductGrid } from "@/components/site/ProductGrid";
import { listByGender, WOMEN_CATEGORIES } from "@/lib/products";
import hero from "@/assets/hero-women.jpg";

export const Route = createFileRoute("/women")({
  head: () => ({
    meta: [
      { title: "Women's Streetwear — Cargos, Co-ords, Denim | Caliroots" },
      { name: "description", content: "Caliroots women's collection: sculpted denims, effortless cargos, chic tops, co-ord sets and layering classics." },
      { property: "og:title", content: "Caliroots Women — Sculpted Streetwear" },
      { property: "og:image", content: hero },
    ],
  }),
  component: Women,
});

function Women() {
  const products = listByGender("women");

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
            An ode to elegance and individuality — sculpted denims, effortless cargos, chic tops and co-ord sets.
          </p>
        </div>
      </section>

      <ProductGrid products={products} categories={WOMEN_CATEGORIES} />
    </SiteLayout>
  );
}
