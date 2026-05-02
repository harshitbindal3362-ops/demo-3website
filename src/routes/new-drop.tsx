import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ProductGrid } from "@/components/site/ProductGrid";
import { listNewDrop } from "@/lib/products";
import hero from "@/assets/hero-streetwear.jpg";

export const Route = createFileRoute("/new-drop")({
  head: () => ({
    meta: [
      { title: "New Drop SS26 — Latest Streetwear | Caliroots" },
      { name: "description", content: "Just landed: the freshest pieces from Caliroots SS26. Limited drops, premium fabrics, California energy." },
      { property: "og:title", content: "Caliroots — New Drop SS26" },
      { property: "og:image", content: hero },
    ],
  }),
  component: NewDrop,
});

function NewDrop() {
  const products = listNewDrop();
  const cats = ["All", ...Array.from(new Set(products.map((p) => p.category)))];

  return (
    <SiteLayout>
      <section className="relative bg-ink text-bone">
        <div className="absolute inset-0">
          <img src={hero} alt="" className="w-full h-full object-cover opacity-55" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/30 to-transparent" />
        </div>
        <div className="relative mx-auto max-w-[1500px] px-5 lg:px-10 py-24 lg:py-36">
          <span className="inline-flex items-center gap-2 bg-neon text-ink font-display tracking-[0.2em] text-xs px-3 py-1.5">
            <span className="size-1.5 bg-ink rounded-full animate-pulse" /> JUST DROPPED
          </span>
          <h1 className="font-display text-7xl lg:text-[10rem] leading-[0.85] mt-4">
            NEW DROP <br /> <span className="text-stroke-bone">SS26.</span>
          </h1>
          <p className="mt-5 max-w-xl text-bone/80">
            The freshest pieces, just landed. Limited quantities. California energy, all the way.
          </p>
        </div>
      </section>

      <ProductGrid products={products} categories={cats} />
    </SiteLayout>
  );
}
