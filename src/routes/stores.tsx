import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { MapPin, ArrowRight } from "lucide-react";
import storefront from "@/assets/brand-storefront.jpg";
import storeSale from "@/assets/brand-store-sale.jpg";
import hoodieDuo from "@/assets/brand-hoodie-duo.jpg";

export const Route = createFileRoute("/stores")({
  head: () => ({
    meta: [
      { title: "Caliroots Stores — 19 Locations Across India" },
      {
        name: "description",
        content:
          "Visit Caliroots in store. 19 locations across Punjab, Haryana and beyond — from Ludhiana to Amritsar, Patiala to Zirakpur.",
      },
      { property: "og:title", content: "Caliroots Stores" },
      { property: "og:image", content: storefront },
    ],
  }),
  component: Stores,
});

const stores = [
  "Caliroots Amritsar",
  "Caliroots Ambala",
  "Caliroots Bhucho Mandi",
  "Caliroots Barnala",
  "Caliroots Faridkot",
  "Caliroots Firozepur",
  "Caliroots Kaithal",
  "Caliroots Khanna",
  "Caliroots Kharar",
  "Caliroots Ludhiana — Wave Mall",
  "Caliroots Ludhiana — Silver Arc Mall",
  "Caliroots Ludhiana — Kohara",
  "Caliroots Muktsar",
  "Caliroots Nawansahar",
  "Caliroots Patiala",
  "Caliroots Patran",
  "Caliroots Rajpura",
  "Caliroots Sangrur",
  "Caliroots Zirakpur",
];

function Stores() {
  return (
    <SiteLayout>
      <section className="relative bg-ink text-bone">
        <div className="absolute inset-0">
          <img src={storefront} alt="" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/40 to-ink/10" />
        </div>
        <div className="relative mx-auto max-w-[1500px] px-5 lg:px-10 py-24 lg:py-36">
          <p className="font-display text-xs tracking-[0.3em] text-neon">RETAIL & DISTRIBUTION</p>
          <h1 className="font-display text-6xl lg:text-[10rem] leading-[0.85] mt-3">
            FIND YOUR <br /> <span className="text-stroke-bone">CALI</span> SPOT.
          </h1>
          <p className="mt-5 max-w-xl text-bone/80">
            19 stores. Punjab, Haryana and beyond. Each location is an immersive space where the brand's bold streetwear identity comes alive.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-5 lg:px-10 py-20 lg:py-28">
        <div className="grid lg:grid-cols-3 gap-10 mb-12">
          <div className="lg:col-span-2">
            <p className="font-display text-xs tracking-[0.3em] text-hot">/ ALL LOCATIONS</p>
            <h2 className="font-display text-5xl lg:text-7xl mt-3">19 DOORS. <br /> ONE FAMILY.</h2>
          </div>
          <p className="text-foreground/75 max-w-md self-end">
            From emerging fashion destinations to flagship malls — our presence ensures that Caliroots' trend-forward collections are accessible to youth nationwide.
          </p>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {stores.map((s, i) => (
            <li key={s} className="border border-ink/15 p-5 flex items-start gap-4 hover-lift hover:bg-ink hover:text-bone hover:border-ink transition group">
              <span className="font-display text-3xl text-hot group-hover:text-neon shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="font-display tracking-wider text-lg leading-tight">{s.replace("Caliroots ", "")}</p>
                <p className="text-xs mt-1 opacity-70 flex items-center gap-1.5"><MapPin className="size-3" /> India</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="grid lg:grid-cols-2">
        <div className="relative aspect-[4/3] lg:aspect-auto">
          <img src={storeSale} alt="Caliroots California flagship store" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
        </div>
        <div className="px-6 lg:px-16 py-20 lg:py-28 bg-ink text-bone flex flex-col justify-center">
          <p className="font-display text-xs tracking-[0.3em] text-neon">/ JOIN THE NETWORK</p>
          <h2 className="font-display text-5xl lg:text-7xl mt-3">FRANCHISE WITH CALIROOTS.</h2>
          <p className="mt-6 max-w-xl text-bone/75">
            We're expanding rapidly across India. If you believe in youth-driven, trend-forward fashion and want to be part of the movement, let's talk.
          </p>
          <Link to="/contact" className="btn-bone mt-8 self-start">GET IN TOUCH <ArrowRight className="size-4" /></Link>
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-5 lg:px-10 py-20 lg:py-28">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <img src={hoodieDuo} alt="Caliroots fashion duo" loading="lazy" className="lg:col-span-5 aspect-[4/5] object-cover w-full" />
          <div className="lg:col-span-7 lg:pl-10">
            <p className="font-display text-xs tracking-[0.3em] text-hot">/ AND MANY MORE...</p>
            <h2 className="font-display text-5xl lg:text-7xl mt-3">THIS IS JUST THE BEGINNING.</h2>
            <p className="mt-6 text-foreground/75 text-lg max-w-xl">
              Many more destinations await as we continue to redefine the retail fashion experience across India.
            </p>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
