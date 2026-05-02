import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/context/CartContext";
import { Link, useNavigate } from "@tanstack/react-router";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { priceLabel } from "@/lib/products";

export function CartDrawer() {
  const { open, setOpen, resolved, setQty, remove, subtotal, count } = useCart();
  const navigate = useNavigate();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="right" className="w-full sm:max-w-md bg-bone border-ink/20 flex flex-col p-0">
        <SheetHeader className="p-5 border-b border-ink/15">
          <SheetTitle className="font-display text-2xl tracking-wider">YOUR BAG ({count})</SheetTitle>
        </SheetHeader>

        {resolved.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center gap-4">
            <ShoppingBag className="size-12 text-muted-foreground" />
            <p className="font-display text-xl">YOUR BAG IS EMPTY</p>
            <p className="text-sm text-muted-foreground">Discover the latest drop.</p>
            <Link to="/men" onClick={() => setOpen(false)} className="btn-ink mt-2">SHOP NOW</Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto divide-y divide-ink/10">
              {resolved.map((it) => (
                <li key={it.productId + it.size} className="p-4 flex gap-3">
                  <img src={it.product.img} alt={it.product.name} className="size-24 object-cover" />
                  <div className="flex-1">
                    <div className="flex justify-between gap-2">
                      <h3 className="text-sm font-medium leading-snug">{it.product.name}</h3>
                      <button onClick={() => remove(it.productId, it.size)} aria-label="Remove" className="text-muted-foreground hover:text-hot">
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Size {it.size}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center border border-ink/20">
                        <button onClick={() => setQty(it.productId, it.size, it.qty - 1)} className="px-2 py-1" aria-label="Decrease"><Minus className="size-3" /></button>
                        <span className="px-3 text-sm font-display tracking-wider">{it.qty}</span>
                        <button onClick={() => setQty(it.productId, it.size, it.qty + 1)} className="px-2 py-1" aria-label="Increase"><Plus className="size-3" /></button>
                      </div>
                      <p className="font-display tracking-wider text-sm">{priceLabel(it.product.price * it.qty)}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-ink/15 p-5 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-display tracking-wider">{priceLabel(subtotal)}</span>
              </div>
              <p className="text-xs text-muted-foreground">Shipping & taxes calculated at checkout.</p>
              <button
                onClick={() => { setOpen(false); navigate({ to: "/checkout" }); }}
                className="btn-ink w-full justify-center"
              >
                CHECKOUT — {priceLabel(subtotal)}
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
