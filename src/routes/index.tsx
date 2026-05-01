import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ArrowRight, ArrowUpRight, Sparkles, Leaf, Users, Compass } from "lucide-react";
import heroImg from "@/assets/hero-streetwear.jpg";
import womenImg from "@/assets/hero-women.jpg";
import menImg from "@/assets/hero-men.jpg";
import racks from "@/assets/brand-rack.jpg";
import knits from "@/assets/brand-knits.jpg";
import hoodieDuo from "@/assets/brand-hoodie-duo.jpg";
import womanBlazer from "@/assets/brand-woman-blazer.jpg";
import manShades from "@/assets/brand-man-shades.jpg";
import womanHat from "@/assets/brand-woman-hat.jpg";
import shadesPair from "@/assets/brand-shades-pair.jpg";
import storefront from "@/assets/brand-storefront.jpg";
import ecoTee from "@/assets/brand-eco-tee.jpg";
import suitBw from "@/assets/brand-suit-bw.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Caliroots California — Streetwear Born In India" },
      {
        name: "description",
        content:
          "Caliroots: India's fastest-growing streetwear brand. California-cool fits, premium quality, and culture-driven drops for men and women. Where comfort meets culture.",
      },
      { property: "og:title", content: "Caliroots California — Streetwear Born In India" },
      { property: "og:description", content: "California-cool streetwear for men & women. Where comfort meets culture." },
      { property: "og:image", content: heroImg },
      { name: "twitter:image", content: heroImg },
    ],
  }),
  component: Home,
});

const collections = [
  { title: "Hoodies & Sweats", img: hoodieDuo, count: "48 styles" },
  { title: "Oversized Tees", img: knits, count: "62 styles" },
  { title: "Denim Lab", img: racks, count: "34 styles" },
  { title: "Co-ord Sets", img: womanBlazer, count: "21 styles" },
];

const values = [
  { icon: Sparkles, title: "Fashion-Forward", text: "Every design defines tomorrow's trend today." },
  { icon: Compass, title: "Authentic Roots", text: "Anchored in culture, inspired by real stories." },
  { icon: Leaf, title: "Sustainable Elegance", text: "Responsibly sourced. Consciously produced." },
  { icon: Users, title: "Inclusive by Design", text: "Style that transcends gender and identity." },
];

function Home() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative bg-ink text-bone overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Model in oversized Caliroots California hoodie on a Los Angeles palm boulevard at golden hour"
            width={1920}
            height={1080}
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
        </div>

        <div className="relative mx-auto max-w-[1500px] px-5 lg:px-10 min-h-[88vh] flex flex-col justify-end pb-14 lg:pb-20">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 bg-neon text-ink font-display tracking-[0.2em] text-xs px-3 py-1.5">
              <span className="size-1.5 bg-ink rounded-full animate-pulse" /> SS26 DROP — LIVE NOW
            </span>
            <h1 className="mt-5 font-display text-[14vw] lg:text-[9rem] leading-[0.85]">
              WHERE <br />
              <span className="text-neon">COMFORT</span> <br />
              MEETS CULTURE.
            </h1>
            <p className="mt-6 max-w-xl text-bone/80 text-base lg:text-lg">
              California streetwear, reimagined for India. Oversized fits, premium fabrics, graphic-led detail. Born in 2018. Worn everywhere.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/men" className="btn-bone">
                SHOP MEN <ArrowRight className="size-4" />
              </Link>
              <Link to="/women" className="btn-ink border-bone/40">
                SHOP WOMEN <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="relative border-t border-bone/15 grid grid-cols-2 lg:grid-cols-4 text-bone/80 text-xs lg:text-sm">
          {["Free shipping nationwide", "Premium fabrics", "Easy 7-day returns", "19 stores in India"].map((t) => (
            <div key={t} className="px-5 py-4 border-r border-bone/15 last:border-r-0 font-display tracking-[0.15em]">
              ✦ {t}
            </div>
          ))}
        </div>
      </section>

      {/* SHOP BY GENDER — split */}
      <section className="grid grid-cols-1 md:grid-cols-2">
        {[
          { title: "MEN", img: menImg, to: "/men" as const, copy: "Hoodies, denim, tailored streetwear" },
          { title: "WOMEN", img: womenImg, to: "/women" as const, copy: "Cargos, co-ords, sculpted denim" },
        ].map((b) => (
          <Link
            key={b.title}
            to={b.to}
            className="group relative h-[70vh] md:h-[80vh] overflow-hidden bg-ink"
          >
            <img
              src={b.img}
              alt={`Shop ${b.title}`}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-8 lg:p-12 text-bone">
              <p className="font-display text-xs tracking-[0.3em] text-neon">SHOP THE COLLECTION</p>
              <h2 className="font-display text-7xl lg:text-9xl mt-2">{b.title}</h2>
              <p className="mt-2 text-bone/80 max-w-xs">{b.copy}</p>
              <span className="mt-5 inline-flex items-center gap-2 font-display tracking-[0.15em] text-sm border-b border-bone pb-1 group-hover:text-neon group-hover:border-neon">
                ENTER <ArrowUpRight className="size-4" />
              </span>
            </div>
          </Link>
        ))}
      </section>

      {/* CATEGORIES GRID */}
      <section className="py-20 lg:py-28 mx-auto max-w-[1500px] px-5 lg:px-10">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div>
            <p className="font-display text-xs tracking-[0.3em] text-hot">/ 01 — SHOP BY CATEGORY</p>
            <h2 className="font-display text-5xl lg:text-7xl mt-2">CURATED FITS</h2>
          </div>
          <Link to="/men" className="font-display tracking-[0.15em] text-sm border-b border-ink pb-1 hover:text-hot hover:border-hot">
            VIEW ALL CATEGORIES →
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5">
          {collections.map((c, i) => (
            <Link
              to="/men"
              key={c.title}
              className="group relative aspect-[3/4] overflow-hidden bg-muted hover-lift"
            >
              <img
                src={c.img}
                alt={c.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 lg:p-5 text-bone">
                <p className="text-[10px] tracking-[0.25em] text-bone/70 font-display">0{i + 1}</p>
                <h3 className="font-display text-2xl lg:text-3xl mt-1 leading-tight">{c.title}</h3>
                <p className="text-xs text-bone/70 mt-1">{c.count}</p>
              </div>
              <span className="absolute top-4 right-4 size-10 bg-bone text-ink flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                <ArrowUpRight className="size-5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* BIG STATEMENT — design inspiration */}
      <section className="bg-ink text-bone py-24 lg:py-36 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={shadesPair} alt="" className="w-full h-full object-cover" loading="lazy" />
        </div>
        <div className="relative mx-auto max-w-[1500px] px-5 lg:px-10 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <p className="font-display text-xs tracking-[0.3em] text-neon">/ 02 — DESIGN INSPIRATION</p>
            <h2 className="font-display text-6xl lg:text-[8.5rem] leading-[0.85] mt-4">
              SURF. SKATE. <br />
              <span className="text-stroke-bone">STREET.</span> SOUL.
            </h2>
          </div>
          <div className="lg:col-span-5 space-y-5 text-bone/80 text-base lg:text-lg">
            <p>
              Drawn from the vibrant, free-spirited lifestyle of California streetwear — surf-skate culture, the energy of West Coast music, and the urban rhythm of Los Angeles.
            </p>
            <p>
              Relaxed fits, oversized silhouettes, graphic-led detail. From nostalgic Y2K revivals to refined minimalism — fashion that empowers individuality with confidence.
            </p>
            <Link to="/about" className="btn-bone mt-2">
              OUR FULL STORY <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED EDITORIAL ROW */}
      <section className="py-20 lg:py-28 mx-auto max-w-[1500px] px-5 lg:px-10">
        <div className="mb-10">
          <p className="font-display text-xs tracking-[0.3em] text-hot">/ 03 — THIS WEEK</p>
          <h2 className="font-display text-5xl lg:text-7xl mt-2">FRESH OFF THE RACK</h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5">
          {[
            { img: manShades, name: "Off-Duty Linen Set", price: "₹3,499", tag: "NEW" },
            { img: womanHat, name: "Cali Wide-Brim Bomber", price: "₹4,299", tag: "BESTSELLER" },
            { img: hoodieDuo, name: "Caliroots Pullover Hood", price: "₹2,799", tag: "NEW" },
            { img: womanBlazer, name: "Tailored Power Blazer", price: "₹5,899" },
          ].map((p) => (
            <article key={p.name} className="group">
              <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                <img
                  src={p.img}
                  alt={p.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {p.tag && (
                  <span className="absolute top-3 left-3 bg-ink text-bone font-display text-[10px] tracking-[0.2em] px-2 py-1">
                    {p.tag}
                  </span>
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
      </section>

      {/* SUSTAINABILITY BAND */}
      <section className="grid lg:grid-cols-2 bg-muted">
        <div className="relative aspect-[4/3] lg:aspect-auto">
          <img src={ecoTee} alt="Eco-conscious Caliroots tee" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
        </div>
        <div className="px-6 lg:px-16 py-16 lg:py-24 flex flex-col justify-center">
          <p className="font-display text-xs tracking-[0.3em] text-hot">/ 04 — SUSTAINABILITY</p>
          <h2 className="font-display text-5xl lg:text-7xl mt-3">
            STYLE WITH A <br /> <span className="text-hot">CONSCIENCE.</span>
          </h2>
          <p className="mt-6 max-w-xl text-foreground/75">
            Organic cotton. Recycled fabrics. Low-impact dyes. We work with ethical, transparent partners and reduce plastic in every shipment. Our journey toward greener fashion has already begun.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-5 max-w-md">
            {values.map((v) => (
              <div key={v.title}>
                <v.icon className="size-5 text-hot" />
                <h3 className="font-display tracking-wider text-sm mt-2">{v.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STORES TEASER */}
      <section className="bg-ink text-bone py-20 lg:py-28">
        <div className="mx-auto max-w-[1500px] px-5 lg:px-10 grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-5">
            <p className="font-display text-xs tracking-[0.3em] text-neon">/ 05 — RETAIL</p>
            <h2 className="font-display text-5xl lg:text-7xl mt-3">
              19 STORES. <br /> ONE MOVEMENT.
            </h2>
            <p className="mt-5 text-bone/70 max-w-md">
              Ludhiana. Amritsar. Patiala. Zirakpur. From flagship spaces to neighborhood concept stores — Caliroots lives off-screen too.
            </p>
            <Link to="/stores" className="btn-bone mt-7">
              FIND A STORE <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 gap-3">
            <img src={storefront} alt="Caliroots flagship store" loading="lazy" className="aspect-[4/5] object-cover w-full" />
            <img src={suitBw} alt="Caliroots editorial campaign" loading="lazy" className="aspect-[4/5] object-cover w-full mt-12" />
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
