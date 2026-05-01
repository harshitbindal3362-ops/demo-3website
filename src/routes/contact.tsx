import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Mail, Phone, MapPin, Instagram, Facebook, ArrowRight } from "lucide-react";
import manGreen from "@/assets/brand-man-green.jpg";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Caliroots — Get In Touch" },
      {
        name: "description",
        content:
          "Reach out to Caliroots. Visit us in Rajpura, Punjab. Call +91 95925 89797 or email info@thecaliroots.com.",
      },
      { property: "og:title", content: "Contact Caliroots" },
      { property: "og:image", content: manGreen },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <SiteLayout>
      <section className="bg-ink text-bone py-24 lg:py-36">
        <div className="mx-auto max-w-[1500px] px-5 lg:px-10">
          <p className="font-display text-xs tracking-[0.3em] text-neon">CONTACT</p>
          <h1 className="font-display text-6xl lg:text-[11rem] leading-[0.85] mt-3">
            LET'S <br /> <span className="text-neon">TALK.</span>
          </h1>
          <p className="mt-6 max-w-xl text-bone/80 text-lg">
            Press, partnerships, customer queries or just want to say hi? We're here.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-5 lg:px-10 py-20 lg:py-28 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5 space-y-8">
          <div>
            <p className="font-display text-xs tracking-[0.3em] text-hot">/ HEAD OFFICE</p>
            <div className="mt-4 space-y-4 text-lg">
              <p className="flex items-start gap-3"><MapPin className="size-5 text-hot mt-1" /> Rajpura, Punjab — 140401</p>
              <p className="flex items-start gap-3"><Phone className="size-5 text-hot mt-1" /> +91 95925 89797</p>
              <p className="flex items-start gap-3"><Mail className="size-5 text-hot mt-1" /> info@thecaliroots.com</p>
            </div>
          </div>

          <div>
            <p className="font-display text-xs tracking-[0.3em] text-hot">/ FOLLOW</p>
            <div className="mt-4 flex gap-3">
              <a href="#" aria-label="Instagram" className="border border-ink p-3 hover:bg-ink hover:text-bone transition">
                <Instagram className="size-5" />
              </a>
              <a href="#" aria-label="Facebook" className="border border-ink p-3 hover:bg-ink hover:text-bone transition">
                <Facebook className="size-5" />
              </a>
            </div>
          </div>

          <div className="border border-ink/15 p-6">
            <p className="font-display text-sm tracking-[0.2em]">SUPPORT HOURS</p>
            <p className="mt-3 text-sm text-muted-foreground">Monday — Saturday · 10:00 to 19:00 IST</p>
            <p className="text-sm text-muted-foreground">Closed on Sundays</p>
          </div>
        </div>

        <form className="lg:col-span-7 space-y-5">
          <p className="font-display text-xs tracking-[0.3em] text-hot">/ SEND US A MESSAGE</p>
          <div className="grid sm:grid-cols-2 gap-5">
            <label className="block">
              <span className="font-display text-xs tracking-[0.2em]">FIRST NAME</span>
              <input className="mt-2 w-full border border-ink/20 bg-transparent px-4 py-3 outline-none focus:border-ink" />
            </label>
            <label className="block">
              <span className="font-display text-xs tracking-[0.2em]">LAST NAME</span>
              <input className="mt-2 w-full border border-ink/20 bg-transparent px-4 py-3 outline-none focus:border-ink" />
            </label>
          </div>
          <label className="block">
            <span className="font-display text-xs tracking-[0.2em]">EMAIL</span>
            <input type="email" className="mt-2 w-full border border-ink/20 bg-transparent px-4 py-3 outline-none focus:border-ink" />
          </label>
          <label className="block">
            <span className="font-display text-xs tracking-[0.2em]">SUBJECT</span>
            <input className="mt-2 w-full border border-ink/20 bg-transparent px-4 py-3 outline-none focus:border-ink" />
          </label>
          <label className="block">
            <span className="font-display text-xs tracking-[0.2em]">MESSAGE</span>
            <textarea rows={6} className="mt-2 w-full border border-ink/20 bg-transparent px-4 py-3 outline-none focus:border-ink resize-none" />
          </label>
          <button type="button" className="btn-ink">SEND MESSAGE <ArrowRight className="size-4" /></button>
        </form>
      </section>

      <section className="relative h-[40vh] overflow-hidden">
        <img src={manGreen} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-ink/60 flex items-center justify-center text-center px-5">
          <div>
            <p className="font-display text-xs tracking-[0.3em] text-neon">CALIROOTS · CALIFORNIA</p>
            <p className="font-display text-bone text-4xl lg:text-7xl mt-3">WHERE COMFORT MEETS CULTURE.</p>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
