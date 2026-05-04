// Products are now sourced from the database (table: public.products).
// Admin can manage them at /admin. Public reads are open via RLS.
import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

export type Gender = "men" | "women";

export type Product = {
  id: string;
  name: string;
  price: number; // INR
  img: string;
  gender: Gender;
  category: string;
  tag?: "NEW" | "BESTSELLER" | "ICON";
  description: string;
  sizes: string[];
  isNew?: boolean;
};

const formatINR = (n: number) => "₹" + Number(n).toLocaleString("en-IN");
export const priceLabel = (n: number) => formatINR(n);

export const MEN_CATEGORIES = ["All", "Hoodies", "T-Shirts", "Denim", "Outerwear", "Co-ords"];
export const WOMEN_CATEGORIES = ["All", "Co-ord Sets", "Denim", "Cargos", "Tops & Tees", "Outerwear", "Loungewear"];

const baseSizes = ["XS", "S", "M", "L", "XL", "XXL"];

type Row = {
  id: string;
  name: string;
  price: number | string;
  img: string;
  gender: string;
  category: string;
  tag: string | null;
  description: string | null;
  sizes: string[] | null;
  is_new: boolean | null;
  sort_order: number | null;
};

const mapRow = (r: Row): Product => ({
  id: r.id,
  name: r.name,
  price: Number(r.price),
  img: r.img,
  gender: (r.gender === "women" ? "women" : "men") as Gender,
  category: r.category,
  tag: (r.tag as Product["tag"]) ?? undefined,
  description: r.description ?? "",
  sizes: r.sizes && r.sizes.length ? r.sizes : baseSizes,
  isNew: !!r.is_new,
});

// In-memory cache shared across hook instances so existing components stay snappy.
let cache: Product[] | null = null;
const subscribers = new Set<(p: Product[]) => void>();

async function fetchAll(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });
  if (error) {
    console.error("[products] fetch error", error);
    return [];
  }
  const list = (data as Row[]).map(mapRow);
  cache = list;
  subscribers.forEach((cb) => cb(list));
  return list;
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>(cache ?? []);
  const [loading, setLoading] = useState(cache === null);

  useEffect(() => {
    const cb = (p: Product[]) => setProducts(p);
    subscribers.add(cb);
    if (cache === null) {
      fetchAll().finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
    return () => {
      subscribers.delete(cb);
    };
  }, []);

  const refresh = useCallback(async () => {
    setLoading(true);
    await fetchAll();
    setLoading(false);
  }, []);

  return { products, loading, refresh };
}

export function useProduct(id: string | undefined) {
  const { products, loading } = useProducts();
  return { product: id ? products.find((p) => p.id === id) : undefined, loading };
}

// ---- Legacy synchronous helpers (kept for components that imported them).
// These read the cache; they return [] until the first useProducts() call resolves.
export function getProduct(id: string) {
  return (cache ?? []).find((p) => p.id === id);
}
export function listByGender(gender: Gender) {
  return (cache ?? []).filter((p) => p.gender === gender);
}
export function listNewDrop() {
  return (cache ?? []).filter((p) => p.isNew);
}
export const PRODUCTS: Product[] = new Proxy([] as Product[], {
  get(_t, prop) {
    const arr = cache ?? [];
    // @ts-expect-error - dynamic forwarding
    return arr[prop];
  },
}) as Product[];

// Eager prefetch on module load so non-hook consumers warm the cache early.
if (typeof window !== "undefined") {
  fetchAll();
}
