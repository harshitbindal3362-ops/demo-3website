import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { CheckCircle2 } from "lucide-react";
import { z } from "zod";

const search = z.object({
  id: z.string().default(""),
  method: z.enum(["cod", "online"]).default("cod"),
});

export const Route = createFileRoute("/order-success")({
  validateSearch: (s) => search.parse(s),
  head: () => ({ meta: [{ title: "Order Confirmed | Caliroots" }] }),
  component: Success,
});

function Success() {
  const { id, method } = Route.useSearch();
  return (
    <SiteLayout>
      <div className="mx-auto max-w-2xl px-5 py-24 lg:py-36 text-center">
        <CheckCircle2 className="size-20 mx-auto text-neon" strokeWidth={1.5} />
        <h1 className="font-display text-5xl lg:text-7xl mt-6">ORDER CONFIRMED.</h1>
        <p className="mt-4 text-muted-foreground">
          Thanks for shopping Caliroots. Your order <span className="font-display tracking-wider text-ink">#{id}</span> has been placed.
        </p>
        <p className="mt-2 text-sm">
          Payment method: <span className="font-display tracking-wider">{method === "cod" ? "CASH ON DELIVERY" : "PAID ONLINE"}</span>
        </p>
        <p className="mt-6 text-sm text-muted-foreground">
          You'll receive a confirmation email with tracking shortly.
        </p>
        <div className="mt-10 flex justify-center gap-3 flex-wrap">
          <Link to="/" className="btn-ink">BACK TO HOME</Link>
          <Link to="/men" className="border border-ink py-3 px-6 font-display tracking-[0.15em] text-sm hover:bg-ink hover:text-bone transition">CONTINUE SHOPPING</Link>
        </div>
      </div>
    </SiteLayout>
  );
}
