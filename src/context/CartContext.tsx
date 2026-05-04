import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { useProducts, type Product } from "@/lib/products";

export type CartItem = {
  productId: string;
  size: string;
  qty: number;
};

type CartCtx = {
  items: CartItem[];
  count: number;
  subtotal: number;
  add: (productId: string, size: string, qty?: number) => void;
  remove: (productId: string, size: string) => void;
  setQty: (productId: string, size: string, qty: number) => void;
  clear: () => void;
  open: boolean;
  setOpen: (v: boolean) => void;
  resolved: Array<CartItem & { product: Product }>;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "caliroots_cart_v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const { products } = useProducts();

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? window.localStorage.getItem(KEY) : null;
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try { window.localStorage.setItem(KEY, JSON.stringify(items)); } catch {}
  }, [items, hydrated]);

  const value = useMemo<CartCtx>(() => {
    const resolved = items
      .map((i) => {
        const product = products.find((p) => p.id === i.productId);
        return product ? { ...i, product } : null;
      })
      .filter(Boolean) as Array<CartItem & { product: Product }>;

    const count = resolved.reduce((a, b) => a + b.qty, 0);
    const subtotal = resolved.reduce((a, b) => a + b.qty * b.product.price, 0);

    return {
      items, count, subtotal, open, setOpen, resolved,
      add: (productId, size, qty = 1) => {
        setItems((prev) => {
          const idx = prev.findIndex((p) => p.productId === productId && p.size === size);
          if (idx >= 0) {
            const next = [...prev];
            next[idx] = { ...next[idx], qty: next[idx].qty + qty };
            return next;
          }
          return [...prev, { productId, size, qty }];
        });
      },
      remove: (productId, size) =>
        setItems((prev) => prev.filter((p) => !(p.productId === productId && p.size === size))),
      setQty: (productId, size, qty) =>
        setItems((prev) =>
          prev.map((p) => (p.productId === productId && p.size === size ? { ...p, qty: Math.max(1, qty) } : p))
        ),
      clear: () => setItems([]),
    };
  }, [items, open, products]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
