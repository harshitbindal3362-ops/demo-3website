// Centralized product catalog — split by gender
import knits from "@/assets/brand-knits.jpg";
import hoodieDuo from "@/assets/brand-hoodie-duo.jpg";
import racks from "@/assets/brand-rack.jpg";
import suitBw from "@/assets/brand-suit-bw.jpg";
import manShades from "@/assets/brand-man-shades.jpg";
import manHat from "@/assets/brand-man-hat.jpg";
import manGreen from "@/assets/brand-man-green.jpg";
import redHoodie from "@/assets/brand-red-hoodie.jpg";
import womanBlazer from "@/assets/brand-woman-blazer.jpg";
import womanHat from "@/assets/brand-woman-hat.jpg";
import womanRack from "@/assets/brand-woman-rack.jpg";
import shadesPair from "@/assets/brand-shades-pair.jpg";
import rackFolded from "@/assets/brand-rack-folded.jpg";
import modelsPair from "@/assets/brand-models-pair.jpg";
import ecoTee from "@/assets/brand-eco-tee.jpg";
import storeSale from "@/assets/brand-store-sale.jpg";

export type Gender = "men" | "women";

export type Product = {
  id: string;
  name: string;
  price: number; // INR
  img: string;
  gender: Gender;
  category: string; // e.g. "Hoodies"
  tag?: "NEW" | "BESTSELLER" | "ICON";
  description: string;
  sizes: string[];
  isNew?: boolean;
};

const formatINR = (n: number) =>
  "₹" + n.toLocaleString("en-IN");

export const priceLabel = (n: number) => formatINR(n);

const baseSizes = ["XS", "S", "M", "L", "XL", "XXL"];

export const PRODUCTS: Product[] = [
  // ===== MEN =====
  { id: "m-hoodie-crew", name: "Caliroots Crew Hoodie", price: 2799, img: hoodieDuo, gender: "men", category: "Hoodies", tag: "NEW", isNew: true,
    description: "Heavyweight 380gsm fleece hoodie with kangaroo pocket and embroidered Caliroots crest. Boxy oversized fit.", sizes: baseSizes },
  { id: "m-linen-coord", name: "Linen Co-ord Set", price: 3499, img: manShades, gender: "men", category: "Co-ords",
    description: "Breathable linen-blend short-sleeve shirt with matching relaxed trousers. Sand wash finish.", sizes: baseSizes },
  { id: "m-vest-set", name: "Wide-Brim Vest Set", price: 3199, img: manHat, gender: "men", category: "Co-ords", tag: "BESTSELLER",
    description: "Knit vest paired with wide-leg trousers. The boardwalk fit, tailored for the city.", sizes: baseSizes },
  { id: "m-hoodie-red", name: "Caliroots Logo Hoodie — Red", price: 2899, img: redHoodie, gender: "men", category: "Hoodies", tag: "ICON", isNew: true,
    description: "Signature red flagship hoodie. Brushed-back fleece, ribbed cuffs, screen-printed wordmark.", sizes: baseSizes },
  { id: "m-knit-heavy", name: "Heavyweight Knit", price: 2499, img: knits, gender: "men", category: "Outerwear",
    description: "Chunky cable knit in cream. Drop shoulder, full-fashioned hem.", sizes: baseSizes },
  { id: "m-denim-carpenter", name: "Loose Carpenter Denim", price: 3299, img: racks, gender: "men", category: "Denim", isNew: true,
    description: "Loose carpenter denim in raw indigo. 14oz Japanese-spec selvedge.", sizes: baseSizes },
  { id: "m-suit-tailored", name: "Tailored Two-Piece", price: 6499, img: suitBw, gender: "men", category: "Outerwear",
    description: "Soft-shoulder unstructured suit. Deadstock Italian wool.", sizes: baseSizes },
  { id: "m-polo-trouser", name: "Boxy Polo + Trouser", price: 3899, img: manGreen, gender: "men", category: "Co-ords",
    description: "Pique-knit boxy polo with relaxed pleated trouser in moss green.", sizes: baseSizes },
  { id: "m-tee-eco", name: "Organic Cali Tee", price: 1499, img: ecoTee, gender: "men", category: "T-Shirts", isNew: true,
    description: "GOTS-certified organic cotton tee. Box-cut, drop shoulder.", sizes: baseSizes },

  // ===== WOMEN =====
  { id: "w-blazer-set", name: "Power Blazer + Skirt", price: 5899, img: womanBlazer, gender: "women", category: "Co-ord Sets", tag: "NEW", isNew: true,
    description: "Sharp double-breasted blazer with matching mini skirt. Italian crepe.", sizes: baseSizes },
  { id: "w-bomber-coord", name: "Brimmed Bomber Co-ord", price: 4299, img: womanHat, gender: "women", category: "Co-ord Sets", tag: "BESTSELLER", isNew: true,
    description: "Cropped bomber paired with wide-leg trouser. Streetwear, refined.", sizes: baseSizes },
  { id: "w-tee-pack", name: "Cali Crew Tee Pack", price: 1899, img: shadesPair, gender: "women", category: "Tops & Tees",
    description: "Three-pack of crew-neck cotton tees. Off-white, sage, ink.", sizes: baseSizes },
  { id: "w-cargo-set", name: "Cargo & Bomber Set", price: 4999, img: storeSale, gender: "women", category: "Cargos", isNew: true,
    description: "Utility cargo pant with cropped MA-1 bomber. The off-duty uniform.", sizes: baseSizes },
  { id: "w-denim-wide", name: "Sculpted Wide Denim", price: 3499, img: womanRack, gender: "women", category: "Denim",
    description: "High-rise sculpted wide-leg denim in vintage indigo wash.", sizes: baseSizes },
  { id: "w-knit-crop", name: "Cropped Heavy Knit", price: 2299, img: knits, gender: "women", category: "Outerwear",
    description: "Cropped heavyweight knit, ribbed hem, drop shoulder.", sizes: baseSizes },
  { id: "w-track-set", name: "Loungewear Track Set", price: 3799, img: rackFolded, gender: "women", category: "Loungewear",
    description: "Brushed fleece track jacket and matching jogger.", sizes: baseSizes },
  { id: "w-twin-coord", name: "Cali Twin Co-ord", price: 4499, img: modelsPair, gender: "women", category: "Co-ord Sets",
    description: "Knit cami and matching mini skirt. Holiday capsule favorite.", sizes: baseSizes },
  { id: "w-jean-slouch", name: "Slouchy Carpenter Jean", price: 3299, img: racks, gender: "women", category: "Denim", isNew: true,
    description: "Mid-rise slouchy carpenter jean. Lived-in indigo.", sizes: baseSizes },
  { id: "w-tee-boxy", name: "Boxy Cropped Tee", price: 1499, img: shadesPair, gender: "women", category: "Tops & Tees",
    description: "Boxy cropped tee in heavy 240gsm cotton.", sizes: baseSizes },
];

export const MEN_CATEGORIES = ["All", "Hoodies", "T-Shirts", "Denim", "Outerwear", "Co-ords"];
export const WOMEN_CATEGORIES = ["All", "Co-ord Sets", "Denim", "Cargos", "Tops & Tees", "Outerwear", "Loungewear"];

export function getProduct(id: string) {
  return PRODUCTS.find((p) => p.id === id);
}

export function listByGender(gender: Gender) {
  return PRODUCTS.filter((p) => p.gender === gender);
}

export function listNewDrop() {
  return PRODUCTS.filter((p) => p.isNew);
}
