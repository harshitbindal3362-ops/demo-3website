import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ProductGrid } from "@/components/site/ProductGrid";
import { useProducts, MEN_CATEGORIES } from "@/lib/products";
import hero from "@/assets/hero-men.jpg";

export const Route = createFileRoute("/men")({
  head: () => ({
    meta: [
      { title: "Men's Streetwear — Hoodies, Denim, Tees | Caliroots" },
      { name: "description", content: "Shop the Caliroots men's collection: oversized hoodies, sculpted denim, graphic tees, and tailored streetwear." },
      { property: "og:title", content: "Caliroots Men — Streetwear Essentials" },
      { property: "og:image", content: hero },
    ],
  }),
  component: Men,
});

function Men() {
  const { products: all } = useProducts();
  const products = all.filter((p) => p.gender === "men");

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

      <ProductGrid products={products} categories={MEN_CATEGORIES} />
    </SiteLayout>
  );
}
