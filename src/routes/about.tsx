import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Sparkles, Award, Leaf, Users, Compass, ArrowRight } from "lucide-react";
import suitBw from "@/assets/brand-suit-bw.jpg";
import knits from "@/assets/brand-knits.jpg";
import modelsPair from "@/assets/brand-models-pair.jpg";
import ecoTee from "@/assets/brand-eco-tee.jpg";
import shadesPair from "@/assets/brand-shades-pair.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Caliroots — California Streetwear, Made In India" },
      {
        name: "description",
        content:
          "Founded in 2018 in Punjab, Caliroots fuses California streetwear with refined Indian aesthetics. Discover our story, values, vision and mission.",
      },
      { property: "og:title", content: "About Caliroots" },
      { property: "og:image", content: suitBw },
    ],
  }),
  component: About,
});

const values = [
  { icon: Sparkles, title: "Fashion-Forward", text: "A relentless pursuit of innovation, where every design defines tomorrow's trend today." },
  { icon: Award, title: "Uncompromising Quality", text: "Crafted from the finest fabrics with impeccable attention to detail — a testament to timeless craftsmanship." },
  { icon: Leaf, title: "Sustainable Elegance", text: "Responsibly sourced and consciously produced — fashion that honours both style and the planet." },
  { icon: Users, title: "Inclusive by Design", text: "Celebrating individuality in all its forms — style that transcends gender, identity and expression." },
  { icon: Compass, title: "Authentic Roots", text: "Deeply anchored in culture and inspired by real stories — every creation reflects originality with purpose." },
];

function About() {
  return (
    <SiteLayout>
      <section className="bg-ink text-bone py-24 lg:py-36">
        <div className="mx-auto max-w-[1500px] px-5 lg:px-10">
          <p className="font-display text-xs tracking-[0.3em] text-neon">EST. 2018 · RAJPURA, PUNJAB</p>
          <h1 className="font-display text-6xl lg:text-[11rem] leading-[0.82] mt-4">
            WE MAKE <br />
            <span className="text-stroke-bone">CULTURE</span> <br />
            WEARABLE.
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-5 lg:px-10 py-20 lg:py-28 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5">
          <img src={modelsPair} alt="Caliroots brand campaign" loading="lazy" className="w-full aspect-[4/5] object-cover" />
        </div>
        <div className="lg:col-span-7 lg:pl-10">
          <p className="font-display text-xs tracking-[0.3em] text-hot">/ THE STORY</p>
          <h2 className="font-display text-4xl lg:text-6xl mt-3">From a local venture to a movement.</h2>
          <div className="mt-7 space-y-5 text-foreground/80 text-base lg:text-lg">
            <p>
              Founded in 2018, <strong>The Caliroots</strong> emerged from a profound passion for streetwear and contemporary fashion — evolving from a modest local venture into one of India's most distinguished and fastest-growing clothing brands.
            </p>
            <p>
              With a vision that seamlessly marries global style sensibilities and refined Indian aesthetics, Caliroots has established itself as a symbol of modern elegance within street culture. Each collection is crafted with a meticulous balance of sophistication and edge, appealing to discerning, style-conscious individuals.
            </p>
            <p>
              Beyond apparel, Caliroots embodies a lifestyle of authenticity, cultural depth and aspirational expression — cultivating a loyal community across India that values fashion as both art and identity.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-muted py-20 lg:py-28">
        <div className="mx-auto max-w-[1500px] px-5 lg:px-10">
          <p className="font-display text-xs tracking-[0.3em] text-hot">/ CORE VALUES</p>
          <h2 className="font-display text-5xl lg:text-7xl mt-3">WHAT WE STAND FOR.</h2>

          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map((v, i) => (
              <div key={v.title} className="bg-bone p-7 lg:p-8 border border-ink/10 hover-lift">
                <div className="flex items-center justify-between">
                  <span className="font-display text-xs tracking-[0.25em] text-muted-foreground">/ 0{i + 1}</span>
                  <v.icon className="size-6 text-hot" />
                </div>
                <h3 className="font-display text-2xl mt-6">{v.title}</h3>
                <p className="text-sm text-foreground/70 mt-3">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="bg-ink text-bone py-24 lg:py-36 relative overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <img src={shadesPair} alt="" className="w-full h-full object-cover" loading="lazy" />
        </div>
        <div className="relative mx-auto max-w-[1500px] px-5 lg:px-10 grid lg:grid-cols-2 gap-12">
          <div>
            <p className="font-display text-xs tracking-[0.3em] text-neon">/ OUR VISION</p>
            <h2 className="font-display text-5xl lg:text-7xl mt-3">A NATIONAL <br /> BRAND. A YOUTH MOVEMENT.</h2>
          </div>
          <div className="space-y-5 text-bone/80 text-base lg:text-lg">
            <p>We envision evolving into a truly national brand — one that resonates deeply with the spirit of modern India. Our journey begins with flagship and concept stores in key metropolitan cities and emerging fashion destinations.</p>
            <p>Each space will be more than a store; it will be an immersive experience that embodies our streetwear identity, creativity and culture. By making Caliroots accessible across regions, we aspire to inspire individuality, embrace diversity and redefine contemporary fashion for the Indian youth.</p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="grid lg:grid-cols-2">
        <div className="px-6 lg:px-16 py-20 lg:py-28 flex flex-col justify-center">
          <p className="font-display text-xs tracking-[0.3em] text-hot">/ OUR MISSION</p>
          <h2 className="font-display text-5xl lg:text-7xl mt-3">EMPOWER <br /> INDIVIDUALITY.</h2>
          <p className="mt-6 text-foreground/75 max-w-xl text-base lg:text-lg">
            We believe clothing should be more than style — it should be an experience that inspires confidence and reflects personality. Every piece is crafted with a focus on quality, comfort and contemporary design, ensuring our community embraces fashion as a true extension of who they are.
          </p>
          <Link to="/men" className="btn-ink mt-8 self-start">SHOP THE BRAND <ArrowRight className="size-4" /></Link>
        </div>
        <div className="relative aspect-[4/5] lg:aspect-auto order-first lg:order-last">
          <img src={knits} alt="Caliroots stack of seasonal knits" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
        </div>
      </section>

      {/* Sustainability */}
      <section className="grid lg:grid-cols-2 bg-muted">
        <div className="relative aspect-[4/5] lg:aspect-auto">
          <img src={ecoTee} alt="Caliroots sustainable cotton tee" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
        </div>
        <div className="px-6 lg:px-16 py-20 lg:py-28 flex flex-col justify-center">
          <p className="font-display text-xs tracking-[0.3em] text-hot">/ SUSTAINABILITY & ETHICS</p>
          <h2 className="font-display text-5xl lg:text-7xl mt-3">CONSCIOUS BY <br /> DEFAULT.</h2>
          <p className="mt-6 text-foreground/75 max-w-xl">
            Organic cotton, recycled fabrics, low-impact dyes — every piece is as gentle on the planet as it is refined in design. We collaborate exclusively with ethical, transparent manufacturing partners who uphold fair wages and safe working environments.
          </p>
          <p className="mt-4 text-foreground/75 max-w-xl">
            From reducing plastic in packaging to optimising production for minimal waste, we continue to expand eco-conscious initiatives — aligning our growth with a mission of truly responsible fashion.
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
