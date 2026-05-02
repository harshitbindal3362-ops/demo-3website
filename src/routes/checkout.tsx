import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { priceLabel } from "@/lib/products";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Loader2, ShieldCheck, Truck, Banknote, CreditCard } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [{ title: "Checkout | Caliroots" }, { name: "description", content: "Complete your Caliroots order with COD or online payment." }],
  }),
  component: Checkout,
});

function Checkout() {
  const { resolved, subtotal, count, clear } = useCart();
  const { user, setOpen: setAuthOpen, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [method, setMethod] = useState<"cod" | "online">("cod");
  const [busy, setBusy] = useState(false);

  const shipping = subtotal >= 1500 ? 0 : 99;
  const total = subtotal + shipping;

  // Prompt sign-in once auth has loaded if no user
  useEffect(() => {
    if (!authLoading && !user) setAuthOpen(true);
  }, [authLoading, user, setAuthOpen]);

  const placeOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please sign in to place an order");
      setAuthOpen(true);
      return;
    }
    if (count === 0) return;
    setBusy(true);
    // Demo flow — simulate processing
    await new Promise((r) => setTimeout(r, method === "online" ? 1400 : 700));
    const orderId = "CR" + Math.floor(100000 + Math.random() * 900000);
    clear();
    setBusy(false);
    toast.success(`Order ${orderId} placed!`);
    navigate({ to: "/order-success", search: { id: orderId, method } });
  };

  if (count === 0) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-2xl px-5 py-32 text-center">
          <h1 className="font-display text-5xl">YOUR BAG IS EMPTY</h1>
          <p className="mt-4 text-muted-foreground">Add a few pieces before checking out.</p>
          <Link to="/men" className="btn-ink mt-8">START SHOPPING</Link>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <div className="mx-auto max-w-[1300px] px-5 lg:px-10 py-10 lg:py-16">
        <h1 className="font-display text-5xl lg:text-7xl">CHECKOUT.</h1>
        <p className="text-sm text-muted-foreground mt-2">{count} item{count === 1 ? "" : "s"} · {priceLabel(total)}</p>

        <div className="mt-10 grid lg:grid-cols-[1fr_420px] gap-10">
          <form onSubmit={placeOrder} className="space-y-10">
            {/* Contact */}
            <section>
              <h2 className="font-display text-2xl mb-4">01 — CONTACT</h2>
              {user ? (
                <p className="text-sm">Signed in as <span className="font-medium">{user.email}</span></p>
              ) : (
                <button type="button" onClick={() => setAuthOpen(true)} className="border border-ink/30 px-4 py-3 hover:border-ink font-display tracking-wider text-sm">
                  SIGN IN OR CREATE ACCOUNT
                </button>
              )}
            </section>

            {/* Shipping */}
            <section>
              <h2 className="font-display text-2xl mb-4">02 — SHIPPING</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                <div><Label>First name</Label><Input required /></div>
                <div><Label>Last name</Label><Input required /></div>
                <div className="sm:col-span-2"><Label>Address</Label><Input required placeholder="House no., street" /></div>
                <div><Label>City</Label><Input required /></div>
                <div><Label>State</Label><Input required /></div>
                <div><Label>PIN code</Label><Input required pattern="[0-9]{6}" /></div>
                <div><Label>Phone</Label><Input required type="tel" pattern="[0-9]{10}" /></div>
              </div>
            </section>

            {/* Payment */}
            <section>
              <h2 className="font-display text-2xl mb-4">03 — PAYMENT</h2>
              <RadioGroup value={method} onValueChange={(v) => setMethod(v as any)} className="space-y-3">
                <label htmlFor="cod" className={`flex items-start gap-3 border p-4 cursor-pointer transition ${method === "cod" ? "border-ink bg-muted/50" : "border-ink/20"}`}>
                  <RadioGroupItem value="cod" id="cod" className="mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 font-display tracking-wider"><Banknote className="size-5" /> CASH ON DELIVERY</div>
                    <p className="text-xs text-muted-foreground mt-1">Pay when your order is delivered. Available across India.</p>
                  </div>
                </label>
                <label htmlFor="online" className={`flex items-start gap-3 border p-4 cursor-pointer transition ${method === "online" ? "border-ink bg-muted/50" : "border-ink/20"}`}>
                  <RadioGroupItem value="online" id="online" className="mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 font-display tracking-wider"><CreditCard className="size-5" /> PAY ONLINE</div>
                    <p className="text-xs text-muted-foreground mt-1">UPI, cards, net-banking and wallets. Demo mode — no real charges.</p>
                  </div>
                </label>
              </RadioGroup>
            </section>

            <button type="submit" disabled={busy || !user} className="btn-ink w-full justify-center text-base">
              {busy ? <Loader2 className="size-4 animate-spin" /> : `PLACE ORDER · ${priceLabel(total)}`}
            </button>
            {!user && <p className="text-xs text-hot text-center">Please sign in to place your order.</p>}
          </form>

          {/* Summary */}
          <aside className="bg-muted/40 border border-ink/10 p-6 h-fit lg:sticky lg:top-28 space-y-4">
            <h2 className="font-display text-xl">ORDER SUMMARY</h2>
            <ul className="divide-y divide-ink/10">
              {resolved.map((it) => (
                <li key={it.productId + it.size} className="py-3 flex gap-3">
                  <img src={it.product.img} alt="" className="size-16 object-cover" />
                  <div className="flex-1 text-sm">
                    <p className="font-medium leading-snug">{it.product.name}</p>
                    <p className="text-xs text-muted-foreground">Size {it.size} · Qty {it.qty}</p>
                  </div>
                  <p className="font-display tracking-wider text-sm">{priceLabel(it.product.price * it.qty)}</p>
                </li>
              ))}
            </ul>
            <div className="space-y-2 pt-3 border-t border-ink/10 text-sm">
              <div className="flex justify-between"><span>Subtotal</span><span>{priceLabel(subtotal)}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span>{shipping === 0 ? "FREE" : priceLabel(shipping)}</span></div>
              <div className="flex justify-between font-display tracking-wider text-lg pt-2 border-t border-ink/10"><span>TOTAL</span><span>{priceLabel(total)}</span></div>
            </div>
            <div className="text-xs text-muted-foreground space-y-1 pt-2 border-t border-ink/10">
              <p className="flex items-center gap-2"><Truck className="size-4" /> Free shipping on orders over ₹1,500</p>
              <p className="flex items-center gap-2"><ShieldCheck className="size-4" /> Secure checkout</p>
            </div>
          </aside>
        </div>
      </div>
    </SiteLayout>
  );
}
