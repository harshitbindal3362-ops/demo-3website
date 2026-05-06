import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { useAuth } from "@/context/AuthContext";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { useProducts, priceLabel, type Product } from "@/lib/products";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Plus, Pencil, Trash2, Upload, Loader2 } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Manage Products | Caliroots" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminRoute,
});

function AdminRoute() {
  return (
    <SiteLayout>
      <AdminPage />
    </SiteLayout>
  );
}

type Draft = {
  id: string;
  name: string;
  price: string;
  img: string;
  gender: "men" | "women";
  category: string;
  tag: "" | "NEW" | "BESTSELLER" | "ICON";
  description: string;
  sizes: string;
  is_new: boolean;
  sort_order: string;
};

const emptyDraft: Draft = {
  id: "",
  name: "",
  price: "",
  img: "",
  gender: "men",
  category: "",
  tag: "",
  description: "",
  sizes: "XS,S,M,L,XL,XXL",
  is_new: false,
  sort_order: "0",
};

function AdminPage() {
  const navigate = useNavigate();
  const { user, loading: authLoading, setOpen } = useAuth();
  const { isAdmin, loading: roleLoading } = useIsAdmin();
  const { products, refresh, loading } = useProducts();

  const [editing, setEditing] = useState<Draft | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) setOpen(true);
  }, [authLoading, user, setOpen]);

  if (authLoading || roleLoading) {
    return (
      <div className="mx-auto max-w-4xl px-5 py-32 text-center">
        <Loader2 className="size-6 animate-spin mx-auto" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-32 text-center">
        <h1 className="font-display text-4xl">SIGN IN REQUIRED</h1>
        <p className="text-muted-foreground mt-3">Please sign in with the owner account to manage products.</p>
        <Button onClick={() => setOpen(true)} className="mt-6">Sign in</Button>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-32 text-center">
        <h1 className="font-display text-4xl">ACCESS DENIED</h1>
        <p className="text-muted-foreground mt-3">
          Only the owner account can access this area. You're signed in as <span className="font-mono">{user.email}</span>.
        </p>
        <Link to="/" className="btn-ink mt-6 inline-block">BACK TO HOME</Link>
      </div>
    );
  }

  const startCreate = () => {
    setIsNew(true);
    setEditing({ ...emptyDraft, id: `p-${Date.now().toString(36)}` });
  };

  const startEdit = (p: Product) => {
    setIsNew(false);
    setEditing({
      id: p.id,
      name: p.name,
      price: String(p.price),
      img: p.img,
      gender: p.gender,
      category: p.category,
      tag: (p.tag as Draft["tag"]) ?? "",
      description: p.description,
      sizes: p.sizes.join(","),
      is_new: !!p.isNew,
      sort_order: "0",
    });
  };

  const onUpload = async (file: File) => {
    setUploading(true);
    try {
      const ext = file.name.split(".").pop() || "jpg";
      const path = `products/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const { error } = await supabase.storage.from("product-images").upload(path, file, {
        cacheControl: "3600",
        upsert: false,
      });
      if (error) throw error;
      const { data } = supabase.storage.from("product-images").getPublicUrl(path);
      if (editing) setEditing({ ...editing, img: data.publicUrl });
      toast.success("Image uploaded");
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Upload failed";
      toast.error(msg);
    } finally {
      setUploading(false);
    }
  };

  const save = async () => {
    if (!editing) return;
    if (!editing.name || !editing.price || !editing.img || !editing.category) {
      toast.error("Name, price, image and category are required");
      return;
    }
    setSaving(true);
    const payload = {
      id: editing.id,
      name: editing.name,
      price: Number(editing.price),
      img: editing.img,
      gender: editing.gender,
      category: editing.category,
      tag: editing.tag || null,
      description: editing.description,
      sizes: editing.sizes.split(",").map((s) => s.trim()).filter(Boolean),
      is_new: editing.is_new,
      sort_order: Number(editing.sort_order) || 0,
    };
    const { error } = isNew
      ? await supabase.from("products").insert(payload)
      : await supabase.from("products").update(payload).eq("id", editing.id);
    setSaving(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success(isNew ? "Product created" : "Product updated");
    setEditing(null);
    await refresh();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this product? This cannot be undone.")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Product deleted");
    await refresh();
  };

  return (
    <>
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10 py-12">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10 py-12">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <p className="font-display text-xs tracking-[0.3em] text-hot">OWNER DASHBOARD</p>
            <h1 className="font-display text-5xl lg:text-6xl mt-2">PRODUCTS</h1>
            <p className="text-muted-foreground mt-2">{products.length} items in catalog</p>
          </div>
          <Button onClick={startCreate} size="lg" className="bg-ink hover:bg-ink/90">
            <Plus className="size-4 mr-2" /> NEW PRODUCT
          </Button>
        </div>

        {loading ? (
          <div className="py-20 text-center"><Loader2 className="size-6 animate-spin mx-auto" /></div>
        ) : (
          <div className="border border-ink/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted text-left font-display tracking-wider text-xs">
                  <tr>
                    <th className="p-3">IMAGE</th>
                    <th className="p-3">NAME</th>
                    <th className="p-3">GENDER</th>
                    <th className="p-3">CATEGORY</th>
                    <th className="p-3">PRICE</th>
                    <th className="p-3">TAG</th>
                    <th className="p-3">NEW</th>
                    <th className="p-3 text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id} className="border-t border-ink/10 hover:bg-muted/40">
                      <td className="p-3">
                        <img src={p.img} alt={p.name} className="size-14 object-cover" />
                      </td>
                      <td className="p-3 font-medium">{p.name}<div className="text-xs text-muted-foreground">{p.id}</div></td>
                      <td className="p-3 uppercase text-xs tracking-wider">{p.gender}</td>
                      <td className="p-3">{p.category}</td>
                      <td className="p-3 font-display tracking-wider">{priceLabel(p.price)}</td>
                      <td className="p-3 text-xs">{p.tag ?? "—"}</td>
                      <td className="p-3 text-xs">{p.isNew ? "✓" : "—"}</td>
                      <td className="p-3">
                        <div className="flex gap-1 justify-end">
                          <Button size="sm" variant="ghost" onClick={() => startEdit(p)}><Pencil className="size-4" /></Button>
                          <Button size="sm" variant="ghost" onClick={() => remove(p.id)}><Trash2 className="size-4 text-destructive" /></Button>
                          <Button size="sm" variant="ghost" onClick={() => navigate({ to: "/product/$id", params: { id: p.id } })}>View</Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display tracking-wider">
              {isNew ? "NEW PRODUCT" : "EDIT PRODUCT"}
            </DialogTitle>
          </DialogHeader>

          {editing && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Product ID</Label>
                  <Input value={editing.id} onChange={(e) => setEditing({ ...editing, id: e.target.value })} disabled={!isNew} />
                </div>
                <div>
                  <Label>Sort order</Label>
                  <Input type="number" value={editing.sort_order} onChange={(e) => setEditing({ ...editing, sort_order: e.target.value })} />
                </div>
              </div>

              <div>
                <Label>Name</Label>
                <Input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Price (INR)</Label>
                  <Input type="number" value={editing.price} onChange={(e) => setEditing({ ...editing, price: e.target.value })} />
                </div>
                <div>
                  <Label>Category</Label>
                  <Input placeholder="e.g. Hoodies" value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Gender</Label>
                  <Select value={editing.gender} onValueChange={(v) => setEditing({ ...editing, gender: v as "men" | "women" })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="men">Men</SelectItem>
                      <SelectItem value="women">Women</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Badge</Label>
                  <Select value={editing.tag || "none"} onValueChange={(v) => setEditing({ ...editing, tag: (v === "none" ? "" : v) as Draft["tag"] })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="NEW">NEW</SelectItem>
                      <SelectItem value="BESTSELLER">BESTSELLER</SelectItem>
                      <SelectItem value="ICON">ICON</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Image</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="https://… or upload below"
                    value={editing.img}
                    onChange={(e) => setEditing({ ...editing, img: e.target.value })}
                  />
                  <label className="inline-flex items-center gap-2 px-3 border border-input rounded-md cursor-pointer hover:bg-muted text-sm whitespace-nowrap">
                    {uploading ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />}
                    Upload
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) onUpload(f);
                      }}
                    />
                  </label>
                </div>
                {editing.img && (
                  <img src={editing.img} alt="" className="mt-2 size-32 object-cover border" />
                )}
              </div>

              <div>
                <Label>Sizes (comma-separated)</Label>
                <Input value={editing.sizes} onChange={(e) => setEditing({ ...editing, sizes: e.target.value })} />
              </div>

              <div>
                <Label>Description</Label>
                <Textarea rows={4} value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} />
              </div>

              <div className="flex items-center gap-3">
                <Switch checked={editing.is_new} onCheckedChange={(v) => setEditing({ ...editing, is_new: v })} />
                <Label>Show in "New Drop"</Label>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
            <Button onClick={save} disabled={saving} className="bg-ink hover:bg-ink/90">
              {saving && <Loader2 className="size-4 mr-2 animate-spin" />}
              {isNew ? "Create" : "Save changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SiteLayout>
  );
}
